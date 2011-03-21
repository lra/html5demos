function draw()
{
	var canvas = document.getElementById('view');
	var context = canvas.getContext('2d');
	var pixels = context.createImageData(canvas.width, canvas.height);
	var currentIteration = 1;
	var maxIteration = 1000;
	var fps = 60;
	var intval;
	var palette = Array();
	var buffer = Array();
	var bufferExtraHeight = 3;
	
	function setup()
	{
		// Initialize palette
		for (var i = 0; i <= 255; i++)
		{
			var hsl = Array();
			var rgb = new Object;
			
			hsl = hsl2rgb(Math.round(i/3), 255, Math.min(255, i*2));
			rgb.r = hsl.r;
			rgb.g = hsl.g;
			rgb.b = hsl.b;
			palette[i] = rgb;
		}
		
		// Initialize pixel buffer
		for (var x = 0; x < canvas.width; x++)
		{
			for (var y = 0; y < canvas.height + bufferExtraHeight; y++)
			{
				setBufferColor(x, y, 0);
			}
		}
	}
	function hsl2rgb(h, s, l)
	{
		var m1, m2, hue;
		var r, g, b;
		
		s /=100;
		l /= 100;
		if (s == 0)
		{
			r = g = b = (l * 255);
		}
		else
		{
			if (l <= 0.5)
			{
				m2 = l * (s + 1);
			}
			else
			{
				m2 = l + s - l * s;
			}
			m1 = l * 2 - m2;
			hue = h / 360;
			r = HueToRgb(m1, m2, hue + 1/3);
			g = HueToRgb(m1, m2, hue);
			b = HueToRgb(m1, m2, hue - 1/3);
		}
		return {r: r, g: g, b: b};
	}
	
	function HueToRgb(m1, m2, hue)
	{
		var v;
		if (hue < 0)
		{
			hue += 1;
		}
		else if (hue > 1)
		{
			hue -= 1;
		}

		if (6 * hue < 1)
		{
			v = m1 + (m2 - m1) * hue * 6;
		}
		else if (2 * hue < 1)
		{
			v = m2;
		}
		else if (3 * hue < 2)
		{
			v = m1 + (m2 - m1) * (2/3 - hue) * 6;
		}
		else
		{
			v = m1;
		}

		return 255 * v;
	}
	
	function setBufferColor(x, y, color)
	{
		buffer[x + y * canvas.width] = color;
	}
	
	function getBufferColor(x, y, color)
	{
		return buffer[x + y * canvas.width];
	}

	function setPixelRGB(x, y, r, g, b)
	{
        var idx = (x + y * canvas.width) * 4;
        pixels.data[idx + 0] = r;
        pixels.data[idx + 1] = g;
        pixels.data[idx + 2] = b;
        pixels.data[idx + 3] = 255;		
	}
	
	function render()
	{
		var x;
		var y;
		for (x = 25; x < canvas.width-25; x++)
		{
			var color;
			color = Math.round(100 + 50 * Math.random());
			setBufferColor(x, canvas.height + bufferExtraHeight - 1, color);
			color = Math.round(100 + 50 * Math.random());
			setBufferColor(x, canvas.height + bufferExtraHeight - 2, color);
		}
		var nb_blocs = 10 + Math.round(40 * Math.random());
		for (var bloc = 0; bloc < nb_blocs; bloc++)
		{
			x = 25 + Math.round(Math.random() * (canvas.width - 50));
			setBufferColor(x-1, canvas.height - 3 + bufferExtraHeight, palette.length-1);
			setBufferColor(x  , canvas.height - 3 + bufferExtraHeight, palette.length-1);
			setBufferColor(x+1, canvas.height - 3 + bufferExtraHeight, palette.length-1);
			setBufferColor(x-1, canvas.height - 2 + bufferExtraHeight, palette.length-1);
			setBufferColor(x  , canvas.height - 2 + bufferExtraHeight, palette.length-1);
			setBufferColor(x+1, canvas.height - 2 + bufferExtraHeight, palette.length-1);
			setBufferColor(x-1, canvas.height - 1 + bufferExtraHeight, palette.length-1);
			setBufferColor(x  , canvas.height - 1 + bufferExtraHeight, palette.length-1);
			setBufferColor(x+1, canvas.height - 1 + bufferExtraHeight, palette.length-1);
		}
		for (x = 0; x < pixels.width; x++)
		{
		    for (y = 0; y < pixels.height - 2 + bufferExtraHeight; y++)
			{
				var c = getBufferColor(x-1, y+1) + getBufferColor(x, y+1) + getBufferColor(x+1, y+1) + getBufferColor(x, y+2);
				c = Math.round(c / 4 - 3);
				if (c < 0)
				{
					c = 0;
				}
				c = Math.min(c, palette.length-1);
				setBufferColor(x, y, c);
		    }
		}
		for (x = 0; x < pixels.width; x++)
		{
		    for (y = 0; y < pixels.height; y++)
			{
				c = getBufferColor(x, y);
				setPixelRGB(x, y, palette[c].r, palette[c].g, palette[c].b);
			}
		}
		context.putImageData(pixels, 0, 0);
		currentIteration++;
		if (currentIteration > maxIteration)
		{
			clearInterval(intval);
			console.log('Finished!');
		}
	}
	
	setup();
	intval = setInterval(render, 1000 / fps);
}

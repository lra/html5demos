function draw()
{
	var canvas = document.getElementById('view');
	var context = canvas.getContext('2d');
	var pixels = context.createImageData(canvas.width, canvas.height);
	var currentIteration = 1;
	var maxIteration = 10;
	var fps = 60;
	var intval;
	var palette = Array();
	var buffer = Array();
	
	function setup()
	{
		// Initialize palette
		for (var i = 0; i <= 255; i++)
		{
			var rgb = new Object;
			rgb.r = i;
			rgb.g = i;
			rgb.b = i;
			palette[i] = rgb;
		}
		
		// Initialize pixel buffer
		for (var x = 0; x < canvas.width; x++)
		{
			for (var y = 0; y < canvas.width; y++)
			{
				setBufferColor(x, y, 0);
			}
		}
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
		for (x = 0; x < canvas.width; x++)
		{
			var color;
			color = Math.round(100 + 50 * Math.random());
			setBufferColor(x, canvas.height - 1, color);
			color = Math.round(100 + 50 * Math.random());
			setBufferColor(x, canvas.height - 2, color);
		}
		var nb_blocs = 10 + Math.round(40 * Math.random());
		for (var bloc = 0; bloc < nb_blocs; bloc++)
		{
			x = 1 + Math.round(Math.random() * (canvas.width - 2));
			setBufferColor(x-1, canvas.height - 3, palette.length-1);
			setBufferColor(x  , canvas.height - 3, palette.length-1);
			setBufferColor(x+1, canvas.height - 3, palette.length-1);
			setBufferColor(x-1, canvas.height - 2, palette.length-1);
			setBufferColor(x  , canvas.height - 2, palette.length-1);
			setBufferColor(x+1, canvas.height - 2, palette.length-1);
			setBufferColor(x-1, canvas.height - 1, palette.length-1);
			setBufferColor(x  , canvas.height - 1, palette.length-1);
			setBufferColor(x+1, canvas.height - 1, palette.length-1);
		}
		for (x = 0; x < pixels.width; x++)
		{
		    for (y = 0; y < pixels.height - 2; y++)
			{
				var c = getBufferColor(x-1, y+1) + getBufferColor(x, y+1) + getBufferColor(x+1, y+1) + getBufferColor(x, y+2);
				c = Math.round(c / 4 - 1);
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
				try
				{
					setPixelRGB(x, y, palette[c].r, palette[c].g, palette[c].b);
				}
				catch (err)
				{
					console.log('Error'+c);
				}
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

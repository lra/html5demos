function draw()
{
	var canvas = document.getElementById('view');
	var context = canvas.getContext('2d');
	var pixels = context.createImageData(canvas.width, canvas.height);
	var currentIteration = 1;
	var fps = 60;
	var intval;
	var palette = Array();
	var buffer = Array();
	var bufferExtraHeight = 3;
	
	function setup()
	{
		createPalette();
		
		// Initialize pixel buffer
		for (var x = 0; x < canvas.width; x++)
		{
			for (var y = 0; y < canvas.height + bufferExtraHeight; y++)
			{
				setBufferColor(x, y, 0);
			}
		}
	}
	
	function createPalette()
	{
		var rgb;
		
		for (var i = 0; i < 64; i++)
		{
			// black to max red
			rgb = new Object;
			rgb.r = i * 4;
			rgb.g = 0;
			rgb.b = 0;
			palette[i] = rgb;
			
			// max red to max yellow
			rgb = new Object;
			rgb.r = 255;
			rgb.g = i;
			rgb.b = 0;
			palette[i + 64] = rgb;

			// max yellow
			rgb = new Object;
			rgb.r = 255;
			rgb.g = 255;
			rgb.b = 0;
			palette[i + 128] = rgb;
			
			// max yellow to red; we just do the
			//  opposite of the color eqn above
			rgb = new Object;
			rgb.r = 255;
			rgb.g = 255 - i * 4;
			rgb.b = 0;
			palette[i + 192] = rgb;
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
				c = Math.round(c / 4 - 4);
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
	}
	
	setup();
	setInterval(render, 1000 / fps);
}

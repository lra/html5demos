var timerId;

function draw()
{
	var canvas = document.getElementById('view');
	var context = canvas.getContext('2d');
	var pixels = context.createImageData(canvas.width, canvas.height);
	var currentIteration = 1;
	var maxIteration = 50;
	var fps = 60;

	function computeColor(x, y, max_iteration)
	{
	    x = 2.5 * (x/canvas.width - 0.5);
	    y = 2 * (y/canvas.height - 0.5);
	    var x0 = x;
	    var y0 = y;

	    var iteration = 0;

	    while (x * x + y * y <= 4 && iteration < max_iteration ) {
	        var xtemp = x*x - y*y + x0;
	        y = 2*x*y + y0;
	        x = xtemp;
	        iteration++;
	    }

	    return Math.round(255 * iteration / max_iteration);
	}
	
	function render()
	{
		for (var x = 0; x < pixels.width; x++)
		{
		    for (var y = 0; y < pixels.height; y++)
			{
		        var color = computeColor(x, y, currentIteration);
		        var idx = (x + y * canvas.width) * 4;
		        pixels.data[idx + 0] = color;
		        pixels.data[idx + 1] = color;
		        pixels.data[idx + 2] = color;
		        pixels.data[idx + 3] = 255;
		    }
		}		
		context.putImageData(pixels, 0, 0);
		currentIteration++;
		if (currentIteration > maxIteration)
		{
			clearInterval(timerId);
			timerId = null;
			console.log('fin');
		}
	}
	
	if (timerId)
	{
		clearInterval(timerId);
		timerId = null;
		console.log('stop');
	}
	else
	{
		timerId = setInterval(render, 1000 / fps);	
		console.log('start');	
	}
}

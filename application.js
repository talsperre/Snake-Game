$(document).ready(function(){
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var width = $("#canvas").width();
	var height = $("#canvas").height();
	var cell_width = 10;
	var dir;
	var food;
	var score;
	var snake_array;
	function init()
	{
		dir="right";
		create_snake();
		create_food();
		score = 0;
		if(typeof game_loop != "undefined")
		{
			clearInterval(game_loop);
		}
		game_loop=setInterval(paint, 60);
	}
	init();
	function create_snake()
	{
		var length = 5;
		snake_array = [];
		for(var i=length-1;i>=0;i--)
		{
			snake_array.push({x: i, y: 0});
		}
	}
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(width - cell_width)/cell_width),
			y: Math.round(Math.random()*(height - cell_width)/cell_width),
		};
	}
	function paint()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, width, height);
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		if(dir == "right")
		{
			nx++;
		}
		else if(dir == "left")
		{
			nx--;
		}
		else if(dir == "up")
		{
			ny--;
		}
		else if(dir == "down")
		{
			ny++;
		}
		if(nx == -1 || nx == width/cell_width || ny == -1 || ny == height/cell_width || check_collision(nx, ny, snake_array))
		{
			//alert("GAME OVER");
			init();
			return;
		}
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			create_food();
		}
		else
		{
			var tail = snake_array.pop();
			tail.x = nx;
			tail.y = ny;
		}
		snake_array.unshift(tail);
		for(var i=0;i<snake_array.length;i++)
		{
			var c = snake_array[i];
			paint_cell(c.x, c.y);
		}
		paint_cell(food.x, food.y);
		var score_text = "Score: "+score;
		ctx.fillText(score_text, 5, height - 5);
	}
	function paint_cell(x, y)
	{
		ctx.fillStyle = "blue";
		ctx.fillRect(x*cell_width, y*cell_width, cell_width, cell_width);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x*cell_width, y*cell_width, cell_width, cell_width);
	}
	function check_collision(x, y, array)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			{
				return true;
			}
		}
		return false;
	}
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && dir != "right")
		{
			dir = "left";
		}
		else if(key == "38" && dir != "down")
		{
			dir = "up";
		}
		else if(key == "39" && dir != "left")
		{
			dir = "right";
		}
		else if(key == "40" && dir != "up")
		{
			dir = "down";
		}
	})
})





































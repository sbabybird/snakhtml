const S_UP = 0;
const S_DOWN = 1;
const S_LEFT = 2;
const S_RIGHT = 3;
const S_WIDTH = 320;
const S_HEIGHT = 240;
const S_BODYSIZE = 16;

var arrow = S_DOWN;
var bodyarr = new Array();
var foodarr = new Array();

init = function() {
	for (i = 0; i<9; i++) {
		var tmp = new Object();
		tmp.x = i*S_BODYSIZE;
		tmp.y = 0;
		bodyarr.push(tmp);
	}
}

drawcan = {
test: function(canvas) {
		  if (canvas) {
			  var context = elem.getContext('2d');
			  if(context){
				  context.shadowOffsetX = 5;
				  context.shadowOffsetY = 5;
				  context.shadowBlur = 4;
				  context.shadowColor = 'rgba(122,122,122, 0.5)';
				  context.fillStyle = '#0000ff';
				  context.fillRect(0, 0, S_WIDTH, S_HEIGHT);
				  context.font  = 'italic 40px sans-serif';
				  context.textBaseline = 'top';				
				  context.fillStyle = 'rgba(222, 122, 122, 0.5)';
				  context.fillText('DrawCan Test!', 5, 5);
			  }
		  }
		  else {
			  alert('canvas element is null');
		  }
	  } ,

drawbody: function(canvas) {
			  drawcan.drawrect(canvas, 0, 0, S_WIDTH, S_HEIGHT, '#fff');
			  for (i in bodyarr) {
				  body=bodyarr[i];
				  drawcan.drawrect(canvas, body.x, body.y, S_BODYSIZE, S_BODYSIZE, '#009966');
			  }
		  } ,

drawfood: function(canvas) {
			  for (i in foodarr) {
				  food=foodarr[i];
				  drawcan.drawrect(canvas, food.x, food.y, S_BODYSIZE, S_BODYSIZE, '#0a0');
			  }
		  } ,

drawrect: function(canvas, x, y, w, h, color) {
			  if (canvas) {
				  var context = canvas.getContext('2d');
				  if(context) {
					  context.save();
					  context.fillStyle = color;
					  context.fillRect(x, y, w, h);
					  context.restore();
				  }
			  }
		  } ,
}

mainwhile = function() {
	cur = bodyarr[bodyarr.length-1];
	x=y=0;
	switch(arrow) {
		case S_UP: 
			x = cur.x;
			y = cur.y-S_BODYSIZE;
			break;
		case S_DOWN: 
			x = cur.x;
			y = cur.y+S_BODYSIZE;break;
		case S_LEFT: 
			x = cur.x-S_BODYSIZE;
			y = cur.y;
			break;
		case S_RIGHT:
			x = cur.x+S_BODYSIZE;
			y = cur.y;
			break;
		default:break;
	}
	if (x<0) x += S_WIDTH; else x %= S_WIDTH;
	if (y<0) y += S_HEIGHT; else y %= S_HEIGHT;	
	var body = new Object;
	body.x = x;
	body.y = y;
	bodyarr.push(body);
	bodyarr.shift();
	canvas = document.getElementById('snakCanvas');
	drawcan.drawbody(canvas);
	drawcan.drawfood(canvas);
}

window.addEventListener('load', function() {
		$(document).bind('keypress', function(event) {
			key = event.keyCode||event.which||event.charCode;
			//alert(key);
			switch(key) {
			case 119:
			case 38: arrow=S_UP; return;
			case 115:
			case 40: arrow=S_DOWN; return;
			case 97:
			case 37: arrow=S_LEFT; return;
			case 100:
			case 39: arrow=S_RIGHT; return;
			default: return;
			}
			});
		init();
		setInterval(mainwhile, 150);
		},100);

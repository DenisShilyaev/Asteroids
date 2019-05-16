var canvas = document.getElementById ( 'game' );
var context = canvas.getContext ( '2d' );

var aster = []; 
var fire = [];
var expl = [];
var timer = 0;
var ship = {x:300, y:300};

var fonImg = new Image ();
fonImg.src = 'fon.jpg';

var shipImg = new Image ();
shipImg.src = 'ship.png';

var fireImg = new Image ();
fireImg.src = 'fire.png';

var asterImg = new Image ();
asterImg.src = 'aster.png';

var explImg = new Image ();
explImg.src = 'expl.png';

canvas.addEventListener ("mousemove", function(event) {
	ship.x = event.offsetX-25;
	ship.y = event.offsetY-13;
});

explImg.onload = function () {
	game ();
}

function game () { //Основной игровой цикл
	update ();
	render ();
	requestAnimFrame (game);
}

function update () {
	timer++;
	if(timer%15==0){ //Создание астеройдов
		aster.push({
			x:Math.random()*800, 
			y:-50, 
			dx:Math.random()*2-1, 
			dy:Math.random()*2+2,
			del:0})
	}

	if (timer%20==0) { //Выстрелы
		fire.push({x:ship.x+10, y:ship.y, dx:0, dy:-5.2});
		fire.push({x:ship.x+10, y:ship.y, dx:0.5, dy:-5});
		fire.push({x:ship.x+10, y:ship.y, dx:-0.5, dy:-5});
	}

	for (i in fire) { //Перемещение пуль
		fire[i].x = fire[i].x+fire[i].dx;
		fire[i].y = fire[i].y+fire[i].dy;

		if (fire[i].y<-30) fire.splice(i,1);
	}

	for (i in expl) { //Взрывы
		expl[i].animx = expl[i].animx+0.5;
		if (expl[i].animx>7) {expl[i].animy++; expl[i].animx = 0}
		if (expl[i].animy>7) expl.splice (i,1);
	}

	for (i in aster) { //Физика
		aster[i].x = aster[i].x+aster[i].dx;
	 	aster[i].y = aster[i].y+aster[i].dy;

		if (aster[i].x>=800 || aster[i].x < 0) aster[i].dx = -aster[i].dx; //Границы
		if (aster[i].y>=900) aster.splice(i,1);

		for (j in fire) {
			if (Math.abs(aster[i].x+25-fire[j].x-15)<50 && Math.abs(aster[i].y-fire[j].y)<25) { //Если произошло столкновение  
				expl.push({//Рисуем взрыв
					x:aster[i].x-30,
					y:aster[i].y-30, 
					animx:0, 
					animy:0});
				aster[i].del = 1; //Помечаем астеройд на удаление
				fire.splice(j,1); //Удаляем пулю
				break;
			}
		}
		if (aster[i].del == 1) aster.splice(i,1);
	}
}

function render () {
	context.drawImage (fonImg, 0, 0, 900, 900);
	context.drawImage (shipImg, ship.x, ship.y, 60, 80);
	// for (i in fire) context.drawImage (fireImg, fire[i].x, fire[i].y, 30, 30);
	for (i in fire) context.drawImage (fireImg, fire[i].x, fire[i].y, 30, 30);
	for (i in aster) context.drawImage (asterImg, aster[i].x, aster[i].y, 100, 100);
	for (i in expl) //рисуем взрывы
	context.drawImage(explImg, 128*Math.floor(expl[i].animx),128*Math.floor(expl[i].animy),128,128, expl[i].x, expl[i].y, 100, 100);
}


var requestAnimFrame = (function () {
	return window.requestAnimationFrame    || 
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame	   ||
		window.msRequestAnimationFrame	   ||
		function (callback) {
			window.setTimeout (callback, 1000 / 20);
		};
})();
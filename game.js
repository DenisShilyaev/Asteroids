var canvas = document.getElementById ( 'game' );
var context = canvas.getContext ( '2d' );

var aster={x:0, y:300}; 

var fonImg = new Image ();
fonImg.src = 'fon.png';

var asterImg = new Image ();
asterImg.src = 'aster.png';

fonImg.onload = function () {
	game ();
}

function game () { //Основной игровой цикл
	update ();
	render ();
	requestAnimFrame (game);
}

function update () {
	//Физика
	aster.x=aster.x+10;
	//Границы
	if (aster.x>=550) aster.x=550;
}

function render () {
	context.drawImage (fonImg, 0, 0, 600, 600);
	context.drawImage (asterImg, x, y, 50, 50);		
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
function beginTransition() {
	var title = document.getElementById('theTitle');
	var input = document.getElementsByClassName('inputBox');
	var names = document.getElementsByClassName('name');
	var button = document.getElementsByClassName('submitButton');
	var bg2 = document.getElementById('bg2');
	setTimeout(function () {
		title.style.opacity = 0;
		title.style.right = "80%";
	}, 100);
	setTimeout(function () {
		names[0].style.opacity = 0;
		names[0].style.right = "80%";
		bg2.style.opacity = 1;
	}, 200);
	setTimeout(function () {
		input[0].style.opacity = 0;
		input[0].style.right = "80%";
	}, 300);
	setTimeout(function () {
		names[1].style.opacity = 0;
		names[1].style.right = "80%";
	}, 400);
	setTimeout(function () {
		input[1].style.opacity = 0;
		input[1].style.right = "80%";
	}, 500);
	setTimeout(function () {
		button[0].style.opacity = 0;
		button[0].style.right = "80%";
	}, 600);
	setTimeout(function () {
		var mes = document.getElementById('mesOut');
		mes.style.visibility = "visible";
		mes.style.opacity = 1;
		mes.style.top = "40%";
	}, 1000);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function particlesInit() {
	var generator = document.getElementById("particleGenerator");
	var particleCount = 200;
	for (var i = 0; i < particleCount; i++) {
		var size = getRandomInt(2, 6);
		var n = '<div class="particle" style="top:' + getRandomInt(15, 95) + '%; left:' + getRandomInt(5, 95) + '%; width:'
			+ size + 'px; height:' + size + 'px; animation-delay:' + (getRandomInt(0, 30) / 10) + 's; background-color:rgba('
			+ getRandomInt(80, 160) + ',' + getRandomInt(185, 255) + ',' + getRandomInt(160, 255) + ',' + (getRandomInt(2, 8) / 10) + ');"></div>';
		console.log("Particle " + i + ": " + n);
		var node = document.createElement("div");
		node.innerHTML = n;
		generator.appendChild(node);
	}
}

particlesInit();
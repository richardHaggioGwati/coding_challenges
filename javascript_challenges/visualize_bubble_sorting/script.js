let canvas;
let context;
let i = 0;	
let values = [];

/**
 * @return {void}
 */
function setup() {
	canvas = document.createElement('canvas');
	document.body.appendChild(canvas);
	context = canvas.getContext('2d');
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	values = new Array(window.innerWidth);
	for (let i = 0; i < values.length; i++) {
		values[i] = Math.random() * window.innerHeight;
	}
	requestAnimationFrame(draw);
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

/**
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 * @return {void}
 */
function drawLine(x1, y1, x2, y2) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.stroke();
}

/**
 * Visualize the lines sorting
 * @return {void}
 */
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	if (i < values.length) {
		for (let j = 0; j < values.length - i - 1; j++) {
			let a = values[j];
			let b = values[j + 1];
			if (a > b) {
				swap(values, j, j + 1);
			}
		}
		i++;
	}

	for (let k = 0; k < values.length; k++) {
		drawLine(k, window.innerHeight, k, window.innerHeight - values[k]);
	}

	if (i < values.length) {
		requestAnimationFrame(draw);
	} else {
		console.log('Sorting finished!')
	}

}

/**
 * @param {array} array
 * @param {number} a
 * @param {number} b
 * @return {void}
 * 
 * Emulate bubble sort
 */
function swap(array, a, b) {
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

setup();

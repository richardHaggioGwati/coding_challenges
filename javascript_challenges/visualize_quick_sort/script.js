let canvas;
let context;
let i = 0;
let values = [];
let states = []

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
		states[i] = -1
	}
	requestAnimationFrame(draw);
	quickSort(values, 0, values.length - 1)
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
function drawLine(x1, y1, x2, y2, stroke) {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.strokeStyle = stroke;
	context.lineWidth = 10;
	context.stroke();
}

/**
 * Visualize the lines sorting
 * @return {void}
 */
function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	for (let k = 0; k < values.length; k++) {
		let color;
		if (states[k] === 0) {
			color = 'red';
		} else if (states[k] === 1) {
			color = 'green';
		} else {
			color = 'white';
		}

		drawLine(k, window.innerHeight, k, window.innerHeight - values[k], color);
	}
		requestAnimationFrame(draw);
}
async function quickSort(array, start, end) {
	if (start >= end) return;

	let index = await partition(array, start, end);
	states[index] = -1;

	Promise.all([
		quickSort(array, start, index - 1),
		quickSort(array, index + 1, end),
	]);
}
async function partition(array, start, end) {
	let pivotIndex = start
	let pivotValue = array[end]
	states[pivotIndex] = 0

	for (let i = start; i < end; i++) {
		if (array[i] < pivotValue) {
			await swap(array, i, pivotIndex)
			states[pivotIndex] = -1;
			pivotIndex++;
			states[pivotIndex] = 0;
		}
	}
	await swap(array, pivotIndex, end)
	states[pivotIndex] = -1;
	return pivotIndex
}
async function swap(array, a, b) {
	await sleep(10);
	let temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

setup();

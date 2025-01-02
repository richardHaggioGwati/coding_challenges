let canvas, context;
let values = [];
let states = [];
let centerY;

let animationFrameId;
let sorting = false;
let sortingComplete = false;

function setup() {
    canvas = document.querySelector('canvas') || document.createElement('canvas');
    document.body.appendChild(canvas);
    context = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    values = new Array(window.innerWidth);
    for (let i = 0; i < values.length; i++) {
        values[i] = Math.random() * (window.innerHeight / 3);
        console.log("🚀 ~ setup ~ window.innerHeight:", window.innerHeight)
        states[i] = -1;
    }
    requestAnimationFrame(draw);
    mergeSortVisualization(0, values.length - 1);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerY = canvas.height / 2;
}

function drawLine(x, height, color, position) {
    context.beginPath();
    const y = position === 'top' ? centerY - height : centerY + height;
    context.moveTo(x, centerY);
    context.lineTo(x, y);
    context.strokeStyle = color;
    context.lineWidth = 1.5;
    context.stroke();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const lineWidth = 1.5;
    const spaceWidth = 0.5;
    const totalWidth = lineWidth + spaceWidth;

    for (let i = 0; i < values.length; i++) {
        const color = states[i] === 0 ? 'red' : 'white';
        const position = i % 2 === 0 ? 'top' : 'bottom';
        drawLine(i * totalWidth, values[i], color, position);
    }

    if (!sortingComplete) {
        animationFrameId = requestAnimationFrame(draw);
    }
}

async function mergeSortVisualization(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSortVisualization(start, mid);
    await mergeSortVisualization(mid + 1, end);
    await merge(start, mid, end);

    if (start === 0 && end === values.length - 1) {
        sortingComplete = true;
    }
}

async function merge(start, mid, end) {
    const leftArray = values.slice(start, mid + 1);
    const rightArray = values.slice(mid + 1, end + 1);

    let i = 0, j = 0, k = start;

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            values[k] = leftArray[i];
            i++;
        } else {
            values[k] = rightArray[j];
            j++;
        }
        states[k] = 0;
        await sleep(10);
        states[k] = -1;
        k++;
    }

    while (i < leftArray.length) {
        values[k] = leftArray[i];
        states[k] = 0;
        await sleep(10);
        states[k] = -1;
        i++;
        k++;
    }

    while (j < rightArray.length) {
        values[k] = rightArray[j];
        states[k] = 0;
        await sleep(10);
        states[k] = -1;
        j++;
        k++;
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

setup();
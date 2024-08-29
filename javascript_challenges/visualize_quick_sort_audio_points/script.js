let canvas, context;
let values = [];
let states = [];
let centerY;
let source = null;
let audioDuration = 0;
let startTime = 0;
let animationFrameId;
let sorting = false;
let audioBuffer = null;

// Audio setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function setup() {
    canvas = document.querySelector('canvas') || document.createElement('canvas');
    document.body.appendChild(canvas);
    context = canvas.getContext('2d');

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
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

    // Draw sorting visualization with top and bottom split, and space between lines
    const lineWidth = 1.5;
    const spaceWidth = 0.5;
    const totalWidth = lineWidth + spaceWidth;

    for (let i = 0; i < values.length; i++) {
        const color = states[i] === 0 ? 'red' : 'white';
        const position = i % 2 === 0 ? 'top' : 'bottom';
        drawLine(i * totalWidth, values[i], color, position);
    }

    animationFrameId = requestAnimationFrame(draw);
    console.log("🚀 ~ draw ~ animationFrameId:", animationFrameId)
}

async function quickSort(array, start, end, currentTime) {
    if (start >= end) return;

    let index = await partition(array, start, end, currentTime);
    states[index] = -1;

    await Promise.all([
        quickSort(array, start, index - 1, audioContext.currentTime),
        quickSort(array, index + 1, end, audioContext.currentTime),
    ]);
}

async function partition(array, start, end, currentTime) {
    let pivotIndex = start;
    let pivotValue = array[end];
    states[pivotIndex] = 0;

    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            await swap(array, i, pivotIndex, currentTime);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await swap(array, pivotIndex, end, currentTime);
    states[pivotIndex] = -1;
    return pivotIndex;
}

async function swap(array, a, b, currentTime) {
    const elapsedTime = (currentTime - startTime) % audioDuration;
    const paceFactor = (audioDuration - elapsedTime) / audioDuration;
    const paceAdjustedDelay = paceFactor * 10;
    await sleep(paceAdjustedDelay);
    [array[a], array[b]] = [array[b], array[a]];
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playAudio(file) {
    if (source) {
        source.stop();
    }

    try {
        const arrayBuffer = await file.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        audioDuration = audioBuffer.duration;

        visualizeAudio(audioBuffer);

        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.loop = true;
        source.start(0);
        startTime = audioContext.currentTime;

        source.onended = startSortingVisualization;

        startSortingVisualization();
    } catch (error) {
        console.error('Error processing audio:', error);
    }
}

function visualizeAudio(audioBuffer) {
    const filteredData = filterData(audioBuffer);
    const normalizedData = normalizeData(filteredData);
    renderWaveform(normalizedData);
}

function renderWaveform(normalizedData) {
    const lineWidth = 1.5;
    const spaceWidth = 0.5;
    const totalWidth = lineWidth + spaceWidth;
    const width = canvas.width / normalizedData.length;

    context.lineWidth = lineWidth;
    context.strokeStyle = '#00b4d8';
    context.beginPath();

    for (let i = 0; i < normalizedData.length; i++) {
        const x = i * width * totalWidth;
        const height = normalizedData[i] * centerY;
        const position = i % 2 === 0 ? 'top' : 'bottom';
        drawLine(x, height, '#00b4d8', position);
    }

    context.stroke();
}

function filterData(audioBuffer) {
    const rawData = audioBuffer.getChannelData(0);
    const blockSize = Math.floor(rawData.length / 1000);
    const filteredData = new Float32Array(1000);

    for (let i = 0; i < 1000; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j]);
        }
        filteredData[i] = sum / blockSize;
    }

    return filteredData;
}

function normalizeData(filteredData) {
    const maxVal = Math.max(...filteredData);
    return filteredData.map(n => n / maxVal);
}

function startSortingVisualization() {
    if (sorting) {
        sorting = false;
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    }

    sorting = true;

    const lineWidth = 1.5;
    const spaceWidth = 0.5;
    const totalWidth = lineWidth + spaceWidth;
    const numLines = Math.floor(canvas.width / totalWidth);

    values = Array.from({ length: numLines }, () => Math.random() * centerY);
    states = new Array(values.length).fill(-1);

    animationFrameId = requestAnimationFrame(draw);
    quickSort(values, 0, values.length - 1, audioContext.currentTime);
}

setup();

document.getElementById('audioFileInput').addEventListener('change', function () {
    if (this.files[0]) {
        playAudio(this.files[0]);
    }
});
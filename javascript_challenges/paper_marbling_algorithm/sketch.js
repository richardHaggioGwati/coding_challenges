const canvas = document.getElementById('defaultCanvas0');
const context = canvas.getContext('2d');
const mousePositionMap = new Map();


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();


class Drop {
    constructor(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }

    show() {
        context.beginPath();
        context.arc(this.positionX, this.positionY, 25, 0, Math.PI * 2);
        context.fill();
    }
}


function draw() {
    for (let position of mousePositionMap.values()) {
        const circle = new Drop(position.x, position.y);
        circle.show()
    }
}

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mousePositionMap.set(Date.now(), { x, y })

    draw(); 
});

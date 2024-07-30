const canvas = document.getElementById('defaultCanvas0');
const context = canvas.getContext('2d');
const mousePositionMap = new Map();

class Drop {
    constructor(positionX, positionY, radius) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.radius = radius;
    }

    show() {
        context.beginPath();
        context.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}


function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let position of mousePositionMap.values()) {
        const circle = new Drop(position.x, position.y, 2);
        console.log("Position: ", position)
        circle.show();
    }
}

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mousePositionMap.set(Date.now(), { x, y });

    draw();
});

const circleDetail = 100;

class Drop {
    constructor(x, y, r) {
        this.center = { x, y };
        this.r = r;
        this.vertices = [];
        
        for (let i = 0; i < circleDetail; i++) {
            let angle = (i / circleDetail) * (2 * Math.PI);
            let vx = Math.cos(angle) * this.r + this.center.x;
            let vy = Math.sin(angle) * this.r + this.center.y;
            this.vertices[i] = { x: vx, y: vy };
        }
        this.color = {
            r: Math.floor(Math.random() * 256),
            g: Math.floor(Math.random() * 256),
            b: Math.floor(Math.random() * 256)
        };
    }
    
    marble(otherDrop) {
        for (let v of this.vertices) {
            let c = otherDrop.center;
            let r = otherDrop.r;
            let px = v.x - c.x;
            let py = v.y - c.y;
            let m = Math.sqrt(px * px + py * py);
            let root = Math.sqrt(1 + (r * r) / (m * m));
            v.x = px * root + c.x;
            v.y = py * root + c.y;
        }
    }
    
    show(context) {
        context.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        context.beginPath();
        context.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let v of this.vertices) {
            context.lineTo(v.x, v.y);
        }
        context.closePath();
        context.fill();
    }
}

let drops = [];
let canvas, context;
let isMouseDragging = false;

function setup() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    context = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    canvas.addEventListener('mousedown', () => isMouseDragging = true);
    canvas.addEventListener('mouseup', () => isMouseDragging = false);
    canvas.addEventListener('mouseleave', () => isMouseDragging = false);
    canvas.addEventListener('mousemove', handleMouseMove);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function handleMouseMove(event) {
    if (isMouseDragging) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        let r = Math.random() * 30 + 10;
        addInk(x, y, r);
    }
}

function addInk(x, y, r) {
    let drop = new Drop(x, y, r);
    for (let otherDrop of drops) {
        otherDrop.marble(drop);
    }
    drops.push(drop);
}

function draw() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let drop of drops) {
        drop.show(context);
    }
    
    requestAnimationFrame(draw);
}

setup();
draw();
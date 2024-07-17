let drops = [];

function setup() {
    createCanvas(1000, 800);
}

function mousePressed()  {
    let drop = new Drop(mouseX, mouseY, 50)
    drops.push(drop)
}

function draw() {
    background(255)
    for (let drop of drops) {
        drop.show()
    }

}
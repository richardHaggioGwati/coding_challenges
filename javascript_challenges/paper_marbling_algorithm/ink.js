class Drop {
    constructor(positionX, positionY, radius) {
        this.positionX = positionX
        this.positionY = positionY
        this.radius = radius
    }

    show() {
        fill(0)
        circle(this.positionX, this.positionY, this.radius)
    }
}

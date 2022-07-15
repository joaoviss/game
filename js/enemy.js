class Enemy {
    #figure;

    constructor(img, bottom, width, points, duration) {
        this.#figure = new Image(width);
        this.#figure.src = img;
        this.#figure.right = `-${width}px`;
        this.#figure.style.transform = `translateY(${bottom}px)`;
        this.#figure.style.animationDuration = `${duration}ms`;
        this.#figure.classList.add('enemy');
        this.#figure.points = points;
    }

    get figure() {
        return this.#figure;
    }
}
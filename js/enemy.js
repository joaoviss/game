class Enemy {
    #figure;

    constructor(img, bottom, width, points, duration) {
        this.#figure = new Image(width);
        this.#figure.src = img;
        this.#figure.right = `-${width}px`;
        this.#figure.style.transform = `translateY(${bottom}px)`;
        this.#figure.style.animationDuration = `${duration}ms`;
        this.#figure.classList.add('enemy');
        this.#figure.alt = points;
        this.#figure.canKill = true;
        // this.#figure.id = 'enemy';   
    }

    death() {
        this.#figure.canKill = false;
        let normalSrc = this.#figure.src;
        this.#figure.src = './img/explode.gif';
        // this.#figure.style.animationPlayState = 'paused';
        setTimeout(() => {
            this.#figure.src = normalSrc;
            // this.#figure.style.display = 'none';
        }, 300);
    }

    get figure() {
        return this.#figure;
    }

    get canKill() {
        return this.#figure.canKill;
    }

    set canKill(canKill) {
        this.#figure.canKill = canKill;
    }
}

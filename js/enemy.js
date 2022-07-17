class Enemy {
    #figure;
    #isTangible;
    #img;
    #points;


    constructor(img, bottom, width, points, duration) {
        this.#figure = new Image(width);
        this.#img = img;
        this.#figure.right = `-${width}px`;
        this.#figure.style.transform = `translateY(${bottom}px)`;
        this.#figure.style.animationDuration = `${duration}ms`;
        this.#figure.classList.add('enemy');
        this.#points = points;
    }

    walk() {
        this.isTangible = true;
        this.#figure.src = this.#img; 
    }
    
    death() {
        this.#isTangible = false;
        this.#figure.src = './img/explode.gif';
        this.#figure.addEventListener('animationend', () => {
            setTimeout(() => {
                this.walk();
            }, 700);
        });
    }

    get points() {
        return this.#points;
    }

    get figure() {
        return this.#figure;
    }

    get isTangible() {
        return this.#isTangible;
    }

    set isTangible(value) {
        this.#isTangible = value;
    }
}

class Enemy {
    #figure;
    #img;
    #points;
    #duration;
    #tangible;

    constructor(img, bottom, width, points, duration) {
        this.#figure = new Image(width);
        this.#img = img;
        this.#figure.style.right = `-${width}px`;
        this.#figure.style.transform = `translateY(${bottom}px)`;
        this.#figure.style.position = 'absolute';
        this.#duration = duration;
        this.#points = points;
    }

    walk() {
        this.#tangible = true   ;
        this.#figure.style.animation =`enemy-move ${this.#duration}ms linear both`;
        this.#figure.src = this.#img; 
        stage.appendChild(this.#figure);
        this.#figure.addEventListener('animationend', () => {
            if (stage.contains(this.#figure)) {
                stage.removeChild(this.#figure);
            } 
        });
    }
    
    death() {
        this.#tangible = false;
        this.#figure.src = './img/explode.gif';
        this.#figure.addEventListener('animationend', () => {
            setTimeout(() => {
                this.walk();
            }, 700);
        });
    }

    get tangible() {
        return this.#tangible;
    }

    set tangible(tangible) {
        this.#tangible = tangible;
    }

    get points() {
        return this.#points;
    }

    get figure() {
        return this.#figure;
    }
}

class Sonic {

    #figure;

    constructor() {
        this.#figure = new Image();
        this.#figure.style.position = 'absolute';
    }

    action(e) {
        (e.code == 'Space') ? sonic.jump() : e.code == 'Enter' ? sonic.slide() : false;
    }
    
    controlls(on) {
        if (on == true) {
            document.addEventListener('keypress', this.action);
        } else {
            document.removeEventListener('keypress', this.action);
        }
    }

    intro() {
        this.#figure.src = './img/sonic-walk.gif';
        this.#figure.classList.add('intro1');
        stage.appendChild(this.#figure);
        this.#figure.addEventListener('animationend', () => {
            this.#figure.classList.remove('intro1');
            this.#figure.src = ',/img/sonic-stand.gif';
            setTimeout(() => {
                this.walk();
            }, 400);
        });
    }
    
    walk() {
        this.#figure.removeAttribute('class');        
        this.#figure.src = './img/sonic-walk.gif'
        foreground.style.animationPlayState = 'running';
        this.controlls(true);
    }

    jump() {
        this.controlls(false);
        sfxJump.volume = 0.1;
        sfxJump.play();
        this.#figure.src = './img/sonic-jump.gif'; 
        this.#figure.classList.add('jump');
        this.#figure.addEventListener('animationend', () => {
            this.walk();
        });
    }
    
    slide() {
        this.controlls(false);
        sfxSlide.volume = 0.1;
        sfxSlide.play();
        this.#figure.src = './img/sonic-slide.gif';
        setTimeout(() => {
            this.walk();
        }, 1000);
    }

    death() {
        this.controlls(false);
        sfxDeath.volume = 0.1;
        sfxDeath.play();
        this.#figure.src = './img/sonic-stop.gif'
        this.#figure.classList.add('death');
        this.#figure.addEventListener('animationend', () => {
            stage.removeChild(this.#figure);
            foreground.classList.remove('ground-move')
            foreground.style.animationPlayState = 'paused';
        })
    }
    
    get figure() {
        return this.#figure;
    }
}

class Sonic {
    
    #figure;
    
    constructor() {
        var canKill = false;
        this.#figure = new Image();
        this.#figure.style.position = 'absolute';
        this.#figure.canKill = false;
        this.#figure.lives = 3;
    }

    action(e) {
        (e.code == 'Space') ? sonic.jump() : e.code == 'Enter' ? sonic.slide() : false;
    }
    
    controlls(on) {
        (on) ? document.addEventListener('keypress', this.action)
        : document.removeEventListener('keypress', this.action);
    }

    intro() {
        this.#figure.src = './img/sonic-walk.gif';
        this.#figure.classList.add('intro1');
        stage.appendChild(this.#figure);
        this.#figure.addEventListener('animationend', () => {
            this.#figure.classList.remove('intro1');
            this.#figure.src = './img/sonic-stand.gif';
            setTimeout(() => {
                this.walk();
            }, 400);
        });
    }
    
    walk() {
        this.#figure.canKill = false;
        this.#figure.removeAttribute('class');        
        this.#figure.src = './img/sonic-walk.gif'
        foreground.style.animationPlayState = 'running';
        this.controlls(true);
    }

    jump() {
        this.#figure.canKill = true;
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
        this.#figure.lives--;
        this.controlls(false);
        sfxDeath.volume = 0.1;
        sfxDeath.play();
        this.#figure.src = './img/sonic-stop.gif'
        foreground.style.animationPlayState = 'paused';
        setTimeout(() => {
            this.walk()
        }, 1000);
        // this.#figure.classList.add('death');
        // this.#figure.addEventListener('animationend', () => {
        //     stage.removeChild(this.#figure);
        //     foreground.classList.remove('ground-move')
        //     foreground.style.animationPlayState = 'paused';
        // })
    }
    
    get figure() {
        return this.#figure;
    }

    get canKill() {
        return this.#figure.canKill;
    }

    get lives() {
        return this.#figure.lives;
    }

    set canKill(canKill) {
        this.#figure.canKill = canKill;
    }
}

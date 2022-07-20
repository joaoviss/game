class Sonic {
    
    #figure;
    #invincible;
    #tangible;
    #lives;
    
    constructor(lives) {
        this.#figure = new Image();
        this.#figure.style.left = '100px';
        this.#figure.style.position = 'absolute';
        this.#tangible = true;
        this.#invincible = false;
        this.#lives = lives;
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
        this.#figure.style.animation = 'intro-animation 400ms ease';
        stage.appendChild(this.#figure);
        this.#figure.addEventListener('animationend', () => {
            this.#figure.src = './img/sonic-stand.gif';
            setTimeout(() => {
                this.#figure.style.animation = 'none';
                this.walk();
            }, 300);
        });
    }
    
    walk() {
        this.#invincible = false;  
        this.#figure.removeAttribute('class');        
        this.#figure.src = './img/sonic-walk.gif'
        foreground.style.animationPlayState = 'running';
        this.controlls(true);
    }
    
    jump() {
        this.#invincible = true;
        this.controlls(false);
        this.#figure.src = './img/sonic-jump.gif'; 
        sfxJump.volume = 0.1;
        sfxJump.play();
        this.#figure.style.animation = 'jump-animation 900ms alternate ease';
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
        if (this.lives > 0) {
            this.controlls(false);
            this.setIntangible();
            sfxDeath.volume = 0.1;
            sfxDeath.play();
            this.#figure.src = './img/sonic-stop.gif';
            foreground.style.animationPlayState = 'paused';
            this.lives--;
            setTimeout(() => {
                this.walk()
            }, 300);
        } else {
            gameOver();
            this.controlls(false);
            this.lastDeath();
        }
    }

    lastDeath() {
        this.#figure.src = './img/sonic-stop.gif'
        this.#figure.style.animation = 'death-animation 1s ease-in-out';
        this.#figure.addEventListener('animationend', () => {
            if (stage.contains(this.volume))
                stage.removeChild(this.#figure);
            foreground.style.animationPlayState = 'unset';
        })
    }
    
    setIntangible() {
        this.#tangible = false;
        setTimeout(() => {
            this.#tangible = true;
        }, 1000);
    }
    
    get invincible() {
        return this.#invincible;
    }

    set invincible(value) {
        this.#invincible = value;
    }
 
    get tangible() {
        return this.#tangible;
    }
    
    get figure() {
        return this.#figure;
    }

    get lives() {
        return this.#lives;
    }
    
    set lives(lives) {
        this.#lives = lives;
    }
}
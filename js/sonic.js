class Sonic {
    
    #figure;
    #invincible;
    #totalLives;
    #lives;

    constructor(lives) {
        this.#figure = new Image();
        this.#figure.style.left = '100px';
        this.#figure.style.position = 'absolute';
        this.#invincible = false;
        this.#totalLives = lives;
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
        let stage = document.querySelector('#stage');
        this.#lives = this.#totalLives;
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
        this.#figure.src = './img/sonic-walk.gif'
        grounds.forEach(ground => ground.style.animationPlayState = 'running');	
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
        this.controlls(false);
        if (this.lives > 1) {
            sfxBreak.volume = 0.1;
            sfxBreak.play();
            this.#figure.src = './img/sonic-stop.gif';
            grounds.foreground
            grounds.forEach(ground => ground.style.animationPlayState = 'paused');
            this.lives--;
            setTimeout(() => {
                this.walk()
            }, 300);
        } else {
            this.lastDeath();
        }
    }
    
    lastDeath() {
        this.#figure.src = './img/sonic-stop.gif';
        sfxDeath.volume = 0.1;
        sfxDeath.play();
        this.#figure.style.animation = 'death-animation 1s ease-in-out both';
        this.#figure.addEventListener('animationend', () => {
            main.replaceChild(stage.cloneNode(), stage);
            gameOver();
            grounds.forEach(ground => ground.style.animationPlayState = 'paused');
        });

    }
    
    get invincible() {
        return this.#invincible;
    }

    set invincible(invincible) {
        this.#invincible = invincible;
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
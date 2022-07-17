class Sonic {
    
    #figure;
    #isInvincible;
    #isTangible;
    #lives;
    
    constructor() {
        this.#figure = new Image();
        this.#figure.style.left = '100px';
        this.#figure.style.position = 'absolute';
        this.#lives = 3;
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
            }, 300);
        });
    }
    
    walk() {
        this.#isInvincible = false;  
        this.#isTangible = true;
        this.#figure.removeAttribute('class');        
        this.#figure.src = './img/sonic-walk.gif'
        foreground.style.animationPlayState = 'running';
        this.controlls(true);
    }
    
    jump() {
        this.#isInvincible = true;
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
        // this.#isTangible = false;
        sfxDeath.volume = 0.1;
        sfxDeath.play();
        this.#figure.src = './img/sonic-stop.gif'
        foreground.style.animationPlayState = 'paused';
        setTimeout(() => {
            this.#lives--;
            this.walk()
      
        }, 300);
    }

    lastDeath() {
        this.#figure.src = './img/sonic-stop.gif'
        this.#figure.classList.add('death'); 
        this.#figure.addEventListener('animationend', () => {
            stage.removeChild(this.#figure);
            foreground.classList.remove('ground-move')
            foreground.style.animationPlayState = 'paused';
        })
    }
    
    get isInvincible() {
        return this.#isInvincible;
    }

    set isInvincible(value) {
        this.#isInvincible = value;
    }
 
    set isTangible(value) {
        this.#isTangible = value;
    }
 
    get isTangible() {
        return this.#isTangible;
    }
    
    get figure() {
        return this.#figure;
    }

    get lives() {
        return this.#lives;
    }
}   
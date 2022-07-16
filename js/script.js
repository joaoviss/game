var lives = 3;
var rings = 0;
//* 
const bgmGreenHill = document.querySelector('#bgm-green-hill');
const sfxDeath = document.querySelector('#sfx-death');
const sfxJump = document.querySelector('#sfx-jump');
const sfxKill = document.querySelector('#sfx-kill');
const sfxSlide = document.querySelector('#sfx-slide');
const stage = document.querySelector('#stage');
const foreground = document.querySelector('#foreground');
const hud = document.querySelector('#hud');
const introBox = document.querySelector('#intro-box');
const titleScreen = document.querySelector('#title-screen');
const bgmSwitch = document.querySelector('#bgm-switch');
const buttons = document.querySelector('#buttons');
const jumpBtn = document.querySelector('#jump-btn');
const slideBtn = document.querySelector('#slide-btn');
const lifeCounter = document.querySelector('#life-counter');
const ringCounter = document.querySelector('#ring-counter');
// */
const sonic = new Sonic();
const enemies = [
    new Enemy('./img/sonic-enemy-lobster.gif', -65, 115, 10, 3000),
    new Enemy('./img/sonic-enemy-dino.gif', 0, 78, 5, 3500),
    new Enemy('./img/sonic-enemy-bat.gif', -65, 110, 10, 3500),
    new Enemy('./img/sonic-enemy-crab.gif', 0, 112, 10, 2500),
    new Enemy('./img/sonic-enemy-bee.gif', -65, 104, 10, 2300),
    new Enemy('./img/sonic-enemy-motobug.gif', 0, 115, 10, 2500)
];

const show = (element) => {
    element.classList.toggle('on');
    element.classList.toggle('off');
}

const init = () => {
    bgmControll();
    show(titleScreen);
    introBox.style.animation = 'intro-box 3s ease both';
    lifeCounter.textContent = sonic.lives;
    ringCounter.textContent = rings;
    introBox.addEventListener('animationend', () => {
        sonic.intro();
        [hud, buttons].forEach(element => {
            show(element);
        });
        // round();
        bgmSwitch.click();
        setInterval(() => {
            round();
        }, 2000);
    });
}

const bgmControll = () => {
    let bgm = bgmGreenHill;
    bgm.volume = 0.1;
    bgm.loop = true;
    bgmSwitch.addEventListener('change', () => {
        bgmSwitch.checked ? bgm.play() : bgm.pause();
    });
}

//*
const colision = (enemy) => {
    setInterval(() => {
            let s = sonic.figure.getBoundingClientRect();
            let e = enemy.figure.getBoundingClientRect();
            if ((s.x + s.width > e.x) && (s.x < e.x + e.width)
            && (s.y < e.y + e.height) && (s.y + s.height > e.y)) {
                if (sonic.canKill) {
                    enemy.canKill = false;
                    enemy.death();
                    rings += parseInt(enemy.figure.alt);
                    ringCounter.textContent = rings;
                } else {
                    if (enemy.canKill) {
                        sonic.death();
                        enemy.canKill = false;
                        lifeCounter.textContent = sonic.lives;
                        enemy.figure.src = './img/explode.gif';
                        enemy.figure.style.animationPlayState = 'paused';
                        setTimeout(() => {
                            enemy.figure.style.animationPlayState = 'running';
                            try {
                                // enemy.figure.parentNode.removeChild(enemy.figure);
                            } catch(error) {
                                console.log(error);
                            }
                        }, 300);
                    }
                }
            }
    }, 100);
}
//  */

/*
const round = () => {
    let n = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[n];
    stage.appendChild(enemy.figure);
}

/*/
const round = () => {
    let n = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[n];
    setTimeout(() => {
        stage.appendChild(enemy.figure);
        colision(enemy);
        enemy.figure.addEventListener('animationend', () => {
            // enemy.figure.parentNode.removeChild(enemy.figure);
                stage.removeChild(enemy.figure);
        });
    }, 1000);
}
//  */

document.addEventListener('DOMContentLoaded', () => {
    titleScreen.addEventListener('click', init);
    jumpBtn.addEventListener('click', () => sonic.jump());
    slideBtn.addEventListener('click', () => sonic.slide());
});

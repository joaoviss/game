//* 
const bgmGreenHill = document.querySelector('#bgm-green-hill');
const sfxDeath = document.querySelector('#sfx-death');
const sfxJump = document.querySelector('#sfx-jump');
const sfxKill = document.querySelector('#sfx-kill');
const sfxSlide = document.querySelector('#sfx-slide');
const stage = document.querySelector('#stage');
const foreground = document.querySelector('#foreground');
const hud = document.querySelector('#hud');
const startScreen = document.querySelector('#start-screen');
const bgmSwitch = document.querySelector('#bgm-switch');
const buttons = document.querySelector('#buttons');
const jumpBtn = document.querySelector('#jump-btn');
const slideBtn = document.querySelector('#slide-btn');
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

const init = () => {
    startScreen.addEventListener('click', () => {
        sonic.intro();
        [hud, buttons, startScreen].forEach(el => {
            el.classList.toggle('off');
            el.classList.toggle('on');
        });
        round();
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

const colision = (enemy) => {
    let s = sonic.figure.getBoundingClientRect();
    let e = enemy.getBoundingClientRect();
}

const round = () => {
    setInterval(() => {
        let n = Math.floor(Math.random() * enemies.length);
        let enemy = enemies[n].figure;
        stage.appendChild(enemy);
        colision(enemy);
        enemy.addEventListener('animationend', () => {
            stage.removeChild(enemy)
        });
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    bgmControll();
    init();

    jumpBtn.addEventListener('click', () => sonic.jump());
    slideBtn.addEventListener('click', () => sonic.slide());
});

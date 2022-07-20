var play;
var rings;
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
const toggleCurtain = document.querySelector('#toggle-curtain');
const buttons = document.querySelector('#buttons');
const jumpBtn = document.querySelector('#jump-btn');
const slideBtn = document.querySelector('#slide-btn');
const lifeCounter = document.querySelector('#life-counter');
const ringCounter = document.querySelector('#ring-counter');
const logoImg = document.querySelector('#logo-img');
const textMsg = document.querySelector('#text-msg');
const sonic = new Sonic(3);
const enemies = [
    // new Enemy('./img/sonic-enemy-lobster.gif', -70, 115, 10, 3000),
    new Enemy('./img/sonic-enemy-dino.gif', 0, 78, 5, 3500),
    // new Enemy('./img/sonic-enemy-bat.gif', -70, 110, 10, 3500),
    new Enemy('./img/sonic-enemy-crab.gif', 0, 112, 10, 2500),
    // new Enemy('./img/sonic-enemy-bee.gif', -70, 104, 10, 2300),
    new Enemy('./img/sonic-enemy-motobug.gif', 0, 115, 10, 2500)
];

const bgmControll = () => {
    let bgm = bgmGreenHill;
    bgm.volume = 0.1;
    bgm.loop = true;
    bgmSwitch.addEventListener('change', () => {
        bgmSwitch.checked ? bgm.play() : bgm.pause();
    });
}

const colision = (enemy) => {
    setInterval(() => {
        let s = sonic.figure.getBoundingClientRect();
        let e = enemy.figure.getBoundingClientRect();
        if ((s.x + s.width > e.x) && (s.x < e.x + e.width)
         && (s.y < e.y + e.height) && (s.y + s.height > e.y)) {
             if ((sonic.tangible) && (enemy.tangible)) {
                 if (sonic.invincible) {
                     enemy.death();
                     sonic.setIntangible();
                     ringCounter.textContent = rings += enemy.points;
                 } else {
                     sonic.death();
                     sonic.setIntangible();
                     lifeCounter.textContent = sonic.lives;
                 }
            }
        }
    }, 100);
}

const round = () => {
    let n = Math.floor(Math.random() * enemies.length);
    let enemy = enemies[n];
    enemy.walk();
    colision(enemy);
}
 
const gameStart = () => {
    titleScreen.style.backgroundColor = '#78f9';
    textMsg.innerHTML = '';
    textMsg.innerHTML = 'Clique para começar!';
    logoImg.style.display = 'inline-block';
    logoImg.addEventListener('click', gameplay);
    titleScreen.addEventListener('keydown', gameplay);
}
const gameOver = () => {
    titleScreen.style.backgroundColor = '#f089';
    hud.style.display = 'none';
    buttons.style.display = 'none';
    titleScreen.style.top = '0';
    textMsg.innerHTML = `Você fez ${rings} pontos!`;
    titleScreen.addEventListener('click', gameStart);
}

const gameplay = () => {
    rings = 0;
    sonic.lives = 3;
    lifeCounter.textContent = sonic.lives;
    ringCounter.textContent = rings
    logoImg.style.display = 'none';
    titleScreen.style.top = '-100%';
    hud.style.display = 'flex';
    buttons.style.display = 'flex';
    bgmControll();
    bgmSwitch.click();
    sonic.intro();
    setInterval(() => {
        round();
    }, 3500);
}

document.addEventListener('DOMContentLoaded', () => {
    jumpBtn.addEventListener('click', () => sonic.jump());
    slideBtn.addEventListener('click', () => sonic.slide());
    gameStart();
    // gameplay();
});
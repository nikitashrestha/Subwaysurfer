const WIDTH = 1024;
const HEIGHT = 570;
const ROADW = 2000;
const SEGLEN = 200;
const TOTAL = 3000;
const CAMDEPTH = 0.84;
const CAMX = 0;
const CAMY = 2500;
const CAMZ = 0;
let camYOffset = 0;


var coinsSrc = {
    LEFT : 'images/coinm.png',
    MID : 'images/coinm.png',
    RIGHT: 'images/coinm.png'
}

var magnetSrc = 'images/magnet.png';
var scoreBooster = 'images/scoreBooster.png';

var powerUpType = {
    scoreBooster: 1,
    magnet:2
}

var obstaclesSrc = {
    LEFT: 'images/trainl.png',
    MID: 'images/trainm.png',
    RIGHT: 'images/trainr.png'
}

var scenesSrc = {
    TREE1: 'images/1.png',
    TREE2: 'images/7.png',
    HOUSE1: 'images/2.png',
    HOUSE2: 'images/3.png',
    SIGN: 'images/14.png'
}

//Game States
var state = {
    CURRENT: 0,
    READY: 0,
    GAME: 1,
    OVER: 2
}

var leftKey = {
    CURRENT : 0,
    NOTPRESSED : 0,
    PRESSED: 1,
}

var rightKey = {
    CURRENT : 0,
    NOTPRESSED : 0,
    PRESSED: 1,
}

var upKey = {
    CURRENT : 0,
    NOTPRESSED : 0,
    PRESSED: 1,
}
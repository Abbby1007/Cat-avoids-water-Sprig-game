const player = "p" // player is a Cat
const obstacle = "o" // obstacle is Water (booooooooooooooooo!!!!) [:( ]



setLegend(
  [player, bitmap`
................
................
................
.99......99.....
.99......99.....
.9999999999.....
...909909....999
...909909....99.
...998899.....9.
....9999.....99.
.....99......9..
.....999999999..
......99999999..
......9999999...
....99.......99.
....99.......99.`], // sprite of cat
  [ obstacle, bitmap`
................
................
.......77.......
......7777......
.....777777.....
....77777777....
....77777777....
....77777777....
....77777777....
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
....77777777....
.....777777.....` ], // sprite of water
)

const melody = tune `
500: E4^500 + C5-500 + F5-500,
500: C5/500 + D4^500 + G4-500 + B4-500,
500: C5/500 + F4/500 + F5~500 + A4~500 + B4~500,
500: F4/500 + A4~500 + D5^500 + E4~500,
500: E5-500 + G5^500 + F5^500 + E4~500 + D4-500,
500: G5/500 + A4~500 + F4~500 + E5-500 + E4^500,
500: D5/500 + C5-500 + E4~500 + B5-500 + D4-500,
500: E4-500 + G4^500 + A4~500 + C4-500 + F5-500,
500: E5-500 + D5-500,
500: E4/500 + B4/500 + G5-500 + C5^500 + A5-500,
500: E4/500 + G5/500 + F5/500 + B4-500,
500: A4~500 + D5~500 + D4~500 + G4-500 + G5^500,
500: E5-500 + F4-500 + E4~500,
500: A4~500 + A5-500 + C5^500 + D4~500,
500: F5~500 + A4^500,
500: D5/500 + D4/500 + F5~500 + A5-500 + E4~500,
500: G4/500 + C5~500,
500: A4~500 + F4^500 + C4~500,
500: E5/500 + A4~500 + A5-500 + C5~500,
500: E5/500 + A4~500 + E4^500,
500: F4/500 + B4-500 + E4^500 + E5^500,
500: F5-500 + D4-500 + D5-500 + G5-500,
500: A4/500 + B4/500 + F4-500 + E5^500 + G5-500,
500: C5-500 + D5/500 + D4~500 + E5^500,
500: E5/500 + D4~500 + A4^500 + E4-500,
500: A5~500 + A4-500 + D4^500 + G5^500,
500: G4/500 + E4/500 + E5^500 + D5^500,
500: E4/500 + B4^500 + C4-500 + A5-500,
500: C5/500 + F5/500 + A4-500,
500: C5/500 + F5/500 + D4-500 + B5-500,
500: F4/500 + G4^500 + B5-500 + A5-500,
500: G5-500`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; // Cat moves left
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; //  Cat moves right
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);
// index.js
import runServer from './server.js';
import { checkSelfCollision } from './src/selfCollision.js';
import { checkOtherSnakesCollision } from './src/otherSnakesCollision.js';
import { checkWallCollision } from './src/wallCollision.js';

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "boraa",
    color: "#b48cae",
    head: "smart-caterpillar",
    tail: "do-sammy",
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
function move(gameState) {
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // Prevent moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {        // Neck is left of head, don't move left
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) { // Neck is right of head, don't move right
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) { // Neck is below head, don't move down
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) { // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  // Check all collision types
  isMoveSafe = checkWallCollision(
    myHead,
    gameState.board.width,
    gameState.board.height,
    isMoveSafe
  );

  isMoveSafe = checkSelfCollision(
    myHead,
    gameState.you.body,
    isMoveSafe
  );

  isMoveSafe = checkOtherSnakesCollision(
    myHead,
    gameState.board.snakes,
    gameState.you.id,
    isMoveSafe
  );

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  console.log(`MOVE ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
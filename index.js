// index.js
import runServer from "./server.js";
import { checkSelfCollision } from "./src/self-collision.js";
import { checkOtherSnakesCollision } from "./src/other-snakes-collision.js";
import { checkWallCollision } from "./src/wall-collision.js";
import { findClosestFood, getDirectionToFood } from "./src/food-targeting.js";
import { checkHeadToHeadCollision } from "./src/head-to-head-collision.js";

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
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
function start(_gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(_gameState) {
  console.log("GAME OVER\n");
}

// move is called on every turn and returns your next move
function move(gameState) {
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // Prevent moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];
  const myLength = gameState.you.body.length;

  if (myNeck.x < myHead.x) {
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) {
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) {
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) {
    isMoveSafe.up = false;
  }

  // Check basic collisions
  isMoveSafe = checkWallCollision(
    myHead,
    gameState.board.width,
    gameState.board.height,
    isMoveSafe,
  );

  isMoveSafe = checkSelfCollision(myHead, gameState.you.body, isMoveSafe);

  isMoveSafe = checkOtherSnakesCollision(
    myHead,
    gameState.board.snakes,
    gameState.you.id,
    isMoveSafe,
  );

  // Check head-to-head collisions (added this new check)
  isMoveSafe = checkHeadToHeadCollision(
    myHead,
    gameState.board.snakes,
    myLength,
    isMoveSafe,
  );

  // Find safe moves
  const safeMoves = Object.keys(isMoveSafe).filter((key) => isMoveSafe[key]);
  if (safeMoves.length === 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Food targeting logic
  const closestFood = findClosestFood(myHead, gameState.board.food);
  if (closestFood) {
    const foodDirection = getDirectionToFood(myHead, closestFood);

    // Only move toward food if it's a safe move
    if (foodDirection && safeMoves.includes(foodDirection)) {
      console.log(
        `MOVE ${gameState.turn}: Moving toward food - ${foodDirection}`,
      );
      return { move: foodDirection };
    }
  }

  // If no food-directed moves are safe, choose randomly from remaining safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];
  console.log(`MOVE ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end,
});

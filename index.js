/**
 * Main Battlesnake game logic and server entry point.
 * @module index
 */
import runServer from './server.js';
import { checkSelfCollision } from './src/self-collision.js';
import { checkOtherSnakesCollision } from './src/other-snakes-collision.js';
import { checkWallCollision } from './src/wall-collision.js';
import { findClosestFood, getDirectionToFood } from './src/food-targeting.js';
import { checkHeadToHeadCollision } from './src/head-to-head.js';
import {
  findClosestPrey,
  getDirectionsToPrey,
} from './src/hunt-smaller-snakes.js';
import { aStar, directionFromTo } from './src/a-star.js';

/**
 * Returns metadata about the Battlesnake (name, color, etc.).
 * @returns {Object} Snake configuration.
 */
function info() {
  return {
    apiversion: '1',
    author: 'boraa',
    color: '#325ca8',
    head: 'orca',
    tail: 'queen',
  };
}

/**
 * Called when a game starts.
 * @param {Object} _gameState - Current game state.
 */
function start(_gameState) {
  console.log('GAME START');
}

/**
 * Called when a game ends.
 * @param {Object} _gameState - Final game state.
 */
function end(_gameState) {
  console.log('GAME OVER');
}
/**
 * Determines the next move for the snake.
 * @param {Object} gameState - Current game state.
 * @returns {Object} The chosen move.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function move(gameState) {
  let isMoveSafe = { up: true, down: true, left: true, right: true };

  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];
  const myLength = gameState.you.body.length;
  const opponents = gameState.board.snakes.filter(
    (s) => s.id !== gameState.you.id,
  );

  // Prevent moving backwards
  if (myNeck.x < myHead.x) isMoveSafe.left = false;
  if (myNeck.x > myHead.x) isMoveSafe.right = false;
  if (myNeck.y < myHead.y) isMoveSafe.down = false;
  if (myNeck.y > myHead.y) isMoveSafe.up = false;

  // Collision checks
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
    gameState.board.food,
    isMoveSafe,
  );
  isMoveSafe = checkHeadToHeadCollision(
    myHead,
    opponents,
    myLength,
    isMoveSafe,
  );

  const safeMoves = Object.keys(isMoveSafe).filter(
    (direction) => isMoveSafe[direction],
  );
  if (safeMoves.length === 0) return { move: 'down' };

  // Hunting logic (activated when at least 25% larger)
  let minOpponentLength = myLength;
  for (const snake of opponents) {
    minOpponentLength = Math.min(minOpponentLength, snake.body.length);
  }
  if (myLength >= minOpponentLength * 1.25) {
    const prey = findClosestPrey(myHead, myLength, opponents);
    if (prey) {
      const preyDirections = getDirectionsToPrey(myHead, prey);
      const validHuntMoves = preyDirections.filter((direction) =>
        safeMoves.includes(direction),
      );
      if (validHuntMoves.length > 0) return { move: validHuntMoves[0] };
    }
  }

  // Food finding
  const closestFood = findClosestFood(myHead, gameState.board.food);
  if (closestFood) {
    const path = aStar(
      myHead,
      closestFood,
      gameState.board,
      gameState.board.snakes.map((s) => s.body),
    );
    if (path?.length > 1) {
      const nextMove = directionFromTo(myHead, path[1]);
      if (safeMoves.includes(nextMove)) return { move: nextMove };
    }

    const foodDirection = getDirectionToFood(myHead, closestFood);
    if (foodDirection && safeMoves.includes(foodDirection))
      return { move: foodDirection };
  }

  // Final fallback
  return { move: safeMoves[Math.floor(Math.random() * safeMoves.length)] };
}

runServer({ info, start, move, end });

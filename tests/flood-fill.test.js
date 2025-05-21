// __tests__/flood-fill.test.js
import { floodFill, bestMove } from '../src/flood-fill.js';

describe('floodFill', () => {
  const board = { width: 5, height: 5 };

  test('fills full empty board from center', () => {
    const start = { x: 2, y: 2 };
    const snakes = [];
    const result = floodFill(board, start, snakes);
    expect(result).toBe(25);
  });

  test('avoids snake obstacles', () => {
    const start = { x: 0, y: 0 };
    const snakes = [[{ x: 1, y: 0 }, { x: 1, y: 1 }]];
    const result = floodFill(board, start, snakes);
    expect(result).toBeLessThan(25);
  });

  test('returns 0 if surrounded', () => {
    const start = { x: 2, y: 2 };
    const snakes = [[
      { x: 1, y: 2 }, { x: 3, y: 2 },
      { x: 2, y: 1 }, { x: 2, y: 3 },
    ]];
    const result = floodFill(board, start, snakes);
    expect(result).toBe(1);
  });
});

describe('bestMove', () => {
  const board = { width: 5, height: 5 };
  const myHead = { x: 2, y: 2 };
  const isMoveSafe = { up: true, down: true, left: true, right: true };

  test('picks direction with most space', () => {
    const snakes = [[{ x: 1, y: 2 }, { x: 1, y: 1 }]];
    const move = bestMove(myHead, isMoveSafe, board, snakes);
    expect(["up", "down", "right"]).toContain(move);
  });

  test('respects unsafe moves', () => {
    const snakes = [];
    const unsafe = { ...isMoveSafe, left: false, up: false };
    const move = bestMove(myHead, unsafe, board, snakes);
    expect(["down", "right"]).toContain(move);
  });
});

import { checkWallCollision } from '../src/wall-collision.js';

describe('checkWallCollision', () => {
  const width = 11;
  const height = 11;

  it('disables left move at left wall', () => {
    const myHead = { x: 0, y: 5 };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    const result = checkWallCollision(myHead, width, height, { ...isMoveSafe });
    expect(result.left).toBe(false);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
    expect(result.right).toBe(true);
  });

  it('disables right move at right wall', () => {
    const myHead = { x: width - 1, y: 5 };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    const result = checkWallCollision(myHead, width, height, { ...isMoveSafe });
    expect(result.right).toBe(false);
    expect(result.left).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });

  it('disables up move at top wall', () => {
    const myHead = { x: 5, y: height - 1 };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    const result = checkWallCollision(myHead, width, height, { ...isMoveSafe });
    expect(result.up).toBe(false);
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.down).toBe(true);
  });

  it('disables down move at bottom wall', () => {
    const myHead = { x: 5, y: 0 };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    const result = checkWallCollision(myHead, width, height, { ...isMoveSafe });
    expect(result.down).toBe(false);
    expect(result.left).toBe(true);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
  });

  it('does not modify safe moves if head not at edge', () => {
    const myHead = { x: 5, y: 5 };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    const result = checkWallCollision(myHead, width, height, { ...isMoveSafe });
    expect(result).toEqual(isMoveSafe);
  });

  it('works with non-square boards', () => {
    const w = 15,
      h = 7;
    const myHead = { x: 14, y: 0 };
    const isMoveSafe = { up: true, down: true, left: true, right: true };
    const result = checkWallCollision(myHead, w, h, { ...isMoveSafe });
    expect(result.right).toBe(false);
    expect(result.down).toBe(false);
  });
});

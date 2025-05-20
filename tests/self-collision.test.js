import { checkSelfCollision } from '../src/self-collision.js';

describe('checkSelfCollision', () => {
  const myHead = { x: 5, y: 5 };

  it('does not mark any directions unsafe when there is no body nearby', () => {
    const myBody = [
      { x: 5, y: 5 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 }
    ];

    const isMoveSafe = {
      up: true,
      down: true,
      left: true,
      right: true
    };

    const result = checkSelfCollision(myHead, myBody, { ...isMoveSafe });
    expect(result).toEqual(isMoveSafe);
  });

  it('marks left unsafe when body is to the left of head', () => {
    const myBody = [
      { x: 5, y: 5 },  // head
      { x: 4, y: 5 }   // left
    ];

    const result = checkSelfCollision(myHead, myBody, {
      up: true,
      down: true,
      left: true,
      right: true
    });

    expect(result.left).toBe(false);
    expect(result.right).toBe(true);
    expect(result.up).toBe(true);
    expect(result.down).toBe(true);
  });

  it('marks right unsafe when body is to the right of head', () => {
    const myBody = [
      { x: 5, y: 5 },
      { x: 6, y: 5 }
    ];

    const result = checkSelfCollision(myHead, myBody, {
      up: true,
      down: true,
      left: true,
      right: true
    });

    expect(result.right).toBe(false);
  });

  it('marks down unsafe when body is below head', () => {
    const myBody = [
      { x: 5, y: 5 },
      { x: 5, y: 4 }
    ];

    const result = checkSelfCollision(myHead, myBody, {
      up: true,
      down: true,
      left: true,
      right: true
    });

    expect(result.down).toBe(false);
  });

  it('marks up unsafe when body is above head', () => {
    const myBody = [
      { x: 5, y: 5 },
      { x: 5, y: 6 }
    ];

    const result = checkSelfCollision(myHead, myBody, {
      up: true,
      down: true,
      left: true,
      right: true
    });

    expect(result.up).toBe(false);
  });

  it('ignores head position in body when checking (starts at index 1)', () => {
    const myBody = [
      { x: 5, y: 5 }, // head
      { x: 5, y: 5 }  // duplicate head, should not cause false collision
    ];

    const result = checkSelfCollision(myHead, myBody, {
      up: true,
      down: true,
      left: true,
      right: true
    });

    expect(result).toEqual({
      up: true,
      down: true,
      left: true,
      right: true
    });
  });

  it('marks multiple directions unsafe if multiple collisions are adjacent', () => {
    const myBody = [
      { x: 5, y: 5 },
      { x: 4, y: 5 },
      { x: 6, y: 5 },
      { x: 5, y: 4 },
      { x: 5, y: 6 }
    ];

    const result = checkSelfCollision(myHead, myBody, {
      up: true,
      down: true,
      left: true,
      right: true
    });

    expect(result).toEqual({
      up: false,
      down: false,
      left: false,
      right: false
    });
  });
});



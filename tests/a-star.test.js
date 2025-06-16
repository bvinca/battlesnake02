// src/a-star.test.js

import { aStar, directionFromTo } from "../src/a-star.js";

describe("aStar()", () => {
  const board = { width: 11, height: 11 };

  it("returns direct path when clear", () => {
    const path = aStar(
      { x: 0, y: 0 },
      { x: 3, y: 0 },
      board,
      []
    );
    expect(path).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 }
    ]);
  });

  it("avoids single obstacle", () => {
    const obstacles = [
      [{ x: 1, y: 0 }]
    ];
    const path = aStar(
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      board,
      obstacles
    );
    // Must detour around (1,0)
    expect(path).toContainEqual({ x: 0, y: 0 });
    expect(path).toContainEqual({ x: 2, y: 0 });
    expect(path.some(cell => cell.x === 1 && cell.y === 0)).toBe(false);
  });

  it("returns null if blocked", () => {
    const obstacles = [
      [{ x: 1, y: 0 }],
      [{ x: 0, y: 1 }],
      [{ x: 1, y: 1 }]
    ];
    const path = aStar(
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      board,
      obstacles
    );
    expect(path).toBeNull();
  });
});

describe("directionFromTo()", () => {
  it("calculates direction", () => {
    expect(directionFromTo({ x: 5, y: 5 }, { x: 6, y: 5 })).toBe("right");
    expect(directionFromTo({ x: 5, y: 5 }, { x: 4, y: 5 })).toBe("left");
    expect(directionFromTo({ x: 5, y: 5 }, { x: 5, y: 6 })).toBe("up");
    expect(directionFromTo({ x: 5, y: 5 }, { x: 5, y: 4 })).toBe("down");
  });
});

import { runOnJS } from "react-native-reanimated";
import {
  height,
  MAX_SPEED,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  RADIUS,
  width,
} from "./constants";
import {
  BrickInterface,
  CircleInterface,
  Collision,
  PaddleInterface,
  ShapeInterface,
} from "./type";

export const createBouncingExample = (circleObject: CircleInterface) => {
  "worklet";

  circleObject.x.value = 100;
  circleObject.y.value = 450;
  circleObject.r = RADIUS;
  circleObject.ax = 0.5;
  circleObject.ay = 0.5;
  circleObject.vx = 0;
  circleObject.vy = 0;
};

const move = (object: ShapeInterface, dt: number) => {
  "worklet";

  object.vx += object.ax * dt;
  object.vy += object.ay * dt;

  if (object.vx > MAX_SPEED) {
    object.vx = MAX_SPEED;
  }
  if (object.vx < -MAX_SPEED) {
    object.vx = -MAX_SPEED;
  }
  if (object.vy > MAX_SPEED) {
    object.vy = MAX_SPEED;
  }
  if (object.vy < -MAX_SPEED) {
    object.vy = -MAX_SPEED;
  }

  object.x.value += object.vx * dt;
  object.y.value += object.vy * dt;
};

export const resolveWallCollision = (object: ShapeInterface) => {
  "worklet";

  const circleObject = object as CircleInterface;

  // Right Wall Collision
  if (circleObject.x.value + circleObject.r > width) {
    circleObject.x.value = width - circleObject.r * 2;
    circleObject.vx = -circleObject.vx;
    circleObject.ax = -circleObject.ax;
  }
  // Bottom wall collision
  else if (circleObject.y.value + circleObject.r > height) {
    circleObject.y.value = height - circleObject.r * 2;
    circleObject.vy = -circleObject.vy;
    circleObject.ay = -circleObject.ay;
  }
  // Left Wall Collision
  else if (circleObject.x.value - circleObject.r < 0) {
    circleObject.x.value = circleObject.r * 2;
    circleObject.vx = -circleObject.vx;
    circleObject.ax = -circleObject.ax;
  }
  // Top Wall Collision
  else if (circleObject.y.value - circleObject.r < 0) {
    circleObject.y.value = circleObject.r * 2;
    circleObject.vy = -circleObject.vy;
    circleObject.ay = -circleObject.ay;
  }
};

export const resolveCollisionWithBounce = (info: Collision) => {
  "worklet";

  const circleInfo = info.o1 as CircleInterface;

  circleInfo.y.value = circleInfo.y.value - circleInfo.r;
  circleInfo.vy = -circleInfo.vy;
  circleInfo.ay = -circleInfo.ay;
};

// https://www.jeffreythompson.org/collision-detection/circle-rect.php
function circleRect(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rw: number,
  rh: number
) {
  "worklet";

  //temporary variables to set edges for testing

  let testX = cx;
  let testY = cy;

  //width edge is closest?
  if (cx < rx) testX = rx; //test left edge
  else if (cx > rx + rw) testX = rx + rw; //test right edge
  if (cy < ry) testY = ry; // top edge
  else if (cy > ry + rh) testY = ry + rh; // bottom edge

  //get distance from closest edges
  let distX = cx - testX;
  let distY = cy - testY;
  let distance = Math.sqrt(distX * distX + distY * distY);

  // if the distance is less than the radius, collision!
  if (distance <= RADIUS) {
    return true;
  }
  return false;
}

const log = (...args: any[]) => {
  console.log(...args);
};

export const checkCollision = (o1: ShapeInterface, o2: ShapeInterface) => {
  "worklet";
  if (
    (o1.type === "Circle" && o2.type === "Paddle") ||
    (o1.type === "Circle" && o2.type === "Brick")
  ) {
    if (o2.type === "Brick") {
      const brick = o2 as BrickInterface;
      if (!brick.canCollide.value) {
        return {
          collisionInfo: null,
          collided: false,
        };
      }
    }
    const dx = o2.x.value - o1.x.value;
    const dy = o2.y.value - o1.y.value;
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

    const circleObject = o1 as CircleInterface;
    const rectangleObject = o2 as PaddleInterface;

    const isCollision = circleRect(
      circleObject.x.value,
      circleObject.y.value,
      rectangleObject.x.value,
      rectangleObject.y.value,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );

    if (isCollision) {
      if (o2.type === "Brick") {
        const brick = o2 as BrickInterface;
        brick.canCollide.value = false;
      }
      return {
        collisionInfo: { o1, o2, dx, dy, d },
        collided: true,
      };
    }
  }
  return {
    collisionInfo: null,
    collided: false,
  };
};

export const animate = (
  objects: ShapeInterface[],
  timeSincePreviousFrame: number,
  brickCount: number
) => {
  // called every single frame
  "worklet";

  for (const o of objects) {
    if (o.type === "Circle") {
      move(o, (0.15 / 16) * timeSincePreviousFrame);
    }
  }

  for (const o of objects) {
    if (o.type === "Circle") {
      resolveWallCollision(o);
    }
  }

  const collisions: Collision[] = [];
  for (const [i, o1] of objects.entries()) {
    for (const [j, o2] of objects.entries()) {
      if (i < j) {
        const { collisionInfo, collided } = checkCollision(o1, o2);
        if (collided && collisionInfo) {
          collisions.push(collisionInfo);
        }
      }
    }
  }

  for (const col of collisions) {
    resolveCollisionWithBounce(col);
  }
};

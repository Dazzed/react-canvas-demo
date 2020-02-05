import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import img1 from '../assets/images/image_part_001.jpg';
import img2 from '../assets/images/image_part_002.jpg';
import img3 from '../assets/images/image_part_003.jpg';
import img4 from '../assets/images/image_part_004.jpg';
import img5 from '../assets/images/image_part_005.jpg';
import img6 from '../assets/images/image_part_006.jpg';
import img7 from '../assets/images/image_part_007.jpg';
import img8 from '../assets/images/image_part_008.jpg';
import img9 from '../assets/images/image_part_009.jpg';

let gameComplete = 0;
const IMAGE_SOURCES = [img1, img2, img3, img4, img5, img6, img7, img8, img9];
const lastPositions = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
};

const outlines = [
  { x: 0, y: 0 },
  { x: 250, y: 0 },
  { x: 500, y: 0 },
  { x: 0, y: 170 },
  { x: 250, y: 170 },
  { x: 500, y: 170 },
  { x: 0, y: 340 },
  { x: 250, y: 340 },
  { x: 500, y: 340 },
];

function isNearOutline(ele) {
  let ax = ele.x;
  let ay = ele.y;

  const nearOutLine = outlines.find(e => {
    if (ax > e.x - 20 && ax < e.x + 20 && ay > e.y - 20 && ay < e.y + 20) {
      return true;
    } else {
      return false;
    }
  });

  if (nearOutLine) {
    return nearOutLine;
  }

  return false;
}

function updateGameStatus(e) {
  gameComplete = outlines.every(
    (ele, i) =>
      lastPositions[i] &&
      JSON.stringify(ele) === JSON.stringify(lastPositions[i])
  );
}

const IMAGES = (src, i) => {
  const [image] = useImage(src);
  const x = Math.floor(Math.random() * 500);
  const y = Math.floor(Math.random() * 500);
  return (
    <Image
      x={x}
      y={y}
      image={image}
      key={i}
      draggable
      width={250}
      height={170}
      dragBoundFunc={function(pos) {
        let newY = pos.y;
        let newx = pos.x;

        if (pos.y < 0) {
          newY = 0;
        }
        if (pos.y > 340) {
          newY = 340;
        }

        if (pos.x < 0) {
          newx = 0;
        }
        if (pos.x > 500) {
          newx = 500;
        }

        const nearOutLine = isNearOutline(pos);

        if (nearOutLine) {
          newx = nearOutLine.x;
          newY = nearOutLine.y;
        }

        return {
          x: newx,
          y: newY,
        };
      }}
      onDragEnd={e => {
        const index = e.target.index;
        const lastPos = e.target._lastPos;
        lastPositions[index] = lastPos;
        updateGameStatus();

        console.log({ gameComplete, lastPositions });

        if (gameComplete) {
          alert('Game completed...!');
        }
      }}
    />
  );
};

export default () => {
  return (
    <React.Fragment>
      {IMAGE_SOURCES.map((src, i) => IMAGES(src, i))}
    </React.Fragment>
  );
};

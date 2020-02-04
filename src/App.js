import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

import reactImg from './assets/react.png';
import circle from './assets/circle.jpg';
import triangle from './assets/triangle.jpg';
import square from './assets/square.jpg';

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
      draggable
      width={100}
      height={100}
    />
  );
};

const App = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);
  return (
    <div className="container-fluid">
      <div className="text-center">Try to drag the image into the stage</div>
      <br />
      <div className="row">
        <div className="col-sm">
          <img
            alt="react"
            src={reactImg}
            draggable="true"
            style={{ margin: '10px' }}
            width="100px"
            height="100px"
            onDragStart={e => {
              dragUrl.current = e.target.src;
            }}
          />
        </div>
        <div className="col-sm">
          <img
            alt="circle"
            src={circle}
            draggable="true"
            style={{ margin: '10px' }}
            width="100px"
            height="100px"
            onDragStart={e => {
              dragUrl.current = e.target.src;
            }}
          />
        </div>
        <div className="col-sm">
          <img
            alt="triangle"
            src={triangle}
            draggable="true"
            style={{ margin: '10px' }}
            width="100px"
            height="100px"
            onDragStart={e => {
              dragUrl.current = e.target.src;
            }}
          />
        </div>
        <div className="col-sm">
          <img
            alt="square"
            src={square}
            draggable="true"
            style={{ margin: '10px' }}
            width="100px"
            height="100px"
            onDragStart={e => {
              dragUrl.current = e.target.src;
            }}
          />
        </div>
      </div>
      <div
        onDrop={e => {
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={e => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: '1px solid grey', margin: '10px' }}
          ref={stageRef}
        >
          <Layer>
            {images.map(image => {
              return <URLImage image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default App;

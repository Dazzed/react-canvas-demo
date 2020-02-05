import React from 'react';
import { Stage, Layer } from 'react-konva';

import JigSawImages from './components/jigSawImages';

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h4 className="text-center">Try to solve this Jigsaw puzzle</h4>
        <div>
          <Stage width={750} height={510}>
            <Layer>
              <JigSawImages />
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}

export default App;

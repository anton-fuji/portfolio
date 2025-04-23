import React from "react";
import './App.css';
import ShapeBlur from "./components/ShapeBlur";

function App() {
  return (  
    <div className="relative w-full h-screen overflow-hidden">
      <ShapeBlur
        variation={0}
        pixelRatio={window.devicePixelRatio || 1}
        shapeSize={2.0}
        roundness={1.0}
        borderSize={0.05}
        circleSize={0.3}
        circleEdge={0.3}
      />

      <div className="relative z-10 flex items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">Hello World!</h1>
      </div>
    </div>
  );
}

export default App;

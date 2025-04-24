import React from "react";
import './App.css';
import Header from './layout/Header';
import ShapeBlur from "./components/ShapeBlur";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <ShapeBlur
        variation={0}
        pixelRatio={window.devicePixelRatio || 1}
        shapeSize={2.0}
        roundness={1.0}
        borderSize={0.05}
        circleSize={0.3}
        circleEdge={0.3}
      />

      {/* <Header /> */}

      <main className="relative z-10 flex-col items-center justify-center h-screen pt-16 text-white">
        <h1 className="text-4xl font-bold">Hello World!</h1>
      </main>
    </div>
    </div>
  );
}

export default App;

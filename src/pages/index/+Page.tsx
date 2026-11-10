// import { useState } from 'react'
import "../../styles/App.css";
// import Layout from '../../layouts';
import BackgroundGlobe from "../../components/BackgroundGlobe";
import HomeShowcase from "./HomeShowcase";
export { Page };

function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGlobe />
      <div className="relative">
        <HomeShowcase />
      </div>
    </div>
  );
}

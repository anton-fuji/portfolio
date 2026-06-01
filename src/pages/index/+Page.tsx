// import { useState } from 'react'
import { useEffect } from "react";
import "../../styles/App.css";
import { PERSONAL_INFO } from "../../mydata/data";
// import Layout from '../../layouts';
import BackgroundGlobe from "../../components/BackgroundGlobe";
import HomeShowcase from "./HomeShowcase";
export { Page };

function Page() {
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`;
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGlobe />
      <div className="relative">
        <HomeShowcase />
      </div>
    </div>
  );
}

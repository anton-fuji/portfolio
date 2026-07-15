// import { useState } from 'react'
import { useEffect } from "react";
import "../../styles/App.css";
import { PERSONAL_INFO } from "../../mydata/data";
// import Layout from '../../layouts';
import BackgroundGlobe from "../../components/BackgroundGlobe";
import HomeShowcase from "./HomeShowcase";
import { useTranslation } from "../../i18n";
export { Page };

function Page() {
  const { text } = useTranslation();

  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${text(PERSONAL_INFO.title)}`;
  }, [text]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGlobe />
      <div className="relative">
        <HomeShowcase />
      </div>
    </div>
  );
}

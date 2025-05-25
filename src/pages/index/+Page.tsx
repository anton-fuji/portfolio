// import { useState } from 'react'
import { useEffect } from "react";
import "../../styles/App.css";
import { PERSONAL_INFO } from "../../mydata/data";
// import Layout from '../../layouts';
import Profile from "./Profile";
import Background from "../../components/Background";
import SkillSection from "../../components/SkillSection";
export { Page };

function Page() {
  useEffect(() => {
    document.title = `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}`;
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Background />
      <div className="relative">
        <Profile />

        <SkillSection />
      </div>
    </div>
  );
}

import type { FC } from "react";
import { SKILLS } from "../../src/mydata/data";
import type { SkillCategory } from "../types";
import Card from "./Card";
import SkillBar from "./SkillBar";
import { FaCode } from "react-icons/fa6";

const SkillSection: FC = () => (
  <section className="space-y-12 px-8 py-20">
    <div className="flex animate-pulse items-center justify-center space-x-3">
      <FaCode size={40} />
      <h2 className="text-center font-bold text-4xl text-white">Skills</h2>
    </div>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {SKILLS.map((category: SkillCategory) => (
        <Card
          key={category.id}
          className="space-y-4 border-gray-800 bg-[#0a0a0a]/50 p-6 backdrop-blur-sm"
        >
          <h3 className="text-center font-semibold text-2xl text-white">
            {category.name}
          </h3>
          <div className="space-y-4">
            {category.skills.map((skill, i) => (
              <SkillBar
                key={skill.id}
                name={skill.name}
                level={skill.level}
                color={category.color}
                delay={i * 200}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  </section>
);

export default SkillSection;

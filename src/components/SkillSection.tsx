import type { FC } from "react";
import { SKILLS } from "../../src/mydata/data";
import { SkillCategory } from "../types";
import Card from "./Card";
import SkillBar from "./SkillBar";
import { FaCode } from "react-icons/fa6";

const SkillSection: FC = () => (
  <section className="py-20 px-8 space-y-12">
    <div className="flex items-center justify-center space-x-3 animate-pulse">
      <FaCode size={40} />
      <h2 className="text-4xl font-bold text-center text-white">Skills</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {SKILLS.map((category: SkillCategory) => (
        <Card
          key={category.id}
          className="bg-[#0a0a0a]/50 backdrop-blur-sm p-6 space-y-4 border-gray-800"
        >
          <h3 className="text-2xl font-semibold text-white text-center">
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

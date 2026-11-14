import SkillSection from "../../components/SkillSection";
import Profile from "./Profile";

const HomeShowcase = () => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 pb-12 font-geist lg:gap-24">
      <Profile />
      <SkillSection />
    </div>
  );
};

export default HomeShowcase;

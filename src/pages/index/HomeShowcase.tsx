import SkillSection from "../../components/SkillSection";
import Profile from "./Profile";

const HomeShowcase = () => {
  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-24 py-20">
      <Profile />
      <SkillSection />
      {/* Featured work / Writing / Workbench ... */}
    </main>
  );
};

export default HomeShowcase;

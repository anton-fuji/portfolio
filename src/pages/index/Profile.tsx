import type { FC } from "react";
import ProfileIcon from "../../assets/fuji-icon.jpg";
import gopherGif from "../../assets/gopher.gif";
import DecryptedText from "../../components/DecryptedText";
import PixelTransition from "../../components/PixelTransition";
import { PERSONAL_INFO } from "../../mydata/data";
import Socials from "./Socials";

const profile = {
  name: PERSONAL_INFO.name,
  description: PERSONAL_INFO.description,
};

const Profile: FC = () => {
  return (
    <section className="grid min-h-[560px] items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 lg:mx-0 lg:justify-self-start">
        <div className="absolute inset-0 rounded-full border border-cyan-400/10 bg-white/[0.03] shadow-[0_0_70px_rgba(112,228,166,0.12)]" />
        <div className="absolute inset-5 rounded-full border border-dashed border-cyan-400/16" />
        <PixelTransition
          gridSize={9}
          pixelColor="#07151d"
          animationStepDuration={0.45}
          className="relative h-44 w-44 rounded-full border border-cyan-400/25 shadow-2xl sm:h-52 sm:w-52"
          firstContent={
            <img
              className="h-full w-full object-cover"
              src={ProfileIcon}
              alt=""
            />
          }
          secondContent={
          <div className="flex h-full w-full items-center justify-center bg-[#07151d]">
            <img
              className="h-[58%] w-[58%] object-contain [image-rendering:pixelated]"
              src={gopherGif}
              alt=""
            />
          </div>
          }
        />
      </div>

      <div className="flex flex-col gap-5 text-center text-white lg:text-left">
        <h1 className="whitespace-nowrap text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          <DecryptedText
            text={profile.name}
            speed={50}
            maxIterations={20}
            encryptedClassName="text-cyan-200/70"
          />
        </h1>
        <p className="mx-auto max-w-2xl whitespace-pre-line text-xl leading-relaxed text-white/72 lg:mx-0">
          {profile.description}
        </p>
        <div className="flex justify-center lg:justify-start">
          <Socials />
        </div>
      </div>
    </section>
  );
};

export default Profile;

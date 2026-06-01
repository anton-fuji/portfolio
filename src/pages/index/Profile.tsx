import type { FC } from "react";
import ProfileIcon from "../../assets/fuji-icon.jpg";
import { PERSONAL_INFO } from "../../mydata/data";
import Socials from "./Socials";

const profile = {
  name: PERSONAL_INFO.name,
  description: PERSONAL_INFO.description,
};

const Profile: FC = () => {
  return (
    <section className="grid min-h-[560px] items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div className="relative mx-auto flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 lg:mx-0, lg:justify-self-">
        <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_70px_rgba(112,228,166,0.12)]" />
        <div className="absolute inset-5 rounded-full border border-dashed border-white/16" />
        <div className="relative h-44 w-44 overflow-hidden rounded-full border border-white/25 shadow-2xl sm:h-52 sm:w-52">
          <img
            className="h-full w-full object-cover"
            src={ProfileIcon}
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col gap-5 text-center text-white lg:text-left">
        <h1 className="whitespace-nowrap text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          {profile.name}
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
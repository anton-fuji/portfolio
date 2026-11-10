import type { FC } from "react";

import ProfileVeil from "../../assets/fuji-veil.jpg";
import DecryptedText from "../../components/DecryptedText";
import DitherVeil from "../../components/DitherVeil";
import { useTranslation } from "../../i18n";
import { PERSONAL_INFO } from "../../mydata/data";
import Socials from "./Socials";

const Profile: FC = () => {
  const { text } = useTranslation();

  return (
    <section className="grid min-h-[560px] items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
      <div className="veil-dissolve mx-auto aspect-[4/5] w-full max-w-[18rem] sm:max-w-[22rem] lg:mx-0 lg:justify-self-start">
        <DitherVeil
          src={ProfileVeil}
          fit="cover"
          pattern="noise"
          pixelSize={2}
          inkColor="#000000"
          paperColor="#a5b4fc"
          revealRadius={110}
        />
      </div>

      <div className="flex flex-col gap-5 text-center text-white lg:text-left">
        <h1 className="text-3xl font-bold leading-tight sm:whitespace-nowrap sm:text-5xl lg:text-6xl">
          <DecryptedText
            text={PERSONAL_INFO.name}
            speed={50}
            maxIterations={20}
            encryptedClassName="text-indigo-200/70"
          />
        </h1>
        <p className="mx-auto max-w-2xl whitespace-pre-line text-xl leading-relaxed text-white/72 lg:mx-0">
          {text(PERSONAL_INFO.description)}
        </p>
        <div className="flex justify-center lg:justify-start">
          <Socials />
        </div>
      </div>
    </section>
  );
};

export default Profile;

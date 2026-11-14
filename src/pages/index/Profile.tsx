import type { FC } from "react";

import { useTranslation } from "../../i18n";
import { PERSONAL_INFO } from "../../mydata/data";
import Avatar from "./Avatar";
import Socials from "./Socials";

const Profile: FC = () => {
  const { text } = useTranslation();
  const [firstName, ...lastName] = PERSONAL_INFO.name.split(" ");

  return (
    <section className="grid items-center gap-10 px-4 pt-8 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16 lg:px-10 lg:pt-16 lg:pb-24">
      <Avatar className="w-full max-w-[15rem] rounded-[2.5rem] sm:max-w-[19rem] lg:order-2 lg:max-w-none lg:rounded-[3.5rem]" />

      <div className="flex flex-col items-start gap-8">
        <h1 className="font-extrabold text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.9] tracking-[-0.055em] text-face">
          {firstName}
          <br />
          {lastName.join(" ")}
        </h1>
        <p className="max-w-[34em] whitespace-pre-line text-base leading-[1.95] text-face/72 sm:text-lg">
          {text(PERSONAL_INFO.description)}
        </p>
        <Socials />
      </div>
    </section>
  );
};

export default Profile;

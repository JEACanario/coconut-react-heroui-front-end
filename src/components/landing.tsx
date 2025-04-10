import LandingLoginOptions from "./user_controller";

import { title, subtitle } from "@/components/primitives";

export default function Landing() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="flex max-w-lg text-center justify-center">
          <span className={title({ color: "green" }) + " title"}>Co</span>
          <span className={title()}>ntent&nbsp;</span>
          <span className={title({ color: "green" }) + " title"}>Co</span>
          <span className={title()}>mpanion&nbsp;</span>
          <span className={title({ color: "green" }) + " title"}>N</span>
          <span className={title()}>ote&nbsp;</span>
          <span className={title({ color: "green" }) + " title"}>uT</span>
          <span className={title()}>ility&nbsp;</span>
        </div>
        <div className="flex max-w-lg text-center justify-center">
          <div className={subtitle({ class: "mt-4" })}>
            Your long-form content companion
          </div>
        </div>
        <LandingLoginOptions />
      </section>
    </>
  );
}

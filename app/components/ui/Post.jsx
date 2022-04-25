import Button from "./Button";
import Chip from "./Chip";

import Cash from "../icons/Cash";
import Location from "../icons/Location";
import External from "../icons/External";
import Share from "../icons/Share";
import Sparkles from "../icons/Sparkles";

export default function Post() {
  return (
    <article className="bg-white/5 hover:bg-white/10 transition-colors p-4 flex flex-col items-stretch justify-start gap-4">
      <div className="flex flex-row items-start justify-start gap-4">
        <img
          src="/logo.svg"
          alt="logo company"
          loading="lazy"
          width={32}
          height={32}
          className="border border-dashed border-neutral-800"
        />
        <div className="flex-1 flex flex-col items-stretch justify-start gap-2">
          <div className="flex flex-col items-stretch justify-start">
            <p className="flex flex-row items-baseline justify-start gap-2">
              <span className="font-medium">Stripe</span>
              <span className="text-sm text-neutral-400">is looking for</span>
            </p>
            <p className="font-medium text-lg">Mobile Developer</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <Sparkles className="text-indigo-400" />
            <p className="text-sm font-medium text-indigo-200">Internship</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <Location className="text-yellow-400" />
            <p className="text-sm font-medium text-yellow-200">Remote</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-2">
            <Cash className="text-green-400" />
            <p className="text-sm font-medium text-green-200">
              $50k <span className="font-normal text-neutral-400">to</span> $70k
            </p>
          </div>
          <div className="mt-2 flex flex-row items-baseline justify-start flex-wrap gap-x-2 gap-y-1">
            <Chip>React Native</Chip>
            <Chip>Android Studio</Chip>
            <Chip>Swift</Chip>
            <Chip>Java</Chip>
            <Chip>Kotlin</Chip>
            <Chip>Flutter</Chip>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-stretch justify-end gap-2">
        <Button ghost>
          <Share />
        </Button>
        <Button ghost>Details</Button>
        <Button className="flex flex-row items-center justify-center gap-1">
          <span>Apply</span>
          <External />
        </Button>
      </div>
    </article>
  );
}

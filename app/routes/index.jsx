import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Chip from "../components/ui/Chip";

import Page from "../components/layout/Page";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";

import Location from "../components/icons/Location";
import Cash from "../components/icons/Cash";
import External from "../components/icons/External";
import Share from "../components/icons/Share";
import Sparkles from "../components/icons/Sparkles";

export default function Index() {
  return (
    <Page>
      <Header showPitch />

      <Main className="flex flex-col items-stretch justify-start gap-8">
        <form className="flex flex-col items-stretch justify-start gap-2">
          <label
            htmlFor="search"
            className="font-medium text-xs uppercase text-neutral-400"
          >
            Find your dream job now
          </label>
          <div className="flex flex-row items-stretch justify-start gap-2">
            <Input
              id="search"
              className="flex-1"
              type="text"
              name="search"
              placeholder="Eg. Frontend developer, React.js, Tesla, etc."
              autoComplete="off"
            />
            <Button type="submit" ghost>Search</Button>
          </div>
          {/* filters: [location(office location), type(intern, full time, contract, other), experience(years), culture(remote, office)]; sort: [postedAt] */}
        </form>
        <div className="flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
          <article className="bg-white/5 hover:bg-white/10 transition-colors p-4 flex flex-row items-start justify-start gap-4">
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
                  <span className="text-sm text-neutral-400">
                    is looking for
                  </span>
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
                  $50k <span className="font-normal text-neutral-400">to</span>{" "}
                  $70k
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
              <div className="mt-2 flex flex-row items-stretch justify-end gap-2">
                <Button ghost><Share /></Button>
                <Button ghost>Details</Button>
                <Button className="flex flex-row items-center justify-center gap-1"><span>Apply</span><External /></Button>
              </div>
            </div>
          </article>
          <article className="bg-white/5 hover:bg-white/10 transition-colors p-4 flex flex-row items-start justify-start gap-4">
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
                  <span className="font-medium">Razorpay</span>
                  <span className="text-sm text-neutral-400">
                    is looking for
                  </span>
                </p>
                <p className="font-medium text-lg">Web Developer</p>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <Sparkles className="text-indigo-400" />
                <p className="text-sm font-medium text-indigo-200">Full time</p>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <Location className="text-yellow-400" />
                <p className="text-sm font-medium text-yellow-200">Bangalore</p>
              </div>
              <div className="flex flex-row items-center justify-start gap-2">
                <Cash className="text-green-400" />
                <p className="text-sm font-medium text-green-200">
                  ₹80k <span className="font-normal text-neutral-400">to</span>{" "}
                  ₹100k
                </p>
              </div>
              <div className="mt-2 flex flex-row items-baseline justify-start flex-wrap gap-x-2 gap-y-1">
                <Chip>React.js</Chip>
                <Chip>Node</Chip>
              </div>
              <div className="mt-2 flex flex-row items-stretch justify-end gap-2">
                <Button ghost><Share /></Button>
                <Button ghost>Details</Button>
                <Button className="flex flex-row items-center justify-center gap-1"><span>Apply</span><External /></Button>
              </div>
            </div>
          </article>
        </div>
      </Main>
    </Page>
  );
}

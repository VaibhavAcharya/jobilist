import Anchor from "../components/Anchor";
import Button from "../components/Button";
import Input from "../components/Input";
import Chip from "../components/Chip";

export default function Index() {
  return (
    <div className="min-h-full">
      <nav className="bg-white/5 p-4 pt-8">
        <div className="w-[min(720px,_100%)] mx-auto flex flex-row items-center justify-between gap-4">
          <ul className="flex flex-row items-center justify-between gap-2">
            <li>
              <img
                src="/logo.svg"
                alt="logo Jobilist"
                loading="lazy"
                width={30}
                height={30}
              />
            </li>
            <li>
              <h1 className="font-medium">
                <Anchor href="/" styled={false}>
                  Jobilist
                </Anchor>
              </h1>
            </li>
          </ul>

          <ul className="flex flex-row items-center justify-between gap-2">
            <li>
              <Button>Post a job</Button>
            </li>
            <li>
              <Button ghost>Login</Button>
            </li>
          </ul>
        </div>
      </nav>
      <header className="border-b border-neutral-800/50 bg-neutral-900/50 px-4 py-8 pt-4">
        <div className="w-[min(720px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-2">
          <div className="flex flex-row items-center justify-start gap-2">
            <p className="font-medium text-sm text-yellow-200">Lively</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-sm text-green-200">Affordable</p>
            <p className="text-neutral-400">—</p>
            <p className="font-medium text-sm text-pink-200">Beautiful</p>
          </div>
          <div className="flex flex-row items-stretch justify-start flex-wrap gap-4">
            <div className="w-[48ch] flex flex-col items-stretch justify-start gap-1">
              <h2 className="font-bold text-2xl bg-clip-text bg-gradient-to-br from-pink-400 via-blue-400 to-blue-600 text-transparent">
                The only job board you will ever need.
              </h2>
              <p className="text-neutral-400">
                We studied hundreds of employment websites to create an amazing
                experience for both job seekers & employers.
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col items-stretch justify-start">
                <p className="font-medium text-lg text-neutral-400 uppercase">
                  Today,
                </p>
                <p className="flex flex-row items-baseline justify-start gap-2">
                  <span className="font-medium">15+</span>
                  <span className="text-neutral-400">new jobs added &</span>
                </p>
                <p className="flex flex-row items-baseline justify-start gap-2">
                  <span className="font-medium">10k+</span>
                  <span className="text-neutral-400">visited.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="px-4 py-8">
        <div className="w-[min(720px,_100%)] mx-auto flex flex-col items-stretch justify-start gap-8">
          <div className="flex flex-col items-stretch justify-start gap-2">
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
                autocomplete="off"
              />
              <Button ghost>Search</Button>
            </div>
            {/* filters: [location(office location), type(intern, full time, contract, other), experience(years), culture(remote, office)]; sort: [postedAt] */}
          </div>
          <div className="flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
            <article className="bg-neutral-900/50 hover:bg-neutral-900 p-4 flex flex-row items-start justify-start gap-4">
              <img src="/logo.svg" alt="logo company" loading="lazy" width={32} height={32} className="border border-dashed border-neutral-800" />
              <div className="flex flex-col items-start justify-start gap-2">
                <div className="flex flex-col items-stretch justify-start">
                  <p className="flex flex-row items-baseline justify-start gap-2">
                    <span className="font-medium">Stripe</span>
                    <span className="text-sm text-neutral-400">is looking for</span>
                  </p>
                  <p className="font-medium text-lg">Mobile Developer</p>
                </div>
                <div className="flex flex-row items-baseline justify-start flex-wrap gap-x-3 gap-y-1">
                  <Chip>React Native</Chip>
                  <Chip>Android Studio</Chip>
                  <Chip>Swift</Chip>
                  <Chip>Java</Chip>
                  <Chip>Kotlin</Chip>
                  <Chip>Flutter</Chip>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
    </div>
  );
}

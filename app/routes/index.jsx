import { Form, Link } from "@remix-run/react";

import Button from "../components/ui/Button";
import Field from "../components/ui/Field";

import Page from "../components/layout/Page";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";

import Speakerphone from "../components/icons/Speakerphone";
import Bell from "../components/icons/Bell";
import Dollar from "../components/icons/Dollar";
import Footer from "../components/layout/Footer";

export default function Index() {
  return (
    <Page>
      <Header showPitch />

      <Main className="flex flex-col items-stretch justify-start gap-8">
        {/* <form className="flex flex-col items-stretch justify-start gap-2">
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
            <Button type="submit" ghost>
              Search
            </Button>
          </div>
          filters: [location(office location), type(intern, full time, contract, other), experience(years), culture(remote, office)]; sort: [postedAt]
        </form> */}

        <div className="w-[min(580px,_100%)] mx-auto p-1 rounded-md bg-gradient-to-br from-pink-400 via-blue-400 to-blue-600">
          <div className="bg-black rounded-md">
            <div className="bg-white/5 flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
              <div className="py-2 px-4 flex flex-col items-center justify-start gap-1 bg-yellow-800/5">
                <Speakerphone size={28} />
                <h2 className="text-center font-bold text-lg text-yellow-200">
                  Launching soon!
                </h2>
              </div>
              <Form
                method="post"
                className="py-8 px-4 flex flex-col items-stretch justify-start gap-4 bg-pink-800/5"
              >
                <div className="flex flex-col items-center justify-center gap-0">
                  <Bell size={24} />
                  <p className="font-medium text-lg px-4 py-2 text-center text-pink-200">
                    Be the first to know when we launch
                  </p>
                </div>
                <div className="mx-auto w-[min(420px,_100%)]">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Eg. john@gmail.com"
                  />
                </div>
                <div className="flex flex-row items-stretch justify-center gap-2">
                  <Button type="submit" ghost>
                    Notify me
                  </Button>
                </div>
              </Form>
              <div className="py-8 px-4 flex flex-col items-center justify-start gap-4 bg-green-800/5">
                <div className="flex flex-col items-center justify-center gap-0">
                  <Dollar size={24} />
                  <p className="font-medium text-lg px-4 py-2 text-center text-green-200">
                    Pre-booking will save you up to 50% on promotion
                  </p>
                </div>
                <Button as={Link} to="/post" ghost>
                  Pre book now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Main>

      <Footer />
    </Page>
  );
}

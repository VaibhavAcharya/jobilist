import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import Page from "../components/layout/Page";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";

import Post from "../components/ui/Post";

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
            <Button type="submit" ghost>
              Search
            </Button>
          </div>
          {/* filters: [location(office location), type(intern, full time, contract, other), experience(years), culture(remote, office)]; sort: [postedAt] */}
        </form>
        <div className="flex flex-col items-stretch justify-start divide-y divide-dashed divide-neutral-800">
          <Post />
          <Post />
          <Post />
        </div>
      </Main>
    </Page>
  );
}

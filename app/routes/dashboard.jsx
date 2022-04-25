import { Outlet } from "@remix-run/react";

import Page from "../components/layout/Page";
import Header from "../components/layout/Header";
import Main from "../components/layout/Main";

export default function Dashboard() {
  return (
    <Page>
      <Header />

      <Main>
        <Outlet />
      </Main>
    </Page>
  );
}

import Header from "../../components/layout/Header";
import AuthenticationMain from "../../components/layout/AuthenticationMain";
import Page from "../../components/layout/Page";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";

export default function Login() {
  return (
    <Page>
      <Header onAuthentication="login" />

      <AuthenticationMain className="flex flex-col items-stretch justify-center gap-8">
        <h2 className="font-medium text-2xl">Login</h2>

        <form className="flex flex-col items-stretch justify-start gap-6">
          <div className="flex flex-col items-stretch justify-start gap-3">
            <Field
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Eg. organisation@gmail.com"
            />
            <Field
              id="password"
              name="password"
              type="password"
              label="Password"
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <Button type="submit">Verify & continue</Button>
          </div>
        </form>
      </AuthenticationMain>
    </Page>
  );
}

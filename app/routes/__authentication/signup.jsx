import Header from "../../components/layout/Header";
import AuthenticationMain from "../../components/layout/AuthenticationMain";
import Page from "../../components/layout/Page";
import Button from "../../components/ui/Button";
import Field from "../../components/ui/Field";
import FileInput from "../../components/ui/FileInput";

export default function SignUp() {
  return (
    <Page>
      <Header onAuthentication="signup" />

      <AuthenticationMain className="flex flex-col items-stretch justify-center gap-8">
        <h2 className="font-medium text-2xl">Create your company</h2>

        <form className="flex flex-col items-stretch justify-start gap-6">
          <div className="flex flex-col items-stretch justify-start gap-3">
            <Field
              id="name"
              name="name"
              type="name"
              label="Name"
              placeholder="Eg. GitHub"
            />
            <Field
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="Eg. github@gmail.com"
            />
            <Field
              id="password"
              name="password"
              type="password"
              label="Password"
            />
            <Field
              id="website"
              name="website"
              type="url"
              label="Website"
              placeholder="Eg. https://www.github.com"
            />
            <Field
              component={FileInput}
              id="logo"
              name="logo"
              label="Logo"
              accept="image/*"
              optional
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-2">
            <Button type="submit">Get started</Button>
          </div>
        </form>
      </AuthenticationMain>
    </Page>
  );
}

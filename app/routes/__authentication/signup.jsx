import Header from "../../components/layout/Header";
import AuthenticationMain from "../../components/layout/AuthenticationMain";
import Page from "../../components/layout/Page";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";

export default function SignUp() {
  return (
    <Page>
      <Header onAuthentication="signup" />

      <AuthenticationMain className="flex flex-col items-stretch justify-center gap-8">
        <h2 className="font-medium text-2xl">Create your company</h2>
        
        <form className="flex flex-col items-stretch justify-start gap-6">
          <div className="flex flex-col items-stretch justify-start gap-3">
            <TextField id="name" name="name" type="name" label="Name" placeholder="Eg. GitHub" />
            <TextField id="email" name="email" type="email" label="Email" placeholder="Eg. github@gmail.com" />
            <TextField id="password" name="password" type="password" label="Password" />
            <TextField id="website" name="website" type="url" label="Website" placeholder="Eg. https://www.github.com" />
          </div>
          
          <div className="flex flex-row items-center justify-center gap-2">
            <Button type="submit">Get started</Button>
          </div>
        </form>
      </AuthenticationMain>
    </Page>
  )
}

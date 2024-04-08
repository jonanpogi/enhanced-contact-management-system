import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import AppContainer from "../../components/AppContainer";

const SignIn = () => {
  return (
    <AppContainer>
      <ClerkSignIn signUpUrl="/sign-up" afterSignInUrl={"/"} path="sign-in" />
    </AppContainer>
  );
};

export default SignIn;

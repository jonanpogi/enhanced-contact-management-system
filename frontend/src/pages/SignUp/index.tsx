import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import AppContainer from "../../components/AppContainer";

const SignUp = () => {
  return (
    <AppContainer>
      <ClerkSignUp signInUrl="/sign-in" afterSignUpUrl={"/"} path="sign-up" />
    </AppContainer>
  );
};

export default SignUp;

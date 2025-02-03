import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});
type Props = {
  children: React.ReactNode;
};

const formFields = {
  signUp: {
    username: {
      label: "Username:",
      placeholder: "Enter your Username:",
      isRequired: true,
      order: 1,
    },
    email: {
      order: 2,
      label: "Email:",
      placeholder: "Enter your Email:",
      isRequired: true,
    },
    password: {
      label: "Password:",
      placeholder: "Enter your Password:",
      isRequired: false,
      order: 3,
    },
    confirm_password: {
      label: "Confirm Password:",
      order: 4,
    },
  },
};

const AuthProvider = ({ children }: Props) => {
  return (
    <div>
      <Authenticator formFields={formFields}>
        {({ user }) => {
          return user ? <div>{children}</div> : <div>Please signin below:</div>;
        }}
      </Authenticator>
    </div>
  );
};

export default AuthProvider;

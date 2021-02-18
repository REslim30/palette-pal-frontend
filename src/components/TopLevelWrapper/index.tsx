import React from "react";

import muiTheme from "#src/services/muiTheme";
import { ThemeProvider } from "@material-ui/core/styles";
import { Auth0Provider } from "@auth0/auth0-react";
import secrets from "#src/services/api/secrets";


export default function TopLevelWrapper(props: { children: React.ReactNode }) {
  return <>
    <Auth0Provider
      domain={secrets.AUTH_DOMAIN as string}
      clientId={secrets.AUTH_CLIENT_ID as string}
      redirectUri={`${window.location.origin}/app/palettes`}
      audience="https://palette-pal-api.com"
    >
      <ThemeProvider theme={muiTheme}>
        {props.children}
      </ThemeProvider>
    </Auth0Provider>
  </>
};
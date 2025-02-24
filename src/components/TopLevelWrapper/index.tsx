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
      redirectUri={`${secrets.DOMAIN_NAME}/app/palettes`}
      audience="https://palette-pal-api.com"
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      <ThemeProvider theme={muiTheme}>
        {props.children}
      </ThemeProvider>
    </Auth0Provider>
  </>
};
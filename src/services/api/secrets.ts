
type Secrets = { 
  BACKEND_API_URL: string,
  AUTH_DOMAIN: string,
  AUTH_CLIENT_ID: string,
  DOMAIN_NAME: string,
}

const environmentVars: Secrets = {
  BACKEND_API_URL: checkNotUndefined(process.env.GATSBY_BACKEND_API_URL, "GATSBY_BACKEND_API_URL"),
  AUTH_DOMAIN: checkNotUndefined(process.env.GATSBY_AUTH_DOMAIN, "GATSBY_AUTH_DOMAIN"),
  AUTH_CLIENT_ID: checkNotUndefined(process.env.GATSBY_AUTH_CLIENT_ID, "GATSBY_AUTH_CLIENT_ID"),
  DOMAIN_NAME: checkNotUndefined(process.env.GATSBY_DOMAIN_NAME, "GATSBY_DOMAIN_NAME")
};

function checkNotUndefined(input: string | undefined, inputName: string) {
  if (!input)
    throw new Error(`Please ensure ${inputName} environment variable is set`);
  return input as string;
}

export default environmentVars;
type Secrets = { 
  BACKEND_API_URL: string,
  AUTH_DOMAIN: string,
  AUTH_CLIENT_ID: string,
  DOMAIN_NAME: string,
}

const environmentVars: Secrets = {
  BACKEND_API_URL: checkNotUndefined(process.env.BACKEND_API_URL, "BACKEND_API_URL"),
  AUTH_DOMAIN: checkNotUndefined(process.env.AUTH_DOMAIN, "AUTH_DOMAIN"),
  AUTH_CLIENT_ID: checkNotUndefined(process.env.AUTH_CLIENT_ID, "AUTH_CLIENT_ID"),
  DOMAIN_NAME: checkNotUndefined(process.env.DOMAIN_NAME, "DOMAIN_NAME")
};

function checkNotUndefined(input: string | undefined, inputName: string) {
  if (input === undefined)
    throw new Error(`Please ensure ${inputName} environment variable is set`);
  return input as string;
}

export default environmentVars;
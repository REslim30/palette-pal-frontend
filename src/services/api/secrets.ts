const environmentVars: { [keys:string]: string | undefined } = {
  BACKEND_API_URL: process.env.GATSBY_BACKEND_API_URL,
  AUTH_DOMAIN: process.env.AUTH_DOMAIN,
  AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID
};

['BACKEND_API_URL', 'AUTH_DOMAIN', "AUTH_CLIENT_ID"].forEach((varName: string) => {
  if (environmentVars[varName] === undefined)
    console.error(`Please ensure ${varName} environment variable is set`);
})

export default environmentVars;
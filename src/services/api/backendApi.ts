import secrets from "./secrets";
const BACKEND_API_URL = secrets.BACKEND_API_URL;

// Module to abstract connection logic
let inMemoryToken: { jwt: string } | undefined;
export function deleteRequest(route: string) {
  route = formatRoute(route);

  return fetch(`${BACKEND_API_URL}/${route}`, { 
    method: 'DELETE' 
  });
}

export function getRequest(route: string) {
  route = formatRoute(route);

  return fetch(`${BACKEND_API_URL}/${route}`, {
    headers: {
      "Authorization": `Bearer ${inMemoryToken?.jwt}`
    }
  })
  .then(tryRefreshIf401);
}

export function postRequest(route: string, body: any = {}) {
  route = formatRoute(route);

  return fetch(`${BACKEND_API_URL}/${route}`, {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(body)
  })
}

export function putRequest(route: string, body: any) {
  route = formatRoute(route);

  return fetch(`${BACKEND_API_URL}/${route}`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(body)
  })
}

function formatRoute(route: string) {
  if (route.charAt(0) === '/')
    return route.slice(1);
  return route;
}

// Module handles login behaviour 
export function login(data: { identifier: string, password: string }) {
  return fetch(`${BACKEND_API_URL}/login`, { 
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(data)
  })
  .then(getJWT);
}

export function signup(data: { username: string, password: string, email: string }) {
  return fetch(`${BACKEND_API_URL}/register`, { 
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(data)
  })
  .then(getJWT);
}

export function ensureLoggedIn() {
  if (inMemoryToken)
    return; // Do nothing
  
  getRefreshToken()
  .then(getJWT)
  .then(redirectIf401)
};


// Login middleware
function tryRefreshIf401(res: Response) {
  if (res.status === 401) {
    return getRefreshToken()
      .then(getJWT)
      .then(redirectIf401);
  }
  return res;
}

function redirectIf401(res: Response) {
  if (res.status === 401) {
    // window.location.href = "/login"
    return res
  }
  return res;
}

function getJWT(res: Response) {
  if (res.status === 200)
    return res.json()
      .then((body) => {
        inMemoryToken = { jwt: body.jwt };
        return res;
      })
  return res;
}

// Helpers
function getRefreshToken() {
  return fetch(`${BACKEND_API_URL}/refresh_token`, {
    method: "get",
    credentials: "include",
  })
}
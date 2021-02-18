import secrets from "./secrets";
const BACKEND_API_URL = secrets.BACKEND_API_URL;

// Module for api promise middleware
export function deleteRequest(route: string) {
  route = formatRoute(route);

  return fetch(`${BACKEND_API_URL}/${route}`, { 
    method: 'DELETE' 
  });
}

export function getRequest(route: string) {
  route = formatRoute(route);

  return (token: string) => { 
    return fetch(`${BACKEND_API_URL}/${route}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(getBodyIf200)
    .catch(redirectHomeIfNotLoggedIn);
  }
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

function redirectHomeIfNotLoggedIn(err: any) {
  if (err?.error === "login_required") 
    window.location.href="/"
  throw err;
}

function getBodyIf200(res: Response) {
  if (res.status === 200)
    return res.json();
}
import secrets from "./secrets";
const BACKEND_API_URL = secrets.BACKEND_API_URL;

// Module for api promise middleware
export function deleteRequest(route: string) {
  route = formatRoute(route);

  return (token: string) => {
    return fetch(`${BACKEND_API_URL}/${route}`, { 
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${token}`
      },
    })
    .then(getBodyIf200)
  }
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
  }
}

export function postRequest(route: string, body: any = {}) {
  route = formatRoute(route);

  return (token: string) => {
    return fetch(`${BACKEND_API_URL}/${route}`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    .then(getBodyIf200)
  }
}

export function putRequest(route: string, body: any) {
  route = formatRoute(route);

  return (token: string) => {
    return fetch(`${BACKEND_API_URL}/${route}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    .then(getBodyIf200)
  }
}

function formatRoute(route: string) {
  if (route.charAt(0) === '/')
    return route.slice(1);
  return route;
}

export function redirectHomeIfNotLoggedIn(loginWithRedirect: Function) {
  return function(err: any) {
    if (err?.error === "login_required") 
      // loginWithRedirect();
    throw err;
  }
}

function getBodyIf200(res: Response) {
  if (res.status === 200)
    return res.json();
}
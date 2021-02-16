import BACKEND_API_URL from "./BACKEND_API_URL";

// Module to abstract connection logic
export function deleteRequest(route: string) {
  if (route.charAt(0) === '/')
    route = route.slice(1);

  return fetch(`${BACKEND_API_URL}/${route}`, { method: 'DELETE' })
}

export function getRequest(route: string) {
  if (route.charAt(0) === '/')
    route = route.slice(1);

  return fetch(`${BACKEND_API_URL}/${route}`);
}

export function postRequest(route: string, body: any = {}) {

  if (route.charAt(0) === '/')
    route = route.slice(1);

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
  if (route.charAt(0) === '/')
  route = route.slice(1);

  return fetch(`${BACKEND_API_URL}/${route}`, {
    method: 'PUT',
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(body)
  })
}
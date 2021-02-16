import BACKEND_API_URL from "./BACKEND_API_URL";

// Submits a post request to the backend api
export default function postRequest(route: string, body: any = {}) {

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
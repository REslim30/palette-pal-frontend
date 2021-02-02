import BACKEND_API_URL from "./BACKEND_API_URL";

export default function getRequest(route: string) {
  if (route.charAt(0) === '/')
    route = route.slice(1);

  return fetch(`${BACKEND_API_URL}/${route}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
  })
}
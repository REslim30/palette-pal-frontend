import BACKEND_API_URL from "./BACKEND_API_URL";

// Submits a PUT request to backend api
export default function putRequest(route: string) {
  if (route.charAt(0) === '/')
  route = route.slice(1);

  return fetch(`${BACKEND_API_URL}/${route}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  })
}
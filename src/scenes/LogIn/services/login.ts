import postRequest from "#src/services/api/postRequest";

// returns a fetch promise to login route
export default function login(data: { identifier: string, password: string }) {
  return postRequest('/auth/local', data);
}
import postRequest from "#src/services/api/postRequest";

export default function signup(data: { username: string, password: string, email: string }) {
  return postRequest('/auth/local/register', data);
}
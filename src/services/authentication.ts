import postRequest from "#src/services/api/postRequest";

// Module handles login behaviour 

let inMemoryJWT;
export function login(data: { identifier: string, password: string }) {
  return postRequest('/login', data);
}

export function signup(data: { username: string, password: string, email: string }) {
  return postRequest('/register', data);
}

export function ensureLoggedIn() {
  
}
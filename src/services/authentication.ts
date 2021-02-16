import postRequest from "#src/services/api/postRequest";

// Module handles login behaviour 

let inMemoryToken: { jwt: string };
export function login(data: { identifier: string, password: string }) {
  return postRequest('/login', data)
    .then((res) => {
      if (res.status === 200)
        return getJWT(res);
      else
        return res;
    });
}

export function signup(data: { username: string, password: string, email: string }) {
  return postRequest('/register', data)
    .then((res) => {
      if (res.status === 200)
        return getJWT(res);
      else 
        return res;
    });
}

export function ensureLoggedIn() {
  if (inMemoryToken)
    return; // Do nothing
  
  postRequest('/refresh_token')
    .then((res) => {
      switch (res.status) {
        case 200:
          return getJWT(res);
        case 401:
          window.location.href = "/login"      
          return res;
      }
    })
};

function getJWT(res: Response) {
  return res.json()
    .then((body) => {
      inMemoryToken = { jwt: body.jwt };
      return res;
    })
}
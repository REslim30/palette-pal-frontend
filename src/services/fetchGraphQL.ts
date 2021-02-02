import BACKEND_API_URL from "#src/services/api/BACKEND_API_URL";

// Wrapper around fetch api but tailored to graphQL
export default function fetchGraphQL(query: any, variables?: any) {
  const body: any = {};
  body.query = query;

  if (variables)
    body.variables = variables;
  
  return fetch(`${BACKEND_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify(body)
  });
}
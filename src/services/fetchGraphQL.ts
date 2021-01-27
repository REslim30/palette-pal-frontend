import BACKEND_API_URL from "#src/services/BACKEND_API_URL";

// Wrapper around fetch api but tailored to graphQL
export default function fetchGraphQL(query: any, variables: any) {
  return fetch(`${BACKEND_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({ query, variables })
  });
}
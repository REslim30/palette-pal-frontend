import { postRequest, putRequest } from "#src/services/api/backendApi";

export default async function submitGroup(group: Group, getAccessTokenSilently: Function): Promise<any> {
  if (group.id) {
    return getAccessTokenSilently()
      .then(putRequest(`/groups/${group.id}`, group))
  } else {
    return getAccessTokenSilently()
      .then(postRequest('/groups', group))
  }
};
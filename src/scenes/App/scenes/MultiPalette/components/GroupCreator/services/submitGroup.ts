import { postRequest, putRequest } from "#src/services/api/backendApi";

export default async function submitGroup(group: Group): Promise<any> {
  try {
    let response;
    if (group.id) {
      response = await putRequest(`/groups/${group.id}`, group);
    } else {
      response = await postRequest('/groups', group);
    }
    return await response.json();
  } catch(e) {
    console.error(e);
    return e;
  }
};

import postRequest from "#src/services/postRequest";

export default async function submitGroup(group: Group): Promise<any> {
  try {
    const response = await postRequest('/groups', group);
    return await response.json();
  } catch(e) {
    console.error(e);
    return e;
  }
};
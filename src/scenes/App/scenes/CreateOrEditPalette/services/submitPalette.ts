import { postRequest, putRequest } from "#src/services/api/backendApi";

// TODO: handle errors and bad requests
export default async function submitPalette({id, name, group, colors}: {id?: number, name: string, group: number | null, colors: Color[]}): Promise<Palette> {
  try {
    const variables = {name, group, colors}
    let response = await createOrEditPalette(variables)
    const responseBody = await response.json();
    return responseBody.data.createPalette.palette;
  } catch(e) {
    console.error(e);
    return Promise.reject(new Error(e));
  }
}

function createOrEditPalette(body: {id?: number, name: string, group: number | null, colors: Color[]}) {
  if (body.id)
    return putRequest('/palettes', body);
  else
    return postRequest('/palettes', body);
}
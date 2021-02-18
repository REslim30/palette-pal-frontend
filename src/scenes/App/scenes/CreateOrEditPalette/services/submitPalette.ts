import { postRequest, putRequest } from "#src/services/api/backendApi";

export default async function submitPalette(body: {id?: number, name: string, group: number | null, colors: Color[]}, getAccessTokenSilently: Function): Promise<Palette> {
  return getAccessTokenSilently()
    .then(createOrEditPalette(body))
    .catch((err: any) => {
      console.error(err)
      throw err;
    })
}

function createOrEditPalette(body: {id?: number, name: string, group: number | null, colors: Color[]}) {
  if (body.id)
    return putRequest(`/palettes/${body.id}`, body);
  else
    return postRequest('/palettes', body);
}
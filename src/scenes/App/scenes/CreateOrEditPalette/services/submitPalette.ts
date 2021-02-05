import fetchGraphQL from "#src/services/api/fetchGraphQL";
import putRequest from "#src/services/api/putRequest";

// TODO: handle errors and bad requests
export default async function submitPalette({id, name, group, colors}: {id?: number, name: string, group: number | null, colors: Color[]}): Promise<Palette> {
  const colorCreationPromises = colors.map(color => createColor({ name: color.name, shades: color.shades }));
  try {
    // Must use a regular loop instead of .forEach due to async-await
    const colorIds = []
    for (let i=0; i<colorCreationPromises.length; i++) {
      const colorCreation = await colorCreationPromises[i];
      const colorBody = await colorCreation.json(); 
      colorIds.push(parseInt((colorBody as Record<string, any>).data.createColor.color.id));
    }

    const variables = {name, group, colors: colorIds}
    let response = await createOrEditPalette(variables)

    const responseBody = await response.json();

    return responseBody.data.createPalette.palette;
  } catch(e) {
    console.error(e);
    return Promise.reject(new Error(e));
  }
}

function createOrEditPalette(body: {id?: number, name: string, group: number | null, colors: number[]}) {
  if (body.id)
    return putRequest('/palettes', body);
  else
    return fetchGraphQL(`
      mutation SubmitPalette($name: String!, $group: ID, $colors: [ID]) {
        createPalette(input: {
          data: {
            name: $name,
            group: $group,
            colors: $colors
          }
        }) {
          palette {
            id,
            name
          }
        }
      }
    `, body);
}

async function createColor(variables: {name: string, shades: string[]}) {
  return fetchGraphQL(`
    mutation SubmitColor($name: String!, $shades: JSON) {
      createColor(input: {
        data: {
          name: $name
          shades: $shades
        }
      }) {
        color {
          id
        }
      }
    }
  `, variables);
}
import React from "react";

import { styled } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import useGroups from "#src/services/backendApi/useGroups";

const StyledFormControl = styled(FormControl)({
  formControl: {
    minWidth: '50%'
  }
});

type NameAndGroupInputProps = {
  setName: () => void,
  setGroup: () => void,
  group: number,
  name: string,
}
export default function NameAndGroupInput(props: any) {
  const { loading, error, data } = useGroups();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(event.target.value);
  }

  const handleGroupChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    props.setGroup(event.target.value as string);
  }

  return <section className="grid grid-cols-2 gap-4">
    <TextField variant="outlined" label="Name" value={props.name} onChange={handleNameChange}></TextField>
    <StyledFormControl variant="outlined">
      <InputLabel htmlFor="group-select-label">Group</InputLabel>
      <Select 
        native
        value={props.group}
        onChange={handleGroupChange}
        label="Group"
        inputProps={{
          name: 'group',
          id: 'group-select-label'
        }}
      >
        <option aria-label="none" value=""/>
        {data.groups.map((group: Group) => {
          return <option value={group.id}>{group.name}</option>
        })}
      </Select>
    </StyledFormControl> 
  </section>
}
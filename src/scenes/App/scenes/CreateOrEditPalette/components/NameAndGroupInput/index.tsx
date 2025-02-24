import React, { useEffect } from "react";

import { styled } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { useGroups } from "#src/services/app-state-store";
import { useCreateOrEditPaletteContext } from "../../services/CreateOrEditPaletteContext";
import { useCurrentGroup } from "#src/services/app-state-store";
import LoadingAnimation from "#src/components/LoadingAnimation";

const StyledFormControl = styled(FormControl)({
  formControl: {
    minWidth: '50%'
  }
});

export default function NameAndGroupInput(props: unknown) {
  const currentGroup = useCurrentGroup();

  const groups = useGroups();
  const { name, setName, group, setGroup } = useCreateOrEditPaletteContext();

  useEffect(() => {
    setGroup(currentGroup?.id || null)
  }, [currentGroup]);

  if (!groups) return <LoadingAnimation />;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleGroupChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    setGroup(event.target.value as number);
  }

  return <section className="grid grid-cols-2 gap-4">
    <TextField id="palette-name-input" variant="outlined" label="Name" value={name} onChange={handleNameChange}></TextField>
    <StyledFormControl variant="outlined">
      <InputLabel htmlFor="group-select-label">Group</InputLabel>
      <Select 
        native
        value={group || ''}
        onChange={handleGroupChange}
        label="Group"
        inputProps={{
          name: 'group',
          id: 'group-select-label'
        }}
      >
        <option aria-label="none" value=""/>
        {groups.map((group: Group) => {
          return <option value={group.id} key={group.id}>{group.name}</option>
        })}
      </Select>
    </StyledFormControl> 
  </section>
}
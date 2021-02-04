import React, { useState } from "react";

import AddIcon from "@material-ui/icons/Add";

import ColorSubmitDialog from "./components/ColorSubmitDialog/index";
import ColorContext, { useCreateOrEditPaletteContext } from "../../services/CreateOrEditPaletteContext";
import ConfirmDeleteDialog from "#src/components/ConfirmDeleteDialog/index";
import ColorList from "./components/ColorList/index";
import { deleteArrayItemImmutably } from "#src/services/immutableArrayActions";

type ColorInput = {
  colors: Color[],
  setColors: (colors: Color[]) => void,
}
export default function ColorInput({...props}: any) {
  const {colors, setColors} = useCreateOrEditPaletteContext();
  const [colorToSubmit, setColorToSubmit] = useState<number | 'new' | null>(null);
  const [colorToDelete, setColorToDelete] = useState<number | null>(null);

  const handleDeleteColorDialogClose = () => {
    setColorToDelete(null);
  };

  const handleColorDelete = () => {
    setColors(deleteArrayItemImmutably(colors, colorToDelete as number));
    setColorToDelete(null);
  }

  const handleNewColorCreate = () => {
    setColorToSubmit('new');
  }

  const handleColorDialogClose = () => {
    setColorToSubmit(null);
  }

  return <section className="mt-4">
    <ColorList
      setColorToEdit={setColorToSubmit}
      setColorToDelete={setColorToDelete}/>

    <ConfirmDeleteDialog 
      open={colorToDelete !== null}
      onDelete={handleColorDelete}
      onClose={handleDeleteColorDialogClose}
      objectToDelete="color"/>

    <AddColorButton onClick={handleNewColorCreate}/>
    
    <ColorSubmitDialog 
      colorToSubmit={colorToSubmit}
      onClose={handleColorDialogClose}
      />
  </section>
};


function AddColorButton(props: any) {
  return <button className="flex items-center justify-between w-full px-4 py-2 mt-4 clickable-card" {...props}>
    <span className="text-neutral-500">Add Color</span>
    <AddIcon className="text-primary-500"/>
  </button>
}


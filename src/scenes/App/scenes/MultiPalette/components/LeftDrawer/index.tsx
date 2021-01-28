import React from "react";

import Drawer from "@material-ui/core/Drawer";

import { useGroups, setCurrentGroup } from "#app/services/app-state-store";
import ColorBall from "#src/components/ColorBall/index";
import { useMultiPaletteContext } from "../../services/MultiPaletteContext";

export default function LeftDrawer(props: any) {
  const groups = useGroups();
  const { leftDrawerOpen, setLeftDrawerOpen } = useMultiPaletteContext();
  
  const handleClose = () => {
    setLeftDrawerOpen(false);
  }

  return <Drawer anchor="left" open={leftDrawerOpen} onClose={handleClose}>
    {groups?.map((group) => (
      <button className="w-64">
        <ColorBall color={group.color || 'gray'}/>
      </button>
    ))}
  </Drawer>;
};
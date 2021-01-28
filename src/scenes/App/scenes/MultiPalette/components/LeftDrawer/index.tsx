import React from "react";

import Drawer from "@material-ui/core/Drawer";

import { useGroups, setCurrentGroup } from "#app/services/app-state-store";
import ColorBall from "#src/components/ColorBall/index";

export default function LeftDrawer(props: any) {
  const groups = useGroups();

  

  return <Drawer anchor="left" open={false}>
    {groups?.map((group) => (
      <button className="w-64">
        <ColorBall color={group.color || 'gray'}/>
      </button>
    ))}
  </Drawer>;
};
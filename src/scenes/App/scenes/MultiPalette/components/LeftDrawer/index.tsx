import React from "react";

import Drawer from "@material-ui/core/Drawer";

import { useGroups, setCurrentGroup } from "#app/services/app-state-store";

export default function LeftDrawer(props: any) {
  const groups = useGroups();

  

  return <h1>Hello World</h1>;
};
import React from "react";

import { useGroups, setCurrentGroup } from "#app/services/app-state-store";

export default function LeftDrawer(props: any) {
  const groups = useGroups();

  console.log(groups);
  setCurrentGroup(15);

  return <h1>Hello World</h1>;
};
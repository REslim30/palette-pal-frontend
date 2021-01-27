import React, { useState, useEffect } from 'react';
import PaletteCard from "./components/PaletteCard";
import { RouteComponentProps, useLocation } from '@reach/router';
import { parse } from "query-string";


import CircularProgress from "@material-ui/core/CircularProgress"
import { usePalettes } from "#app/services/app-store";
import LeftDrawer from "./components/LeftDrawer/index";

import MultiPaletteAppBar from "./components/MultiPaletteAppBar/index";

interface MultiPaletteProps extends RouteComponentProps {
  groupId?: number;
}

export default function MultiPalette(props : MultiPaletteProps) {
  const [group, setGroup] = useState<number | null>(null);
  const location = useLocation();
  const palettes = usePalettes();

  useEffect(() => {
    const params = parse(location.search);
    if (params.group)
      setGroup(parseInt(params.group as string));
  }, [props.groupId])

  return <>
    <MultiPaletteAppBar group={group}/>
    <Palettes palettes={palettes}/>
    <LeftDrawer /> 
  </>
}



function Palettes(props: {palettes: Palette[] | null}) {
  if (!props.palettes)
    return <CircularProgress />;

  if (!props.palettes.length)
    return <p>You have no palettes. Click on '+' to create your first palette!</p>
  else 
    return <main className="p-6 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
      { props.palettes.map(palette => <PaletteCard palette={palette}/>) }
    </main>;
}
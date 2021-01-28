import React from "react";

import Drawer from "@material-ui/core/Drawer";

import { useGroups, setCurrentGroup, useCurrentGroup } from "#app/services/app-state-store";
import ColorBall from "#src/components/ColorBall/index";
import { useMultiPaletteContext } from "../../services/MultiPaletteContext";

export default function LeftDrawer(props: any) {
  const groups = useGroups();
  const currentGroup = useCurrentGroup();
  const { leftDrawerOpen, setLeftDrawerOpen } = useMultiPaletteContext();
  
  const handleClose = () => {
    setLeftDrawerOpen(false);
  }

  const selectedGroupStyle = (group: Group) => (
    group.id === currentGroup?.id ? 'bg-neutral-300' : ''
  );

  return <Drawer anchor="left" open={leftDrawerOpen} onClose={handleClose}>
    <div className="bg-primary-500 h-24">
      {/* TODO: Fill out profile section */}
    </div>
    <article>
      <div className="px-6 mt-4 mb-2">
        <h2 className="text-3xl">
          Groups
        </h2>
      </div>

      {groups?.map((group) => (
        <button 
          className={`w-64 grid gap-6 items-center justify-start pl-6 pr-2 py-2 hover:bg-neutral-100 ${selectedGroupStyle(group)}`} 
          style={{ gridTemplateColumns: "min-content 1fr min-content" }} 
          key={group.id}>
          <ColorBall color={group.color || 'gray'}/>
          <span className="text-left mt-0.5 font-sans text-lg">
            {group.name}
          </span>
          <span className="text-neutral-400 self-end">
            {group.palettes?.length ?? 0}
          </span>
        </button>
      ))}
    </article>
  </Drawer>;
};
import React, {useState} from "react";

import Drawer from "@material-ui/core/Drawer";

import { useGroups, setCurrentGroup, useCurrentGroup, usePalettes } from "#app/services/app-state-store";
import ColorBall from "#src/components/ColorBall/index";
import { useMultiPaletteContext } from "../../services/MultiPaletteContext";
import ListIcon from "@material-ui/icons/FormatListBulletedRounded";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import GroupCreator from "./components/GroupCreator/index";

export default function LeftDrawer(props: any) {
  const groups = useGroups();
  const palettes = usePalettes();
  const { leftDrawerOpen, setLeftDrawerOpen } = useMultiPaletteContext();
  const [groupCreatorOpen, setGroupCreatorOpen] = useState(false);
  
  const handleClose = () => {
    setLeftDrawerOpen(false);
  }

  const makeHandleSelect = (group: Group | null) => {
    return () => {
      setCurrentGroup(group?.id || null);
      handleClose();
    }
  }

  const handleGroupCreatorOpen = () => {
    setGroupCreatorOpen(true);
  }

  const handleGroupCreatorClose = () => {
    setGroupCreatorOpen(false);
  }

  return <Drawer anchor="left" open={leftDrawerOpen} onClose={handleClose}>
    <div className="bg-primary-500 h-24">
      {/* TODO: Fill out profile section */}
    </div>
    <article>
      <div className="px-6 mt-4 mb-4 flex justify-between items-end">
        <h2 className="text-3xl">
          Groups
        </h2>
        <IconButton size="small" onClick={handleGroupCreatorOpen}>
          <AddIcon/>
        </IconButton>
      </div>

      <LeftDrawerItem 
        group={{ name: "All", palettes: palettes as any }}
        LeftIcon={<ListIcon className="text-primary-800"/>}
        onClick={makeHandleSelect(null)}
      />
      {groups?.map((group) => (
        <LeftDrawerItem
          group={group}
          onClick={makeHandleSelect(group)}
          LeftIcon={<ColorBall color={ group?.iconColor || 'gray' }/>}
        />
      ))}
    </article>

    <GroupCreator open={groupCreatorOpen} close={handleGroupCreatorClose}/>
  </Drawer>;
};

function LeftDrawerItem(props: {group: Group, LeftIcon: React.ReactNode, onClick: () => void}) {
  const currentGroup = useCurrentGroup();
  
  const selectedGroupStyle = (group: Group) => (
    group.id === currentGroup?.id ? 'bg-neutral-100' : ''
  );

  const { group, LeftIcon, onClick } = props 
  return <button 
    className={`w-64 grid gap-6 items-center justify-items-center pl-6 pr-4 py-2 ${selectedGroupStyle(group)}`} 
    style={{ gridTemplateColumns: "24px 1fr min-content" }} 
    key={ group.id }
    onClick={ onClick }>
    {LeftIcon}
    <span className="text-left mt-0.5 font-sans text-lg justify-self-start">
      {group.name}
    </span>
    <span className="text-neutral-400 self-end justify-self-end">
      {group.palettes?.length ?? 0}
    </span>
  </button>
}
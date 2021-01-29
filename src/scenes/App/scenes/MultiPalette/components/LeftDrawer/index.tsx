import React, {useState} from "react";

import Drawer from "@material-ui/core/Drawer";
import ListIcon from "@material-ui/icons/FormatListBulletedRounded";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";


import { useGroups, setCurrentGroup, useCurrentGroup, usePalettes } from "#app/services/app-state-store";
import ColorBall from "#src/components/ColorBall/index";
import { useMultiPaletteContext } from "../../services/MultiPaletteContext";
import GroupCreator from "../GroupCreator/index";

export default function LeftDrawer(props: any) {
  const groups = useGroups();
  const palettes = usePalettes();
  const { leftDrawerOpen, setLeftDrawerOpen, setGroupCreatorOpen } = useMultiPaletteContext();
  
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
    handleClose();
  }

  return <Drawer anchor="left" open={leftDrawerOpen} onClose={handleClose}>
    <ProfileSection />
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
        key="-1"
      />
      {groups?.map((group) => (
        <LeftDrawerItem
          group={group}
          onClick={makeHandleSelect(group)}
          LeftIcon={<ColorBall color={ group?.iconColor || 'gray' }/>}
          key={group.id}
        />
      ))}
    </article>

  </Drawer>;
};

function ProfileSection(props: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('jwt');
    window.location.href = "/";
  }

  return <>
    <div className="bg-primary-500 h-24 p-4 w-64">
      <div className="grid gap-4 max-w-full overflow-hidden" style={{ gridTemplateColumns: 'min-content 1fr'}}>
        <button aria-label="account menu" 
          className="bg-yellow-500 w-14 rounded-full h-14 text-white text-4xl font-header"
          onClick={ handleOpen }
          aria-controls="profile-menu">gi</button>
        <div className="flex flex-col justify-between">
          <span className="font-header text-white text-2xl">giahuydo99</span>
          <span className="text-white">giahuydo99@gmail.com</span>
        </div>
      </div>
    </div>

    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      id="profile-menu"
      onClose={handleClose}
    >
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  </>
}

function LeftDrawerItem(props: {group: Group, LeftIcon: React.ReactNode, onClick: () => void}) {
  const currentGroup = useCurrentGroup();
  
  const selectedGroupStyle = (group: Group) => (
    group.id === currentGroup?.id ? 'bg-neutral-100' : ''
  );

  const { group, LeftIcon, onClick } = props 
  return <button 
    className={`grid gap-6 items-center justify-items-center pl-6 pr-4 py-2 w-64 ${selectedGroupStyle(group)}`} 
    style={{ gridTemplateColumns: "24px 1fr min-content" }} 
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
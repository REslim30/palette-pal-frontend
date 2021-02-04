import React, { useState } from "react"

import Drawer from "@material-ui/core/Drawer"
import ListIcon from "@material-ui/icons/FormatListBulletedRounded"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/Add"

import {
  useGroups,
  setCurrentGroup,
  usePalettes,
} from "#src/services/app-state-store"
import ColorBall from "#src/components/ColorBall/index"
import { useMultiPaletteContext } from "../../services/MultiPaletteContext"
import LeftDrawerItem from "./components/LeftDrawerItem/index";
import ProfileSection from "./components/ProfileSection/index";

export default function LeftDrawer(props: any) {
  const groups = useGroups()
  const palettes = usePalettes()
  const {
    leftDrawerOpen,
    setLeftDrawerOpen,
    setGroupToEdit,
  } = useMultiPaletteContext()

  const handleClose = () => {
    setLeftDrawerOpen(false)
  }

  const makeHandleSelect = (group: Group | null) => {
    return () => {
      setCurrentGroup(group?.id || null)
      handleClose()
    }
  }

  const handleGroupCreatorOpen = () => {
    setGroupToEdit("new")
    handleClose()
  }

  return (
    <Drawer
      anchor="left"
      open={Boolean(leftDrawerOpen)}
      onClose={handleClose}
      aria-role="dialog"
      aria-modal="true"
      aria-label="Left Drawer"
    >
      <ProfileSection />
      <article>
        <div className="flex items-end justify-between px-6 mt-4 mb-4">
          <h2 className="text-3xl">Groups</h2>
          <IconButton size="small" aria-label="Add group" onClick={handleGroupCreatorOpen}>
            <AddIcon />
          </IconButton>
        </div>

        <LeftDrawerItem
          group={{ name: "All", palettes: palettes as any }}
          LeftIcon={<ListIcon className="text-primary-800" />}
          onClick={makeHandleSelect(null)}
          key="-1"
        />
        {groups?.map(group => (
          <LeftDrawerItem
            group={group}
            onClick={makeHandleSelect(group)}
            LeftIcon={<ColorBall color={group?.iconColor || "gray"} />}
            key={group.id}
          />
        ))}
      </article>
    </Drawer>
  )
}

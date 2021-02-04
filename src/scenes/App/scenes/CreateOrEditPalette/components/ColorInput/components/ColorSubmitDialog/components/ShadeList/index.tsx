import React from "react"

import { useColorSubmitContext } from "../../services/ColorSubmitContext"

import IconButton from "@material-ui/core/IconButton"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import DeleteIcon from "@material-ui/icons/DeleteOutline"
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward"
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import {
  tryToSwapElementsImmutably,
  deleteArrayItemImmutably,
} from "#src/services/immutableArrayActions"
import ColorBall from "#src/components/ColorBall/index"

export default function ShadeList(props: unknown) {
  const {
    shades,
    setShades,
    shadeMenuAnchorEl,
    setShadeMenuAnchorEl,
  } = useColorSubmitContext()

  const handleShadeMenuOpen = (event: React.SyntheticEvent<HTMLElement>) => {
    setShadeMenuAnchorEl(event.currentTarget)
  }

  const handleShadeMenuClose = () => {
    setShadeMenuAnchorEl(null)
  }

  const handleShadeDelete = (event: React.MouseEvent<HTMLElement>) => {
    const shadeIndex = parseInt(shadeMenuAnchorEl?.dataset.index as string)
    setShades(deleteArrayItemImmutably(shades, shadeIndex))
    handleShadeMenuClose()
  }

  const handleShadeMoveUp = (event: React.MouseEvent<HTMLElement>) => {
    const shadeIndex = parseInt(shadeMenuAnchorEl?.dataset.index as string)
    setShades(tryToSwapElementsImmutably(shades, shadeIndex, shadeIndex - 1))
    handleShadeMenuClose()
  }

  const handleShadeMoveDown = (event: React.MouseEvent<HTMLElement>) => {
    const shadeIndex = parseInt(shadeMenuAnchorEl?.dataset.index as string)
    setShades(tryToSwapElementsImmutably(shades, shadeIndex, shadeIndex + 1))
    handleShadeMenuClose()
  }

  return (
    <>
      <div className="pt-6">
        {shades.map((shade: String, index: number) => {
          return (
            // TODO Have color list update screen readers upon update
            <div
              className="grid items-center gap-4 my-3"
              style={{ gridTemplateColumns: "min-content auto min-content" }}
              key={(shade as any).uid}
            >
              <ColorBall color={shade.toString()} />
              <span>{shade}</span>
              <IconButton
                size="small"
                aria-controls="shade-options-menu"
                onClick={handleShadeMenuOpen}
                data-index={index}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          )
        })}
        {/* Menu for shade */}
        <Menu
          id="shade-options-menu"
          anchorEl={shadeMenuAnchorEl}
          open={Boolean(shadeMenuAnchorEl)}
          onClose={handleShadeMenuClose}
        >
          <MenuItem onClick={handleShadeMoveUp}>
            <ListItemIcon>
              <ArrowUpwardIcon />
            </ListItemIcon>
            <ListItemText primary="Move up" />
          </MenuItem>
          <MenuItem onClick={handleShadeMoveDown}>
            <ListItemIcon>
              <ArrowDownwardIcon />
            </ListItemIcon>
            <ListItemText primary="Move down" />
          </MenuItem>
          <MenuItem onClick={handleShadeDelete}>
            <ListItemIcon>
              <DeleteIcon className="text-red-800" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}

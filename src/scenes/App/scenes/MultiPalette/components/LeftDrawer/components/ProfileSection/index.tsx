import React, { useState } from "react"

import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import {
  useUser,
} from "#src/services/app-state-store"

export default function ProfileSection(props: {}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const user = useUser()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("jwt")
    window.location.href = "/"
  }

  return (
    <section aria-label="Left Drawer">
      <div className="w-64 h-24 p-4 bg-primary-500">
        <div
          className="grid max-w-full gap-4 overflow-hidden"
          style={{ gridTemplateColumns: "min-content 1fr" }}
        >
          <button
            aria-label="account menu"
            className="text-4xl text-white bg-yellow-500 rounded-full w-14 h-14 font-header"
            onClick={handleOpen}
            aria-controls="profile-menu"
            aria-haspopup="menu"
            aria-expanded={Boolean(anchorEl)}
          >
            {user?.username.slice(0, 2)}
          </button>
          <div className="flex flex-col justify-between">
            <span className="text-2xl text-white font-header">
              {user?.username}
            </span>
            <span className="text-white">{user?.email}</span>
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
    </section>
  )
}
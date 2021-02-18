import React, { useState } from "react"

import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { useUser } from "#src/services/app-state-store"
import { postRequest } from "#src/services/api/backendApi";
import { useAuth0 } from "@auth0/auth0-react";

export default function ProfileSection(props: {}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const user = useUser()
  const { logout } = useAuth0();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogOut = () => {
    logout({ returnTo: window.location.origin });
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
            className="w-16 h-16 rounded-full"
            onClick={handleOpen}
            aria-controls="profile-menu"
            aria-haspopup="menu"
            aria-expanded={Boolean(anchorEl)}
          >
            <img className="rounded-full" src={user?.picture}/>
          </button>
          <div className="flex flex-col justify-between">
            <span className="text-2xl text-white font-header">
              {user?.nickname}
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

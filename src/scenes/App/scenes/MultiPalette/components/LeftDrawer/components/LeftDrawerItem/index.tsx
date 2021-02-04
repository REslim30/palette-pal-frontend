import React from "react"

import { useCurrentGroup } from "#src/services/app-state-store"

type LeftDrawerItemProps = {
  group: Group
  LeftIcon: React.ReactNode
  onClick: () => void
}

export default function LeftDrawerItem(props: LeftDrawerItemProps) {
  const currentGroup = useCurrentGroup()

  const selectedGroupStyle = (group: Group) =>
    group.id === currentGroup?.id ? "bg-neutral-100" : ""

  const { group, LeftIcon, onClick } = props
  return (
    <button
      className={`grid gap-6 items-center justify-items-center pl-6 pr-4 py-2 w-64 ${selectedGroupStyle(
        group
      )}`}
      style={{ gridTemplateColumns: "24px 1fr min-content" }}
      onClick={onClick}
    >
      {LeftIcon}
      <span className="text-left mt-0.5 font-sans text-lg justify-self-start">
        {group.name}
      </span>
      <span className="self-end text-neutral-400 justify-self-end" aria-hidden="true">
        {group.palettes?.length ?? 0}
      </span>
    </button>
  )
}

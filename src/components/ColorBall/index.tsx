import React from "react";

export default function ColorBall(props: { color: string }) {
  return <span className="h-4 w-4 rounded-full inline-block" style={{ backgroundColor: props.color }}/>
};
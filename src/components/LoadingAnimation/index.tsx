import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingAnimation(props: any) {
  return <div className="flex items-center justify-center w-full h-full">
    <CircularProgress /> 
  </div>
}
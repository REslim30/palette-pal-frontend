import React from "react";
import Gatsby, { Link } from "gatsby";

// A wrapper around gatsby link styled to fit an icon and be accessible
export default function IconLink({children, ...props}: any) {
  return <Link {...props}>
    {children}
  </Link>
};
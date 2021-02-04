import React from "react";
import Gatsby, { Link } from "gatsby";

// A wrapper around gatsby link styled to fit an icon and be accessible
interface IconLinkProps extends Omit<Gatsby.GatsbyLinkProps<Record<string, unknown>>, 'ref'> {
  'aria-label': string,
}

export default function IconLink({children, ...props}: IconLinkProps) {

  return <Link {...props}>
    {children}
  </Link>
};
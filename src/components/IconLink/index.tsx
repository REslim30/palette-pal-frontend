import React from "react";
import Gatsby, { Link } from "gatsby";
import classes from "./styles.module.css";

// A wrapper around gatsby link styled to fit an icon and be accessible
interface IconLinkProps extends Omit<Gatsby.GatsbyLinkProps<Record<string, unknown>>, 'ref'> {
  'aria-label': string,
}

export default function IconLink({children, className, ...props}: IconLinkProps) {

  return <Link {...props} className={`flex items-center justify-center w-12 h-12 focus:outline-none rounded-full relative ${className}`}>
    {children}
    <span className={classes.RippleRoot}>
      <span className={`absolute w-full h-full transition-transform transform scale-0 bg-white bg-opacity-25 rounded-full ${classes.Ripple}`}/>
      <span className={`absolute w-full h-full transition-opacity rounded-full bg-black opacity-0 ${classes.HoverRipple}`}></span>
    </span>
  </Link>
};
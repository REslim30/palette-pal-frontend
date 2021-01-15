import React from "react";

// A Horizonal rule with text in the middle
// Use:
//    <TextHorizontalRule>Example Text</TextHorizontalRule>
export default function TextHorizontalRule(props) {
  return (
    <div className="h-6 flex flex-col justify-center relative">
      <hr/>
      <div className="absolute left-0 top-0 w-full flex justify-center">
        <span className="bg-white px-4 text-neutral-600">{props.children}</span>
      </div>
    </div>
);
}
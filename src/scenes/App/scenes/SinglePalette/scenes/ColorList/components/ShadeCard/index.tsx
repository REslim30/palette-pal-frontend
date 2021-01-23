import React from 'react';

// A clickable card displaying a shade
type ShadeProps = { 
  shade: string,
  onClick(event: React.SyntheticEvent<any>): void 
}

export default function ShadeCard({shade, ...props}: ShadeProps) {
  return <button {...props} 
    className="clickable-card flex flex-col items-center pt-2 pb-1 px-2" 
    aria-label={shade}>
    <span className="inline-block h-12 w-12 rounded-lg mb-1.5" style={{ backgroundColor: shade }}/>
    <p className="text-neutral-600 font-mono">{shade.toUpperCase()}</p>
  </button>
}
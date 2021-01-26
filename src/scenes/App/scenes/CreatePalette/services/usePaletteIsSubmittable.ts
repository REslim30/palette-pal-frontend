import React, {useState, useEffect} from "react";

export default function usePaletteIsSubmittable(name: string, colors: Color[]) {
  const [paletteIsSubmittable, setPaletteIsSubmittable] = useState(false);

  useEffect(() => {
    if (name && colors.length !== 0)
      setPaletteIsSubmittable(true);
  }, [name, colors]);

  return paletteIsSubmittable;
}
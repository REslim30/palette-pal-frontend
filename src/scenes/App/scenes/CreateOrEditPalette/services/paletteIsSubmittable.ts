export default function paletteIsSubmittable(palette: Palette) {
  return Boolean(palette.name) && palette.colors.length !== 0;
}
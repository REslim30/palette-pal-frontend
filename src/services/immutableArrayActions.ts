export function tryToSwapElementsImmutably(array: any[], firstElement: number, secondElement: number) {
  let newArray = [...array];

  if (firstElement < 0 
    || firstElement >= array.length 
    || secondElement < 0 
    || secondElement >= array.length)
    return newArray;

  newArray[firstElement] = array[secondElement];
  newArray[secondElement] = array[firstElement];

  return newArray;
}

export function replaceElementImmutably(array: any[], elementIndex: number, elementToReplace: any) {
  const newArray = [...array];
  newArray[elementIndex] = elementToReplace;
  return newArray;
}

export function deleteArrayItemImmutably(array: any[], indexToDelete: number) {
  return array.filter((item: any, index: number) => indexToDelete !== index);
}
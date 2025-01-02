export function swapSubOrder(array, activeId, newIndex, category) {
  const movedIndex = array.findIndex(
    (item) => item[`${category}_id`] === activeId
  );
  if (movedIndex === -1 || newIndex < 0 || newIndex >= array.length) {
    throw new Error('Invalid move');
  }

  const [movedItem] = array.splice(movedIndex, 1);

  array.splice(newIndex, 0, movedItem);

  array.forEach((item, index) => {
    item[`${category}_sub_order`] = index + 1;
  });

  return array;
}

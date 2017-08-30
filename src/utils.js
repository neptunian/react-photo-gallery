export function ratio({ width, height }) {
  return width / height;
}

export function computeSizes({ photos, columns, width, padding }) {
  if (!width) {
    return [];
  }

  // divide photos over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  const rows = photos.reduce((acc, cell, idx) => {
    const row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  const rowsWithSizes = rows.map(row => {
    const totalRatio = row.reduce((result, photo) => result + ratio(photo), 0);
    const rowWidth = Math.floor(width - row.length * padding);
    const height = rowWidth / totalRatio;

    return row.map(photo => ({
      ...photo,
      height,
      width: height * ratio(photo),
    }));
  });

  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);
}

import { ratio } from '../utils/ratio';
import { round } from '../utils/round';
import { findShortestPath } from '../utils/dijkstra';

// compute sizes by creating a graph with rows as edges and photo to break on as nodes
// to calculate the single best layout using Dijkstra's findShortestPat

// get the height for a set of photos in a potential row
const getCommonHeight = (row, containerWidth, margin) => {
  const rowWidth = containerWidth - row.length * (margin * 2);
  const totalAspectRatio = row.reduce((acc, photo) => acc + ratio(photo), 0);
  return rowWidth / totalAspectRatio;
}

// calculate the cost of breaking at this node (edge weight)
const cost = (photos, i, j, width, targetHeight, margin) => {
  const row = photos.slice(i, j);
  const commonHeight = getCommonHeight(row, width, margin);
  return Math.pow(Math.abs(commonHeight - targetHeight), 2);
}

// return function that gets the neighboring nodes of node and returns costs
const makeGetNeighbors = (targetHeight, containerWidth, photos, maxNodeSearch, margin) =>
  (start) => {
    const results = {};
    start = +start;
    results[+start] = 0;
    for (let i = start + 1; i < photos.length + 1; ++i) {
      if ((i - start) > maxNodeSearch) break;
      results[i.toString()] = cost(photos, start, i, containerWidth, targetHeight, margin);
    }
    return results;
  }

export const computeRowLayout = ({ containerWidth, maxNodeSearch, targetRowHeight, margin, photos }) => {
  // const t = +new Date();
  const getNeighbors = makeGetNeighbors(targetRowHeight, containerWidth, photos, maxNodeSearch, margin);
  let path = findShortestPath(getNeighbors, '0', photos.length);
  path = path.map(node => +node);
  // console.log(`time to find the shortest path: ${(+new Date() - t)} ms`);
  for (let i = 1; i < path.length; ++i) {
    const row = photos.slice(path[i - 1], path[i]);
    const height = getCommonHeight(row, containerWidth, margin);
    for (let j = path[i - 1]; j < path[i]; ++j) {
      photos[j].width = round(height * ratio(photos[j]), 1)
      photos[j].height = height;
    }
  }
  return photos;
}
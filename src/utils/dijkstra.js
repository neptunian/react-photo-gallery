import { BinaryHeap } from './binary-heap';

const buildPrecedentsMap = (graph, startNode, endNode) => {
  // store the previous vertex of the shortest path of arrival
  const precedentsMap = {};

  // store nodes already visited
  const visited = {};

  // store/update only the shortest edge weights measured
  // the purpose of this is object is constant time lookup vs. binary heap lookup O(n)
  const storedShortestPaths = {};
  storedShortestPaths[startNode] = 0;

  // priority queue of ALL nodes and storedShortestPaths
  // don't bother to delete them because it's faster to look at visited?
  const pQueue = new BinaryHeap(function(n) {
    return n.weight;
  });
  pQueue.push({ id: startNode, weight: 0 });

  while (pQueue.size()) {
    // pop node with shortest total weight from start node
    const shortestNode = pQueue.pop();
    const shortestNodeId = shortestNode.id;

    // if already visited, continue
    if (visited[shortestNodeId]) continue;

    // visit neighboring nodes
    const neighboringNodes = graph(shortestNodeId) || {};
    visited[shortestNodeId] = 1;

    // meet the neighbors, looking for shorter paths
    for (let neighbor in neighboringNodes) {
      // weight of path from startNode to this neighbor
      const newTotalWeight = shortestNode.weight + neighboringNodes[neighbor];

      // if this is the first time meeting the neighbor OR if the new total weight from
      // start node to this neighbor node is greater than the old weight path, update it,
      // and update precedent node
      if (typeof storedShortestPaths[neighbor] === 'undefined' || storedShortestPaths[neighbor] > newTotalWeight) {
        storedShortestPaths[neighbor] = newTotalWeight;
        pQueue.push({ id: neighbor, weight: newTotalWeight });
        precedentsMap[neighbor] = shortestNodeId;
      }
    }
  }

  if (typeof storedShortestPaths[endNode] === 'undefined') {
    throw new Error(`There is no path from ${startNode} to ${endNode}`);
  }

  return precedentsMap;
};

// build the route from precedent node vertices
const getPathFromPrecedentsMap = (precedentsMap, endNode) => {
  const nodes = [];
  let n = endNode;
  let precedent;
  while (n) {
    nodes.push(n);
    precedent = precedentsMap[n];
    n = precedentsMap[n];
  }
  return nodes.reverse();
};

// build the precedentsMap and find the shortest path from it
export const findShortestPath = (graph, startNode, endNode) => {
  const precedentsMap = buildPrecedentsMap(graph, startNode, endNode);
  return getPathFromPrecedentsMap(precedentsMap, endNode);
};

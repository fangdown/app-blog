// 子节点到根节点的距离
function getDistanceFromLeafToRoot(node, leaf) {
  if (node === leaf) {
    return 0;
  }
  for (let i = 0; i < node.children.length; i++) {
    let child = node.children[i];
    let distance = getDistanceFromLeafToRoot(child, leaf);
    if (distance >= 0) {
      return distance + 1;
    }
  }
  return -1;
}

let distance = getDistanceFromLeafToRoot(tree.root, leaf);

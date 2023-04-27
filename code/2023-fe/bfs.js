function bfs(tree) {
  const stack = [tree];
  const arr = [];
  while (stack.length) {
    const node = stack.shift();
    arr.push(node);
    if (node.children) {
      stack.push(...node.children);
    }
  }
  return arr;
}

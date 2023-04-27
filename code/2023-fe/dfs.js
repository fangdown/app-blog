function dfs(tree) {
  const stack = [tree];
  const arr = [];
  while (stack.length) {
    const node = stack.shift();
    arr.push(node);
    if (node.children) {
      stack.unshift(...node.children);
    }
  }
  return arr;
}

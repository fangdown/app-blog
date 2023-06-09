// 尾出 头进 队列一样，先进后出
function bfs(tree) {
  const stack = [tree];
  const arr = [];
  while (stack.length) {
    const node = stack.pop();
    arr.push(node);
    if (node.children.length) {
      [...node.children].forEach((child) => {
        stack.unshift(child);
      });
    }
  }
  return arr;
}

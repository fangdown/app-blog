// 利用Map来实现 + 广度遍历
// Map  key 子  值父
const treeToArray = (tree) => {
  const parentNodeMap = new Map();
  const stack = [tree];
  const arr = [];
  while (stack.length) {
    const node = stack.pop();

    const { id, data, children } = node;
    let parentNode = parentNodeMap.get(node);
    let parentId = parentNode?.id || 0;
    const item = { id, data, parentId };
    arr.push(item);
    children?.forEach((child) => {
      stack.unshift(child);
      parentNodeMap.set(child, node);
    });
  }
  console.log("arr", arr);
};

const tree = {
  id: 1,
  data: "1",
  children: [
    {
      id: 2,
      data: "2-1",
      children: [{ id: 4, data: "3-1", children: [{ id: 6, data: "4-1" }] }],
    },
    { id: 3, data: "2-2", children: [{ id: 5, data: "3-2" }] },
  ],
};
treeToArray(tree);

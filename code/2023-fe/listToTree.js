// 充分利用map的特性
// Map  key 存当前  ,取parentId 得到父，然后存入当前
const listToTree = (list) => {
  let root = null;
  const treeMap = new Map();
  list.forEach((item) => {
    const { id, data, parentId } = item;
    const treeNode = { id, data };
    treeMap.set(id, treeNode);
    // 找到parentId 并加入children
    const parentNode = treeMap.get(parentId);
    console.log("parentNode", parentId, parentNode);
    if (parentNode) {
      if (!parentNode.children) {
        parentNode.children = [];
      }
      parentNode.children.push(treeNode);
    }
    if (parentId === 0) root = treeNode;
  });
  // console.log("treeMap", treeMap);
  return root;
};
const list = [
  { parentId: 0, id: 1, data: "1" },
  { parentId: 1, id: 2, data: "2-1" },
  { parentId: 1, id: 3, data: "2-2" },
  { parentId: 2, id: 4, data: "3-1" },
  { parentId: 3, id: 5, data: "3-2" },
  { parentId: 4, id: 6, data: "4-1" },
];

console.log(JSON.stringify(listToTree(list)));

function listToTree(list) {
  const roots = [];
  const map = {};
  for (let i = 0; i < list.length; i++) {
    const node = list[i];
    const id = node.id;
    const parentId = node.parentId;
    node.children = [];
    map[id] = node;
    if (!parentId) {
      roots.push(node);
    }
  }
  for (let i = 0; i < list.length; i++) {
    const node = list[i];
    const parentId = node.parentId;
    if (parentId) {
      map[parentId].children.push(node);
    }
  }
  return roots;
}
const list = [
  { parentId: null, id: 1, data: "1" },
  { parentId: 1, id: 2, data: "2-1" },
  { parentId: 1, id: 3, data: "2-2" },
  { parentId: 2, id: 4, data: "3-1" },
  { parentId: 3, id: 5, data: "3-2" },
  { parentId: 4, id: 6, data: "4-1" },
];
console.log(JSON.stringify(listToTree(list)));

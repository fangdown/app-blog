// 头出 头进
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

function dfs(node, arr = []) {
  for (let i = 0; i < node.length; i++) {
    arr.push(node[i].name);
    if (node[i].children?.length) {
      dfs(node[i].children, arr);
    }
  }
  return arr;
}
const treeData = [
  {
    name: "节点1",
    children: [
      {
        name: "节点1-1",
        children: [],
      },
      {
        name: "节点1-2",
        children: [
          {
            name: "节点1-2-1", // 目标节点
            children: [
              {
                name: "节点1-2-1-1",
                children: [],
              },
              {
                name: "节点1-2-1-2",
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "节点2",
    children: [
      {
        name: "节点2-1",
        children: [],
      },
    ],
  },
];

console.log(dfs(treeData));

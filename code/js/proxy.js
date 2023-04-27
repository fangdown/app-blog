const fans = {
  name: "粉丝",
  sendCard: function (target) {
    console.log(this.name + ": 帮我签个名");
    target.sendCard();
  },
};
const star = {
  name: "明星",
  doneCard: () => {
    console.log(this.name + "完成签名");
  },
};
const proxy = {
  name: "代理者",
  sendCard: function () {
    if (window.confirm("是否有空签字")) {
      console.log(this.name + "：递给" + star.name);
      star.doneCard();
    } else {
      console.log(this.name + "：抱歉，" + star.name + "没有空");
    }
  },
};
fans.sendCard(proxy);

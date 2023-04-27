const lib = {
  uniqueArr: (arr) => [...new Set(arr)],
  getParameters: (URL) =>
    JSON.parse(
      `{"${decodeURI(URL.split("?")[1])
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')}"}`
    ),
  isEmpty: (obj) =>
    Reflect.ownKeys(obj).length === 0 && obj.constructor === Object,
  reverse: (str) => str.split("").reverse().join(""),
  // 生成随机十六进制
  randomHexColor: () =>
    `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`,
  // 当前页面是否在前台
  isTabActive: () => !document.hidden,
  // 元素是否焦点
  elementIsInFocus: (el) => el === document.activeElement,
  // 设备类型
  judgeDeviceType: () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(
      navigator.userAgent
    )
      ? "Mobile"
      : "PC",
  // 文字复制到剪贴板
  copyText: async (text) => await navigator.clipboard.writeText(text),
  // 获取选定的文本
  getSelectedText: () => window.getSelection().toString(),
  // 是否工作日
  isWeekday: (date) => date.getDay() % 6 !== 0,
  // 将华氏温度转换为摄氏温度
  fahrenheitToCelsius: (fahrenheit) => ((fahrenheit - 32) * 5) / 9,
  // 将摄氏温度转华氏温度
  celsiusToFahrenheit: (celsius) => (celsius * 9) / 5 + 32,
  //   日期之差天数
  dayDiff: (date1, date2) =>
    Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000),
  // RGB转16进制
  rgbToHex: (r, g, b) =>
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1),
  // 平均值
  average: (arr) => arr.reduce((a, b) => a + b) / arr.length,
};

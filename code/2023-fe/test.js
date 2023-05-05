function qfw(num) {
  const reg = /(\d)(?=(?:\d{3})+$)/g;
  const res = num.toString().replace(reg, "$1,");
  return res;
}
console.log(qfw(123333));
reg1 = /(\d)(?=(?:\d{3})+$)/;

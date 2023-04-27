document.querySelector("#iptFile").onchange = function () {
  let file = this.files[0];
  if (file === undefined) return alert("请选择文件");
  let fd = new FormData();
  fd.append("name", file);
  axios({
    method: "POST",
    url: "http://localhost:3000/upload",
    data: fd,
  }).then((res) => {
    console.log(res);
    if (res.code !== 0) return res.message;
    document.querySelector("#img").src = res.data;
    return alert("上传成功");
  });
};

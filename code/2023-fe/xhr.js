let xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.baidu.com", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send("username=admin&password=123456");
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    console.log(xhr.responseText);
  }
};

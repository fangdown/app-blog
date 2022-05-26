const OSS = require("ali-oss");
const fs = require("fs");
const { resolve } = require("path");
const ACCESS_KEY_ID = "LTAI5tPmxiqymHt2tDQ1Gom6";
const ACCESS_KEY_SECRET = "kNLt0emP66opzFTzfvtCfijZKQlFAY";
const client = new OSS({
  region: "oss-cn-shenzhen",
  // accessKeyId: process.env.ACCESS_KEY_ID,
  // accessKeySecret: process.env.ACCESS_KEY_SECRET,
  accessKeyId: ACCESS_KEY_ID,
  accessKeySecret: ACCESS_KEY_SECRET,
  bucket: "app-blog",
});
const filepath = resolve("./html", "1.txt");
console.log("filepath", filepath);
// client.putStream("1.txt", fs.createReadStream(filepath)).then((result) => {
// //   console.log('result', result);
// });


async function putStream () {
    try {
      // 使用'chunked encoding'。使用putStream接口时，SDK默认会发起一个'chunked encoding'的HTTP PUT请求。
      // 填写本地文件的完整路径，从本地文件中读取数据流。
      // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
      let stream = fs.createReadStream('/Users/fangzhiqing/Desktop/fangdown/github/app-blog/html/1.txt');
      // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中不能包含Bucket名称。
      let result = await client.putStream('exampledir/exampleobject.txt', stream);
      console.log(result);
    } catch (e) {
      console.log(e)
    }
  }
  
putStream();        
// console.log(fs.createReadStream(filepath));
## 海报模糊html2canvas

1. 背景
来到公司，接受一个任务，在renderer项目中（渲染器），有一个生成海报的功能，生成海报后把图片保存到本地，可以本地发起朋友圈，
现在遇到的问题：海报生成的时候，图片质量较差，比较模糊，需解决这个问题。

2. 分析
接受任务后，拉代码，本地跑一下代码，向同事了解整个一个海报制作环境及流程，剩下来就自己多模拟生成结果及查看流程代码，深知跑起来的过程
经过一番研究之后，生成的海报确实比较模糊
- 流程：
  - 点击生成海报
  - 生成海报dom，在第二屏
  - 将第二屏通过html2canvas截图
  - 弹窗展示图片
重点分析上述步骤的2、3步骤
- 步骤2
  - 分析第二屏的内容：DOM结构为一张大的背景图片，底部一些姓名和二维码图片
- html2canvas
  - 获取指定dom的节点，通过html2canvas生成canvas，
  - 将canvas生成base64
  - 上传到接口并返回图片url
  - 弹窗展示改图片url
进行以下验证
- 第二屏中的图片（以下简称原图片）是否模糊--不模糊
- 生成后的canvas图片是否模糊--模糊

那么在这一步到底是因为什么原因造成了模糊呢？


3. 解决
- 排除干扰因素
  去掉底部姓名和二维码图片
- 示例模拟
  拿包含同一张图片的dom，进行html2canvas拍照并导出查看差异，得出模糊的结果，自行查找百度后得，看一篇文章讲是background方式会造成模糊的效果，img方式不会。然后就更改成img方式再试一次，结果是很清晰，很开心，找到问题原因
- 更改项目代码，background方式改成img方式
  通过web方式是很清楚的， 但是我们这个项目是在手机端生成，模拟手机端
- 移动端验证
  发现生成的图片还是有点模糊，经过一番折腾后，是因以下原因造成
  - 图片的大小问题， 2倍屏下，如375px宽时，拍照的时候生成的图片其实是750px，3倍屏的时候宽度是1125px，图片原始宽度为640px，那么图片被拉大了，自然就会变的模糊， 但是依然在可接受范围之内；再验证，在320px宽时，生成的图片则和原图一模一样，从这点可以看出html2canvas拍照的能力还是非常强的，没有损失。这个原因之前是没有发现，后来才发现。
```js
    const base64: string = await screenshot(pageContent, {
      mode: 1,
      logging: false,
      width: rect.width,
      height: rect.height,
      onBeforeRender: () => {
        preprocess(pageItem);
        // 处理背景图片
        const bgImageUrl = getProxyUrl(page.bgImage || '');
        const tempBgImg = document.createElement('img');
        tempBgImg.src = bgImageUrl;
        tempBgImg.style.width = '100%';
        tempBgImg.height = rect.height;
        tempBgImg.style.objectFit = 'cover';
        pageContent.insertBefore(tempBgImg, pageContent.firstChild);
        bgImage.style.display = 'none';
      },
      onAfterRender: () => {
        postprocess(pageItem);
        const tempBgDiv = pageContent.querySelector('.temp-bg');
        tempBgDiv && pageContent.removeChild(tempBgDiv);
        bgImage.style.display = 'block';
      },
    });
  ```
- canvas双倍和去齿轮-对于图片类效果不明显，无感知，所以没有加上
  ```js
    const canvas=document.createElement("canvas");
    canvas.width=rect.width*2
    canvas.height=rect.height*2
    canvas.style.width=rect.width+"px"
    canvas.style.height=rect.height+"px"
    var context=canvas.getContext("2d")
    context.scale(2,2);
    onAfterRender: () => {
    // 【重要】关闭抗锯齿
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;
    }
  ```
4. 结论
- html2canvas 对background方式的图片拍照没有image方式好，采用image方式
- 图片自身的问题，当一个图片被拉大的时候会有一些失真的，模糊，所以在原图上又有选择





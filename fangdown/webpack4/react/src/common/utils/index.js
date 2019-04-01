
import _ from 'lodash';
import moment from 'moment';
import URL from 'url';
import querystring from 'querystring';
import constant from '../constants';

export default {
  // 获取页面参数，如http://test.html?a=1&b=2 则返回:{ a:1, b:2 }
  getUrlParams(url) {
    // var uri_encoded = url.replace(/%([^\d].)/, "%25$1");
    return URL.parse(url, true).query;
  },
  // 拼接URL参数
  setUrlParams(params /* 参数 */) {
    return querystring.stringify(params);
  },
  // 判断是否是IE(含IE11)
  isIE() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return true;
    } else {
      return false;
    }
  },
  // 检查邮箱是否正确
  validateEmail(val) {
    const emailReg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return emailReg.test(val && val.toLowerCase());
  },
  // 检查url链接是否正确
  validateUrl(val) {
    const urlReg = /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
    return urlReg.test(val && val.toLowerCase());
  },
  // 检查身份证号码是否正确
  validateIDCard(val) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(val);
  },
  // 严格模式校验中国身份证
  checkIDCard(idcode) {
    // 加权因子
    const weightFactor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    const checkCode = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    const code = `${idcode}`;
    const last = idcode[17];// 最后一个

    const seventeen = code.substring(0, 17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    const arr = seventeen.split('');
    const len = arr.length;
    let num = 0;
    for (let i = 0; i < len; i++) {
      num += arr[i] * weightFactor[i];
    }

    // 获取余数
    const resisue = num % 11;
    const lastNo = checkCode[resisue];

    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    let laststr = false;
    if (last === 'X' || last === 'x') {
      if (last === lastNo) {
        laststr = true;
      }
      if (last === 'x' && lastNo === 'X') {
        laststr = true;
      }
    }
    // eslint-disable-next-line max-len
    const idcardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    const format = idcardPatter.test(idcode);

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return !!((last === lastNo || laststr) && format);
  },
  // 检查手机号是否正确
  validatePhone(val) {
    // const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    const phoneReg = /^\d{11}$/;
    return phoneReg.test(val);
  },

  // 格式化DatePicker值为yyyy-MM-dd
  formatDate2yyyyMMdd(date) {
    if (!date) {
      return '';
    }
    return moment(date).format('YYYY-MM-DD');
  },
  // 格式化DatePicker值为yyyy-MM
  formatDate2yyyyMM(date) {
    if (!date) {
      return '';
    }
    return moment(date).format('YYYY-MM');
  },

  // 将时间对象转换成字符串
  formatDate(date) {
    if (!date) {
      return '';
    }
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  },
  /** 将时间对象转换成字符串(没有秒钟) */
  formatDateWithoutSecond(date) {
    if (!date) {
      return '';
    }
    return moment(date).format('YYYY-MM-DD HH:mm');
  },
  // 获取时间间隔 多少天
  GetDateDiff(startDate, endDate) {
    const dates = Math.abs((startDate - endDate)) / (1000 * 60 * 60 * 24);
    return dates;
  },
  /*
*desc: 获得字符串实际长度，中文2，英文1
*Param: str 要获得长度的字符串
*/
  get_strlength(str) {
    let len = 0;
    if (str.match(/[^ -~]/g) == null) {
      len = str.length;
    } else {
      len = str.length + str.match(/[^ -~]/g).length;
    }
    return len;
  },
  // 统计字符串中的中文个数
  countChineseChar(text) {
    let sum = 0;
    const re = /[\u4E00-\u9FA5]/g; // 测试中文字符的正则
    if (text) {
      if (re.test(text)) { // 使用正则判断是否存在中文
        sum = text.match(re).length;
      }
    }
    return sum;
  },

  /**
        将文本域中的内容转换成html格式

    * */
  txtToHtml(txt) {
    if (!txt) {
      return '';
    }
    let txtVal = '';
    txtVal = txt.replace(/ /g, '&nbsp;');
    txtVal = txtVal.replace(/\r\n/g, '<br />');
    txtVal = txtVal.replace(/\n/g, '<br />');
    return txtVal;
  },
  /**
        将html内容的格式转行成 文本域显示

    * */
  htmlToTxt(txt) {
    if (!txt) {
      return '';
    }
    let txtVal = '';
    txtVal = txt.replace(/&nbsp;/g, ' ');
    txtVal = txtVal.replace(/<br \/>/g, '\n');
    txtVal = txtVal.replace(/<br>/g, '\n');
    return txtVal;
  },
  // 去除对象的字符串前后空格
  trimObjValue(formValues) {
    return _.mapValues(formValues, (v) => {
      if (_.isString(v)) {
        return _.trim(v);
      }
      return v;
    });
  },
  /**
   * 多行Form表单数据的处理，可将格式为{'a_name': 'v1', 'b_name': 'v2', 'a_id': 'id1', 'b_id': 'id2'}的属性转成
   *                                [{name: 'v1', id: 'id1'}, {name: 'v2', id: 'id2'}]
   * @param {*} formValues form格式
   * @param {*} splitMark 属性分割符（属性格式需要为 自定义的区分符号 +分隔符 +  dataIndex； 如 a_name ）
   * @param {*} mapOptions 需要映射的属性，目前仅映射moment对象的格式，eg { startTime: 'YYYY-MM-DD HH:mm:ss' }
   */
  formSplitToArr(formValues, splitMark = '_', mapOptions = {}) {
    const paramObj = {};
    _(formValues).forEach((item, key) => {
      // ckey 拼接的key（用于区分多行数据）， dataIndex 列属性
      const [ckey, dataIndex] = key.split(splitMark);
      const paramItem = paramObj[ckey] || {};
      let val = null;
      if (item instanceof moment) {
        const pattern = mapOptions[dataIndex] || 'YYYY-MM-DD';
        val = item.format(pattern);
      } else if (typeof item === 'string') {
        val = item.trim();
      } else {
        val = item;
      }
      paramItem[dataIndex] = val;
      paramObj[ckey] = paramItem;
    });
    return _.map(paramObj, item => item);
  },
  // 移除class
  removeClass(ele, cls) {
    let eleClass = `${ele.className}`;
    eleClass = eleClass.replace(/(\s+)/gi, ' ');
    let removed = eleClass.replace(`${cls}`, ' ');
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    ele.className = removed;
  },
  // 增加class
  addClass(ele, cls) {
    const eleClass = ele.className;
    const blank = (eleClass !== '') ? ' ' : '';
    const added = eleClass + blank + cls;
    ele.className = added;
  },
  /**
  * 阿拉伯数字转中文数字
  */
  numberToChn(num) {
    const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
    const chnUnitChar = ['', '十', '百', '千'];
    function SectionToChinese(section) {
      let strIns = '';
      let chnStr = '';
      let unitPos = 0;
      let zero = true;
      while (section > 0) {
        const v = section % 10;
        if (v === 0) {
          if (!zero) {
            zero = true;
            chnStr = chnNumChar[v] + chnStr;
          }
        } else {
          zero = false;
          strIns = chnNumChar[v];
          strIns += chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        // eslint-disable-next-line
        section = Math.floor(section / 10);
      }
      return chnStr;
    }
    let unitPos = 0;
    let strIns = '';
    let chnStr = '';
    let needZero = false;

    if (num === 0) {
      return chnNumChar[0];
    }

    while (num > 0) {
      const section = num % 10000;
      if (needZero) {
        chnStr = chnNumChar[0] + chnStr;
      }
      strIns = SectionToChinese(section);
      strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = (section < 1000) && (section > 0);
      // eslint-disable-next-line
      num = Math.floor(num / 10000);
      unitPos++;
    }
    if (/^一十/.test(chnStr)) {
      chnStr = chnStr.substr(1);
    }
    return chnStr;
  },
  // 添加、发起签批的链接
  getPsSignActionUrl(hrsPersonId) {
    return constant.psSignActionUrl.replace('{HRS_PERSON_ID}', hrsPersonId);
  },
  // 签批流程查看
  getPsWorkflowUrl(transactionNbr) {
    return constant.psWorkflowUrl.replace('{TRANSACTION_NBR}', transactionNbr);
  },
  quickSort(arr, startDate, endDate) { // 比较开始日期， 日期近在前面， 若相同日期，比较结束日期
    if (arr.length <= 1) { return arr }
    arr.sort((a, b) => {
      if (a[startDate] === b[startDate]) {
        return new Date(b[endDate]) - new Date(a[endDate]);
      } else {
        return new Date(b[startDate]) - new Date(a[startDate]);
      }
    });
    return arr;
  },
  undefinedToString(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'undefined') {
        obj[key] = '';
      }
    }
    return obj;
  },
  getAtspath() {
    const atsPath = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev') ? '' : '/ats';
    return atsPath;
  },
  /**
   * 值存在返回值，不存在转换成指定值
   * value 需转换的值
   * specifyValuee 转成的值
  */
  conversionToSpecifyValue(value, specifyValue) {
    if (value) {
      return value;
    } else {
      return specifyValue;
    }
  },
  /**
   * 天眼埋点方法
  */
  skappOnEvent(EventId, Label, MapKv) {
    window.SKAPP.onEvent(EventId, Label, MapKv);
  },
  // 数组元素调换位置
  arrSwitchIndex(arr, firstIndex, secondIndex) {
    const newArr = [...arr];
    const firstObj = newArr[firstIndex];
    const secondObj = newArr[secondIndex];
    newArr[firstIndex] = secondObj;
    newArr[secondIndex] = firstObj;
    return newArr;
  },
  // /**
  // * 树形结构转换
  // * @param a
  // * @param idStr
  // * @param pidStr
  // * @param chindrenStr
  // * @returns {Array}
  // */
  transToTreeData(a, idStr, pidStr, chindrenStr) {
    const r = [];
    const hash = {};
    const id = idStr;
    const pid = pidStr;
    const children = chindrenStr;
    let i = 0;
    let j = 0;
    const len = a.length;
    for (; i < len; i++) {
      hash[a[i][id]] = a[i];
    }
    for (; j < len; j++) {
      const aVal = a[j];
      const hashVP = hash[aVal[pid]]; // 当前对象&pid对象
      if (hashVP) {
        !hashVP[children] && (hashVP[children] = []);
        hashVP[children].push(aVal);
      } else {
        r.push(aVal);
      }
    }
    return r;
  },
  // 判断是否是IE浏览器
  isIEBr() {
    const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    const isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
    let isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera; // 判断是否IE浏览器
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      isIE = true;
    }
    if (isIE) {
      return '1';
    } else {
      return '-1';
    }
  },
  // 关闭网页 兼容非弹出页面
  closeWin() {
    if (navigator.userAgent.indexOf('Firefox') !== -1 || navigator.userAgent.indexOf('Chrome') !== -1) {
      window.location.href = 'about:blank';
      window.close();
    } else {
      window.opener = null;
      window.open('', '_self');
      window.close();
    }
  },
  // 数组去重
  getDistinctArray(arr, key) {
    const hash = {};
    let newArr = [];
    if (key) {
      newArr = arr && arr.reduce((item, next) => {
        hash[next.key] ? '' : hash[next.key] = true && item.push(next);
        return item;
      }, []);
    } else {
      newArr = arr && arr.reduce((item, next) => {
        hash[next] ? '' : hash[next] = true && item.push(next);
        return item;
      }, []);
    }

    return newArr;
  },
  downloadImg(imgSrc, imgName = '二维码') {
    if (this.isIEBr() === '1') {
      const ablob = this.base64Img2Blob(imgSrc);
      window.navigator.msSaveBlob(ablob, `${imgName}.jpg`);
      return;
    }
    const blob = new Blob([''], {
      type: 'application/octet-stream',
    });
    const windowURL = window.URL || window.webkitURL; // 兼容浏览器
    const url = windowURL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = imgSrc;
    a.download = imgName;
    const e = document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
    windowURL.revokeObjectURL(url);
  },
  base64Img2Blob(base64Data) {
    const format = 'image/jpeg';
    const base64 = base64Data;
    const code = window.atob(base64.split(',')[1]);
    const aBuffer = new window.ArrayBuffer(code.length);
    const uBuffer = new window.Uint8Array(aBuffer);
    for (let i = 0; i < code.length; i++) {
      uBuffer[i] = code.charCodeAt(i) & 0xff;
    }
    // console.info([aBuffer]);
    // console.info(uBuffer);
    // console.info(uBuffer.buffer);
    // console.info(uBuffer.buffer == aBuffer); // true

    let blob = null;
    try {
      blob = new Blob([uBuffer], {
        type: format,
      });
    } catch (e) {
      window.BlobBuilder = window.BlobBuilder ||
        window.WebKitBlobBuilder ||
        window.MozBlobBuilder ||
        window.MSBlobBuilder;
      if (e.name === 'TypeError' && window.BlobBuilder) {
        const bb = new window.BlobBuilder();
        bb.append(uBuffer.buffer);
        blob = bb.getBlob('image/jpeg');
      } else if (e.name === 'InvalidStateError') {
        blob = new Blob([aBuffer], {
          type: format,
        });
      }
    }
    // alert(blob.size);
    return blob;
  },
  removeArray(arr, obj) {
    for (let i = 0; i < arr.length; i++) {
      let temp = arr[i];
      if (!isNaN(obj)) {
        temp = i;
      }
      if (temp === obj) {
        for (let j = i; j < arr.length; j++) {
          arr[j] = arr[j + 1];
        }
        arr.length = arr.length - 1;
      }
    }
    return arr;
  },
  /* 时间格式化，返回今天、昨天、前天等数据 */
  timeFormat(date) {
    const date1 = new Date(date);
    const today = new Date();
    const time = today - date1; // 时间差，毫秒
    const dayMilliseconds = 24 * 60 * 60 * 1000;
    const todayMilliseconds = // 现在距凌晨0点的时间差
    today.getHours() * 60 * 60 * 1000 +
    today.getMinutes() * 60 * 1000 +
    today.getSeconds() * 1000 +
    today.getMilliseconds();
    if (time <= todayMilliseconds) {
      return '今天';
    }
    else {
      if (time <= todayMilliseconds + dayMilliseconds) {
        return '昨天';
      }
      else if (time <= todayMilliseconds + dayMilliseconds * 2) {
        return '前天';
      }
      else {
        return date.slice(0, date.indexOf(' '));  // 暂使用字符串截取处理
      }
    }
  }
};

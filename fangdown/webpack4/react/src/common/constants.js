// 是否开发环境
const dev = process.env.NODE_ENV === 'development';
const Config = {
  hostServer: '/zztj-recruit-talent-webserver/rctt'
};
let hostServer = '/zztj-recruit-talent-webserver/rctt';
let hrxScanUrlPrefix = '';
if (dev) {
  hostServer = 'http://cwetalent-stg1.pingan.com/zztj-recruit-talent-webserver/rctt'; // 彭海涛
  // hostServer = 'http://IQSZ-D6884:8099/rctt'; // 开发机
  // hostServer = 'http://iqcd-d0599:8099/rctt/'// 金顺鹏
  // hostServer = 'http://IQSZ-D6884:8099/rctt/' // 刘斌
  // hostServer = 'http://IQSZ-D6781:8099/rctt/' // 罗小龙
  // hostServer = 'http://IQSZ-D6884:8099/rctt/'  //魏立严
  // hostServer = 'http://IQCD-D0394:8099/rctt/'  //刘斌
  // hostServer = 'http://IQSZ-D6882:8099/rctt/'  //曾令坤
  // hostServer = 'http://IQSZ-D6705:8099/rctt/' // 彭海涛
  // hostServer = 'http://IQSZ-D6530:8099/rctt'; // 刘洋
  // hostServer = 'http://GQSZ-L00778:8099/rctt';  // 熊维成
  hrxScanUrlPrefix = 'http://hrx-stg1.pingan.com.cn:44626/activity/scan/index.html';

}
Config.hostServer = hostServer;
Config.hrxScanUrl = `${hrxScanUrlPrefix}?page={page}&title={title}`;
export default Config;

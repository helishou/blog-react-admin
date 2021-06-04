/*
 * @Author       : helishou
 * @Date         : 2021-05-26 20:17:56
 * @LastEditTime : 2021-06-03 22:10:02
 * @LastEditors  : helishou
 * @Description  : domain
 * @FilePath     : \src\utils\domain.js
 * 你用你的指尖,阻止我说再见,在bug完全失去之前
 */
let domain = 'http://wangxinyang.xyz'; // 正式域名
if (process.env.NODE_ENV === 'development') {
  // 开发环境下，本地地址
  domain = 'http://localhost:3001';
}
export default domain;

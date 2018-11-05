const constant = require('./constant');
const url = {
    '/upload': constant.URL.GOBAL_UPLOAD,
    '/user/login': constant.URL.USER_LOGIN,
    '/user/getbalance': constant.URL.USER_BALANCE,
    '/user/uploadHeader': constant.URL.USER_UPLOADHEADER,
    '/user/getmybank': constant.URL.USER_BANK,
    '/trade/getstocklimit': constant.URL.TRADE_STOCKLIMITS
}
module.exports = (originUrl) => {
    return url[originUrl]
};
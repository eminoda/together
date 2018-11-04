const url = {
    '/user/getbalance': '/V1.0/user/balance',
    '/user/login': '/V1.0/user/login',
    '/user/uploadHeader': '/V1.0/user/uploadHeader',
    '/upload': '/upload',
    '/trade/getstocklimit': '/V1.0/trade/stockLimits'
}
module.exports = (originUrl) => {
    return url[originUrl]
};
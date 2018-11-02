const url = {
    '/user/getbalance': '/V1.0/user/balance',
    '/trade/getstocklimit': '/V1.0/trade/stockLimits'
}
module.exports = (originUrl) => {
    return url[originUrl]
};
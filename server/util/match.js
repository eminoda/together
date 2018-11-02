const url = {
    '/user/getbalance': '/V1.0/user/balance'
}
module.exports = (originUrl) => {
    return url[originUrl]
};
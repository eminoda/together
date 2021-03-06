const URL = require('../util/constant').URL;

module.exports = {
    '/trade/stockLimits': {
        name: '今日限买股列表',
        requestOptions: {
            method: 'get',
            url: URL.TRADE_STOCKLIMITS
        },
        responseMapper(data) {
            let responseData = {
                limit: []
            };
            for (let index in data.list) {
                console.log(index);
                responseData.limit.push({
                    id: Number(index) + 1,
                    stockCode: data.list[index].stkCd,
                    stockName: data.list[index].stkNm
                });
            }
            return responseData;
        }
    }
}
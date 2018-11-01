const Http = require('../util/http');

class CommonService {
    constructor() {}

    request(options = {}) {
        return new Http().request({
            url: options.url,
            data: options.data
        });
    }
}
module.exports = CommonService;
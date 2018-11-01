const Http = require('../util/http');
class UserService {
    getbalance() {
        return new Http().request({
            url: '/user/getbalance'
        });
    }
}
module.exports = UserService;
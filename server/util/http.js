const axios = require('axios');

class Http {
    constructor(options) {
        this.instance = axios.create({
            baseURL: 'http://bg.niu100.com',
            timeout: 3000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
        this.interceptorResponse();
    }
    interceptorResponse() {
        return this.instance.interceptors.response.use(response => {
            return new Promise((resolve, reject) => {
                if (response.status == 200) {
                    let data = response.data;
                    resolve(data);
                } else {
                    reject({
                        success: false,
                        resultMsg: response.statusText
                    });
                }
            })
        })
    }
    request(options = {}) {
        return this.instance({
            method: (options.method || 'get').toUpperCase(),
            url: options.url,
            data: options.data
        })
    }
}
module.exports = Http;
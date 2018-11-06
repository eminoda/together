let ctx = {
    body: {
        username: 'aaaa',
        password: 'a11111'
    },
    query: {
        test: 'cccc',
        password: 'a11111',
    }
}
let service1 = function() {
    return 1
}
let rules = {
    '/user/getbalance': {
        actions: [
            service.getbalance({
                request: {
                    url: '/123',
                    method: 'get'
                }
            })
        ]
    }
}
console.log(rules);
module.exports = {
    appenders: {
        out: {
            type: 'console'
        },
        buss: {
            type: 'dateFile',
            filename: 'logs/buss',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        access: {
            type: 'dateFile',
            filename: 'logs/access',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        error: {
            type: 'dateFile',
            filename: 'logs/error',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }
    },
    categories: {
        default: {
            appenders: ['buss', 'out', 'error'],
            level: 'debug'
        },
        access: {
            appenders: ['access'],
            level: 'info'
        },
        error: {
            appenders: ['error'],
            level: 'error'
        }
    }
}
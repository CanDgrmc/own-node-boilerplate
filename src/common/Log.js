const colors = require('colors')
colors.setTheme({
    info: 'cyan',
    warn: 'yellow',
    success: 'green',
    error: 'red'
});

class Log {
    source
    constructor({
        source,
    }) {

        return (() => {
            this.source = source
            return this
        })()
    }



    success = (log) => {
        const message = this.source ? `${this.source}::${log}`.success.bold : log.success.bold
        console.log(message)
    }

    error = (log) => {
        const message = this.source ? `${this.source}::${log}`.error.bold : log.error.bold
        console.log(message)
    }

    warn = (log) => {

        const message = this.source ? `${this.source}::${log}`.warn.bold : log.warn.bold
        console.log(message)
    }

    trace = (log) => {
        const message = this.source ? `${this.source}::${log}`.info.bold : log.info.bold
        console.log(message)
    }
}

module.exports = Log
"use strict"
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
    json = (log) => {

        this.source ? console.log(`${this.source} json  -> `.error.bold) : console.log(`json  -> `.error.bold)
        this.printLogRows(log)


        this.source ? console.log(`<- json ${this.source}`.error.bold) : console.log(`<-  json`.error.bold)
    }

    printLogRows = (log,n=0) => {
        for(let i in log){
            if(typeof log[i] == 'object'){
                if(n == 0){
                    console.log(`${this.printTimes(' ',n)}${i}:{`.success.bold)
                    this.printLogRows(log[i],n+1)
                    console.log(`${this.printTimes(' ',n)}}`.success.bold)
                }
                else if(n==1){
                    console.log(`${this.printTimes(' ',n)}${i}:{`.info.bold)
                    this.printLogRows(log[i],n+1)
                    console.log(`${this.printTimes(' ',n)}}`.info.bold)
                }
                else if(n==2){
                    console.log(`${this.printTimes(' ',n)}${i}:{`.warn.bold)
                    this.printLogRows(log[i],n+1)
                    console.log(`${this.printTimes(' ',n)}}`.warn.bold)
                }
                else{
                    console.log(`${this.printTimes(' ',n)}${i}:{`.error.bold)
                    this.printLogRows(log[i],n+1)
                    console.log(`${this.printTimes(' ',n)}}`.error.bold)
                }
                
            }else{
                if(n == 0){
                    console.log(`${this.printTimes(' ',n)}${i}:${log[i]} `.success.bold)
                }
                else if(n==1){
                    console.log(`${this.printTimes(' ',n)}${i}:${log[i]} `.info.bold)
                }
                else if(n==2){
                    console.log(`${this.printTimes(' ',n)}${i}:${log[i]} `.warn.bold)
                }
                else{
                    console.log(`${this.printTimes(' ',n)}${i}:${log[i]} `.error.bold)
                }
                
            }
        } 
    }

    printTimes(word, n){
        let s = ''
        if(n==0){
            return s
        }
        for(let i=0; i < n; i++){
            s += word
        }
        return s
    }
}

module.exports = Log
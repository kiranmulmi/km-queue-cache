const fs = require('fs');
class KmQueueCache {
    constructor(path, queueSize = 5) {
        this.cachePath = path;
        this.queueSize = queueSize;
    }

    push(obj) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(this.isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                if(jsonData.length >= this.queueSize) {
                    jsonData.splice(0, 1);
                }
                jsonData.push(obj);
                const newData = JSON.stringify(jsonData);

                fs.writeFile(this.cachePath, newData, (err) => {
                    if (err) reject(err);
                    console.log('Pushed');
                    resolve("success");
                });
            });
        }));
    }

    getAllQueueData() {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(this.isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                resolve(jsonData);
            });
        }));
    }

    filter(expression) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(this.isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                resolve(jsonData.filter(expression));
            });
        }));
    }

    find(expression) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(this.isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                resolve(jsonData.find(expression));
            });
        }));
    }
    getAllQueueData() {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(this.isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                resolve(jsonData);

            });
        }));
    }
    isJsonParsable(string) {
        try {
            JSON.parse(string);
        } catch (e) {
            return false;
        }
        return true;
    }
}

module.exports = KmQueueCache;
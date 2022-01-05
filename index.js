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
                    resolve({
                        status:"success",
                        total: jsonData.length
                    });
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
    remove(key, value) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(this.isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                const filteredData = jsonData.filter(a => a[key] !==  value);
                fs.writeFile(this.cachePath, JSON.stringify(filteredData), (err) => {
                    if (err) reject(err);
                    resolve({
                        status:"success",
                        total: filteredData.length
                    });
                });
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
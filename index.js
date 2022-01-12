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
                if(isJsonParsable(rawData)) {
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
                if(isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                resolve(jsonData);
            });
        }));
    }
    remove(key, value) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(isJsonParsable(rawData)) {
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
    removeAll() {
        return new Promise((resolve, reject) => {
            let jsonData = [];
            fs.writeFile(this.cachePath, JSON.stringify(jsonData), (err) => {
                if (err) reject(err);
                resolve({
                    status:"success",
                    total: jsonData.length
                });
            });
        });
    }
    find(expression) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                let result = jsonData.find(expression);
                if(result) {
                    resolve(result);
                } else {
                    resolve({});
                }
            });
        }));
    }
    filter(expression) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                let result = jsonData.filter(expression);
                if(result) {
                    resolve(result);
                } else {
                    resolve([]);
                }
            });
        }));
    }
    get(key, value) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                let result = jsonData.filter(a => a[key] === value);
                if(result) {
                    resolve(result);
                } else {
                    resolve([]);
                }
            });
        }));
    }
    getAll(key, value) {
        return new Promise(((resolve, reject) => {
            fs.readFile(this.cachePath, (err, rawData) => {
                if (err) reject(err);
                let jsonData = [];
                if(isJsonParsable(rawData)) {
                    jsonData = JSON.parse(rawData);
                }
                let result = jsonData.find(a => a[key] === value);
                if(result) {
                    resolve(result);
                } else {
                    resolve({});
                }
            });
        }));
    }
}
function isJsonParsable(string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}


module.exports = KmQueueCache;
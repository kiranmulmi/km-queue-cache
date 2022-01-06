const kmQueueCache = require('./index');

const queueMaxSize = 5;
const cacheStorage = './my-data/data.json';

const myCache = new kmQueueCache(cacheStorage, queueMaxSize);

const student = {
    "id": 7,
    "name": "Kiran Mulmi"
}
//
myCache.push(student).then(response => {
    console.log(response);
});
// myCache.remove("id", 8).then(response => {
//     console.log(response);
// });
const kmQueueCache = require('./index');

const queueMaxSize = 100;
const cacheStorage = './my-data/data.json';

const myCache = new kmQueueCache(cacheStorage, queueMaxSize);

// const student = {
//     "id": 9,
//     "name": "Kiran Mulmi"
// }
//
// myCache.push(student).then(response => {
//     console.log(response);
// });
// myCache.remove("id", 8).then(response => {
//     console.log(response);
// });
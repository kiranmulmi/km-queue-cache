const kmQueueCache = require('./index');

const queueMaxSize = 5;
const cacheStorage = './my-data/data.json1';

const myCache = new kmQueueCache(cacheStorage, queueMaxSize);

const student = {
    "id": 9,
    "name": "Kiran Mulmi 9"
}
//
// myCache.push(student).then(response => {
//     console.log(response);
// });
// myCache.remove("id", 8).then(response => {
//     console.log(response);
// });

// myCache.getAllQueueData().then(response => {
//     console.log(response);
// });
// myCache.get('id', 7).then(response => {
//     console.log(response);
// });
myCache.getAll('name', "Kiran Mulmi").then(response => {
    console.log(response);
});
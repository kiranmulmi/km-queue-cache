## About
This package is for making cache in queue.
## Install
```javascript
const kmQueueCache = require('km-queue-cache');

const queueMaxSize = 100;
const cacheStorage = './my-data/data.json';

const myCache = new kmQueueCache(cacheStorage, queueMaxSize);
```
## Usage
### Push Data
```javascript
const student = {
    "id": 6, 
    "name": "Kiran Mulmi"
}

myCache.push(student).then(response => {
    console.log(response);
});
```
### Fetch All Data
```javascript
myCache.getAllQueueData().then(response => {
    console.log(response); // All Results
});
```
### Filter Data
```javascript
myCache.filter(student => student.id === 6).then(response => {
    console.log(response)
});
```
### Find Data
```javascript
myCache.find(student => student.name === "kiran mulmi").then(response => {
    console.log(response)
});
```

### Remove Data
```javascript
myCache.remove("id", 6).then(response => {
    console.log(response)
});
```

### Remove All Data
```javascript
myCache.removeAll().then(response => {
    console.log(response)
});
```

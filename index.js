//'use strict';
/*
INTRO )
For this test we want to see an async map function implemented.
We use http://caolan.github.io/async/docs.html#map a lot, and the test
will be to implement this (without using the library of course).
If we have to load 20 files, and then upload them to api, and then see
the results when all are finished.
It accepts an array of inputs, a function called once for each item
with both the item, and a callback
when it is finished, and a callback for when it is done, either with
an error or the results.
Included is the function which will be calling map along with inputs
is provided with some demo inputs, along with the demo iteratee
which just doubles the result after waiting and then prints the
results.
1 )
The arguments / order of arguments should not be changed for map
2 )
Please include the results of running, along with *what version* of
nodejs you are using so we can check on the exact same version as you
3 )
We will be looking at comments as well
4 )
Please include your result as a file and not as part of an email
message
*/
// ========= this section shouldn't be getting changed==================
// input for first test
const MAP_DATA_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// when to we start
let startTime = new Date().getTime();
// run with our demo inputs
map(MAP_DATA_1, (item, cb) => {
  // wait a bit since we are doing async
  setTimeout(() => {
    // how long has it been since we started running
    const secondsElapsed = (new Date().getTime() - startTime) /1000;
    console.log('MAP 1 ITERATEE: ' + secondsElapsed);
    // callback with result
    cb(null, item * 2);
    // wait between 1 and 2 seconds
  }, 1000 + 1000 * Math.random());
}, (err, results) => {
 // done either with error or no error
  if (err) {
    console.log('MAP 1 ERROR: ');
    console.log(err);
    console.log('=============')
  } else {
    console.log('MAP 1 RESULTS: ' + ((new Date().getTime() - startTime) / 1000) + ' seconds');
    console.log(results);
    console.log('===============');
  }
});
// ======== end of part which shouldnt get changed ==========
function map (array, iteratee, next) {
  if(Array.isArray(array)) {
    Promise.all(array.map(sigleItem=>{
      return new Promise((resolve, reject)=>{
        iteratee(sigleItem, (err, itemResult)=>{
          if(err) reject(err);
          else resolve(itemResult);
        })
      })
    }))
      .then(results=>next(null, results))
      .catch(err=>next(err));
  }
  else {
    next('first parameter is not an array');
  }
}


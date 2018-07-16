const request = require('request');
const async = require('async')
const SamarthyaMiner = '65535C0aEf82429F9b8e714f279d3490F2E929B7'

function getData(address) {
  return new Promise((resolve, reject) => {
    request(`https://api.ethermine.org/miner/:${address}/workers`, function (error, response, body) {
      //console.log('error:', error);
      //console.log('statusCode:', response && response.statusCode);
      //console.log('body:', body);
      if (response.statusCode !== 200) {
        reject(body);
      } else {
        resolve(body);
      }
    });
  }).catch((error) => {
    console.log(error);
  });
}

function checkMiners(data) {
  data = JSON.parse(data);
  let minersToRestart = []
  return new Promise((resolve,reject) => {
    async.each(data.data, function(dataEl, cb) {
      //console.log(dataEl.reportedHashrate);
      if (dataEl.reportedHashrate === 0) {
        minersToRestart.push(dataEl.worker)
      }
      cb();
    });
    resolve(minersToRestart);
  });
}

function restartMiner(miner) {
  if (miner === 'miner01') {
    var spawn = require('child_process').spawn,
    restartMiner = spawn('python', 'restartMiner.py');
  }
  if (miner === 'miner02') {
    //add restart code here
  }
  if (miner === 'miner03') {
    //add restart code here
  }
}

function test() {
  var dataPromise = getData(SamarthyaMiner);
  dataPromise.then((result) => {
    minerPromise = checkMiners(result);
    minerPromise.then((arr) => {
      //console.log(arr);
      if (arr.length !== 0) {
        console.log("Miner Down!");
        for (let i = 0; i < arr.length; i++) {
          restartMiner(arr[i]);
        }
      }
    });
  });
}

test();

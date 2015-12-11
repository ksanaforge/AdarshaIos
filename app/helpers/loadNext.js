import {DB_NAME} from '../constants/AppConstants';

let ksa = require('ksana-simple-api');

export default function loadNext(options) {

  return new Promise((resolve, reject) => {

    options = Object.assign({db: DB_NAME}, options);

    ksa.next(options, (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
}
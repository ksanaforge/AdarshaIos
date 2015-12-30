import ksa from 'ksana-simple-api';
import {DB_NAME} from '../constants/AppConstants';

export default function loadPrev(options) {

  return new Promise((resolve, reject) => {

    options = Object.assign({db: DB_NAME}, options);

    ksa.prev(options, (err, rows) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(rows);
      }
    });
  });
}

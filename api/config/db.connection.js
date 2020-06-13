const mysql = require('mysql');
module.exports = class Database {
  /**
   *
   * @param {Object} config : Pool Connection Configuration Object
   */
  constructor(config) {
    this.connection = mysql.createPool(config);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.getConnection((e, conn) => {
        if (e) {
          reject(e);
        } else {
          conn.query(sql, args, (errObj, rows) => {
            if (errObj) {
              reject(errObj);
            } else {
              conn.release(err => {
                if (err) {
                  reject(err);
                }
                resolve('Released');
              });
              resolve(rows);
            }
          });
        }
      });
    });
  }

  getConnection(cb) {
    return this.connection.getConnection(cb);
  }

  close() {
    return new Promise((resolve, reject) => {
      this.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          conn.release(errObj => {
            if (errObj) {
              reject(errObj);
            }
            resolve();
          });
        }
      });
    });
  }
};

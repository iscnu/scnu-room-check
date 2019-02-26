const sqlite3 = require('sqlite3');
const path = require('path');
const config = require('../config');

var instance;
module.exports = async function () {
  if (instance) return instance;
  instance = await new Promise(function (resolve, reject) {
    const db = new sqlite3.Database(path.join(__dirname, '..', 'data', config.semester, `schedule-${config.semester}.db`), function (e) {
      if (e) return reject(e);
      resolve({
        db,
        exec: function (sql) {
          return new Promise(function (resolve, reject) {
            db.exec(sql, function (err) {
              if (err) return reject(err);
              resolve({
                changes: this.changes,
                lastID: this.lastID
              });
            });
          });
        },
        run: function (sql, params) {
          return new Promise(function (resolve, reject) {
            db.run(sql, params, function (err) {
              if (err) return reject(err);
              resolve({
                changes: this.changes,
                lastID: this.lastID
              });
            });
          });
        },
        get: function (sql, params) {
          return new Promise(function (resolve, reject) {
            db.get(sql, params, function (err, row) {
              if (err) return reject(err);
              resolve(row);
            });
          });
        },
        all: function (sql, params) {
          return new Promise(function (resolve, reject) {
            db.all(sql, params, function (err, result) {
              if (err) return reject(err);
              resolve(result);
            });
          });
        },
        close:function(){
          return new Promise(function (resolve, reject) {
            db.close(function (err) {
              if (err) return reject(err);
              resolve();
            });
          });
        },
        prepare: function (sql) {
          return new Promise(function (resolve, reject) {
            const statement = db.prepare(sql, function (err) {
              if (err) return reject(err);
              resolve({
                statement,
                run: function (sql) {
                  return new Promise(function (resolve, reject) {
                    statement.run(sql, function (err) {
                      if (err) return reject(err);
                      resolve(statement);
                    });
                  });
                },
                finalize:function(){
                  return new Promise(function (resolve, reject) {
                    statement.finalize(function (err) {
                      if (err) return reject(err);
                      resolve();
                    });
                  });
                }
              });
            })
          })
        }
      });
    });
  });
  return instance;
};

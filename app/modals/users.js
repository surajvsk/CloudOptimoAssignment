const {pool} = require("../../config/dbConn")

module.exports = class Users{

    static insertUsers(input_json) {
      console.log('input_json::::::::::::',input_json)
        const statement = {
          text: `select insert_user($1)`,
          values: [JSON.stringify(input_json)],
        };
        console.log("statement:::::::::::::::::::::", statement);
        return pool.query(statement);
      }
}
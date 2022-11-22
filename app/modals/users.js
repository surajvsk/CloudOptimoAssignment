const {pool} = require("../../config/dbConn")

module.exports = class Users{

    static insertUsers(input_json) {
        const statement = {
          text: `select develop.sp_insert_sap_session($1)`,
          values: [JSON.stringify(input_json)],
        };
        console.log("statement:::::::::::::::::::::", statement);
        return pool.query(statement);
      }
}
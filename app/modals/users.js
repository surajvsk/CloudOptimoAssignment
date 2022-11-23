const {
  pool
} = require("../../config/dbConn")

module.exports = class Users {

  static insertUsers(input_json) {
    console.log('input_json::::::::::::', input_json)
    const statement = {
      text: `select insert_user($1);`,
      values: [JSON.stringify(input_json)],
    };
    return pool.query(statement);
  }


  static findByuserName(username) {
    const statement = {
      text: `select firstName, lastName, middleName, phone_no, password, city, state, pincode, address, role from users where phone_no = $1;`,
      values: [username],
    };
    return pool.query(statement);
  }
}
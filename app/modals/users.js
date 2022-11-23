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
      text: `select id, first_name, last_name, middle_name, phone_no, password, city, state, pincode, address, role from users where phone_no = $1;`,
      values: [username],
    };
    return pool.query(statement);
  }


  static findById(id) {
    const statement = {
      text: `select id, first_name, last_name, middle_name, phone_no, password, city, state, pincode, address, role from users where id = $1;`,
      values: [id],
    };
    return pool.query(statement);
  }

  static vaccinationByUserId(id) {
    const statement = {
      text: `select blood_gruop, age, vc_1, vc_1_date, vc_2, vc_2_date, vc_1_city, vc_2_city, user_id from users_info where user_id = $1`,
      values: [id],
    };
    return pool.query(statement);
  }
}
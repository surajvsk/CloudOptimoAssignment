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

  static findAllUsers(id) {
    const statement = {
      text: `select id, first_name, last_name, middle_name, phone_no, password, city, state, pincode, address, role from users where id not in ($1)`,
      values: [id],
    };
    return pool.query(statement);
  }


  static findByCityName(id, city) {
    const statement = {
      text: `select id, first_name, last_name, middle_name, phone_no, password, city, state, pincode, address, role from users where id not in ($1) and city = $2`,
      values: [id, city],
    };
    return pool.query(statement);
  }


  static findByStateName(id, state) {
    const statement = {
      text: `select id, first_name, last_name, middle_name, phone_no, password, city, state, pincode, address, role from users where id not in ($1) and state = $2`,
      values: [id, state],
    };
    return pool.query(statement);
  }


  static findByDateName(id, start_date, end_date) {
    const statement = {
      text: `select id, first_name, last_name, middle_name, phone_no, password, city, state, 
      pincode, address, role, create_at from users where id <> $1
      and create_at between $2::TIMESTAMP and $3::TIMESTAMP`,
      values: [id, start_date, end_date]
    };
    return pool.query(statement);
  }


  static certificateInfo(id) {
    const statement = {
      text: `select blood_gruop, age, vc_1, vc_1_date, vc_2, vc_2_date, vc_1_city, vc_2_city, user_id from users_info where id <> $1`,
      values: [id]
    };
    return pool.query(statement);
  }

  static findAllPincode() {
    const statement = {
      text: `select DISTINCT pincode from users`
    };
    return pool.query(statement);
  }

  static findVC1Certificate() {
    const statement = {
      text: `select DISTINCT vc_1 from users_info`
    };
    return pool.query(statement);
  }

  static findVC2Certificate() {
    const statement = {
      text: `select DISTINCT vc_2 from users_info`
    };
    return pool.query(statement);
  }


  static findByPincode(id, pincode) {
    const statement = {
      text: `select ui.blood_gruop, ui.age, ui.vc_1, ui.vc_1_date, ui.vc_2, 
      ui.vc_2_date, ui.vc_1_city, ui.vc_2_city, ui.user_id from users_info ui 
      join users u on u.id = ui.user_id
      where u.id <> $1 and u.pincode = $2`,
      values: [id, pincode]
    };
    return pool.query(statement);
  }


  static findByCert1(id, cert) {
    const statement = {
      text: `select ui.blood_gruop, ui.age, ui.vc_1, ui.vc_1_date, ui.vc_2, 
      ui.vc_2_date, ui.vc_1_city, ui.vc_2_city, ui.user_id from users_info ui 
      join users u on u.id = ui.user_id
      where u.id <> $1 and ui.vc_1 = $2`,
      values: [id, cert]
    };
    return pool.query(statement);
  }

  static findByCert2(id, cert) {
    const statement = {
      text: `select ui.blood_gruop, ui.age, ui.vc_1, ui.vc_1_date, ui.vc_2, 
      ui.vc_2_date, ui.vc_1_city, ui.vc_2_city, ui.user_id from users_info ui 
      join users u on u.id = ui.user_id
      where u.id <> $1 and ui.vc_2 = $2`,
      values: [id, cert]
    };
    return pool.query(statement);
  }
}
#CREATE DATABASE ALL SCRIPTS ARE AVAILABLE IN SBSCRIPT FILE

after creating database execute create table query.
There are two main table users and user_info.

For inserting user in table there is a function name 'insert_user' execute function also
after executing funtion we need to insert a data for admin login for that query is already written or you can execute the below query.

insert into users(first_name, last_name, middle_name, phone_no, password, city, state, pincode, address, role) 
values('ADMIN','Vishwakarma','Lalman','7666321810','$2b$10$H5umiXxikDnJBXUE2XVvAegrlVEQgaFFMP/cErM.C4kyxTWEjUAAa','Thane','Maharashtra','4000603','Thane','ADMIN');

-----------------------------------------------------------------
APPLICATION STARTUP
use node server

http://localhost:5000/ --- For Opening Home Page
for creating user or registering new user use below mapping
http://localhost:5000/sign-up



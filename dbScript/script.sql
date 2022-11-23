-- create database cloud_optimo;
drop table if exists users;
create table users(
	id int GENERATED ALWAYS AS IDENTITY  primary key not null,
	first_name varchar(200),
    last_name varchar(200),
    middle_name varchar(200),
    phone_no varchar(200) unique not null,
    password varchar(200),
    city varchar(200),
    state varchar(200),
    pincode varchar(200),
	address text,
    create_at timestamp default now(),
	role varchar(10) DEFAULT 'USER'
);

--select * from users
--select * from users_info
drop table if exists users_info;
create table users_info(
	id int GENERATED ALWAYS AS IDENTITY  primary key not null,
    blood_gruop varchar(5),
    age int,
    vc_1 varchar(200),
    vc_1_date varchar(200),
    vc_2 varchar(200),
    vc_2_date varchar(200),
    vc_1_city varchar(200),
    vc_2_city varchar(200),
	user_id int,
	foreign key(user_id) references users(id)
);



--FUNCTION FOR INSERTING USER INFO AND PERSONAL INFO
DROP FUNCTION insert_user;
CREATE OR REPLACE FUNCTION insert_user(
    input_json JSONB)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    AS $BODY$
    
    DECLARE
    output_result JSONB;
	user_count int;
	inserted_user_id int;
    BEGIN
	

select count(*) into user_count from users where phone_no = input_json->>'phoneNo';

if user_count = 0 then

insert into users(first_name, last_name, middle_name, phone_no, password, city, state, pincode, address)
values( 
input_json->>'firstName', 
input_json->>'lastName', 
input_json->>'middleName', 
input_json->>'phoneNo', 
input_json->>'password', 
input_json->>'City', 
input_json->>'State', 
input_json->>'pincode', 
input_json->>'address') returning id into inserted_user_id;

insert into users_info(blood_gruop, age, vc_1, vc_1_date, 
vc_2, vc_2_date, vc_1_city, vc_2_city, user_id)
values (input_json->>'bloodGruop',
(input_json->>'age')::int,
input_json->>'COVIDVaccinationCertificate1',
input_json->>'COVIDVaccinationCertificate1date',
input_json->>'COVIDVaccinationCertificate2',
input_json->>'COVIDVaccinationCertificate2date',
input_json->>'firstVaccinationCityName',
input_json->>'secondVaccinationCityName',
inserted_user_id);

output_result:= '{"status":200, "message":"User registered successfully"}';
else
output_result:= '{"status":403, "message":"User Already Exists"}';
end if;

RETURN output_result;
END;
$BODY$;





--INSERT ADMIN WITH PASSWORD : pass@123 username : 7666321805
insert into users(first_name, last_name, middle_name, phone_no, password, city, state, pincode, address, role) 
values('ADMIN','Vishwakarma','Lalman','7666321810','$2b$10$H5umiXxikDnJBXUE2XVvAegrlVEQgaFFMP/cErM.C4kyxTWEjUAAa','Thane','Maharashtra','4000603','Thane','ADMIN');
--select * from temp_user_master
	--select count(u.id)  from temp_user_master tum join users u on tum.phoneno = u.phoneno;
--select insert_user('{"firstName":"Suraj","lastName":"Vishwakarma","middleName":"Lalman","phoneNo":"7666321809","password":"pass@123","confirmPassword":"pass@123","City":"Pune","State":"Maharashtra","pincode":"400603","address":"Thane Maharashtra","bloodGruop":"AB+","age":"26","COVIDVaccinationCertificate1":"COVID1","COVIDVaccinationCertificate1date":"2022-11-21","COVIDVaccinationCertificate2":"COVID2","COVIDVaccinationCertificate2date":"2022-11-23","firstVaccinationCityName":"Thane","secondVaccinationCityName":"Mumbai"}')


select id, first_name, last_name, middle_name, phone_no, password, city, state, 
pincode, address, role, create_at from users where id <> 2
and create_at between '2022-11-23T01:17'::TIMESTAMP and '2022-11-24T23:17'::TIMESTAMP;


select blood_gruop, age, vc_1, vc_1_date, 
vc_2, vc_2_date, vc_1_city, vc_2_city, user_id from users_info where id <> 2
	



select ui.blood_gruop, ui.age, ui.vc_1, ui.vc_1_date, ui.vc_2, ui.vc_2_date, ui.vc_1_city, ui.vc_2_city, ui.user_id from users_info ui where id <> 2
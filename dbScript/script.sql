-- create database cloud_optimo;

create table users(
	id serial primary key not null,
	firstName varchar(200),
    lastName varchar(200),
    middleName varchar(200),
    phoneNo varchar(200) unique not null,
    password varchar(200),
    confirmPassword varchar(200),
    city varchar(200),
    state varchar(200),
    pincode varchar(200),
	address text
);

--select * from users
--select * from users_info

create table users_info(
	id serial primary key not null,
    blood_gruop varchar(5),
    age int,
    COVIDVaccinationCertificate1 varchar(200),
    COVIDVaccinationCertificate1date varchar(200),
    COVIDVaccinationCertificate2 varchar(200),
    COVIDVaccinationCertificate2date varchar(200),
    firstVaccinationCityName varchar(200),
    secondVaccinationCityName varchar(200),
	user_id int,
	foreign key(user_id) references users(id)
);

--FUNCTION FOR INSERTING USER INFO AND PERSONAL INFO
CREATE OR REPLACE FUNCTION insert_user(
    input_json text)
    RETURNS jsonb
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    AS $BODY$
    
    DECLARE
    output_result JSONB;
    input_jsonb JSONB:= input_json;
    output_json JSONB;
	_count int;
	inserted_id int;
    BEGIN
	
   drop table if exists temp_user_master;
create TEMPORARY table temp_user_master(
	firstName varchar(200),
    lastName varchar(200),
    middleName varchar(200),
    phoneNo varchar(200),
    password varchar(200),
    confirmPassword varchar(200),
    city varchar(200),
    state varchar(200),
    pincode varchar(200),
	address varchar(200),
    blood_gruop varchar(5),
    age int,
    COVIDVaccinationCertificate1 varchar(200),
    COVIDVaccinationCertificate1date varchar(200),
    COVIDVaccinationCertificate2 varchar(200),
    COVIDVaccinationCertificate2date varchar(200),
    firstVaccinationCityName varchar(200),
    secondVaccinationCityName varchar(200)
);

insert into temp_user_master(firstName, lastName, middleName, phoneNo, password, 
confirmPassword, city, state, pincode, address, blood_gruop, age, COVIDVaccinationCertificate1, COVIDVaccinationCertificate1date, 
COVIDVaccinationCertificate2, COVIDVaccinationCertificate2date, firstVaccinationCityName, secondVaccinationCityName)
select cast(t->>'firstName' as varchar(255)) as firstName, 
cast(t->>'lastName' as varchar(255)) as lastName,
cast(t->>'middleName' as varchar(255)) as middleName,
cast(t->>'phoneNo' as varchar(200)) as phoneNo,
cast(t->>'password' as varchar(200)) as password,
cast(t->>'confirmPassword' as varchar(200)) as confirmPassword,
cast(t->>'City' as varchar(255)) as city,
cast(t->>'State' as varchar(255)) as state,
cast(t->>'pincode' as varchar(255)) as pincode,
cast(t->>'address' as text) as address,
cast(t->>'bloodGruop' as varchar(5)) as bloodgruop,
cast(t->>'age' as int) as age,
cast(t->>'COVIDVaccinationCertificate1' as varchar(255)) as COVIDVaccinationCertificate1,
cast(t->>'COVIDVaccinationCertificate1date' as varchar(255)) as COVIDVaccinationCertificate1date,
cast(t->>'COVIDVaccinationCertificate2' as varchar(255)) as COVIDVaccinationCertificate2,
cast(t->>'COVIDVaccinationCertificate2date' as varchar(255)) as COVIDVaccinationCertificate2date,
cast(t->>'firstVaccinationCityName' as varchar(255)) as firstVaccinationCityName,
cast(t->>'secondVaccinationCityName' as varchar(255)) as secondVaccinationCityName
from jsonb_array_elements(input_jsonb) as t;


select count(u.id) into _count from temp_user_master tum join users u on tum.phoneno = u.phoneno;

if _count = 0 then
--INSERT INTO BOTH TABLE
insert into users(firstName, lastName, middleName, phoneNo, password, confirmPassword, city, state, pincode, address)
select firstName, lastName, middleName, phoneNo, password, confirmPassword, city, state, pincode, address from temp_user_master RETURNING id into inserted_id;

insert into users_info(blood_gruop, age, COVIDVaccinationCertificate1, COVIDVaccinationCertificate1date, 
COVIDVaccinationCertificate2, COVIDVaccinationCertificate2date, firstVaccinationCityName, secondVaccinationCityName, user_id)
select blood_gruop, age, COVIDVaccinationCertificate1, COVIDVaccinationCertificate1date, 
COVIDVaccinationCertificate2, COVIDVaccinationCertificate2date, firstVaccinationCityName, secondVaccinationCityName, inserted_id from temp_user_master;

output_result:= '{"status":200, "message":"User registered successfully"}';
else
--ALERADY EXIST
output_result:= '{"status":403, "message":"User Already Exists"}';
end if;

RETURN output_result;
END;
$BODY$;
	
--select * from temp_user_master
	--select count(u.id)  from temp_user_master tum join users u on tum.phoneno = u.phoneno;
--select insert_user('[{"firstName":"Suraj","lastName":"Vishwakarma","middleName":"Lalman","phoneNo":"7666321805","password":"pass@123","confirmPassword":"pass@123","City":"Pune","State":"Maharashtra","pincode":"400603","address":"Thane Maharashtra","bloodGruop":"AB+","age":"26","COVIDVaccinationCertificate1":"COVID1","COVIDVaccinationCertificate1date":"2022-11-21","COVIDVaccinationCertificate2":"COVID2","COVIDVaccinationCertificate2date":"2022-11-23","firstVaccinationCityName":"Thane","secondVaccinationCityName":"Mumbai"}]')
	
	
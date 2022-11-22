const {
    check,
    body,
    oneOf
} = require('express-validator');
module.exports = function validate(method) {
    switch (method) {
        case 'userInfoValidate': {
            return [
                check('firstName').not().isEmpty().withMessage('firstName must not be empty'),
                check('lastName').not().isEmpty().withMessage('lastName must not be empty'),
                check('middleName').not().isEmpty().withMessage('MiddleName name must not be empty'),
                check('phoneNo').not().isEmpty().withMessage('PhoneNo must not be empty'),
                check('password').not().isEmpty().withMessage('password must not be empty'),
                check('confirmPassword').not().isEmpty().withMessage('confirmPassword must not be empty'),
                check('City').not().isEmpty().withMessage('City must not be empty'),
                check('State').not().isEmpty().withMessage('State must not be empty'),
                check('pincode').not().isEmpty().withMessage('Pincode must not be empty'),
                check('bloodGruop').not().isEmpty().withMessage('bloodGruop must not be empty'),
                check('age').not().isEmpty().withMessage('age must not be empty'),
                check('COVIDVaccinationCertificate1').not().isEmpty().withMessage('COVID Vaccination Certificate-1 must not be empty'),
                check('COVIDVaccinationCertificate1date').not().isEmpty().withMessage('COVID Vaccination Certificate 1 Date must not be empty'),
                check('COVIDVaccinationCertificate2').not().isEmpty().withMessage('COVID Vaccination Certificate 2 must not be empty'),
                check('COVIDVaccinationCertificate2date').not().isEmpty().withMessage('COVID Vaccination Certificate 2 Date must not be empty'),
                check('firstVaccinationCityName').not().isEmpty().withMessage('First Vaccination City Name must not be empty'),
                check('secondVaccinationCityName').not().isEmpty().withMessage('Second Vaccination City Name must not be empty'),
            ]
        }
      

        default: {
            return "No Validation Found"
        }


    }
}
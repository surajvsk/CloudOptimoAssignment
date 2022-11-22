const {
    check,
    body,
    oneOf
} = require('express-validator');
module.exports = function validate(method) {
    switch (method) {
        case 'userInfoValidate': {
            return [
                check('firstName').not().isEmpty().withMessage('First Name must not be empty'),
                check('lastName').not().isEmpty().withMessage('Last Name must not be empty'),
                check('middleName').not().isEmpty().withMessage('Middle Name name must not be empty'),
                check('phoneNo').not().isEmpty().withMessage('Phone No must not be empty'),
                check('password').not().isEmpty().withMessage('Password must not be empty'),
                check('confirmPassword').not().isEmpty().withMessage('Confirm Password must not be empty'),
                check('City').not().isEmpty().withMessage('City must not be empty'),
                check('State').not().isEmpty().withMessage('State must not be empty'),
                check('pincode').not().isEmpty().withMessage('Pincode must not be empty'),
                check('address').not().isEmpty().withMessage('Address must not be empty'),
                check('bloodGruop').not().isEmpty().withMessage('BloodGruop must not be empty'),
                check('age').not().isEmpty().withMessage('Age must not be empty').isNumeric().withMessage('Age must be number only'),
                check('COVIDVaccinationCertificate1').not().isEmpty().withMessage('COVID Vaccination Certificate-1 must not be empty'),
                check('COVIDVaccinationCertificate1date').not().isEmpty().withMessage('COVID Vaccination Certificate 1 Date must not be empty'),
                check('COVIDVaccinationCertificate2').not().isEmpty().withMessage('COVID Vaccination Certificate 2 must not be empty'),
                check('COVIDVaccinationCertificate2date').not().isEmpty().withMessage('COVID Vaccination Certificate 2 Date must not be empty'),
                check('firstVaccinationCityName').not().isEmpty().withMessage('First Vaccination City Name must not be empty'),
                check('secondVaccinationCityName').not().isEmpty().withMessage('Second Vaccination City Name must not be empty'),
                check("password")
                .notEmpty().withMessage("Password should not be empty"),
                check("confirmPassword")
                .notEmpty().withMessage("Confirm Password should not be empty")
                .custom((value, {
                    req
                }) => {
                    if (value !== req.body.password) {
                        throw new Error('Password confirmation does not match with password')
                    }
                    return true;
                })
            ]
        }


        default: {
            return "No Validation Found"
        }


    }
}
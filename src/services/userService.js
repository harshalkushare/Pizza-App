const { findUser, createUser } = require("../repositories/userRepository");
const { createcart } = require('../repositories/cartRepository');

async function registerUser(userDetails) {
    //1.we need to check this email or mobile number already exists or nor
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });
    
    //2.If we found user
    if (user) {
        throw { reason: 'User with the given email and mobile number already exist', statusCode: 400 }
    }

    //3.if not then create the user in the database
    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    });

    if (!newUser) {
        throw { reason: 'Something went wrong, cannot create user', statusCode: 500 }
    }

    //Create by default cart for created user
    await createcart(newUser._id)

    return newUser;
}


module.exports = {
    registerUser
}
class UserService {

    constructor(_userRepository) {
        //In the argument we will expect userRepository object
        this.userRepository = _userRepository;
    }

    async registerUser(userDetails) {
        //It will create a new user
        //we need to check this email or mobile number already exists or nor
        const user = await this.userRepository.findUser({
            email: userDetails.email,
            mobileNumber: userDetails.mobileNumber
        });

        if (user) {
            //we found a user
            throw { reason: 'User with the given email and mobile number already exist', statusCode: 400 }
        }

        //if not then create the user in the database
        const newUser = await this.userRepository.createUser({
            email: userDetails.email,
            password: userDetails.password,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            mobileNumber: userDetails.mobileNumber
        });

        if (!newUser) {
            throw { reason: 'Something went wrong, cannot create user', statusCode: 500 }
        }

        //returs the deatails of created user
        return newUser;
    }
}

module.exports = UserService;
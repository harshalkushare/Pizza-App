const AppError = require('./appError');

class UnAuthorisedError extends AppError {
    constructor(){ 
        super(`User is not Unauthorised properly ${invalidParams}`, 401);
    }
}

module.exports = UnAuthorisedError;
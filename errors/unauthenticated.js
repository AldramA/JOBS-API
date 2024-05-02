const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api');

class UnauthenticatedError extends CustomAPIError {
  constructor(message = 'Unauthenticated') {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    this.name = 'UnauthenticatedError'; 
  }
}

module.exports = UnauthenticatedError;

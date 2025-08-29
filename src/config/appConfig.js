const required = (name) => {
    if (!process.env[name]) {
      throw new Error(`Missing env var: ${name}`);
    }
    return process.env[name];
  };
  
  module.exports = {
    fullName: required('FULL_NAME').toLowerCase(),
    dobDDMMYYYY: required('DOB_DDMMYYYY'),
    email: required('EMAIL'),
    rollNumber: required('ROLL_NUMBER'),
  };
  
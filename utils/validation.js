export const validateName = (field, name) => {
  if (name.length === 0) {
    return `Input ${field} is required`;
  }
  if (name.length < 3) {
    return `Input ${field} must be min 3 character`;
  }

  if (name.length > 20) {
    return `Input ${field} must be max 20 character`;
  }

  if (!/^[A-Z]+$/i.test(name)) {
    return `Input ${field} must contain only alphabets`;
  }

  return "";
};

export const validateEmail = (email) => {
  if (email.length === 0) {
    return `Input Email is required`;
  }

  if (email.length < 10) {
    return `Input Email must be min 10 character`;
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return `Input Email is not valid email address`;
  }

  if (email.length > 30) {
    return `Input Email must be max 30 character`;
  }

  return "";
};

export const validatePhone = (phone) => {
  if (phone.length === 0) {
    return `Input Phone Number is required`;
  }

  if (!/^\d+$/.test(phone)) {
    return `Input Phone Number must contain only digits`;
  }

  if (phone.length < 10) {
    return `Input Phone Number must be min 10 character`;
  }

  if (phone.length > 16) {
    return `Input Phone Number must be max 16 character`;
  }

  return "";
};

export const validatePass = (pass) => {
  if (pass.length === 0) {
    return `Input Password is required`;
  }

  if (pass.length < 8) {
    return `Input Password must be min 8 character`;
  }

  if (pass.length > 12) {
    return `Input Password must be max 12 character`;
  }

  return "";
};

export const validateConfirmPass = (pass, confirm) => {
  if (confirm.length === 0) {
    return `Input Confirm Password is required`;
  }

  if (confirm.length < 8) {
    return `Input Confirm Password must be min 8 character`;
  }

  if (confirm.length > 12) {
    return `Input Confirm Password must be max 12 character`;
  }

  if (pass !== confirm) {
    return `Input Confirm Password must be the same as password field`;
  }

  return "";
};

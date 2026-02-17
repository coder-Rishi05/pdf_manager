import validator from "validator";

export const validateSignUpData = (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("all feilds are mandatory");
  }

  if (!validator.isEmail(email)) {
    throw new Error(" email is not valid Enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong enough enter a strong password");
  }
};

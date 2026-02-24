import validator from "validator";

export const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("all feilds are mandatory");
  }

  if (!validator.isEmail(email)) {
    throw new Error(" email is not valid Enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong enough enter a strong password");
  }
};

export const validateLoginData = (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("all feilds are mandatory");
  }
  if (!validator.isEmail(email)) {
    throw new Error(" email is not valid Enter a valid email");
  }
};

// export const validatePost = (req) =>{
//   const {imgUrl,caption} = req.body;

//   if()

// }

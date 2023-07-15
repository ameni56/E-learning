const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  matricule: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  verified: { type: Boolean, default: false },
  role: { type: String, enum: ['supadmin','admin', 'formateur', 'agent'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    matricule: Joi.string().required().label("Matricule"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    passwordConfirmation: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .label("Password Confirmation")
      .messages({
        "any.only": "Passwords do not match",
      }),
    role: Joi.string().valid('supadmin','admin','formateur', 'agent').label("Role"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };

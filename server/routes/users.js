const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { firstName, lastName, matricule, email, password,  passwordConfirmation, role } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({ message: "User with the given email already exists!" });
    }

    user = await User.findOne({ matricule });
    if (user) {
      return res.status(409).send({ message: "User with the given matricule already exists!" });
    }

    if (password !==  passwordConfirmation) {
      return res.status(400).send({ message: "Passwords do not match!" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    user = await new User({
      firstName,
      lastName,
      matricule,
      email,
      password: hashPassword,
      role,
    }).save();

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
    await sendEmail(user.email, "Verify Email", url);

    res.status(201).send({ message: "An email has been sent to your account, please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:id/verify/:token/", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send({ message: "Invalid link" });
    }

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(404).send({ message: "Invalid link" });
    }

    user.verified = true;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;

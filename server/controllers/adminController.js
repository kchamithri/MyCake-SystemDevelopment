import bcryptjs from "bcryptjs";
import Admin from "../models/adminSchema.js";

export const signUp = async (req, res) => {
  if (req.body.id) {
    if (req.body.password) {
      try {
        let hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        const created = await Admin.update(
          { _id: req.body.id },
          { $set: { password: hashedPassword } }
        );
        res.status(200).json({
          message: "Success",
        });
      } catch (error) {
        res.status(400).send(error);
      }
    } else {
      try {
        const created = await Admin.update(
          { _id: req.body.id },
          { $set: { email: req.body.email, name: req.body.name } }
        );
        res.status(200).json({
          message: "Success",
        });
      } catch (error) {
        res.status(400).send(error);
      }
    }
  } else {
    try {
      const createUser = new Admin({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      const created = await createUser.save();
      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

export const SignIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const admin = await Admin.findOne({ email: email });
    if (admin) {
      const isMatch = await bcryptjs.compare(password, admin.password);

      if (isMatch) {
        const token = await admin.generateToken();
        res.cookie("adminJWT", token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).json({
          message: "Success",
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
          },
        });
      } else {
        res.status(400).json({
          message: "Invalid Credentials",
        });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const AdminLogout = async (req, res) => {
  res.clearCookie("adminJWT", { path: "/" });
  res.status(200).json({
    message: "Success",
  });
};

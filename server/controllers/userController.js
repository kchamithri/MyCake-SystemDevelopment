import bcryptjs from "bcryptjs";
import Users from "../models/userSchema.js";
import Products from "../models/productSchema.js";
import Payment from "../models/paymentSchema.js";
import Orders from "../models/orderSchema.js";
import md5 from "crypto-js/md5.js";

export const signUp = async (req, res) => {
  if (req.body.id) {
    if (req.body.password) {
      try {
        let hashedPassword = bcryptjs.hashSync(req.body.password, 10);
        const created = await Users.update(
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
        const created = await Users.update(
          { _id: req.body.id },
          {
            $set: {
              email: req.body.email,
              name: req.body.name,
              contact: req.body.contact,
            },
          }
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
      const email = req.body.email;
      const password = req.body.password;
      const name = req.body.name;
      const contact = req.body.contact;

      const createUser = new Users({
        name: name,
        contact: contact,
        email: email,
        password: password,
      });

      const created = await createUser.save();

      const user = await Users.findOne({ email: email });
      res.status(200).json({
        message: "Success",
        userId: user._id,
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

    const user = await Users.findOne({ email: email });
    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);

      if (isMatch) {
        const token = await user.generateToken();
        res.cookie("userJWT", token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        });
        res.status(200).json({
          message: "Success",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
          },
        });
      } else {
        res.status(400).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const UserLogout = async (req, res) => {
  res.clearCookie("userJWT", { path: "/" });
  res.status(200).json({
    message: "Success",
  });
};

export const CelebrationCakes = async (req, res) => {
  try {
    const products = await Products.find({ category: "Cake", deleted: false });
    res.status(200).json({
      products: products,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const PartyPacks = async (req, res) => {
  try {
    const products = await Products.find({
      category: "Party Packs",
      deleted: false,
    });
    res.status(200).json({
      products: products,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const Checkout = async (req, res) => {
  try {
    const {
      userId,
      firstName,
      lastName,
      address,
      city,
      contact,
      deliverDate,
      deliverTime,
      message,
      senderName,
      senderContact,
      senderEmail,
      total,
      orderPlacedDate,
      status,
      products,
    } = req.body;
    let paymentstatus = "pending";
    const payment = await Payment.create({
      userId,
      orderPlacedDate,
      total,
      paymentstatus,
    });
    const createCart = await Orders.create({
      userId,
      firstName,
      lastName,
      address,
      city,
      contact,
      deliverDate,
      deliverTime,
      message,
      senderName,
      senderContact,
      senderEmail,
      orderPlacedDate,
      status,
      products,
    });
    const orderId = payment._id;
    const amount = payment.total;
    const merchantSecret =
      "MTQzODMyMTI0NTM1NzA3MTEwMjQ0MjMxMTg0OTIxNDI3OTM5ODU4";
    const merchantId = "1222544";
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormated = parseFloat(amount)
      .toLocaleString("en-us", { minimumFractionDigits: 2 })
      .replaceAll(",", "");
    const currency = "LKR";
    const hash = md5(
      merchantId + orderId + amountFormated + currency + hashedSecret
    )
      .toString()
      .toUpperCase();

    res.status(200).json({
      message: "success",
      createCart,
      payment,
      hash,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

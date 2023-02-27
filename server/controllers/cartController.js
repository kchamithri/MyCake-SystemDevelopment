import Cart from "../models/cartSchema.js";

export const AddToCart = async (req, res) => {
  try {
    const { user, product, quantity, total } = req.body;
    const createCart = await Cart.create({
      user,
      product,
      quantity,
      total,
    });

    res.status(200).json({
      message: "success",
      createCart,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const ViewCart = async (req, res) => {
  try {
    const { id } = req.body;
    const carts = await Cart.find({ user: id }).populate("product product");

    res.status(200).json({
      message: "success",
      carts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const DeleteCart = async (req, res) => {
  try {
    const cart = await Cart.deleteOne({ _id: req.body.id });
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

import Orders from "../models/orderSchema.js";

export const ViewOrders = async (req, res) => {
  if (req.body.userId) {
    try {
      const orders = await Orders.find({ userId: req.body.userId }).populate(
        "products.product"
      );
      res.status(200).json({
        message: "success",
        orders: orders,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      const orders = await Orders.find().populate("products.product");
      res.status(200).json({
        message: "success",
        orders,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

export const OrderStatusUpadate = async (req, res) => {
  try {
    const orders = await Orders.updateOne(
      { _id: req.body.id },
      { $set: { status: req.body.value } }
    );
    res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

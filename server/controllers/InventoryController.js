import Inventory from "../models/inventorySchema.js";
import NewBorrowedInventory from "../models/newBorrowedInventory.js";

export const AddInventory = async (req, res) => {
  try {
    const createInventory = new Inventory({
      name: req.body.name,
      reorderQuantity: req.body.reorderQuantity,
      total: req.body.total,
    });

    const created = await createInventory.save();
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const GetInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json({
      message: "success",
      inventory,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const DeleteInventory = async (req, res) => {
  try {
    const stock = await NewBorrowedInventory.deleteMany({
      inventoryType: req.body.id,
    });

    if (stock.acknowledged === true) {
      const inventory = await Inventory.deleteOne({ _id: req.body.id });
      res.status(200).json({
        message: "Success",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const UpdateInventory = async (req, res) => {};

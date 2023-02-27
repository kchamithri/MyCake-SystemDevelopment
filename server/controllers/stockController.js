import Stock from "../models/stockSchema.js";
import NewBorrowedInventory from "../models/newBorrowedInventory.js";

export const AddStock = async (req, res) => {
  try {
    const createInventory = new NewBorrowedInventory({
      inventoryType: req.body.inventoryType,
      updatedDate: req.body.updatedDate,
      supplierName: req.body.supplierName,
      borrowedQuantity: req.body.borrowedQuantity,
      expiryDate: req.body.expiryDate,
      status: req.body.status,
      expenditure: req.body.expenditure,
      description: req.body.description,
    });
    const created = await createInventory.save();

    if (created) {
      const createStock = new Stock({
        inventoryType: req.body.inventoryType,
        updatedDate: req.body.updatedDate,
        supplierName: req.body.supplierName,
        borrowedQuantity: req.body.borrowedQuantity,
        expiryDate: req.body.expiryDate,
        expenditure: req.body.expenditure,
        status: req.body.status,
        description: req.body.description,
      });

      const createdStock = await createStock.save();
      res.status(200).json({
        message: "Success",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const GetStocks = async (req, res) => {
  try {
    const stock = await Stock.find().populate("inventoryType supplierName");
    res.status(200).json({
      message: "success",
      stock,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const DeleteStock = async (req, res) => {
  try {
    const stock = await Stock.deleteOne({ _id: req.body.id });
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const TimelyAddStock = async (req, res) => {
  if (req.body.id) {
    try {
      const updateStock = await Stock.update({ _id: req.body.id }, req.body);
      res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    try {
      const createStock = new Stock({
        inventoryType: req.body.inventoryType,
        updatedDate: req.body.updatedDate,
        supplierName: req.body.supplierName,
        borrowedQuantity: req.body.borrowedQuantity,
        expiryDate: req.body.expiryDate,
        status: req.body.status,
        description: req.body.description,
      });

      const created = await createStock.save();
      res.status(200).json({
        message: "success",
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

import NewBorrowedInventory from "../models/newBorrowedInventory.js";

export const GetNewInventories = async (req, res) => {
  try {
    const stock = await NewBorrowedInventory.find().populate(
      "inventoryType supplierName"
    );
    res.status(200).json({
      message: "success",
      stock,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

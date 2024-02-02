const createError = require("http-errors");
const Record = require("../../models/record/record.modal");
const { recordValidationSchema } = require("../../helpers/validation_schema");
const APIFeatures = require("../../utils/apiFeatures/apiFeatures");

const createRecord = async (req, res) => {
  try {
    const result = await recordValidationSchema.validateAsync(req.body);
    const recordData = req.body;

    //create a new record instance
    const record = new Record(recordData);

    //save the record
    await record.save();

    //find total income/total expense
    if (recordData.type === "income" || recordData.type === "expense") {
      const incomes = await Record.find({ type: "income" });
      const expenses = await Record.find({ type: "expense" });

      let totalIncome = 0;
      let totalExpenses = 0;

      for (let income of incomes) {
        totalIncome += income.amount;
      }

      for (const expense of expenses) {
        totalExpenses += expense.amount;
      }

      const netIncome = totalIncome - totalExpenses;

      console.log(totalIncome, totalExpenses, netIncome);
    }
    return res.json({ msg: "succefully added record" });
  } catch (error) {
    // Handle specific errors separately, log them, and send an appropriate response
    console.error("Error creating record:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the record" });
  }
};

const getAllRecord = async (req, res) => {
  try {
    //Execute query
    const features = new APIFeatures(Record.find(), req.query)
      .filter()
      .sort()
      .paginate()
      .limitFields();
    const recordResult = await features.query;

    //Send Response
    return res.status(200).json({
      status: "success",
      result: recordResult.length,
      data: recordResult,
    }); // Return the fetched records as a JSON response
  } catch (error) {
    console.error("Error getting record:", error);
    return res
      .status(404)
      .json({ error: "An error occurred while getting the record" });
  }
};

const getRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({
      status: "success",
      data: record,
    });
  } catch (error) {
    return res.status(404).json({ error: "An error occurred getting record" });
  }
};

const updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ status: "success", data: record });
  } catch (error) {
    return res.status(404).json({ error: "An error occurred updating record" });
  }
};

const deleteRecord = async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);

    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    return res.status(500).json({ error: "An error occurred deleting record" });
  }
};

module.exports = {
  createRecord,
  getAllRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};

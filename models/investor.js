const { model, Schema } = require("mongoose");

const InvestSchema = new Schema(
  {
    Amount: { type: Number, required: true },
    Rate: { type: Number, required: true },
    Years: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const InvestmentModel = new model("invest", InvestSchema);

module.exports = InvestmentModel;

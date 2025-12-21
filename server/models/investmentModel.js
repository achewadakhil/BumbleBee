import mongoose, { Schema } from "mongoose";

const investmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    adId: {
      type: Schema.Types.ObjectId,
      ref: "vendorAds",
      required: true,
    },
    invested_amount: {
      type: Number,
      required: true,
      min: 1,
    },
    equity_percent: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const investmentModel = mongoose.model("investments", investmentSchema);
export default investmentModel;

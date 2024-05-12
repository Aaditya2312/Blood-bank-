const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema(
    {
        inventoryType: {
            type: String,
            required: [true, "inventory type require"],
            enum: ["in", "out"],
        },
        bloodGroup: {
            type: String,
            required: [true, "blood group required"],
            enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"]
        },
        gender: {
            type: String,
            required: function () {
                return this.inventoryType === "in"
            },
            enum: ["male", "female"] // Allowed gender values
        },
        weight: {
            type: Number,
            required: function () {
                return this.inventoryType === "in"
            }
        },
        quantity: {
            type: Number,
            required: [true, "blood quantity is required"]
        },
        email: {
            type: String,
            required: [true, "Donar Email is Required"]
        },
        organisation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "organisation is required"]
        },
        hospital: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: function () {
                return this.inventoryType === "out"
            }
        },
        donar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: function () {
                return this.inventoryType === "in"
            }
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Inventory", inventorySchema)
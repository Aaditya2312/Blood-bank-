const mongoose = require("mongoose")
const inventoryModel = require("../models/inventoryModel")
const userModel = require("../models/userModel")

const createInventoryController = async (req, res) => {
    try {
        const { ID, email, organisation, inventoryType, bloodGroup, weight, gender, quantity } = req.body;
        console.log(ID)
        console.log(gender)
        console.log(weight)

        // Validation: Find user by ID
        const user = await userModel.findOne({ ID });
        if (!user) {
            throw new Error("User Not Found");
        }
        if (inventoryType === "in" && weight < 50) {
            throw new Error("Weight is not appropriate for donation");
        }

        if (inventoryType === 'out') {
            const requestedBloodGroup = bloodGroup;
            const requestedQuantityOfBlood = quantity;

            // Calculate total donated quantity only if the user is a donor
            let donatedQuantity = 0;
            if (user.role === 'donar') {
                const totalDonated = await inventoryModel.aggregate([
                    {
                        $match: {
                            donar: user._id,
                            inventoryType: 'in',
                            bloodGroup
                        }
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: '$quantity' }
                        }
                    }
                ]);
                donatedQuantity = totalDonated.length > 0 ? totalDonated[0].total : 0;
            }

            // Calculate total available quantity
            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation: new mongoose.Types.ObjectId(organisation),
                        inventoryType: 'in',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ]);
            const totalIn = totalInOfRequestedBlood.length > 0 ? totalInOfRequestedBlood[0].total : 0;

            const totalOutOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation: new mongoose.Types.ObjectId(organisation),
                        inventoryType: 'out',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ]);
            const totalOut = totalOutOfRequestedBlood.length > 0 ? totalOutOfRequestedBlood[0].total : 0;

            // Calculate available quantity
            const availableQuantityOfBlood = totalIn - totalOut;

            // Check if requested quantity exceeds total donated quantity
            if (user.role === 'donar' && requestedQuantityOfBlood > donatedQuantity) {
                return res.status(400).send({
                    success: false,
                    message: 'Requested quantity exceeds total donated quantity'
                });
            }

            // Check if requested quantity exceeds available quantity
            if (requestedQuantityOfBlood > availableQuantityOfBlood) {
                return res.status(400).send({
                    success: false,
                    message: `Only ${availableQuantityOfBlood}ML of ${requestedBloodGroup.toUpperCase()} is available`
                });
            }

            // Set hospital ID if inventory type is "out", otherwise set donor ID
            // const userId = inventoryType === 'out' ? user._id : null;
            let userId;
            if (user.role === 'hospital' && inventoryType === 'out') {
                userId = user._id; // Use hospital ID for "out" records when user is a hospital
            } else {
                userId = user.role === 'donar' ? user._id : null; // Use donor ID for donors, null otherwise
            }
            //         const inventory = new inventoryModel({
            //             email,
            //             organisation: new mongoose.Types.ObjectId(organisation),
            //             donar: userId,
            //             hospital: userId,
            //             inventoryType,
            //             bloodGroup,
            //             quantity
            //         });
            //         await inventory.save();

            //         return res.status(201).send({
            //             success: true,
            //             message: 'New Blood Record Added'
            //         });
            //     }
            // } catch (error) {
            //     console.log(error);
            //     return res.status(500).send({
            //         success: false,
            //         message: 'Error in inventory API',
            //         error
            //     });
            // }


            // Save record
            const inventory = new inventoryModel({
                email,
                organisation: new mongoose.Types.ObjectId(organisation),
                donar: userId,
                hospital: userId,
                inventoryType,
                bloodGroup,
                quantity
            });
            await inventory.save();

            return res.status(201).send({
                success: true,
                message: 'New Blood Record Added'
            });
        } else {
            // If inventory type is not "out", set the donor ID and save the record
            const inventory = new inventoryModel({
                email,
                organisation: new mongoose.Types.ObjectId(organisation),
                donar: user._id,
                inventoryType,
                weight,
                gender,
                bloodGroup,
                quantity
            });
            await inventory.save();

            return res.status(201).send({
                success: true,
                message: 'New Blood Record Added'
            });
        }
    } catch (error) {
        let errorMessage;
        if (error.message === "User Not Found") {
            errorMessage = "User not found. Please check the provided ID.";
        } else if (error.message === "Weight is not appropriate for donation") {
            errorMessage = "Weight is not appropriate for donation. Please ensure weight is at least 50.";
        } else {
            // Handle other errors
            errorMessage = "An error occurred. Please try again later.";
        }
        console.error(error);
        return res.status(400).send({ success: false, message: errorMessage });
    }

    //     try {
    //         const { email, organisation, donar, inventoryType, bloodGroup, quantity  } = req.body
    //         //validation
    //         const user = await userModel.findOne({ email })
    //         if (!user) {
    //             throw new Error("User Not Found");
    //         }
    //         if (inventoryType === "in" && user.role !== "donar") {
    //             throw new Error("Not a donar account");
    //         }
    //         if (inventoryType === "out" && user.role !== "hospital") {
    //             throw new Error("Not a hospital");
    //         }
    //         if (inventoryType === 'out') {
    //             const requestedBloodGroup = bloodGroup
    //             const requestedQuantityOfBlood = quantity
    //             const organisation = new mongoose.Types.ObjectId(req.body.userId);
    //             //calculator
    //             const totalInOfRequestedBlood = await inventoryModel.aggregate([
    //                 {
    //                     $match: {
    //                         organisation,
    //                         inventoryType: 'in',
    //                         bloodGroup: requestedBloodGroup
    //                     }
    //                 }, {
    //                     $group: {
    //                         _id: '$bloodGroup',
    //                         total: { $sum: '$quantity' }
    //                     }
    //                 }
    //             ])
    //             // console.log("Total In", totalInOfRequestedBlood)
    //             const totalIn = totalInOfRequestedBlood[0]?.total || 0
    //             //calculate OUT Blood Quantity

    //             const totalOutOfRequestedBlood = await inventoryModel.aggregate([
    //                 {
    //                     $match: {
    //                         organisation,
    //                         inventoryType: 'out',
    //                         bloodGroup: requestedBloodGroup
    //                     }
    //                 },
    //                 {
    //                     $group: {
    //                         _id: '$bloodGroup',
    //                         total: { $sum: '$quantity' }
    //                     }
    //                 }
    //             ])
    //             const totalOut = totalOutOfRequestedBlood[0]?.total || 0

    //             //in & out calc
    //             const availableQuantityOfBlood = totalIn - totalOut

    //             if (availableQuantityOfBlood < requestedQuantityOfBlood) {
    //                 return res.status(500).send({
    //                     success: false,
    //                     message: `Only ${availableQuantityOfBlood}ML of ${requestedBloodGroup.toUpperCase()} is available`
    //                 })
    //             }
    //             req.body.hospital = user?._id

    //         } else {
    //             req.body.donar = user?._id
    //         }

    //         //save record
    //         const inventory = new inventoryModel(req.body);
    //         await inventory.save();
    //         return res.status(201).send({
    //             success: true,
    //             message: "New Blood Reocrd Added",
    //         });
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(500).send({
    //             success: false,
    //             message: "Error in inventory API",
    //             error
    //         })
    //     }
}

//Get All Blood Records
const getInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation: req.body.userId
        }).populate("donar")
            .populate("hospital")
            .sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "Got all records successfully",
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error to get all inventory',
            error
        })
    }

}
const getInventoryHospitalController = async (req, res) => {
    try {
        const inventory = await inventoryModel
            .find(req.body.filters)
            .populate("donar")
            .populate("hospital")
            .populate("organisation")
            .sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: "Get hospital consumer records successfully",
            inventory,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error to get consumer inventory',
            error
        })
    }
}

//Get Blood Records of 3
const getRecentInventoryController = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
            organisation: req.body.userId
        }).limit(3).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            message: 'recent Inventory Data',
            inventory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in recent inventory API',
            error
        })
    }
}
//Get Donor Records
const getDonarsController = async (req, res) => {
    try {
        const organisation = req.body.userId
        //find donors
        const donorId = await inventoryModel.distinct('donar', {
            organisation,
        })
        // console.log(donorId)
        const donars = await userModel.find({ _id: { $in: donorId } })
        return res.status(200).send({
            success: true,
            message: "Donor records fetched successfully",
            donars
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Donor Records',
            error
        })

    }
}

const getHospitalController = async (req, res) => {
    try {
        const organisation = req.body.userId
        //Get Hospital Id
        const hospitalId = await inventoryModel.distinct("hospital", {
            organisation
        })
        //Find Hospital
        const hospitals = await userModel.find({
            _id: { $in: hospitalId }
        })
        return res.status(200).send({
            success: true,
            message: 'Hospitals Data Fetched Successfully',
            hospitals
        })
    } catch (error) {
        console.log(error)
        return res.status(200).send({
            success: false,
            message: 'Error in getting Hospital API',
            error
        })
    }
}

//Get ORG Profiles
const getOrganisation = async (req, res) => {
    try {
        const donar = req.body.userId
        const orgId = await inventoryModel.distinct("organisation", { donar })

        const organisations = await userModel.find({
            _id: { $in: orgId }
        })
        return res.status(200).send({
            success: true,
            message: "ORG Data fetched successfully",
            organisations
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in ORG API',
            error
        })
    }

}

//Get ORG For Hospital
const getOrganisationForHospitalController = async (req, res) => {
    try {
        const hospital = req.body.userId
        const orgId = await inventoryModel.distinct("organisation", { hospital })

        const organisations = await userModel.find({
            _id: { $in: orgId }
        })
        return res.status(200).send({
            success: true,
            message: "Hospital ORG Data fetched successfully",
            organisations
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Hospital ORG API',
            error
        })
    }

}

module.exports = { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisation, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController }
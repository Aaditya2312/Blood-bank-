const inventoryModel = require("../models/inventoryModel")
const userModel = require("../models/userModel")

//Get Donor List
const getDonarsListController = async (req, res) => {
    try {
        const donarData = await userModel.find({ role: 'donar' }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            Totalcount: donarData.length,
            message: "Donar List fetched successfully",
            donarData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Donar List',
            error
        })
    }
}

//Get Hospital List
const getHospitalListController = async (req, res) => {
    try {
        const hospitalData = await userModel.find({ role: 'hospital' }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            Totalcount: hospitalData.length,
            message: "Hospital List fetched successfully",
            hospitalData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Hospital List',
            error
        })
    }
}

//Get Organisation List
const getOrgListController = async (req, res) => {
    try {
        const orgData = await userModel.find({ role: 'organisation' }).sort({ createdAt: -1 })
        return res.status(200).send({
            success: true,
            Totalcount: orgData.length,
            message: "ORG List fetched successfully",
            orgData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in ORG List',
            error
        })
    }
}

const getInventoryForAdmin = async (req, res) => {
    try {
        const inventory = await inventoryModel.find({
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

//===============
//Delete Donor
const deleteDonar = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: 'Record deleted successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in deleting record',
            error
        })
    }
}


module.exports = { getDonarsListController, getHospitalListController, getOrgListController, getInventoryForAdmin, deleteDonar }
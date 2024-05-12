const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDonarsListController, getHospitalListController, getOrgListController, deleteDonar, getInventoryForAdmin } = require('../controllers/adminController')
const adminMiddleware = require('../middlewares/adminMiddleware')

//router object
const router = express.Router()

//Routes

//GET || DONAR LIST
router.get('/donar-list', authMiddleware, adminMiddleware, getDonarsListController)

//GET || HOSPITAL LIST
router.get('/hospital-list', authMiddleware, adminMiddleware, getHospitalListController)

//GET || ORG LIST
router.get('/org-list', authMiddleware, adminMiddleware, getOrgListController)

//GET || ORG INVENTORY
router.get('/org-inventory', authMiddleware, adminMiddleware, getInventoryForAdmin)

//====================
//Delete Donar || Get
router.delete('/delete-donar/:id', authMiddleware, adminMiddleware, deleteDonar)

//Export
module.exports = router
const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/*****************************
 * Build inventory by classification view
 *******************************/
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationId
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

invCont.buildByInventoryId = async function (req, res, next) {
    const inv_id = req.params.inventoryId
    const data = await invModel.getDetailsByInventoryId(inv_id)
    const grid = await utilities.buildVehicleIdGrid(data)
    const carName = data[0].inv_make + " " + data[0].inv_model
    let nav = await utilities.getNav()
    res.render("./inventory/detail", {
        title: carName + " details",
        nav,
        grid,
    })
}

invCont.buildError = async function (req, res, next) {
    const footer = req.params.footerPartial
    const problem = await invModel.getNothing()
    res.render("./partials/footer", {})
}

module.exports = invCont
const express = require('express')
const router = express.Router();
const ProvinceController = require('../../controllers/ProvinceController')
const checkApiKey = require('../../middlewares/checkApiKey')

router.route('/provinces')
    .get(checkApiKey, ProvinceController.index)
    .post(checkApiKey, ProvinceController.insert)
    .put(checkApiKey, ProvinceController.update)
    .delete(checkApiKey, ProvinceController.delete)

router.route('/provinces/:id')
    .get(checkApiKey, ProvinceController.show)

module.exports = router
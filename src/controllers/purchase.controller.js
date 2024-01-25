const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');

const getAll = catchError(async(req, res) => {
    const { id } = req.user;
    const purchases = await Purchase.findAll( 
        { include: [Product],
           where: { userId: id }  
        }
    );
    return res.json(purchases);
});

module.exports = {
    getAll
}
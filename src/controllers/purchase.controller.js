const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');

const getAll = catchError(async(req, res) => {
    const { id } = req.user;
    const purchases = await Purchase.findAll( 
        { include: [Product],
           where: { userId: id }  
        }
    );
    return res.json(purchases);
});

const create = catchError(async(req,res) => {
    const { id: userId } = req.user; 
    const productscart = await ProductCart.findAll({
        where: {userId},
        attributes: ['quantity', 'userId', 'productId'],
        raw: true,
    });
    const purchases = await Purchase.bulkCreate(productscart);
    await ProductCart.destroy({ where: {userId}});
    return res.json(purchases)

    /* const { id } = req.user;
    const productcarts = await ProductCart.findAll({ where: {userId: id}})
    if(!productcarts) return res.json({error: 'No hay productos en el carrito'})
    productcarts.map(async(product) => {
        await Purchase.create({
            quantity: product.quantity,
            userId: product.userId,
            productId: product.productId,
        });
        
        await product.destroy();
        
    });

    return res.json({msg: 'productos comprados'}) */
     
})

module.exports = {
    getAll,
    create,
}
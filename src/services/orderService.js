const { getCartByUserId, clearCart } = require('../repositories/cartRepository');
const BadRequestError = require('../utils/BadRequestError');
const NotFoundError = require('../utils/notFoundError');
const { createNewOrder } = require('../repositories/orderRepository');
const InternalServerError = require('../utils/internalServerError');
const { findUser } = require('../repositories/userRepository');

async function createOrder(userId, paymentMethod) {
    const cart = await getCartByUserId(userId);
    console.log(cart);
    
    const user = await findUser({ _id: cart.user });
    console.log(user);
     

    if (!cart) {
        throw new NotFoundError('Cart');
    }

    if (cart.items.length === 0) {
        throw new BadRequestError(["Cart is empty please add some items to the cart"]);
    }

    const orderObject = {};

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartiteam => {
        return { product: cartiteam.product._id, quantity: cartiteam.quantity }
    });

    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((cartItem) => {
        orderObject.totalPrice += cartItem.quantity * cartItem.product.price;
    });

    orderObject.address = user.address;
    orderObject.paymentMethod = paymentMethod;

    const order = createNewOrder(orderObject);

    if (!order) {
        throw new InternalServerError();
    }

    await clearCart(userId);

    return order;
}

module.exports = {
    createOrder
}
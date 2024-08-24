const { createOrder, getAllOrdersCreatedByUser, getOrderDetailsById, updateOrder } = require("../services/orderService");
const AppError = require("../utils/appError");

async function createNewOrder(req, res) {
    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod);
        return res.status(201).json({
            success: true,
            message: 'Successfully created the order',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function getAllOrdersByUser(req, res) {
    try {
        const order = await getAllOrdersCreatedByUser(req.user.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the orders',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function getOrder(req, res) {
    try {
        const order = await getOrderDetailsById(req.params.orderId);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the order',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function cancelOrder(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, "CANCELLED");
        return res.status(200).json({
            success: true,
            message: 'Successfully updated the order',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function changeOrderStatus(req, res) {
    try {
        const order = await updateOrder(req.params.orderId, req.body.status);
        return res.status(200).json({
            success: true,
            message: 'Successfully updated the order2',
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.reason,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

module.exports = {
    createNewOrder,
    getAllOrdersByUser,
    getOrder,
    cancelOrder,
    changeOrderStatus
}
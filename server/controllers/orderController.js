const Order = require("../models/orders");
const Product = require("../models/products");
const Farm = require("../models/farms");

const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      if (!item.product) {
        return res.status(400).json({
          success: false,
          message: "Product ID is missing",
        });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.name || item.product}`,
        });
      }

      if (product.isActive === false) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is not active`,
        });
      }

      if (product.isAvailable === false) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is currently unavailable`,
        });
      }

      const quantity = Number(item.quantity);

      if (!quantity || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for ${product.name}`,
        });
      }

      if (product.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.quantity} ${
            product.unit || "kg"
          } available for ${product.name}`,
        });
      }

      const price = Number(product.price);

      totalAmount += price * quantity;

      processedItems.push({
        product: product._id,
        farmer: product.farmer,
        name: product.name,
        price: price,
        quantity: quantity,
        unit: product.unit || "kg",
        image:
          product.image ||
          (product.images && product.images.length > 0
            ? product.images[0]
            : ""),
      });
    }

    // Generate unique order number
    const now = new Date();

    const datePart =
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");

    const randomPart = Math.floor(
      100000 + Math.random() * 900000
    );

    const orderNumber =
      `FC-${datePart}-${randomPart}`;

    // Create order
    const order = await Order.create({
      orderNumber,
      buyer: req.user._id,
      items: processedItems,
      totalAmount,
      status: "Pending",
      paymentMethod:
        paymentMethod || "Cash on Delivery",
      paymentStatus: "Pending",
    });

    // Update product stock
    for (const item of processedItems) {
      const product = await Product.findById(item.product);

      if (!product) {
        continue;
      }

      product.quantity -= item.quantity;

      if (product.quantity <= 0) {
        product.quantity = 0;
        product.isAvailable = false;
      }

      await product.save();
    }

    // Get complete order
    const populatedOrder = await Order.findById(order._id)
      .populate("buyer", "name email phone")
      .populate("items.farmer", "name email phone")
      .populate(
        "items.product",
        "name price unit image"
      );

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: populatedOrder,
    });

  } catch (error) {
    console.error("Create order error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Order number already exists. Please try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      buyer: req.user._id,
    })
      .populate("items.farmer", "name email phone")
      .populate(
        "items.product",
        "name price unit image"
      )
      .sort({ createdAt: -1 });

    const ordersWithFarmDetails = await Promise.all(
      orders.map(async (order) => {
        const orderObject = order.toObject();

        orderObject.items = await Promise.all(
          orderObject.items.map(async (item) => {
            if (!item.farmer?._id) {
              return item;
            }

            const farm = await Farm.findOne({
              farmer: item.farmer._id,
            }).select(
              "farmName description location district address contactNumber"
            );

            return {
              ...item,
              farm: farm || null,
            };
          })
        );

        return orderObject;
      })
    );

    return res.status(200).json({
      success: true,
      count: ordersWithFarmDetails.length,
      orders: ordersWithFarmDetails,
    });

  } catch (error) {
    console.error("Get buyer orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      "items.farmer": req.user._id,
    })
      .populate("buyer", "name email phone")
      .populate(
        "items.product",
        "name price unit image"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get farmer orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch farmer orders",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate(
        "buyer",
        "name email phone profileImage"
      )
      .populate(
        "items.farmer",
        "name email phone"
      )
      .populate(
        "items.product",
        "name price unit image"
      );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isBuyer =
      order.buyer &&
      order.buyer._id.toString() ===
        req.user._id.toString();

    const isFarmer = order.items.some(
      (item) =>
        item.farmer &&
        item.farmer._id.toString() ===
          req.user._id.toString()
    );

    const isAdmin =
      req.user.role === "admin";

    if (!isBuyer && !isFarmer && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied to this order",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Get order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const isFarmer = order.items.some(
      (item) =>
        item.farmer.toString() ===
        req.user._id.toString()
    );

    const isAdmin =
      req.user.role === "admin";

    if (!isFarmer && !isAdmin) {
      return res.status(403).json({
        success: false,
        message:
          "Only farmers or admins can update order status",
      });
    }

    if (status) {
      order.status = status;
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    const updatedOrder =
      await Order.findById(order._id)
        .populate(
          "buyer",
          "name email phone"
        )
        .populate(
          "items.farmer",
          "name email phone"
        );

    return res.status(200).json({
      success: true,
      message: "Order status updated",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Update order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate(
        "buyer",
        "name email phone"
      )
      .populate(
        "items.farmer",
        "name email phone"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {
    console.error("Get all orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getBuyerOrders,
  getFarmerOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
};
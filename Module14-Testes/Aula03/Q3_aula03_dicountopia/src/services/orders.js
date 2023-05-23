const { createError } = require("../errors");
const orderItemsRepo = require("../repositories/orderItems");
const ordersRepo = require("../repositories/orders");
const productsRepo = require("../repositories/products");
const applicableCategoriesRepo = require("../repositories/applicableCategories");
const orderDiscountsRepo = require("../repositories/orderDiscounts");
const discountCodesRepo = require("../repositories/discountCodes");
const { validatePositiveIntegerNumber } = require("../validators");

/**
 * @param {number} order_id - id of the order
 * @param {number} user_id - id of the user who is requesting the order items
 */
async function getOrderItemsByOrderId(order_id, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  return orderItemsRepo.getOrderItemsByOrderId(order_id);
}

/**
 * @param {number} order_id - id of the order
 * @param {number} product_id - id of the product to be updated inside the order
 * @param {number} quantity - the new quantity of the product inside the order
 * @param {number} user_id - id of the user who is requesting the update
 */
async function updateOrderItem(order_id, product_id, quantity, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
    7;
  }

  const product = await productsRepo.getProductById(product_id);

  if (product === null) {
    throw createError("NotFoundError", `Product ${product_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  const orderItems = await orderItemsRepo.getOrderItemsByOrderId(order_id);

  const productInOrder = orderItems.find(
    (orderItem) => orderItem.product_id === product_id
  );

  if (productInOrder === undefined) {
    throw createError(
      "NotFoundError",
      `Product ${product_id} was not found in order ${order_id}`
    );
  }

  await orderItemsRepo.updateOrderItem(order_id, product_id, quantity);
}

/**
 * @param {number} order_id - id of the order
 * @param {number} user_id - id of the user who is requesting to add the discount code
 * @returns {Promise<DiscountCode[]>}
 */
async function getOrderDiscountCodesByOrderId(order_id, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  const discountCodes = await orderDiscountsRepo.getOrderDiscountCodesByOrderId(
    order_id
  );

  return discountCodes;
}

/**
 * @param {number} order_id - id of the order
 * @param {string} code - the code of the discount code
 * @param {number} user_id - id of the user who is requesting to add the discount code
 * @returns {Promise<void>}
 * @throws {Error}
 */
async function addOrderDiscountCodeToOrderByCode(order_id, code, user_id) {
  // TODO
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} doesnt have access to order ${order_id}`
    );
  }

  if (order.confirmed) {
    throw createError("ForbiddenError", `Order ${order_id} is already closed`);
  }

  const discountCode = await discountCodesRepo.getDiscountCodeByCode(code);

  if (discountCode === null) {
    throw createError("NotFoundError", `Code ${code} was not found`);
  }

  const currentDate = new Date();

  const expirationDate = new Date(discountCode.expiration_date);

  if (currentDate >= expirationDate) {
    throw createError("ForbiddenError", `Discount code ${code} is expired`);
  }

  const allItems =
    await orderItemsRepo.getOrderItemsWithProductInformationByOrderId(order_id);

  if (discountCode.minimum_order_value !== null) {
    const totalCartPriceWithoutDiscount = allItems.reduce(
      (acc, item) => acc + item.product_price * item.quantity,
      0
    );

    if (totalCartPriceWithoutDiscount < discountCode.minimum_order_value) {
      throw createError(
        "ForbiddenError",
        `The total amount of the order (disregarding any discounts) is less than the minimum amount where ${code} can be used`
      );
    }
  }

  const appCategories =
    await applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId(
      discountCode.id
    );
  //
  //----
  if (appCategories.length > 0) {
    const hasLeastCategoryIdEqual = allItems.some((product) =>
      appCategories.some((cat) => cat.id === product.product_category_id)
    );

    if (!hasLeastCategoryIdEqual) {
      throw createError(
        "ForbiddenError",
        `Discount code ${code} cannot be used as it is specific to some product categories, but no products in the order belong to any of these categories`
      );
    }
  }

  const discountCodesUsedByUser =
    await orderDiscountsRepo.getOrderDiscountCodesByUserId(user_id);

  const discountCodeHasAlreadyInOrder = discountCodesUsedByUser.find(
    (discount) => discount.code === code
  );

  if (discountCodeHasAlreadyInOrder !== undefined) {
    throw createError(
      "ForbiddenError",
      `Discount code ${code} has already been used by the user`
    );
  }

  await orderDiscountsRepo.addDiscountCodeToOrder(order_id, discountCode.id);
}

module.exports = {
  getOrderItemsByOrderId,
  getOrderDiscountCodesByOrderId,
  updateOrderItem,
  addOrderDiscountCodeToOrderByCode,
};

// unit testing to service POST /orders/:order_id/discount-codes
// first call mock to change repositories functions
jest.mock("../../src/repositories/orders");
jest.mock("../../src/repositories/discountCodes");
jest.mock("../../src/repositories/orderItems");
jest.mock("../../src/repositories/applicableCategories");
jest.mock("../../src/repositories/orderDiscounts");

// Import the function that is the focus of the unit test
const ordersService = require("../../src/services/orders");

const ordersRepo = require("../../src/repositories/orders");
const discountCodesRepo = require("../../src/repositories/discountCodes");
const orderItemsRepo = require("../../src/repositories/orderItems");
const applicableCategoriesRepo = require("../../src/repositories/applicableCategories");
const orderDiscountsRepo = require("../../src/repositories/orderDiscounts");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Service addOrderDiscountCodeToOrderByCode", () => {
  //
  it("Should add discount code to order by code", async () => {
    //parameters to service function
    const _USER_ID = 1;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: _USER_ID,
      confirmed: false,
      created_at: "2023-01-01",
    };

    const DISCOUNT_CODE_ID = 111;
    const DISCOUNT_CODE_CODE = "OFF50CODE";
    const DISCOUNT_VALUE = 50;
    const DISCOUNT_TYPE = "percentage";
    const DISCOUNT_EXPIRATION_DATE = "2024-01-01";
    const DISCOUNT_MINIMUM_ORDER_VALUE = null;

    const ORDER_ITEMS_LIST = [
      {
        order_id: ORDER.id,
        product_id: 123,
        quantity: 1,
        product_name: "ProductA",
        product_price: 200,
        product_category_id: 1,
      },
    ];

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: DISCOUNT_CODE_ID,
      code: DISCOUNT_CODE_CODE,
      value: DISCOUNT_VALUE,
      type: DISCOUNT_TYPE,
      expiration_date: DISCOUNT_EXPIRATION_DATE,
      minimum_order_value: DISCOUNT_MINIMUM_ORDER_VALUE,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue(ORDER_ITEMS_LIST);

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockResolvedValue([]);

    jest
      .mocked(orderDiscountsRepo.getOrderDiscountCodesByUserId)
      .mockResolvedValue([]);

    jest.mocked(orderDiscountsRepo.addDiscountCodeToOrder);

    await ordersService.addOrderDiscountCodeToOrderByCode(
      _ORDER_ID,
      _CODE,
      _USER_ID
    );

    expect(
      jest.mocked(orderDiscountsRepo.addDiscountCodeToOrder)
    ).toBeCalledTimes(1);

    expect(
      jest.mocked(orderDiscountsRepo.addDiscountCodeToOrder)
    ).toBeCalledWith(ORDER.id, DISCOUNT_CODE_ID);
  });

  /**
   * @typedef {Error} NotFoundError
   * @property {string} name
   * @property {string} message
   * @throws {NotFoundError} - hope that the function throw a error: "NotFoundError".
   */

  it("Should throw an error if order doesnt exist", async () => {
    //parameters to service function
    const _USER_ID = 1;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(null);

    //first way to test - use toMatchObject
    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({ name: "NotFoundError" });

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      message: `Order ${_ORDER_ID} was not found`,
    });

    //second way - use use try-catch block
    try {
      await ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );

      fail("The function does not throw an exception about Order not found");
    } catch (error) {
      const notFoundError = /** @type {NotFoundError} */ (error);
      expect(notFoundError.name).toBe("NotFoundError");
      expect(notFoundError.message).toBe(`Order ${_ORDER_ID} was not found`);
    }
  });

  it("Should throw an error if user is not order owner", async () => {
    const _USER_ID = 2;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: 2000000,
      confirmed: false,
      created_at: "2023-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `User ${_USER_ID} doesnt have access to order ${_ORDER_ID}`,
    });
  });

  it("Should throw an error if the order is already confirmed", async () => {
    const _USER_ID = 2;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: _USER_ID,
      confirmed: true,
      created_at: "2023-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `Order ${_ORDER_ID} is already closed`,
    });
  });

  it("Should throw an error if the discount code does not exist", async () => {
    const _USER_ID = 1;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: _USER_ID,
      confirmed: false,
      created_at: "2023-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    jest
      .mocked(discountCodesRepo.getDiscountCodeByCode)
      .mockResolvedValue(null);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      name: "NotFoundError",
      message: `Code ${_CODE} was not found`,
    });
  });

  it("Should throw an error if the discount code has already expired", async () => {
    const _USER_ID = 1;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: _USER_ID,
      confirmed: false,
      created_at: "2023-01-01",
    };

    const DISCOUNT_CODE_ID = 111;
    const DISCOUNT_CODE_CODE = "OFF50CODE";
    const DISCOUNT_VALUE = 50;
    const DISCOUNT_TYPE = "percentage";
    const DISCOUNT_EXPIRATION_DATE = "2020-01-01";
    const DISCOUNT_MINIMUM_ORDER_VALUE = null;

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: DISCOUNT_CODE_ID,
      code: DISCOUNT_CODE_CODE,
      value: DISCOUNT_VALUE,
      type: DISCOUNT_TYPE,
      expiration_date: DISCOUNT_EXPIRATION_DATE,
      minimum_order_value: DISCOUNT_MINIMUM_ORDER_VALUE,
    });

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `Discount code ${_CODE} is expired`,
    });
  });

  it("Should throw an error if total order is less than minimum of discount code", async () => {
    //parameters to service function
    const _USER_ID = 1;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: _USER_ID,
      confirmed: false,
      created_at: "2023-01-01",
    };

    const DISCOUNT_CODE_ID = 111;
    const DISCOUNT_CODE_CODE = "OFF50CODE";
    const DISCOUNT_VALUE = 50;
    const DISCOUNT_TYPE = "percentage";
    const DISCOUNT_EXPIRATION_DATE = "2024-01-01";
    const DISCOUNT_MINIMUM_ORDER_VALUE = 400;

    const ORDER_ITEMS_LIST = [
      {
        order_id: ORDER.id,
        product_id: 123,
        quantity: 1,
        product_name: "ProductA",
        product_price: 100,
        product_category_id: 1,
      },
      {
        order_id: ORDER.id,
        product_id: 12345,
        quantity: 1,
        product_name: "ProductB",
        product_price: 100,
        product_category_id: 2,
      },
    ];

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: DISCOUNT_CODE_ID,
      code: DISCOUNT_CODE_CODE,
      value: DISCOUNT_VALUE,
      type: DISCOUNT_TYPE,
      expiration_date: DISCOUNT_EXPIRATION_DATE,
      minimum_order_value: DISCOUNT_MINIMUM_ORDER_VALUE,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue(ORDER_ITEMS_LIST);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `The total amount of the order (disregarding any discounts) is less than the minimum amount where ${_CODE} can be used`,
    });
  });

  it("Should throw an error if no product in the list is part of the applicable discount code categories", async () => {
    //parameters to service function
    const _USER_ID = 1;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: _USER_ID,
      confirmed: false,
      created_at: "2023-01-01",
    };

    const DISCOUNT_CODE_ID = 111;
    const DISCOUNT_CODE_CODE = "OFF50CODE";
    const DISCOUNT_VALUE = 50;
    const DISCOUNT_TYPE = "percentage";
    const DISCOUNT_EXPIRATION_DATE = "2024-01-01";
    const DISCOUNT_MINIMUM_ORDER_VALUE = null;

    const ORDER_ITEMS_LIST = [
      {
        order_id: ORDER.id,
        product_id: 123,
        quantity: 1,
        product_name: "ProductA",
        product_price: 100,
        product_category_id: 1,
      },
      {
        order_id: ORDER.id,
        product_id: 12345,
        quantity: 1,
        product_name: "ProductB",
        product_price: 100,
        product_category_id: 2,
      },
    ];

    const APP_CATEGORIES = [
      {
        id: 99,
        name: "Category99",
      },
      {
        id: 88,
        name: "Category88",
      },
    ];
    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: DISCOUNT_CODE_ID,
      code: DISCOUNT_CODE_CODE,
      value: DISCOUNT_VALUE,
      type: DISCOUNT_TYPE,
      expiration_date: DISCOUNT_EXPIRATION_DATE,
      minimum_order_value: DISCOUNT_MINIMUM_ORDER_VALUE,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue(ORDER_ITEMS_LIST);

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockResolvedValue(APP_CATEGORIES);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `Discount code ${_CODE} cannot be used as it is specific to some product categories, but no products in the order belong to any of these categories`,
    });
  });

  it("Should throw an error if client has already used this discount code", async () => {
    //parameters to service function
    const _USER_ID = 1;
    const _CODE = "OFF50CODE";
    const _ORDER_ID = 100;

    const ORDER = {
      id: _ORDER_ID,
      user_id: _USER_ID,
      confirmed: false,
      created_at: "2023-01-01",
    };

    const DISCOUNT_CODE_ID = 111;
    const DISCOUNT_CODE_CODE = "OFF50CODE";
    const DISCOUNT_VALUE = 50;
    const DISCOUNT_TYPE = "percentage";
    const DISCOUNT_EXPIRATION_DATE = "2024-01-01";
    const DISCOUNT_MINIMUM_ORDER_VALUE = null;

    const ORDER_ITEMS_LIST = [
      {
        order_id: ORDER.id,
        product_id: 123,
        quantity: 1,
        product_name: "ProductA",
        product_price: 200,
        product_category_id: 1,
      },
    ];

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(ORDER);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: DISCOUNT_CODE_ID,
      code: DISCOUNT_CODE_CODE,
      value: DISCOUNT_VALUE,
      type: DISCOUNT_TYPE,
      expiration_date: DISCOUNT_EXPIRATION_DATE,
      minimum_order_value: DISCOUNT_MINIMUM_ORDER_VALUE,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue(ORDER_ITEMS_LIST);

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockResolvedValue([]);

    jest
      .mocked(orderDiscountsRepo.getOrderDiscountCodesByUserId)
      .mockResolvedValue([
        {
          id: DISCOUNT_CODE_ID,
          code: DISCOUNT_CODE_CODE,
          value: DISCOUNT_VALUE,
          type: DISCOUNT_TYPE,
          expiration_date: DISCOUNT_EXPIRATION_DATE,
          minimum_order_value: DISCOUNT_MINIMUM_ORDER_VALUE,
        },
      ]);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        _ORDER_ID,
        _CODE,
        _USER_ID
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `Discount code ${_CODE} has already been used by the user`,
    });
  });
});

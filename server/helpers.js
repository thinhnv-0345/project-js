const PRODUCTS_POST_URL = "/products";
const CUSTOMERS_POST_URL = "/customers";
const ORDERS_POST_URL = "/orders";
const ORDER_DETAILS_POST_URL = "/orderDetails";

const createProductValidation = (data) => {
  const { title, price, description, imageUrl, numOfStar, numOfSold } = data;
  if (!title === "" || !description === "" || !imageUrl === "" || !price) {
    return { success: false, errMessage: "Invalid product data!!!" };
  }

  if (!Number(price) || !Number(numOfSold) || !Number(numOfStar)) {
    return { success: false, errMessage: "Invalid product data!!!" };
  }

  return { success: true };
};

const createOrderValidation = (data) => {
  const { paymentMethod, paymentDes, customerId } = data;

  if (!paymentDes || !paymentMethod || !customerId) {
    return { success: false, errMessage: "Invalid order data!!!" };
  }

  return { success: true };
};

const createOrderDetailValidation = (data) => {
  const { orderId, productId, color, size, priceEach, quantity } = data;

  if (!orderId || !productId || !color || !priceEach || !quantity || !size) {
    return { success: false, errMessage: "Invalid order detail data!!!" };
  }

  return { success: true };
};

const createCustomerValidation = (data) => {
  const { name, email, address, phoneNumber } = data;
  if (!name || !email || !address || !phoneNumber) {
    return { success: false, errMessage: "Invalid customer data!!!" };
  }

  return { success: true };
};

const ganerateCode = (typeCode) => {
  let code = Math.floor(Math.random() * 1000000 + Date.now() / 100000000);
  while (code < 100000 || code > 999999) {
    code = Math.floor(Math.random() * 1000000 + Date.now() / 100000000);
  }
  return typeCode + "-" + code;
};

const createValidationMiddleware = (req, res, next) => {
  console.log(req.body);
  let isValid = true;
  let invalidErrMessage = "";

  // validate create product
  if (req.url === PRODUCTS_POST_URL && req.method === "POST") {
    const result = createProductValidation(req.body);
    if (!result.success) {
      isValid = false;
      invalidErrMessage = result.errMessage;
    }
  }
  if (req.url === CUSTOMERS_POST_URL && req.method === "POST") {
    const result = createCustomerValidation(req.body);
    if (!result.success) {
      isValid = false;
      invalidErrMessage = result.errMessage;
    }
  }
  if (req.url === ORDERS_POST_URL && req.method === "POST") {
    const result = createOrderValidation(req.body);
    if (!result.success) {
      isValid = false;
      invalidErrMessage = result.errMessage;
    }
  }
  if (req.url === ORDER_DETAILS_POST_URL && req.method === "POST") {
    const result = createOrderDetailValidation(req.body);
    if (!result.success) {
      isValid = false;
      invalidErrMessage = result.errMessage;
    }
  }

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: invalidErrMessage,
    });
  }

  next();
};

const handleDataMiddleware = (req, res, next) => {
  if (req.method === "POST") {
    const date = new Date(Date.now());
    req.body.createdAt = date.toLocaleDateString("vi-VI");
  }

  if (req.url === PRODUCTS_POST_URL && req.method === "POST") {
    const productId = ganerateCode("P");
    req.body.id = productId;
  }
  if (req.url === CUSTOMERS_POST_URL && req.method === "POST") {
    const customerId = ganerateCode("C");
    req.body.id = customerId;
  }
  if (req.url === ORDERS_POST_URL && req.method === "POST") {
    const orderId = ganerateCode("O");
    req.body.id = orderId;
  }
  if (req.url === ORDER_DETAILS_POST_URL && req.method === "POST") {
    const orderDetailId = ganerateCode("OD");
    req.body.id = orderDetailId;
  }

  next();
};

module.exports = {
  createValidationMiddleware,
  handleDataMiddleware,
};

module.exports = () => {
    const customerWalletDB = require("../data/customerWallets.json");
    const controller = {};

    controller.listCustomerWallets = (req, res) =>
        res.status(200).json(customerWalletDB);
    return controller;
};

const order = require("../model/order");
const BaseRepository = require("./baseRepository");
class OrderRepository extends BaseRepository {
    constructor() {
        super(order);
    }
}

module.exports = OrderRepository;

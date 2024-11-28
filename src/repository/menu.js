const menu = require("../model/menu");
const BaseRepository = require("./baseRepository");
class MenuRepository extends BaseRepository {
    constructor() {
        super(menu);
    }
}

module.exports = MenuRepository;

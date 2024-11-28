
const Table = require("../model/table");

const BaseRepository = require("./baseRepository");
class TableRepository extends BaseRepository {
    constructor() {
        super(Table);
    }
}

module.exports = TableRepository;

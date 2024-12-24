const historry = require("../model/history");
const BaseRepository = require("./baseRepository");
class HistoryRepository extends BaseRepository {
    constructor() {
        super(historry);
    }
}

module.exports = HistoryRepository;

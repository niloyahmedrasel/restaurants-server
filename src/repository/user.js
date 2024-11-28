const user = require("../model/user");
const BaseRepository = require("./baseRepository");
class UserRepository extends BaseRepository {
    constructor() {
        super(user);
    }
}

module.exports = UserRepository;

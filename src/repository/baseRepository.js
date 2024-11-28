const mongoose = require("mongoose");

class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return this.model.create(data);
    }

    async findById(id) {
        return this.model.findById(id).exec();
    }

    async find(filters) {
        return this.model.find(filters).exec();
    }

    async findByUserId(userId) {
        return this.find({ userId });
    }

    async findOne(filters) {
        return this.model.findOne(filters).exec();
    }

    async updateByID(id, data) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async updateOne(filters, data) {
        await this.model.updateOne(filters, data, { new: true }).exec();
        return this.model.findOne(filters).exec();
    }

    async updateMany(filters, data) {
        await this.model.updateMany(filters, data, { new: true }).exec();
        return this.model.find(filters).exec();
    }

    async deleteById(id) {
        return this.model.findByIdAndDelete(id).exec();
    }

    async deleteMany(filters) {
        return this.model.deleteMany(filters).exec();
    }

}

module.exports = BaseRepository;

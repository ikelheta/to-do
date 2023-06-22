import { NotFoundError } from "./app-error.mjs";
import MESSAGES from "./messages.mjs";

export class BaseRepository {
    constructor(model, notFoundMessage) {
        this.model = model;
        this.notFoundMessage = notFoundMessage || MESSAGES.NOT_FOUND_ERROR
    }

     async create(data) {
        const item = await this.model.create(data);
        return item.toObject();
    }

     async findOne(filters, projections, options) {
        const item = await this.model.findOne(filters, projections, options);
        return item
    }

     async findOneOrThrowError(filters, projections, options) {
        const item = await this.findOne(filters, projections, options)
        if (!item) {
            throw new NotFoundError(this.notFoundMessage)
        }
        return item
    }
     async count (filters){
        const count = await this.model.count(filters)
        return count
    }

     async findAll(filters, projections, options) {
        const items = await this.model.find(filters, projections, options);
        const count = await this.count(filters)
        return {rows : items, count}
    }

     async updateOne(filters, request) {

        const item = await this.model.findOneAndUpdate(filters, request, { new: true });
        if (!item) {
            throw new NotFoundError(this.notFoundMessage)
        }
        return item
    }
     async updateMany(filters, request) {
        const item = await this.model.updateMany(filters, request);
        return item
    }

     async deleteOne(filters) {
        const item = await this.model.findOneAndDelete(filters);
        if (!item) {
            throw new NotFoundError(this.notFoundMessage)
        }
        return item
    }

     async deleteMany(filters) {
        const item = await this.model.deleteMany(filters);
        return item

    }
}




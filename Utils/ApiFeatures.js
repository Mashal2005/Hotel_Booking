const Hotel = require("../Models/Hotel");

class ApiFeatures{
    constructor(query, queryString, modelName) {
        this.query = query;
        this.queryString = queryString;
        this.modelName = modelName; 
    }

    search(){
        const keyword = this.queryString.search
        if (!keyword) return this;
        const searchFilds={
            User:['frstName','lastName','email','phone'],
            Hotel:['name','address'],
            Room:['hotel','roomType','bedType','isActive']
        }

        const fields = searchFields[this.modelName];
        if (!fields) return this;

        const orConditions = fields.map((field) => ({
            [field]: { $regex: keyword, $options: "i" }
        }));
        this.query = this.query.find({ $or: orConditions });
        return this;
    }

    filter(){
        const queryObj={...this.queryString}
        const removeFields=['search','page','limit','sort','slect']

        if (queryObj.checkIn||this.queryObj.checkOut){
            queryObj.createdAt={}
            if (queryObj.checkIn){
                const start =new Data(queryObj.checkIn)
                if(!isNaN(start))queryObj.createdAt.$gta=start
                delete queryObj.startDate
            }
            if (queryObj.checkOut) {
                const end = new Date(queryObj.checkOut);
                if (!isNaN(end)) queryObj.createdAt.$lte = end;
                delete queryObj.checkOut;
            }
            if (Object.keys(queryObj.createdAt).length === 0) delete queryObj.createdAt;
        }
        const operators = ["gt", "gte", "lt", "lte"];
        for (const key in queryObj) {
            if (!queryObj[key] || typeof queryObj[key] !== "object") continue;
            for (const op of operators) {
                if (queryObj[key][op] !== undefined) {
                    queryObj[key]["$" + op] = queryObj[key][op];
                    delete queryObj[key][op];
                }
            }
        }
        this.query=this.query.find(queryObj)
        return this
    }
    sort() {
        if (this.queryString.sort) {
            const sortType = this.queryString.sort;

            if (sortType === "latest") {
                this.query = this.query.sort({ createdAt: -1 }); // newest first
            } else if (sortType === "oldest") {
                this.query = this.query.sort({ createdAt: 1 }); // oldest first
            }
        } else {
            this.query = this.query.sort({ createdAt: -1 });
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page ? Number(this.queryString.page) : 1;
        const limit = this.queryString.limit ? Number(this.queryString.limit) : 20;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

    cleanResponse() {
        const staticFields = ["updatedAt", "__v"];
        const fieldsToExclude = staticFields.map(field => `-${field}`);
        this.query = this.query.select(fieldsToExclude.join(" "));
        return this;
    }
}

module.exports = ApiFeatures;


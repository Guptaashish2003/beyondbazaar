const { match } = require("assert");

class Apifeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    // Search function
    search() {
        const keyword = this.queryStr.keyword
            ? {
                productTags: {
                    $regex: this.queryStr.keyword,
                    $options: 'i',
                },
            }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }

    // Filter function
    filter() {
        const copyquery = { ...this.queryStr };

        // Removing filters for the query
        const remvefilter = ['keyword', 'limit', 'page', 'sort', 'fields', "categoryName", "subcategoryName"];
        remvefilter.forEach((qr) => delete copyquery[qr]);

        // Advance filter option
        let queryString = JSON.stringify(copyquery);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryString);

        this.query = this.query.find(queryObj);

        return this;
    }

    // Sorting function
    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    // Limit fields function
    limitFields() {
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    // Pagination function
    paginate() {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        return this;
    }

    categoryAndSubcategory() {
        const { categoryName, subcategoryName } = this.queryStr;
        const filter = {};
        if (categoryName) filter.categoryName = categoryName;
        if (subcategoryName) filter.SubcategoryName = subcategoryName;
        this.query = this.query.find(filter);
                return this;
    }
    
    

}

module.exports = Apifeatures;

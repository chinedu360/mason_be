class APIFeatures {
  constructor(query, queryStrings) {
    this.query = query;
    this.queryStrings = queryStrings;
  }

  filter() {
    // 1A) Filtering
    // {{base_url}}/record?type=expense&amount[gte]=1500
    const queryObj = { ...this.queryStrings };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //   console.log(JSON.parse(queryStr), this.queryStrings);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    // 2) Sorting
    // {{base_url}}/record?sort=amount
    if (this.queryStrings.sort) {
      // for accending order - { sort: 'amount' }
      // for decending order - { sort: '-amount' }
      // in a situation where there is a tie(like the same amount) we can pass a second value and separate it by comma. something like this - sort('amount amountAverage')
      const sortBy = this.queryStrings.sort.split(",").join(" ");
      console.log(sortBy);

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-date");
    }
    return this;
  }

  limitFields() {
    // Field limiting
    //{{base_url}}/record?fields=title,description,amount,date
    if (this.queryStrings.fields) {
      const fields = this.queryStrings.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    // Pagination
    const page = this.queryStrings.page * 1 || 1;
    const limit = this.queryStrings.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;

const keywords = require('./keywords.json').entries;

module.exports = class AWSPolicy {
  constructor() {
    keywords.forEach(key => this[key] = this);
    this.body = {
      Version: '2012-10-17',
      Statement: [],
    };
  }

  add(statement) {
    Array.isArray(statement) ? this.body.Statement = this.body.Statement.concat(statement) : this.body.Statement.push(statement);
    return this;
  }

  toObject() {
    const copy = { ...this.body }
    console.error(777, copy.Statement)
    copy.Statement = copy.Statement.map((e, i) => e.toObject(i));
    return copy;
  }
}
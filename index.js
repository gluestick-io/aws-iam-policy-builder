const keywords = require('./src/keywords.json').entries;
const uuid = require('uuid')
class AWSPolicyStatement {
  constructor() {
    keywords.forEach(key => this[key] = this);
    this.statement = {
      Id: uuid.v4()
    }
  }

  allowActions(actions) {
    this.statement.Effect = 'Allow';
    this.statement.Action = actions;
    return this;
  }

  resources(res) {
    this.statement.Resource = res;
    return this;
  }

  ifStringLike(phrase) {
    this.statement.Condition = {'StringLike': phrase}
    return this;
  }

  toObject(Sid) {
    return { Sid, ...this.statement }
  }
}

class AWSPolicy {
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

module.exports = {
  AWSPolicy,
  AWSPolicyStatement,
}

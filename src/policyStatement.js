const uuid = require('uuid');
const keywords = require('./keywords.json').entries;

module.exports = class AWSPolicyStatement {
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
  
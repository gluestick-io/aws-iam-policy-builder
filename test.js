const { AWSPolicy, AWSPolicyStatement } = require('.');

test('policy builds', () => {

  let policy = new AWSPolicy('newPolicy')

  let statement1 = new AWSPolicyStatement()
  statement1
    .allowActions([
      "s3:ListAllMyBuckets",
      "s3:GetBucketLocation"
    ])
    .on.resources(["arn:aws:s3:::BUCKET-NAME1", "arn:aws:s3:::BUCKET-NAME2"])
    .ifStringLike({
      's3:prefix': [
        'home/'
      ]
    })

  let statement2 = new AWSPolicyStatement()
  statement2
    .allowActions([
      "iot:SubscribeChannel",
      "iot:ReceiveMessage"
    ])
    .on.resources(["abc", "def"])

  policy
    .add([statement1, statement2])

  console.log(123, JSON.stringify(policy.toObject()))
  expect(policy.toObject()).toBeInstanceOf(Object)
});

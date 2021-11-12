'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: "us-west-2" });

const { Consumer } = require('sqs-consumer');
const faker = require('faker')
const sns = new AWS.SNS();

const topic = 'arn:aws:sns:us-west-2:195095073964:pickup'; //change this to your own ARN from your topic on AWS SNS

const order = {
  orderId: faker.datatype.uuid(),
  customer: faker.name.findName(),
  vendorId: faker.company.companyName()
}

const payload = {
  Message: JSON.stringify(order),
  TopicArn: topic,
};

sns.publish(payload).promise() 
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log(e);
  });

  const queueUrl = 'https://sqs.us-west-2.amazonaws.com/195095073964/vendor' // change this to your vendor queue URL on AWS SQS

  const consumer = Consumer.create({
    queueUrl: queueUrl,
    handleMessage: (message) => {
      console.log(message);
    }
  });
 
  consumer.start()
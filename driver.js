// Import required AWS SDK clients and commands for Node.js
const { ReceiveMessageCommand } = require("@aws-sdk/client-sqs");
const { sqsClient } = require("./libs/sqsClient.js");

const queueUrl = "package";

const params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ["All"],
  QueueUrl: queueUrl,
  WaitTimeSeconds: 10,
  };

const run = async () => {
  try {
    const data = await sqsClient.send(new ReceiveMessageCommand(params));
    if (data.Messages) 
   console.log(data); // For unit tests.
  } catch (err) {
    console.log("Receive Error", err);
  }
};
run();
'use strict';

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.pubsubJson = (event, context) => {
  // Decode body
  const raw = Buffer.from(event.data, 'base64')
  
  // Turn JSON into object
  const obj = JSON.parse(raw)

  // Getting string
  const message = JSON.stringify(raw.toString())

  //Print payload as string
  console.log(message);

  // Print service name (sent on payload)
  console.log("service >> " + obj.service)
};
'use strict';

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.pubsubJson = (event, context) => {
  const raw = Buffer.from(event.data, 'base64')
  const obj = JSON.parse(raw)
  const message = JSON.stringify(raw.toString())
  console.log(message);
  console.log("service >> " + obj.service)
};
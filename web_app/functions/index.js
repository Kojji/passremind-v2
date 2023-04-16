const functions = require("firebase-functions");
const crypto = require("crypto-js");

exports.getPassEnc = functions.https.onCall((data, context) => {
  return new Promise((res, rej) => {
    let key = crypto.SHA256(context.auth.uid);
    let derivation = crypto.PBKDF2(key, process.env.SEED_SALT, {
      keySize: 128 / 32,
    });
    res(derivation.toString());
  });
});

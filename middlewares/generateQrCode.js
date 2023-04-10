const { padStart } = require("lodash")

module.exports.generateQrCode = (num) => {
    const qrcode = padStart(num.toString(), 5, "0")
    return qrcode;
}
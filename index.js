const { buffer, send } = require("micro")
const microCors = require("micro-cors")
const getColors = require("get-image-colors.samjbmason")
const imageType = require("image-type")

const cors = microCors()

module.exports = cors(async (req, res) => {
  if (req.method !== "POST") {
    return send(res, 200)
  }
  const buf = await buffer(req, { limit: "5mb" })
  const type = imageType(buf)
  const colors = await getColors(buf, type.mime, 11)
  send(res, 200, colors.map(c => c.hex()))
})

const { buffer, send } = require("micro")
const microCors = require("micro-cors")
const getColors = require("get-image-colors")
const imageType = require("image-type")

const cors = microCors()

module.exports = cors(async (req, res) => {
  console.log(req.method)
  if (req.method !== "POST") {
    return send(res, 200)
  }
  const buf = await buffer(req)
  const type = imageType(buf)
  const colors = await getColors(buf, type.mime)
  send(res, 200, colors.map(c => c.hex()))
})

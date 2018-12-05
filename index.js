const { buffer } = require("micro")
const getColors = require("get-image-colors")
const imageType = require("image-type")

module.exports = async (req, res) => {
  const buf = await buffer(req)
  const type = imageType(buf)
  const colors = await getColors(buf, type.mime)
  return colors.map(c => c.hex())
}

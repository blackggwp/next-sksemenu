import fs from "fs";
import path from "path";

export default (req, res) => {
  const brandid = req.query.brandid
  const type = req.query.type
  const dirRelativeToPublicFolder = `images/${type}/${brandid}`
  const dir = path.resolve("./public", dirRelativeToPublicFolder);
  try {
    var files = fs.readdirSync(dir)
  } catch (error) {
    // console.error(error)
    return res.status(404).json({ statusCode: 404, errMsg: error })
  }
  let images = []
  if (files) {
    files.forEach(file => {
      if (path.extname(file).toLowerCase() ===
        ".png" || ".jpg" || ".jpeg" || ".webp" || ".gif") {
        images.push(`/${dirRelativeToPublicFolder}/${file}`)
      }
    })
  }
  if (images) {
    res.statusCode = 200;
  } else res.send(false)
  res.json(images);
}

import fs from "fs";
import path from "path";

export default (req, res) => {
  const dirRelativeToPublicFolder = "images";
  const dir = path.resolve("./public", dirRelativeToPublicFolder);
  let images = []
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    if (path.extname(file).toLowerCase() ===
      ".png" || ".jpg" || ".jpeg" || ".webp" || ".gif") {
      images.push(`/${dirRelativeToPublicFolder}/${file}`)
    }
  })
  if (images) {
    res.statusCode = 200;
  } else res.statusCode = 403;
  res.json(images);
}

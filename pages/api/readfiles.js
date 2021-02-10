import fs from "fs";
import path from "path";

export default (req, res) => {
  const dirRelativeToPublicFolder = "images";

  const dir = path.resolve("./public", dirRelativeToPublicFolder);

  // const filenames = fs.readdirSync(dir);
  // const images = filenames.map((name) =>
  //   path.join("/", dirRelativeToPublicFolder, name)
  // );

  const files = fs.readdirSync(dir);

  const images = files.map((file) => {
    if (path.extname(file) === ".JPG") {
      return path.join("/", dirRelativeToPublicFolder, file);
    } else return false;
  });

  res.statusCode = 200;
  res.json(images);
};

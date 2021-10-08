const File = require("../models/fileModel")
import formidable from "formidable"
import fs from "fs"

export const fileDownload = async (req, res) => {
  try {
    const file = await File.findById(req.query.id)

    const filePath = `${process.cwd()}\\public\\${file.name}`

    const fileBuffer = fs.createReadStream(filePath)

    await new Promise(function (resolve) {
      res.setHeader("Content-Type", file.file_mimetype)
      fileBuffer.pipe(res)
      fileBuffer.on("end", resolve)
      fileBuffer.on("error", function (err) {
        if (err.code === "ENOENT") {
          res.status(400).json({
            error: true,
            message: "Sorry we could not find the file you requested!",
          })
          res.end()
        } else {
          res
            .status(500)
            .json({ error: true, message: "Sorry, something went wrong!" })
          res.end()
        }
      })
    })
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.")
  }
}

export const getFiles = async (req, res) => {
  try {
    const files = await File.find({})
    const sortedByCreationDate = files.sort((a, b) => b.createdAt - a.createdAt)
    res.send(sortedByCreationDate)
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.")
  }
}

export const formidableSave = async (req, res) => {
  const form = new formidable.IncomingForm()
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file, fields)

    return res.status(201).json({ message: "uploaded file" })
  })
}

const saveFile = async (file, fields) => {
  const { title, description } = fields
  // console.log(file.path, file.type, title, description)
  const data = fs.readFileSync(file.path)
  fs.writeFileSync(`./public/${file.name}`, data)
  await fs.unlinkSync(file.path)

  try {
    const dbfile = new File({
      title,
      name: file.name,
      description,
      file_path: file.path,
      file_mimetype: file.type,
    })
    await dbfile.save()
    // post(req, res)
    // res.send("file uploaded successfully.")
  } catch (error) {
    console.log(error)
    // post(req, res)
    // res.status(400).send("Error while uploading file. Try again later.")
  }

  return
}

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.query.id)
    if (file) {
      await file.remove()
      const filePath = `${process.cwd()}\\public\\${file.name}`
      fs.unlinkSync(filePath) // remove from public folder
      res.json({ message: "Course File removed" })
    }
  } catch (error) {
    res.status(404).json({ messsage: "Course File not found" })
  }
}

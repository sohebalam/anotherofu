import AWS from "aws-sdk"
import { nanoid } from "nanoid"
import Course from "../models/courseModel"
import slugify from "slugify"
import { readFileSync } from "fs"
import User from "../models/userModel"
import Completed from "../models/completeModel"

import YTList from "../models/ytListModel"

export const youtube = async (req, res) => {
  const { slug } = req.query

  try {
    const YOUTUBE_PLAYLIST_ITEMS_API =
      "https://www.googleapis.com/youtube/v3/playlistItems"

    const course = await Course.findOne({ slug: slug })
      .populate("instructor", "_id name")
      .exec()

    const playlistId = course?.playlistId
    const response = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&maxResults=50&playlistId=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`
    )

    const data = await response?.json()

    //courseSlug
    const videos = data.items.map((item) => ({
      playlistId: item.snippet.playlistId,
      videoId: item.snippet.resourceId.videoId,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
    }))

    const ytList = await YTList.find()

    if (ytList) {
      return res.send(ytList[0])
    }

    const newList = await new YTList({
      videos: videos,
    }).save()
    res.send(newList)
  } catch (error) {
    console.log(error)
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

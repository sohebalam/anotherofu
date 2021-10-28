import AWS from "aws-sdk"
import { nanoid } from "nanoid"
import Course from "../models/courseModel"
import slugify from "slugify"
import { readFileSync } from "fs"
import Completed from "../models/completeModel"
import formidable from "formidable"
import fs from "fs"

import YTList from "../models/ytListModel"

export const getFiles = async (req, res) => {
  const { slug } = req.query

  const ytList = await YTList.find({
    slug: slug,
  })
  res.send(ytList)
}

export const fileSave = async (req, res) => {
  const slug = req.query.slug
  const ytList = await YTList.findOne({
    slug: slug,
  })

  if (!ytList) {
    const newList = await new YTList({
      slug: slug,
    }).save()
  }

  const form = new formidable.IncomingForm()
  form.parse(req, async function (err, fields, files) {
    // const { slug } = req.query
    console.log(req.query.slug)

    const slug = req.query.slug
    console.log("newslug", slug)
    await saveFile(files.file, fields, slug)
    console.log("anotherslug", slug)
    // return res.status(201).json({ message: "uploaded file" })
  })
  return
}

const saveFile = async (file, fields, slug) => {
  const { title, description } = fields
  console.log("sdssda", slug)
  // console.log(file.path, file.type, title, description)

  const data = fs.readFileSync(file.path)
  fs.writeFileSync(`./public/${file.name}`, data)
  await fs.unlinkSync(file.path)

  try {
    console.log(file.path, file.type, title, description)

    return await YTList.findOneAndUpdate({
      slug: slug,
      $addToSet: {
        files: {
          title,
          name: file.name,
          description,
          file_path: file.path,
          file_mimetype: file.type,
        },
      },
    })

    // res.send(newList)
  } catch (error) {
    console.log(error)
    // post(req, res)
    // res.status(400).send("Error while uploading file. Try again later.")
  }

  return
}

export const youtube = async (req, res) => {
  const { slug } = req.query
  const ytList = await YTList.findOne({
    slug: slug,
  })

  if (!ytList) {
    const newList = await new YTList({
      slug: slug,
    }).save()
  }

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

    const videos = data.items.map((item) => ({
      playlistId: item.snippet.playlistId,
      videoId: item.snippet.resourceId.videoId,
      thumbnailUrl: item.snippet.thumbnails.medium.url,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
    }))

    const ytList = await YTList.find({})

    res.send(ytList)

    if (!ytList) {
      return await YTList.findOneAndUpdate({
        slug: slug,
        $addToSet: {
          videos: videos,
        },
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const lessonOrder = async (req, res) => {
  // console.log(req.method)
  console.log(req.body)

  const { slug } = req.query

  const updated = await YTList.findOneAndUpdate(
    { slug },
    { lessons: { ...req.body } },
    {
      new: true,
    }
  ).exec()

  res.json(updated)
}

import mongoose from "mongoose"

// const { ObjectId } = mongoose.Schema

const itemsSchema = new mongoose.Schema({
  snippet: {
    publishedAt: { type: String },
    channelId: { type: String },
    title: { type: String },
    description: { type: String },
    thumbnails: [{}],
    channelTitle: { type: String },
    playlistId: { type: String },
    position: 0,
    resourceId: [{}],
    videoOwnerChannelTitle: { type: String },
    videoOwnerChannelId: { type: String },
  },
})

const ytListSchema = new mongoose.Schema(
  {
    items: [
      {
        kind: { type: String },
        etag: { type: String },
        id: { type: String },
        snippet: { itemsSchema },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.models.ytList || mongoose.model("ytList", ytListSchema)

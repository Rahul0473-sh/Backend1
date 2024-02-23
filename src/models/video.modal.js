import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    id: {},
    videoThumbnail: {
      type: String,
      required: true,
    },
    VideoFile: {
      type: string, //cloudnary
      required: true,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number, // duration will give by cloudnary
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("Video", videoSchema);

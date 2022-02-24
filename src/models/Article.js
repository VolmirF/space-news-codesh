import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    featured: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    newsSite: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      // required: true,
    },
    publishedAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    launches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Launch',
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
      },
    ],
  },
  { timestamps: { createdAt: 'publishedAt', updatedAt: 'updatedAt' } }
);

const Article = mongoose.model('Article', ArticleSchema);

export default Article;

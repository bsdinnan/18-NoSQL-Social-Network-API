const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      reactions: [
        {
          reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
          },
          username: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => dateFormat(createdAt),
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => dateFormat(createdAt),
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const dateFormat = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
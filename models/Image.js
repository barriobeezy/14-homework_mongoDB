var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MagSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
});

var MagImg = mongoose.model("Image", MagSchema);

module.exports = MagImg;
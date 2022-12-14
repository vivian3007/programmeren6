// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const TostiSchema = new Schema({
    title: String,
    ingredients: String,
    sauce: String
}, {
    toJSON: {virtuals: true}
});

TostiSchema.virtual("_links").get(
    function () {
        return {
            self: {
                href: `${process.env.BASE_URI}tostis/${this._id}`
            },
            collection: {
                href: `${process.env.BASE_URI}tostis/`
            }
        }

    }
)

// Export function to create "SomeModel" model class
module.exports = mongoose.model("Tosti", TostiSchema);
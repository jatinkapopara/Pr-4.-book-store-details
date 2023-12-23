const mongoose = require('mongoose');

const crudschema = mongoose.Schema({
    book_name: {
        type: String,
        required: true
    },
    book_price: {
        type: String,
        required: true
    },
    book_pages: {
        type: String,
        required: true
    },
    book_author: {
        type: String,
        required: true
    }
})
const tblname = mongoose.model('crud', crudschema);
module.exports = tblname;
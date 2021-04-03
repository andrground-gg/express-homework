const {Schema, model} = require('mongoose');
const schema = new Schema({
    title: {
        type: String,
        required: Boolean
    },
    completed: {
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    }
});
module.exports = model('ToDo', schema);
//модель экспортируется с 2мя параметрами: именем и схемой, по которой модуль формируется
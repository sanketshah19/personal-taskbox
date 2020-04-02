const mongoose = require('mongoose')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title cannot be empty'],
        trim: true,
        minlength: 3
    },
    dueDate: {
        type: Date,
        required: true,
        min: Date.now
    },
    status: [
       {
           type: {
               type: String,
               required: true,
               enum: ['New', 'In Progress', 'Completed']
           },
           createdAt: {
               type: Date,
               default: Date.now
           }
       }
    ],
    isArchived: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    labels: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Label'
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
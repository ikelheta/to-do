import mongoose from "mongoose"

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

},
    { timestamps: true }

);

 const TodoEntity = mongoose.model('Todo', todoSchema);
 export default TodoEntity



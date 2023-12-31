import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = mongoose.Schema({
    title:{
        type: 'string',
        required: true
    },
    description:{
        type: 'string',
        required: true,
    },
    price:{
        type: 'number',
        required: true,
    },
    stock:{
        type: 'number',
        required: true,
    },
    code:{
        type: 'string',
        required: true,
        unique: true
    },
    category:{
        type: "string",
        required: true,
    },
    status:{
        type: "boolean",
        default : true
    },
    quantity: {
        type: "number",
    }

})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model("Products", productsSchema)
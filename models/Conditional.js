import mongoose from "mongoose";

const ConditionalSchema = new mongoose.Schema({
     node_type: 'CONDITIONAL',
        condition: {
            field: { type: String, required: false, default: "" },
            operator: { type: String, required: false, default: "" },
            value: { type: String, required: false, default: "" },
        },
        on_true_next_node_id: { type: Number, required: false, default: null },
        on_false_next_node_id: { type: Number, required: false, default: null },
});

module.exports = mongoose.model('conditional', ConditionalSchema);

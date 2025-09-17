import mongoose from "mongoose";

const ConditionalSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    node_type: 'CONDITIONAL',
        condition: {
            field: field,
            operator: operator,
            value: value        },
        on_true_next_node_id: { type: Number, required: false, default: 0 },
        on_false_next_node_id: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model('Conditional', ConditionalSchema);

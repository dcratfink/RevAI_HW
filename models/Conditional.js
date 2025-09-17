
function createConditionalNode(id, field, operator, value, onTrueNextNodeId, onFalseNextNodeId) {
    return {
        id: id,
        type: 'CONDITIONAL',
        condition: {
            field: field,
            operator: operator,
            value: value
        },
        on_true_next_node_id: onTrueNextNodeId,
        on_false_next_node_id: onFalseNextNodeId
    };
}
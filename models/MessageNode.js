// An action to be performed, like sending an SMS or making a call
function createActionNode(id, message, nextNodeId) {
    return {
        id: id,
        type: 'MESSAGE',
        message: message,
        next_node_id: nextNodeId
    };
}

// A simple time delay in the journey
function createDelayNode(id, durationSeconds, nextNodeId) {
    return {
        id: id,
        type: 'DELAY',
        duration_seconds: durationSeconds,
        next_node_id: nextNodeId
    };
}

// A conditional branch based on patient data
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

function createJourney(id, name, startNodeId, nodes) {
    return {
        id: id,
        name: name,
        start_node_id: startNodeId,
        nodes: nodes
    };
}

// Patient data to evaluate conditionals against
function createPatientContext(id, age, language, condition) {
    return {
        id: id,
        age: age,
        language: language,
        condition: condition
    };
}
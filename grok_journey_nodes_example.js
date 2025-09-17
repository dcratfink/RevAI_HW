const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage for journeys (replace with database in production)
const journeys = [];
const patients = {};

// Node Types
const NODE_TYPES = {
    MESSAGE: 'message',
    DELAY: 'delay',
    CONDITION: 'condition'
};

// Node Templates
class JourneyNode {
    constructor(id, type, data, nextNodeId = null) {
        this.id = id;
        this.type = type;
        this.data = data;
        this.nextNodeId = nextNodeId;
    }
}

class MessageNode extends JourneyNode {
    constructor(id, messageContent, nextNodeId = null) {
        super(id, NODE_TYPES.MESSAGE, { content: messageContent }, nextNodeId);
    }
}

class DelayNode extends JourneyNode {
    constructor(id, durationMs, nextNodeId = null) {
        super(id, NODE_TYPES.DELAY, { durationMs }, nextNodeId);
    }
}

class ConditionNode extends JourneyNode {
    constructor(id, condition, trueNodeId = null, falseNodeId = null) {
        super(id, NODE_TYPES.CONDITION, { condition }, trueNodeId);
        this.falseNodeId = falseNodeId;
    }
}

// Journey Manager
class PatientJourney {
    constructor(id, patientId, nodes = []) {
        this.id = id;
        this.patientId = patientId;
        this.nodes = nodes;
        this.currentNodeId = nodes.length > 0 ? nodes[0].id : null;
    }

    async executeNode(nodeId, patientData) {
        const node = this.nodes.find(n => n.id === nodeId);
        if (!node) return null;

        switch (node.type) {
            case NODE_TYPES.MESSAGE:
                // Simulate sending message (e.g., SMS, email)
                console.log(`Sending message to patient ${this.patientId}: ${node.data.content}`);
                return node.nextNodeId;

            case NODE_TYPES.DELAY:
                // Simulate delay
                await new Promise(resolve => setTimeout(resolve, node.data.durationMs));
                return node.nextNodeId;

            case NODE_TYPES.CONDITION:
                // Evaluate condition (simple example)
                const conditionResult = this.evaluateCondition(node.data.condition, patientData);
                return conditionResult ? node.nextNodeId : node.falseNodeId;

            default:
                return null;
        }
    }

    evaluateCondition(condition, patientData) {
        // Implement condition logic here
        // Example: condition = { field: 'age', operator: '>', value: 18 }
        try {
            const { field, operator, value } = condition;
            switch (operator) {
                case '>':
                    return patientData[field] > value;
                case '<':
                    return patientData[field] < value;
                case '===':
                    return patientData[field] === value;
                default:
                    return false;
            }
        } catch (error) {
            console.error('Condition evaluation error:', error);
            return false;
        }
    }

    async startJourney(patientData) {
        let currentNodeId = this.currentNodeId;
        while (currentNodeId) {
            currentNodeId = await this.executeNode(currentNodeId, patientData);
        }
    }
}

// API Endpoints
// Create a new journey
app.post('/api/journeys', (req, res) => {
    const { patientId, nodes } = req.body;
    const journeyId = journeys.length + 1;

    // Create node instances
    const journeyNodes = nodes.map(node => {
        switch (node.type) {
            case NODE_TYPES.MESSAGE:
                return new MessageNode(node.id, node.content, node.nextNodeId);
            case NODE_TYPES.DELAY:
                return new DelayNode(node.id, node.durationMs, node.nextNodeId);
            case NODE_TYPES.CONDITION:
                return new ConditionNode(node.id, node.condition, node.trueNodeId, node.falseNodeId);
            default:
                throw new Error(`Invalid node type: ${node.type}`);
        }
    });

    const journey = new PatientJourney(journeyId, patientId, journeyNodes);
    journeys.push(journey);
    res.status(201).json({ id: journeyId, message: 'Journey created' });
});

// Add patient data
app.post('/api/patients/:patientId/data', (req, res) => {
    const { patientId } = req.params;
    const patientData = req.body;
    patients[patientId] = patientData;
    res.status(200).json({ message: 'Patient data updated' });
});

// Start a journey
app.post('/api/journeys/:journeyId/start', async (req, res) => {
    const { journeyId } = req.params;
    const journey = journeys.find(j => j.id === parseInt(journeyId));

    if (!journey) {
        return res.status(404).json({ error: 'Journey not found' });
    }

    const patientData = patients[journey.patientId] || {};
    try {
        await journey.startJourney(patientData);
        res.status(200).json({ message: 'Journey completed' });
    } catch (error) {
        res.status(500).json({ error: 'Journey execution failed' });
    }
});

// Get journey status
app.get('/api/journeys/:journeyId', (req, res) => {
    const { journeyId } = req.params;
    const journey = journeys.find(j => j.id === parseInt(journeyId));

    if (!journey) {
        return res.status(404).json({ error: 'Journey not found' });
    }

    res.status(200).json({
        id: journey.id,
        patientId: journey.patientId,
        currentNodeId: journey.currentNodeId,
        nodes: journey.nodes
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
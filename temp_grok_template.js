const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// In-memory storage for journey definitions and patient states
const journeys = {}; // { journeyId: { steps: [...] } }
const patientJourneys = {}; // { patientId: { journeyId: { currentStep: 0, data: {} } } }

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to define a new journey
// Request body example:
// {
//   "journeyId": "journey1",
//   "steps": [
//     {
//       "id": "step1",
//       "type": "action",
//       "action": "send_email",
//       "params": { "message": "Welcome to your health journey!" },
//       "next": "step2"
//     },
//     {
//       "id": "step2",
//       "type": "condition",
//       "condition": "patient.age > 50",
//       "trueNext": "step3",
//       "falseNext": "step4"
//     },
//     {
//       "id": "step3",
//       "type": "action",
//       "action": "ai_analysis",
//       "params": { "type": "risk_assessment" },
//       "next": null
//     },
//     {
//       "id": "step4",
//       "type": "action",
//       "action": "schedule_appointment",
//       "params": { "type": "routine_checkup" },
//       "next": null
//     }
//   ]
// }
app.post('/define-journey', (req, res) => {
    const { journeyId, steps } = req.body;
    if (!journeyId || !steps || !Array.isArray(steps)) {
        return res.status(400).json({ error: 'Invalid journey definition' });
    }

    // Create a map of stepId to step object for easy lookup
    const stepMap = {};
    steps.forEach(step => {
        stepMap[step.id] = step;
    });

    journeys[journeyId] = { steps: stepMap };
    res.json({ message: `Journey ${journeyId} defined successfully` });
});

// Endpoint to start a journey for a patient
// Request body example:
// {
//   "patientId": "patient123",
//   "journeyId": "journey1",
//   "patientData": { "age": 55, "name": "John Doe" }
// }
app.post('/start-journey', async (req, res) => {
    const { patientId, journeyId, patientData } = req.body;
    if (!patientId || !journeyId || !patientData) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!journeys[journeyId]) {
        return res.status(400).json({ error: 'Journey not found' });
    }

    // Initialize patient state
    if (!patientJourneys[patientId]) {
        patientJourneys[patientId] = {};
    }
    patientJourneys[patientId][journeyId] = {
        currentStep: Object.keys(journeys[journeyId].steps)[0], // Start from first step ID
        data: patientData
    };

    // Execute the journey asynchronously
    executeJourney(patientId, journeyId).catch(err => console.error(err));

    res.json({ message: `Journey ${journeyId} started for patient ${patientId}` });
});

// Function to execute the journey (runs asynchronously)
async function executeJourney(patientId, journeyId) {
    const journey = journeys[journeyId];
    const patientState = patientJourneys[patientId][journeyId];
    let currentStepId = patientState.currentStep;

    while (currentStepId !== null) {
        const step = journey.steps[currentStepId];
        if (!step) {
            throw new Error(`Step ${currentStepId} not found`);
        }

        if (step.type === 'action') {
            await performAction(step.action, step.params, patientState.data, patientId);
            currentStepId = step.next;
        } else if (step.type === 'condition') {
            const conditionMet = evaluateCondition(step.condition, patientState.data);
            currentStepId = conditionMet ? step.trueNext : step.falseNext;
        } else {
            throw new Error(`Unknown step type: ${step.type}`);
        }

        // Update current step in state
        patientState.currentStep = currentStepId;
    }

    console.log(`Journey ${journeyId} completed for patient ${patientId}`);
}

// Placeholder for performing actions (extend this for real implementations)
async function performAction(action, params, patientData, patientId) {
    console.log(`Performing action: ${action} for patient ${patientId} with params:`, params);

    // Example actions (simplified placeholders)
    if (action === 'send_email') {
        // In real app, integrate with email service like SendGrid
        console.log(`Sending email to ${patientData.name}: ${params.message}`);
    } else if (action === 'schedule_appointment') {
        // In real app, integrate with calendar/scheduling API
        console.log(`Scheduling ${params.type} for ${patientData.name}`);
    } else if (action === 'ai_analysis') {
        // Placeholder for AI integration (e.g., call to an AI model API like Grok or OpenAI)
        // For simplicity, simulate AI response
        const aiResult = simulateAI(params.type, patientData);
        console.log(`AI analysis result: ${aiResult}`);
        // You could store the result in patientData if needed
        patientData.aiResult = aiResult;
    }
    // Add more actions as needed
}

// Placeholder for evaluating conditions (uses Function for dynamic eval; use with caution in production)
function evaluateCondition(condition, patientData) {
    try {
        // Replace 'patient.' with 'patientData.' for evaluation
        const evalStr = condition.replace(/patient\./g, 'patientData.');
        const func = new Function('patientData', `return ${evalStr};`);
        return func(patientData);
    } catch (err) {
        console.error('Condition evaluation error:', err);
        return false;
    }
}

// Placeholder for simulating AI (replace with real AI API call in production)
function simulateAI(type, patientData) {
    if (type === 'risk_assessment') {
        return patientData.age > 50 ? 'High risk' : 'Low risk';
    }
    return 'AI result placeholder';
}

// Start the server
app.listen(port, () => {
    console.log(`Patient Journey Orchestrator running on http://localhost:${port}`);
});
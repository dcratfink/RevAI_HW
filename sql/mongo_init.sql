use RevAI_HW;


db.createCollection("patients");
db.createCollection("journeys");
db.createCollection("actions");
db.createCollection("delays");
db.createCollection("conditionals");

db.patients.find();
db.actions.find();
db.delays.find();
db.conditionals.find();
db.journeys.find();


db.actions.insertOne(
    {
        message: "",
        nextNodeId: null,
        nodeType: "MESSAGE"
    }
);

db.delays.insertOne(
    {
        duration: 0.00,
        nextNodeId: null,
        nodeType: "DELAY"
    }
);

db.conditionals.insertOne({
    node_type: 'CONDITIONAL',
    condition: {
        field: "",
        operator: "",
        value: ""
    },
    on_true_next_node_id: null,
    on_false_next_node_id: null,
});


db.journeys.insertOne(
    {
        name: "",
        patiendId: 0,
        startNodeId: null,
        journeyNodes: [],
    });

db.patients.insertOne({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "MM/DD/YYYY",
    age: null,
    language: "en",
    condition: "unknown",
}
);


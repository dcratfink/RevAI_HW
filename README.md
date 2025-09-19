# RevAI_HW
Exercise for RevelAI Health
Developer: Ricky Ratliff
Sept 17, 2025 @ 10:57 AM

Summary: At RevelAi Health, we automate patient care pathways using long-running, AI-driven 'journeys'. 
This application simulates a core part of RevelAI's system. This is a simplified backend engine for 
orchestrating a patient's journeys. The engine will accept a journey definition 
(a series of steps with potential conditions) and execute it for a given patient.

Tech Stack: Javascript/Nodes.js/Express/MongoDB

I.  Installation / Setup

    *npm
    -->npm install -g npm
    
    *node js and express
    -->https://nodejs.org/en/download/

    *mongoose / mongodb backend
    -->npm install mongoose
    
    *Jest/Supertest for testing
    -->npm install --save-dev jest supertest
    
II. Current Status:
     Development currently in progress.  First commit was code getting everything
     modeled out and pieced together.  Lot of jibberish code getting things from 
     AI and my existing projects.  Made us of Gemini and Grok AI mainly for time 
     and simplicity.  Current reordering structure of the project to include the 
     models and service layer for the api.

     Update (12/19/2025):  Updated all model objects, removed id fields, change case 
     to camel case and modified most default values.  Added a sql folder. The
     sql script in it is just to initialize the mongodb with the schemas/collections.
     Included some initial collections for each type.

III.  Developer Contacts:
        ricky.raymond.ratliff@gmail.com
        ricky.ratliff@dcratfink.com
        rratlif2@jhmi.edu

import { BasePractice, SimScenario } from './types';

export const MAN3_PRACTICES: BasePractice[] = [
  {
    id: 'BP1',
    name: 'Define the Scope of Work',
    shortName: 'Scope',
    description: 'Identify the project goals, motivation, and boundaries. What is IN and what is OUT?',
    inputs: ['Customer Requirements', 'Legal Requirements', 'Organization Standard Process'],
    outputs: ['Project Scope Statement', 'WBS (Work Breakdown Structure) High Level'],
    l2Criteria: ['Scope is documented and managed.'],
    l3Criteria: ['Scope definition follows the Organization Standard Process (OSP).', 'Tailoring of the standard scope template is documented and justified.'],
    assessorQuestions: ['Is the scope explicitly defined?', 'Do you have a WBS?', 'Did you use the standard organizational template for the WBS?'],
    commonPitfalls: ['Vague boundaries lead to scope creep.', 'Ignoring implicit stakeholder expectations.']
  },
  {
    id: 'BP2',
    name: 'Define Project Feasibility',
    shortName: 'Feasibility',
    description: 'Evaluate if the project is technically and economically feasible before committing.',
    inputs: ['Scope', 'Resources', 'Constraints'],
    outputs: ['Feasibility Study Report'],
    l2Criteria: ['Feasibility is evaluated.'],
    l3Criteria: ['Standard criteria for feasibility are used across the organization.', 'Historical data from the "Experience Database" is used for estimation.'],
    assessorQuestions: ['How do you know you can deliver this?', 'Where is the evidence of feasibility analysis?', 'Did you consult historical data?'],
    commonPitfalls: ['Optimism bias.', 'Assuming feasibility without technical proof of concept.']
  },
  {
    id: 'BP3',
    name: 'Define Project Lifecycle',
    shortName: 'Lifecycle',
    description: 'Select the development lifecycle (e.g., V-Model, Agile/Scrum, Waterfall) appropriate for the project.',
    inputs: ['Scope', 'OSP'],
    outputs: ['Project Lifecycle Description', 'Development Plan'],
    l2Criteria: ['A lifecycle is defined.'],
    l3Criteria: ['Lifecycle is selected from approved standard lifecycles.', 'Deviations (tailoring) from the standard lifecycle are approved by QA.'],
    assessorQuestions: ['Which lifecycle model are you using?', 'Is this model standard for your company?', 'Show me the phases and milestones.'],
    commonPitfalls: ['Mixing Agile and Waterfall without clear interfaces.', 'Undefined phases.']
  },
  {
    id: 'BP4',
    name: 'Define Work Packages',
    shortName: 'Work Pkgs',
    description: 'Break down the scope into manageable Work Packages (WPs) with clear ownership.',
    inputs: ['WBS', 'Lifecycle'],
    outputs: ['Work Package Descriptions', 'WBS (Detailed)'],
    l2Criteria: ['WPs are defined.'],
    l3Criteria: ['WPs link to standard roles and responsibilities.', 'Estimation methods for WPs follow organizational standards.'],
    assessorQuestions: ['Does every WP have an owner?', 'Are inputs/outputs for each WP defined?', 'How did you estimate the effort?'],
    commonPitfalls: ['WPs too large to track.', 'Orphaned WPs with no owner.']
  },
  {
    id: 'BP5',
    name: 'Define Project Schedule',
    shortName: 'Schedule',
    description: 'Estimate duration and resources to create a time schedule with critical path.',
    inputs: ['Work Packages', 'Estimates'],
    outputs: ['Project Schedule (Gantt)', 'Milestone List'],
    l2Criteria: ['Schedule exists and is tracked.'],
    l3Criteria: ['Schedule uses standard toolset configurations.', 'Dependencies adhere to the standard process workflow.'],
    assessorQuestions: ['Show me the Critical Path.', 'How do you handle schedule slippage?', 'Are dependencies linked logic-wise?'],
    commonPitfalls: ['Schedule created backwards from deadline without logic.', 'Missing dependencies.']
  },
  {
    id: 'BP6',
    name: 'Define Project Budget',
    shortName: 'Budget',
    description: 'Determine necessary resources (budget, staff, equipment) and allocate them.',
    inputs: ['Schedule', 'WPs'],
    outputs: ['Resource Plan', 'Budget Plan'],
    l2Criteria: ['Budget and resources are planned.'],
    l3Criteria: ['Resource planning uses standard role profiles.', 'Cost models are based on organizational metrics.'],
    assessorQuestions: ['Do you have enough staff?', 'Is the budget approved?', 'How do you track actual vs. planned cost?'],
    commonPitfalls: ['Underestimating support functions (QA, CM).', 'Ignoring licensing costs.']
  },
  {
    id: 'BP7',
    name: 'Define Project Interfaces',
    shortName: 'Interfaces',
    description: 'Identify and agree on interactions between project team, stakeholders, and external suppliers.',
    inputs: ['Stakeholder Register', 'Org Chart'],
    outputs: ['Communication Plan', 'Interface Plan'],
    l2Criteria: ['Interfaces are managed.'],
    l3Criteria: ['Standard communication matrix is used.', 'Escalation paths follow organizational policy.'],
    assessorQuestions: ['How do you communicate with the customer?', 'Who handles supplier escalation?'],
    commonPitfalls: ['Silos between HW and SW teams.', 'Unclear customer contact points.']
  },
  {
    id: 'BP8',
    name: 'Define Project Phases',
    shortName: 'Phases',
    description: 'Define entry and exit criteria for each project phase (Quality Gates).',
    inputs: ['Lifecycle', 'Schedule'],
    outputs: ['Quality Gate Checklist', 'Milestone Definitions'],
    l2Criteria: ['Phases have criteria.'],
    l3Criteria: ['Quality Gates use standard checklists.', 'Gate release authority is defined by the organization.'],
    assessorQuestions: ['What prevents you from moving to the next phase?', 'Who approves the phase transition?'],
    commonPitfalls: ['Subjective gate criteria ("It looks good").', 'Skipping gates due to time pressure.']
  },
  {
    id: 'BP9',
    name: 'Evaluate Feasibility',
    shortName: 'Re-Eval',
    description: 'Continuously re-evaluate feasibility as changes occur or risks materialize.',
    inputs: ['Change Requests', 'Risk Register', 'Progress Reports'],
    outputs: ['Updated Feasibility Report'],
    l2Criteria: ['Feasibility is reviewed.'],
    l3Criteria: ['Re-evaluation triggers are defined in the standard process.', 'Lessons learned are contributed back to the feasibility database.'],
    assessorQuestions: ['The requirements changed; is the project still feasible?', 'Show me the impact analysis.'],
    commonPitfalls: ['Set and forget feasibility.', 'Ignoring the "sunk cost" fallacy.']
  },
  {
    id: 'BP10',
    name: 'Monitor and Control',
    shortName: 'Control',
    description: 'Track progress against plan, identify deviations, and take corrective actions.',
    inputs: ['Work Products', 'Status Reports'],
    outputs: ['Status Report', 'Corrective Action Plan'],
    l2Criteria: ['Project is controlled.'],
    l3Criteria: ['Standard metrics (KPIs) are collected and reported.', 'Process performance is analyzed against organizational baselines.'],
    assessorQuestions: ['How do you measure progress?', 'Show me your SPI/CPI.', 'What happens when a metric is red?'],
    commonPitfalls: ['Reporting status without evidence.', 'Reacting too late to deviations.']
  }
];

export const SIM_SCENARIOS: SimScenario[] = [
  {
    id: 'S1',
    title: 'Project Kick-off Strategy',
    description: 'You are starting a new Cluster Instrument project. The deadline is tight. How do you define the initial process?',
    options: [
      {
        text: "Copy the last project's folder and rename it. It was successful, so why reinvent the wheel?",
        impact: { budget: 0, schedule: 5, quality: -15, complianceL3: -30 },
        feedback: "Major L3 Violation! Copy-paste ignores specific project constraints and skips the mandatory 'Tailoring' step. You failed to use the current Standard Process."
      },
      {
        text: "Download the Standard Process Asset Library (PAL) template and document tailoring decisions.",
        impact: { budget: -5, schedule: -5, quality: 10, complianceL3: 25 },
        feedback: "Excellent! Using the Standard Process as a baseline and documenting tailoring choices is the core of ASPICE Level 3."
      }
    ]
  },
  {
    id: 'S2',
    title: 'Scope Creep Alert',
    description: 'The Marketing Director demands a "Voice Control" feature be added immediately. It is halfway through the Design phase.',
    options: [
      {
        text: "Accept it to keep stakeholders happy. We'll squeeze it in during the testing phase.",
        impact: { budget: -20, schedule: -20, quality: -15, complianceL3: -15 },
        feedback: "Disaster! You bypassed BP1 (Scope) and BP9 (Feasibility). 'Squeezing it in' destroys quality and makes tracking impossible."
      },
      {
        text: "Trigger a formal Change Request (CR) and perform an Impact Analysis before saying yes.",
        impact: { budget: -2, schedule: -2, quality: 5, complianceL3: 20 },
        feedback: "Correct. BP9 requires re-evaluation of feasibility when scope changes. The Assessor loves evidence of Change Management."
      }
    ]
  },
  {
    id: 'S3',
    title: 'The Agile Trap',
    description: 'Your development team complains that writing "Work Packages" and "Plans" is slowing them down. They want to "just code".',
    options: [
      {
        text: "Let them code. Documentation can be written at the end of the project for the audit.",
        impact: { budget: 10, schedule: 10, quality: -30, complianceL3: -50 },
        feedback: "Fatal Error. Retroactive documentation is fraud in the eyes of ASPICE. Traceability must be established *during* development."
      },
      {
        text: "Map their Jira Epics to Work Packages and ensure traceability links are maintained in real-time.",
        impact: { budget: -5, schedule: 0, quality: 10, complianceL3: 15 },
        feedback: "Smart move. You adapted the standard to their tools (Tailoring) while maintaining the intent of BP4 (Work Packages)."
      }
    ]
  },
  {
    id: 'S4',
    title: 'Supplier Black Box',
    description: 'A supplier delivers a software component on time, but without the agreed integration test reports.',
    options: [
      {
        text: "Accept it to keep the schedule green. We will test it ourselves.",
        impact: { budget: -10, schedule: 5, quality: -10, complianceL3: -10 },
        feedback: "Risky. You accepted a deliverable that didn't meet the Interface Agreement (BP7). You own their quality issues now."
      },
      {
        text: "Reject the delivery or issue a 'Conditional Acceptance' with a recorded risk and escalation.",
        impact: { budget: 0, schedule: -10, quality: 10, complianceL3: 15 },
        feedback: "Strong Management. Enforcing entry criteria (BP8) prevents garbage from entering your project. "
      }
    ]
  },
  {
    id: 'S5',
    title: 'Quality Gate Panic',
    description: 'The "Design Review" Quality Gate is tomorrow. The Architecture document is only 80% complete.',
    options: [
      {
        text: "Skip the meeting. We catch up later and sign it off when it's 100%.",
        impact: { budget: 0, schedule: 5, quality: -20, complianceL3: -25 },
        feedback: "Process violation. Skipping BP8 (Phases) destroys traceability. Hidden debt is accumulating."
      },
      {
        text: "Hold the review. Mark it 'Conditional Pass' and open a tracked Action Item for the missing 20%.",
        impact: { budget: -5, schedule: 0, quality: 0, complianceL3: 10 },
        feedback: "Perfect Level 3 behavior. You managed the deviation transparently using the Issue Resolution process."
      }
    ]
  }
];
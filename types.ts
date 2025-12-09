
export enum Tab {
  DASHBOARD = 'DASHBOARD',
  WORKSPACE = 'WORKSPACE',
  LEARN = 'LEARN',
  SIMULATION = 'SIMULATION',
  COPILOT = 'COPILOT'
}

export interface BasePractice {
  id: string;
  name: string;
  shortName: string;
  description: string;
  inputs: string[];
  outputs: string[];
  l2Criteria: string[];
  l3Criteria: string[]; // Institutionalization focus
  assessorQuestions: string[];
  commonPitfalls: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface SimState {
  turn: number;
  budget: number;
  schedule: number;
  quality: number;
  complianceL3: number; // 0 to 100
  log: string[];
  gameOver: boolean;
}

export interface SimScenario {
  id: string;
  title: string;
  description: string;
  options: {
    text: string;
    impact: {
      budget: number;
      schedule: number;
      quality: number;
      complianceL3: number;
    };
    feedback: string;
  }[];
}

// Project Management Data Types
export interface ProjectInfo {
  name: string;
  manager: string;
  customer: string;
  startDate: string;
  description: string;
}

export interface WorkProduct {
  id: string;
  name: string;
  type: 'Plan' | 'Report' | 'Specification' | 'Record';
  status: 'Draft' | 'In Review' | 'Baselined' | 'Released';
  owner: string;
}

export interface Risk {
  id: string;
  description: string;
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  probability: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Mitigated' | 'Closed';
  mitigationPlan: string;
}

export interface ScheduleTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  expectedProgress: number; // 0-100
  actualProgress: number; // 0-100
  delayReason: string;
  assignedTo: string;
}

export interface ProjectData {
  info: ProjectInfo;
  workProducts: WorkProduct[];
  risks: Risk[];
  schedule: ScheduleTask[];
}

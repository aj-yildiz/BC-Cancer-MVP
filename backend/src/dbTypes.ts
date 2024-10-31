// Represents the structure of an event in the database
export interface EventSchema {
  event_id: number;
  name: string;
  location: string;
  date: string;
  description: string;
}

// Represents the structure of a donor in the database
export interface DonorSchema {
  donor_id: number;
  first_name: string;
  nick_name: string;
  last_name: string;
  pmm: string; // The Project Manager responsible for this donor
  organization_name: string;
  city: string;
  total_donations: number;
}

// Represents the structure of a task in the database
export interface TaskSchema {
  task_id: number;
  event_id: number;
  donor_id: number;
  status: 'pending' | 'approved' | 'rejected'; // Define status options here for consistency
  reason: string | null;
}

// Defines the result type of common database operations
export type DatabaseResponse<T> = [number, T | string];

// Defines the main interface for the SQLiteContainer class methods
export interface TaskContainerInterface {
  addEvent(event: Omit<EventSchema, 'event_id'>): DatabaseResponse<string>;
  addDonors(donors: Omit<DonorSchema, 'donor_id'>[]): DatabaseResponse<string>;
  createTasksForEvent(eventId: number, donorIds: number[]): DatabaseResponse<string>;
  updateTaskStatus(taskId: number, status: 'approved' | 'rejected', reason?: string): DatabaseResponse<string>;
  getTasksByPMM(pmm: string): DatabaseResponse<TaskSchema[]>;
  getTasksByEvent(eventId: number): DatabaseResponse<TaskSchema[]>;
}

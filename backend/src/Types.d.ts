

export interface DonorsResponse {
  headers: string[];
  data: (string | number)[][];
}

export interface TasksResponse {
  data: Task[];
}

// City interface to represent each city object
export interface City {
  id: number;
  name: string;
}

// CitiesResponse interface to represent the entire response object
export interface CitiesResponse {
  data: City[];
}

// Define the interface for the API response
export interface EventResponse {
  headers: string[];
  data: (string | number)[][];
}

// ErrorResponse interface to represent the error response
export interface ErrorResponse {
  message: string;
}

// Represents the structure of an event in the database
export interface EventSchema {
  event_id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  created_at: string;
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
  created_at: string;
}

// Represents the structure of a task in the database
export interface TaskSchema {
  task_id: number;
  event_id: number;
  donor_id: number;
  donor_name: string;
  status: 'pending' | 'approved' | 'rejected';
  reason: string | null;
  created_at: string;
  first_name: string;
  nick_name: string;
  last_name: string;
  pmm: string;
  organization_name: string;
  city: string;
  total_donations: number;
}

// Defines the result type of common database operations
export type DatabaseResponse<T> = [number, T | string];

// Defines the main interface for the SQLiteContainer class methods
export interface TaskContainerInterface {
  getEvents(): DatabaseResponse<EventSchema[]>;
  addEvent(event: Omit<EventSchema, 'event_id' | 'created_at'>): DatabaseResponse<number>;
  getDonors(): DatabaseResponse<DonorSchema[]>;
  findDonorByName(firstName: string, lastName: string): DatabaseResponse<DonorSchema>;
  addDonors(donors: Omit<DonorSchema, 'donor_id' | 'created_at'>[]): DatabaseResponse<string>;
  createTasksForEvent(eventId: number, donorIds: number[]): DatabaseResponse<string>;
  updateTaskStatus(taskId: number, status: 'approved' | 'rejected', reason?: string): DatabaseResponse<string>;
  getTasks(): DatabaseResponse<TaskSchema[]>;
  getTasksByPMM(pmm: string): DatabaseResponse<TaskSchema[]>;
  getTasksByEvent(eventId: number): DatabaseResponse<TaskSchema[]>;
  getPMMs(): DatabaseResponse<string[]>;
}
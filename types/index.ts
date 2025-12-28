export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  task_title: string;
  deadline: string | null;
  priority: Priority;
}

export interface AIResponse {
  tasks: Task[];
}

export interface ConvertResponse {
  success: boolean;
  data?: AIResponse;
  error?: string;
}

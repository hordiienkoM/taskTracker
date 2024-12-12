import type { TaskPriority } from "~/enum/TaskPriority"
import type { TaskStatus } from "~/enum/TaskStatus"

export declare type Task = {
    id: string
    status: TaskStatus,
    executor: string,
    name: string,
    description: string,
    priority: TaskPriority,
    dashboard: string
}
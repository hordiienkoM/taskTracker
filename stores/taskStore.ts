import { StoreType } from "~/enum/StoreType";
import type { TaskStatus } from "~/enum/TaskStatus";
import type { Task } from "~/types/Task"

export interface TaskStore {
    tasks: Ref<Task[]>;
    addTask: (task: Task) => Promise<void>;
    removeTask: (id: string) => void;
    updateTask: (updatedTask: Task) => Promise<void>;
    getTasksByFields: (dashboard: string, status: TaskStatus, executor?: string) => ComputedRef<Task[]>;
    updTaskArr: (dashboard: string, status: TaskStatus, taskArr: Task[], executor?: string) => void
  }

export const useTaskStore = defineStore(StoreType.taskStore, (): TaskStore => {
    const tasks = ref<Task[]>([]);
    const isClient = typeof window !== 'undefined';
    const STORAGE_KEY = 'task-track-hord-tasks';

    const initializeTasks = () => {
        if (!isClient) {
            return
        }
        const storedTasks = localStorage.getItem(STORAGE_KEY);
        if (storedTasks) {
            tasks.value = JSON.parse(storedTasks);
        }
    };

    const saveTasksToLocalStorage = () => {
        if (!isClient) {
            return
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value));
    };

    function addTask(task: Task): Promise<void> {
        return new Promise<void>((resolve) => {
            tasks.value.push(task);
            saveTasksToLocalStorage()
            resolve()
        })
    }

    function removeTask(id: string) {
        tasks.value = tasks.value.filter(task => task.id !== id);
        saveTasksToLocalStorage()
    }

    function updateTask(updatedTask: Task): Promise<void> {
        return new Promise<void>((resolve) => {
            tasks.value = tasks.value.map(task => {
                if (task.id === updatedTask.id) {
                    return updatedTask;
                }
                return task;
            })
            saveTasksToLocalStorage()
            resolve()
        })
        
    }

    function updTaskArr(dashboard: string, status: TaskStatus, taskArr: Task[], executor?: string) {
        const updatedArr = [
            ...tasks.value.filter(task => 
                !(task.dashboard === dashboard && task.status === status && (!executor || task.executor === executor))
            ),
            ...taskArr
        ]
        tasks.value = updatedArr
        saveTasksToLocalStorage()
    }

    const getTasksByFields = (dashboard: string, status: TaskStatus, executor?: string) => {
        
        return computed(() => 
            tasks.value.filter(task => 
                task.dashboard === dashboard 
                && task.status === status 
                && (!executor || task.executor === executor)
        ))
    }

    onMounted(() => {
        initializeTasks();
    });

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
        getTasksByFields,
        updTaskArr
    }
})
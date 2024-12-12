<template>
  <div class="create-task-popup">
    <h2>Create Task</h2>
    <form @submit.prevent="submitTask">
      <div class="form-group">
        <label for="name">Task Name</label>
        <input v-model="task.name" placeholder="Enter name" id="name" type="text" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea v-model="task.description" placeholder="Enter description" id="description"></textarea>
      </div>

      <div class="form-group">
        <label for="name">Executor</label>
        <input v-model="task.executor" placeholder="Enter executor name" id="name" type="text" required />
      </div>

      <div class="form-group">
        <label for="priority">Priority</label>
        <v-select
          v-model="task.priority"
          :options="priorityOptions"
          label="label"
          placeholder="Priority"
          class="w-full md:w-56"
          :reduce="(option: Option) => option.value"
        />
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <v-select
          v-model="task.status"
          :options="statusOptions"
          label="label"
          placeholder="Status"
          class="w-full md:w-56"
          :reduce="(option: Option) => option.value"
        />
      </div>

      <p class="error-msg" v-if="errorMsg">
        {{ errorMsg }}
      </p>

      <div class="form-buttons">
        <button type="submit">Create</button>
        <button type="button" @click="cancel">Cancel</button>
      </div>
    </form>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { v4 as uuidV4 } from 'uuid';
  import { TaskStatus } from '~/enum/TaskStatus';
  import { TaskPriority } from '~/enum/TaskPriority';
  import type { Task } from '~/types/Task';

  interface Option {
    label: string;
    value: string;
  }

  interface Props {
    status: TaskStatus,
    dashboard: string
  }
  const props = defineProps<Props>();
  
  const emit = defineEmits(['cancel']);

  let errorMsg: Ref<string | undefined> = ref(undefined)
  const taskStore = useTaskStore()
  
  const task: Ref<Task> = ref({
    id: uuidV4(),
    name: '',
    description: '',
    priority: TaskPriority.MEDIUM,
    status: props.status,
    dashboard: props.dashboard,
    executor: ''
  });
  
  const priorityOptions = [
    { label: 'LOW', value: TaskPriority.LOW },
    { label: 'MEDIUM', value: TaskPriority.MEDIUM },
    { label: 'HIGHT', value: TaskPriority.HIGHT },
    { label: 'CRITICAL', value: TaskPriority.CRITICAL },
  ];
  
  const statusOptions = [
    { label: 'TODO', value: TaskStatus.TODO },
    { label: 'IN_PROGRESS', value: TaskStatus.IN_PROGRESS },
    { label: 'DONE', value: TaskStatus.DONE },
  ];
  
  const submitTask = () => {
    if (!validateTask()) {
      errorMsg.value = "Fill in all fields before save the task"
      return
    }

    taskStore.addTask(task.value)
      .then(() => cancel())
  };

  const validateTask = () => {
    errorMsg.value = undefined
    const allFieldsFilled = task.value.description?.length > 0 
      && task.value.executor?.length > 0
      && task.value.name?.length > 0
      && task.value.priority
      && task.value.status
    return allFieldsFilled
  }
  
  const cancel = () => {
    emit('cancel');
  };
  </script>
  
  <style scoped>
    .create-task-popup {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 400px;
      width: 90%;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    label {
      color: var(--edit-card-label-color);
    }

    input {
      height: 33px;
      padding-left: 10px;
      border-radius: 5px;
    }

    textarea {
      height: 100px;
      resize: none;
      border-radius: 6px;
      padding: 10px;
    }
    
    h2 {
      margin-bottom: 10px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    
    .form-buttons {
      display: flex;
      justify-content: end;
      gap: 15px;
      margin-top: 20px;
    }
    
    button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    button[type="submit"] {
      background-color: #4caf50;
      color: white;
    }
    
    button[type="button"] {
      background-color: #f44336;
      color: white;
    }
    
    button:hover {
      opacity: 0.9;
    }

    .error-msg {
      color: var(--error-msg-color)
    }
  </style>
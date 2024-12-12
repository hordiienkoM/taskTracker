<template>
    <article class="task-card" pDraggable>
        <h3>{{ props.task.name }}</h3>
        <label class="task-card__label">description:</label>
        <p>{{ props.task.description }}</p>
        <p>
            <label>executor:</label> {{ props.task.executor }}
        </p>
        <p>
            <label>priority:</label> {{ props.task.priority }}
        </p>
        <div class="task-card__btns">
            <EditCardBtn @click="handleEdit" />
            <DeleteCardBtn @click="handleDelete" />
        </div>
    </article>
</template>

<script setup lang="ts">
import type { Task } from '~/types/Task';
import EditCardBtn from './UI/EditCardBtn.vue';
import DeleteCardBtn from './UI/DeleteCardBtn.vue';
import { showSurePopup } from './popup/surePopup/showSurePopup';
import { showEditTaskPopup } from './popup/editTask/showEditTaskPopup';

    interface Props {
        task: Task
    }
    const props = defineProps<Props>()

    const storage = useTaskStore()

    const handleDelete = () => {
        showSurePopup("Are you sure?")
        .then(agree => {
            if (agree) {
                storage.removeTask(props.task.id)
            }
        })
    }

    const handleEdit = () => {
        showEditTaskPopup(props.task)
    }

</script>

<style scoped>
    h3 {
        color: var(--card-title-color);
    }
    
    .task-card {
        padding: 15px;
        border-radius: 4px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        background-color: white;
        gap: 10px
    }

    label {
        color: var(--task-card-label-color);
    }

    .task-card__btns {
        display: flex;
        width: 100%;
        justify-content: end;
        gap: 10px;
        border-radius: 6px;
        padding-right: 5px;
    }
</style>
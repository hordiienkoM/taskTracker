<template>
    <div class="task-column">
        <h2 class="task-column__title">{{ taskColumnName }}</h2>
        <draggable class="task-column__body" 
            v-model="localTasks"
            chosen-class="chosen"
            ghost-class="ghost"
            item-key="id"
            group="tasks"
            @add="updStoreTasks"
            @remove="updStoreTasks"
            >
            <template #item="{ element: task }">
                <TaskCard :key="task.id" :task="task" />
            </template>
        </draggable>
        <div class="task-column__btns">
            <PlusCardBtn @click="handleAddBtnClick" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/taskStore';
import { TaskStatus } from '../enum/TaskStatus';
import TaskCard from './TaskCard.vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';
import PlusCardBtn from './UI/PlusCardBtn.vue';
import { showCreateTaskPopup } from './popup/createTask/showCreateTaskPopup';

    interface Props {
        dashboard: string,
        type: TaskStatus;
        executor?: string
    }

    const props = defineProps<Props>()

    const route = useRoute()
    const dashboard = "Project" + route.params.id as string

    const columnNameMap = new Map([
        [TaskStatus.TODO, "TODO"],
        [TaskStatus.IN_PROGRESS, "In progress"],
        [TaskStatus.DONE, "Done"]
    ])

    const taskStore = useTaskStore()

    const taskColumnName = computed(() => {
        return columnNameMap.get(props.type)
    })

    const storeTasks = ref(taskStore.getTasksByFields(dashboard, props.type, props.executor))
    const localTasks = ref([...storeTasks.value])

    watch(storeTasks, 
        newValue => {
            localTasks.value = [...newValue]
        }, 
        {deep: true}
    )

    const updStoreTasks = () => {
        const updatedTaskArr = localTasks.value.map(task => {
            task.status = props.type
            return task
        })
        useTaskStore().updTaskArr(props.dashboard, props.type, updatedTaskArr, props.executor);
    }

    const handleAddBtnClick = () => {
        showCreateTaskPopup(props.type, props.dashboard)
    }
    
</script>

<style scoped>
    .task-column {
        display: flex;
        flex-direction: column;
        gap: 5px;
        height: min-content;
        background-color: #F1F2F4;
        border-radius: 6px;
        padding: 10px;
        box-sizing: border-box;
    }

    .task-column__title {
        padding-left: 15px;
        box-sizing: border-box;
        display: flex;
    }

    .task-column__body {
        display: flex;
        flex-direction: column;
        gap: 5px;
        max-height: calc(100vh - 205px);
        overflow-y: auto;
        padding-bottom: 10px;
        padding-right: 8px;
    }

    .task-column__btns {
        display: flex;
        width: 100%;
        justify-content: end;
        gap: 10px;
        border-radius: 6px;
        padding-right: 5px;
    }

</style>
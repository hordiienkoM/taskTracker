<template>
    <div class="dashboard">
        <TaskColumn :type="TaskStatus.TODO" :executor="executor" :dashboard="projectName" />
        <TaskColumn :type="TaskStatus.IN_PROGRESS" :executor="executor" :dashboard="projectName" />
        <TaskColumn :type="TaskStatus.DONE" :executor="executor" :dashboard="projectName" />
    </div>
</template>

<script setup lang="ts">
import { TaskStatus } from '~/enum/TaskStatus';
import { useRoute } from 'vue-router';

    const projectName = "Project" + useRoute().params.id
    
    const executor = undefined
</script>

<style scoped>
    .dashboard {
        width: 100%;
        height: calc(100% - 60px);
        max-height: calc(100% - 60px);
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 15px;
        gap: 15px;
        box-sizing: border-box;
    }
</style>
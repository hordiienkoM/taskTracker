<template>
    <header class="header">
        <nav>
            <ul>
                <li class="title">TaskTrack</li>
                <li>
                    <v-select
                        v-model="selectedDashboard"
                        :options="dashboards"
                        label="name"
                        placeholder="Dashboard"
                        class="w-full md:w-56"
                    />
                    <!-- <Select v-model="selectedDashboard" editable :options="dashboards" optionLabel="name" placeholder="Dashboard" class="w-full md:w-56" /> -->
                </li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">   
    import { ref, watch } from 'vue';
    import { useRouter, useRoute } from 'vue-router';

    const router = useRouter()
    const route = useRoute()

    const dashboards = ref([
        {name: "Project1", path: "/dashboard/1"},
        {name: "Project2", path: "/dashboard/2"},
        {name: "Project3", path: "/dashboard/3"},
    ])

    const selectedDashboard = ref(dashboards.value[0])

    watch(selectedDashboard, newValue => {
        if (newValue && newValue.path) {
            router.push(newValue.path)
        }
    })

    watch(
        () => route.fullPath, 
        newPath => {
            const matchedDashboard = dashboards.value.find(dashboard => dashboard.path === newPath)
            if (matchedDashboard) {
                selectedDashboard.value = matchedDashboard;
            }
        }, 
        { immediate: true }
    )
</script>

<style scoped>
    .header {
        background-color: rgba(255, 255, 255, 0.7);
        width: 100%;
        height: 60px;
        padding-left: 15px;
        display: flex;
        align-items: center;
    }

    .title {
        font-weight: 600;
        color: #353535;
        font-size: 20px;
    }

    ul {
        display: flex;
        gap: 15px;
        align-items: center;
    }
</style>
<template>
    <button class="delete-btn" @click="$emit('click')" />
</template>

<script setup lang="ts">
    const emit = defineEmits(['click'])
</script>

<style scoped>
    .delete-btn {
        height: 25px;
        width: 30px;
        background-image: url("~/assets/icons/bin.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 15px 15px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
    }

    .delete-btn:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
</style>
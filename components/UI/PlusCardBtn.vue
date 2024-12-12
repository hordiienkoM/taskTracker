<template>
    <button class="plus-btn" @click="$emit('click')" />
</template>

<script setup lang="ts">
    const emit = defineEmits(['click'])
</script>

<style scoped>
    .plus-btn {
        height: 25px;
        width: 30px;
        background-image: url("~/assets/icons/plus.png");
        background-position: center;
        background-repeat: no-repeat;
        background-size: 15px 15px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
    }

    .plus-btn:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
</style>
<template>
    <div class="popup-overlay">
      <div class="popup">
        <p class="popup-message">{{ message }}</p>
        <div class="popup-buttons">
          <button class="popup-button agree" @click="onAgree(true)">Yes</button>
          <button class="popup-button disagree" @click="onAgree(false)">No</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    message: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['agree']);
  
  const onAgree = (value: boolean) => {
    emit('agree', value);
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 300px;
    width: 90%;
  }
  
  .popup-message {
    margin-bottom: 20px;
    font-size: 16px;
    color: #333;
  }
  
  .popup-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .popup-button {
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .popup-button.agree {
    background-color: #4caf50;
    color: white;
  }
  
  .popup-button.disagree {
    background-color: #f44336;
    color: white;
  }
  
  .popup-button:hover {
    opacity: 0.8;
  }
  </style>
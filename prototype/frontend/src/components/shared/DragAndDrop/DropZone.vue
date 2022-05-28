<template>
    <div
        class="transition-all bg-dark-50 rounded-md min-h-10 p-5" :class="markAsTarget ? 'border border-blue-500':''"
        @drop="$emit('onDrop', $event.dataTransfer?.getData('data')); markAsTarget = false"
        @dragover.prevent
        @dragenter="markAsTarget=true"
        @dragleave="markAsTarget=false"
    >
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const markAsTarget = ref(false);

defineEmits(['onDrop']);
</script>
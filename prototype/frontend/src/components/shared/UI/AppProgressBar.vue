<template>
<div class="relative border rounded-md border-dark-100">
    <span class="z-50"><slot></slot>: {{ progress }}%</span>
    <div
        class=" bg-green-400 opacity-50 rounded-md absolute left-0 top-0 h-full"
        :style="`width:${progress}%`"></div>
</div>
</template>
<script lang="ts" setup>
defineProps({
    progress: {Types: Number, required: true}
})
</script>
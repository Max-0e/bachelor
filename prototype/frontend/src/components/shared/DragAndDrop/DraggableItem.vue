<template>
<div
    draggable="true"
    class="transition-all"
    :class="hidden?'hidden':'visible'"
    @drag="hidden=true"
    @dragend="hidden=false"
    @dragstart="startDrag($event); $emit('dragstart', $event);">
    <slot></slot>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const hidden = ref(false);

defineEmits(["dragstart"]);

const props = defineProps({
	data: { type: String, required: true },
});

function startDrag(evt: DragEvent) {
	evt.dataTransfer!.dropEffect = 'link';
	evt.dataTransfer!.effectAllowed = 'move';
	evt.dataTransfer!.setData('data', props.data);
}
</script>
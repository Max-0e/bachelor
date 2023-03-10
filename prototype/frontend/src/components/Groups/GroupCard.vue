<template>
	<div class="bg-dark-400 m-5 rounded-md cursor-pointer hover:(bg-dark-800)">
		{{ group.name }}
	</div>
</template>
<script lang="ts" setup>
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { PropType } from '@vue/runtime-core';

defineProps({
	group: { type: Object as PropType<EntityGroup>, required: true },
});
</script>

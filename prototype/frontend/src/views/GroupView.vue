<template>
	<div class="flex justify-between items-center">
		<AppInlineInputField
			class="mr-5 mt-2 mb-5"
			v-model="currentGroup.name"
			type="text"
			name="name"
			id="name"
			placeholder="Group-Name"
			label="Group-Name"
			@save="groupStore.updateEntity(currentGroup.id, currentGroup)" />
		<AppToolTip text="Delete Group" position="left">
			<AppIcon @click="deleteGroupModal?.open()">delete</AppIcon>
		</AppToolTip>
	</div>
	<AppYesNoModal ref="deleteGroupModal" @yes="deleteCurrentGroup()">
		Delete this Group?
	</AppYesNoModal>
</template>
<script lang="ts" setup>
import { modalRef } from '@/intefaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const deleteGroupModal = modalRef();
const router = useRouter();

const groupStore = useGroupStore();
const currentGroup = ref(groupStore.currentEntity!);

function deleteCurrentGroup() {
	groupStore.deleteEntity(currentGroup.value);
	router.push({ name: 'LevelView' });
}
</script>

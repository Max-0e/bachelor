<template>
<div>
    <AppButton
        :color="'red'"
        tooltip="delete project"
        tooltipPosition="left"
        @click="deleteModalOpen = true">
        <div class="flex items-center justify-center">
            <AppIcon>
                delete
            </AppIcon>
            <span class="p-2">
                Delete Project
            </span>
        </div>
    </AppButton>
</div>
<div>
    Wip-Limit: {{currentProject.wipLimit}}
</div>
<AppYesNoModal
    :open="deleteModalOpen"
    @yes="
        projectStore.deleteCurrentProject();
        deleteModalOpen = false;
    "
    @cancel="deleteModalOpen = false">
    Delete Project "{{ currentProject.name }}"?
</AppYesNoModal>
</template>
<script setup lang="ts">
import { IProject } from '@/intefaces/project.interface';
import { useProjectStore } from '@/store/project';
import { PropType, ref } from 'vue';
import AppButton from '../shared/AppButton.vue';
import AppYesNoModal from '../shared/AppYesNoModal.vue';
import AppIcon from '../shared/AppIcon.vue';

const deleteModalOpen = ref(false);

const projectStore = useProjectStore();

const currentProject = ref(projectStore.getCurrentProject);

defineProps({
	project: { type: Object as PropType<IProject>, required: true },
});
</script>
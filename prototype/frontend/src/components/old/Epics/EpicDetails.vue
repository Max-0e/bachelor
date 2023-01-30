<template>
<div class="flex w-screen flex-col gap-10">
    <AppInlineInputField
        class="mr-5 mt-2 mb-5 text-3xl"
        v-model="epic.name"
        type="text"
        name="name"
        id="name"
        placeholder="Project-Name"
        label="Project-Name"
        @save="projectStore.updateEpic(project, epic)" />

        <div>
            <div class="flex gap-5">
                <AppDropDownMenu
                    ref="dropdown"
                    class="flex-grow"
                    v-model="selectedTask"
                    selectText="select Task to add"
                    :options="
                        project.tasks
                            .filter(task => !task.epics?.includes(epic.id))
                            .map(task => ({ name: task.name, value: task }))
                    " />
                <AppButton :disabled="!selectedTask" @click="addTaskToEpic()">Add to Epic</AppButton>
            </div>
            <TaskList :project="project" :epic="epic" />
        </div>
</div>
</template>
<script setup lang="ts">
import AppInlineInputField from '../shared/Input/AppInlineInputField.vue';
import AppDropDownMenu from '../shared/Input/AppDropDownMenu.vue';
import { IEpic } from '@/intefaces/epic.interface';
import { IProject } from '@/intefaces/project.interface';
import { PropType, ref, Ref } from 'vue';
import { useProjectStore } from '@/store/project';
import { ITask } from '@/intefaces/task.interface';
import TaskList from '../Tasks/TaskList.vue';
import AppButton from '../shared/Input/AppButton.vue';

const projectStore = useProjectStore();

const selectedTask: Ref<ITask | null> = ref(null);

const dropdown = ref<InstanceType<typeof AppDropDownMenu> | null>(null);

const props = defineProps({
    epic: { type: Object as PropType<IEpic>, required: true },
    project: { type: Object as PropType<IProject>, required: true },
})

function addTaskToEpic () {
    if (!selectedTask.value) return;
    selectedTask.value?.epics.push(props.epic.id);
    projectStore.updateTask(props.project, selectedTask.value);
    selectedTask.value = null;
    dropdown.value!.reset();
}
</script>
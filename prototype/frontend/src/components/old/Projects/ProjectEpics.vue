<template>
	<div v-if="!!project" class="w-full flex gap-5">
        <EpicCard :epic="epic" :project="project" v-for="epic in project.epics"/>

        <AppFloatingActionButton @click="createEpicModal!.open()" :icon="true">add</AppFloatingActionButton>
        <AppModal ref="createEpicModal">
            <div class="font-bold text-xl w-full text-left">Create new Epic</div>
            <div class="w-full">
                <form @keydown.enter="createEpic()">
                    <div>
                        <AppInputField
                            v-model="epicToCreate.name"
                            :validation-types="[validationType.name, validationType.required]"
                            ref="epicName"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Epic-Name"
                            label="Epic-Name" />
                    </div>
                </form>
            </div>
            <div class="w-full flex justify-end gap-5">
                <AppButton color="red" @click="createEpicModal!.close()">Cancel</AppButton>
                <AppButton @click="createEpic()">Create</AppButton>
            </div>
        </AppModal>
	</div>
	<div v-else>Something went Wrong...</div>
</template>
<script setup lang="ts">
import { useProjectStore } from '@/store/project';
import { PropType, ref, Ref } from 'vue';
import { IProject } from '@/intefaces/project.interface';
import { ICreateEpic } from '@/intefaces/epic.interface';
import { validationType } from '@/enums/validationType.enum';

import AppModal from '@/components/shared/Modal/AppModal.vue';
import AppButton from '@/components/shared/Input/AppButton.vue';
import AppFloatingActionButton from '@/components/shared/UI/AppFloatingActionButton.vue';
import AppInputField from '@/components/shared/Input/AppInputField.vue';
import EpicCard from '../Epics/EpicCard.vue';

const props = defineProps({
    project: { type: Object as PropType<IProject>, required: true },
})

const projectStore = useProjectStore();

const createEpicModal = ref<InstanceType<typeof AppModal> | null>(null);
const epicName = ref<InstanceType<typeof AppInputField> | null>(null);
const epicToCreate: Ref<ICreateEpic> = ref({ name: '' , projectId: props.project.id});


function createEpic () {
    if (epicName.value!.validate()) {
        projectStore.createEpic(props.project, epicToCreate.value);
		createEpicModal.value!.close();
		epicToCreate.value.name = '';
	}
}

</script>

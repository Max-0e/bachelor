<template>
	<div class="w-full h-full">
		<div class="w-15 absolute bg-dark-400 h-full top-0 left-0 pt-16">
            <AppToolTip class="w-full flex justify-center p-2" text="Project Overview" position="right">
                <router-link :to="{ name: 'Projects' }" class="transition-all">
                    <AppIcon>
                        home
                    </AppIcon>
                </router-link>
            </AppToolTip>
            <AppToolTip class="w-full flex justify-center p-2" text="Project Dashboard" position="right" v-if="currentProject">
                <router-link :to="{ name: 'ProjectDashboard' }" class="transition-all">
                    <AppIcon>
                        dashboard
                    </AppIcon>
                </router-link>
            </AppToolTip>
            <AppToolTip class="w-full flex justify-center p-2" text="Task-Board" position="right" v-if="currentProject">
                <router-link :to="{ name: 'ProjectBoard' }" class="transition-all">
                    <AppIcon>
                        waterfall_chart
                    </AppIcon>
                </router-link>
            </AppToolTip>
            <AppToolTip class="w-full flex justify-center p-2" text="Backlog" position="right" v-if="currentProject">
                <router-link :to="{ name: 'ProjectBacklog' }" class="transition-all">
                    <AppIcon>
                        list
                    </AppIcon>
                </router-link>
            </AppToolTip>
            <AppToolTip class="w-full flex justify-center p-2" text="Project Settings" position="right" v-if="currentProject">
                <router-link :to="{ name: 'ProjectSettings' }" class="transition-all">
                    <AppIcon>
                        settings
                    </AppIcon>
                </router-link>
            </AppToolTip>
		</div>
		<div class="w-full h-full pl-15">
            <!-- <Transition> -->
                <router-view />
            <!-- </Transition> -->
		</div>
	</div>
</template>
<script setup lang="ts">
import { useProjectStore } from '@/store/project';
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';
import AppIcon from '../shared/UI/AppIcon.vue';
import AppToolTip from '../shared/UI/AppToolTip.vue';

const projectStore = useProjectStore();
const router = useRouter();

const currentProject = computed( () => {
    try {
        return !!projectStore.getCurrentProject;
    } catch {
        return false;
    }
})
</script>
<template>
	Dashboard
	<AppToggleInput
		:initial-value="linkingEnabled"
		@change="linkingEnabled = !linkingEnabled"
		label="Enable Linking"></AppToggleInput>
	<div class="relative">
		<svg v-if="linkingEnabled" ref="svg" class="absolute h-full w-full">
			<Transition>
				<path
					v-if="showLink"
					ref="path"
					:d="`M ${startPosition.x} ${startPosition.y}, ${currentMousePosition.x} ${currentMousePosition.y}`"
					:stroke="appStore.darkMode ? 'white' : 'black'"
					stroke-width="5"
					fill="transparent" />
			</Transition>
		</svg>
		<div
			v-for="level in organizationStore.currentEntity?.useEpics
				? levelStore.currentEntitiesFromOrganization.filter(
						(level) => level.hierarchyLevel > 0
				  )
				: levelStore.currentEntitiesFromOrganization">
			<div class="text-left">{{ level.name }}</div>
			<div class="p-10 flex gap-5">
				<DropZone
					class="border border-2 flex-grow relative"
					v-for="group in groups.filter((x) => x.levelId === level.id)"
					@on-drop="link(group.id, $event)"
					:class="
						markedGroup === group || markedGroups.includes(group)
							? '!border-blue-500'
							: 'border-transparent'
					"
					@mouseenter="markGroup(group)"
					@mouseleave="unMark()"
					@click="goToGroupDetails(group)">
					<div class="transition-all rounded-md cursor-pointer">
						<DashboardGroupCardContent
							:group="group"></DashboardGroupCardContent>
						<div
							v-if="linkingEnabled"
							class="flex justify-center absolute top-[-40px] left-0 w-full">
							<DraggableItem
								@dragstart="startLinkage($event)"
								@dragend="stopLinkage()"
								:data="group.id">
								<AppIcon>fiber_manual_record</AppIcon>
							</DraggableItem>
						</div>
					</div>
				</DropZone>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { useAppStore } from '@/store/app';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';
import { useOrganizationStore } from '@/store/organization.store';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const appStore = useAppStore();
const groupStore = useGroupStore();
const levelStore = useLevelStore();
const organizationStore = useOrganizationStore();

const groups = ref(groupStore.currentEntitiesFromOrganization);

const markedGroup = ref<EntityGroup | undefined>(undefined);
const markedGroups = computed(() => {
	return markedGroup.value
		? getLinkedGroupsUp(markedGroup.value).concat(
				getLinkedGroupsDown(markedGroup.value)
		  )
		: [];
});

const goToGroupDetails = (group: EntityGroup) => {
	router.push({
		name: levelStore.isProjectLevel(group.levelId)
			? 'ProjectDashboard'
			: 'GroupView',
		params: { levelId: group.levelId, groupId: group.id },
	});
};

const linkingEnabled = ref(false);

const path = ref<SVGPathElement | null>(null);

const showLink = ref(false);

const startPosition = ref({
	x: 0,
	y: 0,
});
const currentMousePosition = ref({
	x: 0,
	y: 0,
});

document.addEventListener('drag', (e) => {
	currentMousePosition.value.x = e.pageX - 20;
	currentMousePosition.value.y = e.pageY - 130;
});

function getLinkedGroupsUp(group: EntityGroup): EntityGroup[] {
	const linkedGroups = groups.value.filter((x) =>
		group.entityGroupIds.includes(x.id)
	);
	return linkedGroups.concat(linkedGroups.flatMap((x) => getLinkedGroupsUp(x)));
}
function getLinkedGroupsDown(group: EntityGroup): EntityGroup[] {
	const linkedGroups = groups.value.filter((x) =>
		x.entityGroupIds.includes(group.id)
	);
	return linkedGroups.concat(
		linkedGroups.flatMap((x) => getLinkedGroupsDown(x))
	);
}

function markGroup(group: EntityGroup) {
	markedGroup.value = group;
}

function unMark() {
	markedGroup.value = undefined;
}

function startLinkage(event: DragEvent) {
	showLink.value = true;
	startPosition.value.x = event.pageX - 20;
	startPosition.value.y = event.pageY - 130;
}
function stopLinkage() {
	showLink.value = false;
}

function link(entityToLinkToId: string, entityId: string) {
	// TODO: fix typing
	(groupStore as any).link(entityId, entityToLinkToId);
}
</script>

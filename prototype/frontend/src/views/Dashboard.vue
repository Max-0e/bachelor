<template>
	Dashboard
	<AppToggleInput
		:initial-value="linkingEnabled"
		@change="linkingEnabled = !linkingEnabled"
		label="Enable Linking"></AppToggleInput>
	<div class="relative" ref="container">
		<svg ref="svg" class="absolute h-full w-full">
			<Transition>
				<path
					v-if="showLink && linkingEnabled"
					ref="path"
					:d="`M ${startPosition.x} ${startPosition.y}, ${currentMousePosition.x} ${currentMousePosition.y}`"
					:stroke="appStore.darkMode ? 'white' : 'black'"
					stroke-width="5"
					fill="transparent" />
			</Transition>
			<g v-for="group in groups">
				<path
					class="transition-all"
					:class="{ 'opacity-40': linkingEnabled }"
					v-for="linkedGroupId in group.entityGroupIds"
					:d="getPathString(group.id, linkedGroupId)"
					:stroke="
						(markedGroup === group || markedGroups.includes(group)) &&
						(markedGroups.some((x) => x.id === linkedGroupId) ||
							markedGroup?.id === linkedGroupId)
							? 'rgb(59, 130, 246)'
							: appStore.darkMode
							? 'white'
							: 'black'
					"
					stroke-width="2"
					fill="transparent"></path>
			</g>
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
					class="border border-2 flex-grow relative cursor-pointer"
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
					<div class="transition-all rounded-md">
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
import { EntityGroupStore, useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';
import { useOrganizationStore } from '@/store/organization.store';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const appStore = useAppStore();
const groupStore = useGroupStore();
const levelStore = useLevelStore();
const organizationStore = useOrganizationStore();

const container = ref<HTMLDivElement>();

const groups = computed(() => groupStore.currentEntitiesFromOrganization);

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
	// TODO: there must be an even better way
	(groupStore as unknown as EntityGroupStore).link(entityId, entityToLinkToId);
}

const groupCoordinates = computed(() => {
	if (!container.value) return;
	const groupsByLevel = levelStore.currentEntitiesFromOrganization.map(
		(level) => ({
			level,
			groups: groups.value.filter((group) => group.levelId === level.id),
		})
	);

	if (organizationStore.currentEntity!.useEpics) {
		groupsByLevel.splice(
			groupsByLevel.findIndex((x) => x.level.hierarchyLevel === 0),
			1
		);
	}

	const offset = 20;
	const padding = 40;
	const cardHeight = 152;
	const yOffset = 24;
	const width = container.value.clientWidth - padding * 2;

	return groupsByLevel.flatMap((x, levelIndex) => {
		const groupCardWidth =
			(width - offset * (x.groups.length - 1)) / x.groups.length;
		return x.groups.map((group, groupIndex) => ({
			id: group.id,
			x:
				groupCardWidth * (groupIndex + 1) -
				(1 / 2) * groupCardWidth +
				offset * groupIndex +
				padding,
			yBottom:
				cardHeight * (levelIndex + 1) +
				yOffset * levelIndex +
				2 * padding * (levelIndex + 1) -
				10,
			yTop:
				cardHeight * levelIndex +
				yOffset * (levelIndex + 1) +
				2 * padding * levelIndex +
				35,
		}));
	});
});

const getPathString = (groupId: string, linkedGroupId: string) => {
	if (!groupCoordinates.value) return '';
	const coordinates = groupCoordinates.value.find((x) => x.id === groupId);
	const linkedCoordinates = groupCoordinates.value.find(
		(x) => x.id === linkedGroupId
	);
	if (!coordinates) return '';
	if (!linkedCoordinates) return '';
	return `M ${coordinates.x} ${coordinates.yTop}, ${linkedCoordinates.x} ${linkedCoordinates.yBottom}`;
};
</script>

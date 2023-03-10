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
					stroke="black"
					stroke-width="5"
					fill="transparent" />
			</Transition>
		</svg>
		<div v-for="level in levelStore.currentEntitiesFromOrganization">
			<div class="text-left">{{ level.name }}</div>
			<div class="p-10 flex gap-5">
				<DropZone
					v-if="linkingEnabled"
					class="border border-2 flex-grow relative"
					v-for="group in groups.filter((x) => x.levelId === level.id)"
					@on-drop="link(group.id, $event)"
					:class="
						markedGroup === group || markedGroups.includes(group)
							? '!border-blue-500'
							: 'border-transparent'
					">
					<div
						class="transition-all rounded-md"
						@mouseenter="markGroup(group)"
						@mouseleave="unmark()">
						{{ group.name }}
						<div>some fancy Data</div>
						<div class="flex justify-center absolute top-[-40px] left-0 w-full">
							<DraggableItem
								@dragstart="startLinkage($event)"
								@dragend="stopLinkage()"
								:data="group.id">
								<AppIcon>fiber_manual_record</AppIcon>
							</DraggableItem>
						</div>
					</div>
				</DropZone>
				<div
					v-else
					class="transition-all flex-grow bg-gray-300 p-5 dark:bg-dark-100 rounded-md border border-2 cursor-pointer"
					v-for="group in groups.filter((x) => x.levelId === level.id)"
					:class="
						markedGroup === group || markedGroups.includes(group)
							? '!border-blue-500'
							: '!border-transparent'
					"
					@mouseenter="markGroup(group)"
					@mouseleave="unmark()">
					{{ group.name }}
					<div>some fancy Data</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';
import { computed, ref } from 'vue';

const groupStore = useGroupStore();
const levelStore = useLevelStore();

const groups = ref(groupStore.currentEntitiesFromOrganization);

const markedGroup = ref<EntityGroup | undefined>(undefined);
const markedGroups = computed(() => {
	const groupsstuff = groups.value;
	groupsstuff;
	return markedGroup.value
		? getLinkedGroupsUp(markedGroup.value).concat(
				getLinkedGroupsDown(markedGroup.value)
		  )
		: [];
});

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

function unmark() {
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
	(groupStore as any).link(entityId, entityToLinkToId);
}
</script>

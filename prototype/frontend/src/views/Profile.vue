<template>
	<AppIcon button large @click="router.back()">arrow_back</AppIcon>
	<div class="text-4xl text-left flex content-center gap-10 m-10">
		<AppChip> person </AppChip>
		<div>
			{{ authStore.user?.username }}
		</div>
	</div>
	<div class="text-4xl text-left flex content-center gap-10 m-10">
		<AppChip> mail </AppChip>
		<div>
			{{ authStore.user?.email }}
		</div>
	</div>
	<div v-if="authStore.user?.jiraApiToken">
		<div class="m-10 flex items-center gap-5">
			<span class="text-2xl text-left"> You have a Jira Token </span>
			<AppToolTip text="delete API-Token" position="top">
				<AppIcon button @click="confirmDeleteModal?.open()">delete</AppIcon>
			</AppToolTip>
			<AppIcon @click="showToken = !showToken">
				{{ showToken ? 'visibility' : 'visibility_off' }}</AppIcon
			>
		</div>
		<div class="w-1/4 text-left m-10" v-if="showToken">
			{{ authStore.user.jiraApiToken }}
		</div>
	</div>
	<div v-else>
		<AppCollapsible class="px-10" trigger-text="Add Jira token">
			<div class="flex items-center">
				<AppInputField
					class="w-full"
					ref="token"
					label="Token"
					:type="showInput ? 'text' : 'password'">
				</AppInputField>
				<span class="pt-2 pr-4 flex items-center">
					<AppIcon @click="showInput = !showInput">
						{{ showInput ? 'visibility' : 'visibility_off' }}</AppIcon
					>
					<AppToolTip
						text="Save Token"
						position="top"
						class="transform transition"
						:class="{ 'scale-0': formGroup.formObjects.token.value === '' }">
						<AppIcon
							button
							@click="
								authStore.addJiraApiToken(formGroup.formObjects.token.value)
							">
							check
						</AppIcon>
					</AppToolTip>
					<AppToolTip text="How to get a Token?" position="top">
						<AppIcon button @click="helpModal?.open()"> help </AppIcon>
					</AppToolTip>
				</span>
			</div>
		</AppCollapsible>
		<AppModal ref="helpModal">
			<span>
				To generate a Token go to
				<a
					class="text-blue-400 hover:text-blue-600 transition-all"
					href="https://id.atlassian.com/manage-profile/security/api-tokens"
					target="_blank"
					>this page</a
				>.
			</span>
		</AppModal>
	</div>
	<AppYesNoModal ref="confirmDeleteModal" @yes="authStore.deleteJiraApiToken()">
		Do you really want to delete this Api-Token?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import { FormGroup } from '@/components/shared/Input/formGroup';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const token = inputRef();
const formGroup = new FormGroup({ token });

const confirmDeleteModal = modalRef();
const helpModal = modalRef();

const showToken = ref(false);
const showInput = ref(false);

formGroup.formObjects.token.patchValue(authStore.user?.jiraApiToken ?? '');
</script>

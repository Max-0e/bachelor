<template>
	<AppIcon button large @click="router.back()">arrow_back</AppIcon>
	<div class="m-10 flex content-center gap-10 text-left text-4xl">
		<AppChip> person </AppChip>
		<div>
			{{ authStore.user?.username }}
		</div>
	</div>
	<div class="m-10 flex content-center gap-10 text-left text-4xl">
		<AppChip> mail </AppChip>
		<div>
			{{ authStore.user?.email }}
		</div>
	</div>
	<div v-if="authStore.user?.jiraApiToken">
		<div class="m-10 flex items-center gap-5">
			<span class="text-left text-2xl">
				You have a Jira Token for Domain
				<span class="bold dark:bg-dark-900 rounded-md bg-gray-200 p-2">
					{{ authStore.user.jiraApiDomain }}.atlassian.net
				</span>
			</span>
			<AppToolTip text="delete API-Token" position="top">
				<AppIcon class="text-red-500" button @click="confirmDeleteModal?.open()"
					>delete</AppIcon
				>
			</AppToolTip>
			<AppIcon @click="showToken = !showToken">
				{{ showToken ? 'visibility' : 'visibility_off' }}</AppIcon
			>
		</div>
		<div class="m-10 w-1/4 text-left" v-if="showToken">
			{{ authStore.user.jiraApiToken }}
		</div>
	</div>
	<div v-else>
		<AppCollapsible class="px-10" trigger-text="Add Jira token">
			<div class="flex items-center">
				<AppInputField
					class="w-1/2"
					:validation-types="[validationType.required]"
					ref="token"
					label="Token"
					:type="showInput ? 'text' : 'password'">
				</AppInputField>
				<AppInputField
					:validation-types="[validationType.required]"
					class="w-1/2"
					ref="domain"
					label="Domain">
				</AppInputField>
				<AppInputField
					:validation-types="[validationType.required]"
					class="w-1/2"
					ref="mail"
					label="Jira-Mail">
				</AppInputField>
				<span class="flex items-center pr-4 pt-2">
					<AppIcon @click="showInput = !showInput">
						{{ showInput ? 'visibility' : 'visibility_off' }}</AppIcon
					>
					<AppToolTip
						text="Save Token"
						position="top"
						class="transform transition"
						:class="{
							'scale-0':
								formGroup.formObjects.token.value === '' ||
								formGroup.formObjects.domain.value === '' ||
								formGroup.formObjects.mail.value === '',
						}">
						<AppIcon
							class="text-successGreen dark:text-successGreenDark"
							button
							@click="addJiraToken()">
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
			<div>
				<div class="text-4xl mb-5">How to get a Token?</div>
				<div>
					To generate a Token go to
					<a
						class="text-blue-400 transition-all hover:text-blue-600"
						href="https://id.atlassian.com/manage-profile/security/api-tokens"
						target="_blank"
						>this page</a
					>.
				</div>
			</div>
		</AppModal>
	</div>
	<AppYesNoModal ref="confirmDeleteModal" @yes="authStore.deleteJiraApiToken()">
		Do you really want to delete this Api-Token?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import { FormGroup } from '@/components/shared/Input/formGroup';
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useAuthStore } from '@/store/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const token = inputRef();
const domain = inputRef();
const mail = inputRef();
const formGroup = new FormGroup({ token, domain, mail });

const confirmDeleteModal = modalRef();
const helpModal = modalRef();

const showToken = ref(false);
const showInput = ref(false);

const addJiraToken = () =>
	authStore.addJiraApiToken(
		formGroup.formObjects.token.value,
		formGroup.formObjects.domain.value,
		formGroup.formObjects.mail.value
	);

formGroup.formObjects.token.patchValue(authStore.user?.jiraApiToken ?? '');
</script>

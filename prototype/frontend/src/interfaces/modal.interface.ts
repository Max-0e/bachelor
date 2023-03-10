import { ref, Ref } from 'vue';
import AppModal from '../components/shared/Modal/AppModal.vue';
import AppYesNoModal from '../components/shared/Modal/AppYesNoModal.vue';

type ModalInstance = InstanceType<typeof AppModal | typeof AppYesNoModal>;
export type ModalRef = Ref<ModalInstance | null>;

export const modalRef = (): ModalRef => ref<ModalInstance | null>(null);

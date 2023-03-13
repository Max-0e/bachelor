import { ref, Ref } from 'vue';
import AppInputField from '../components/shared/Input/AppInputField.vue';

type InputInstance = InstanceType<typeof AppInputField>;
export type InputRef = Ref<InputInstance | null>;

export const inputRef = (): InputRef => ref<InputInstance | null>(null);

import { useLevelStore } from '@/store/level.store';

export async function levelsResolver() {
	if (!useLevelStore().isLoaded) {
		await useLevelStore().loadEntities();
	}
}

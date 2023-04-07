import { Entity } from '@/interfaces/base/entity.interface';
import { EntityService } from '@/services/base/entity.service';
import { PiniaState, PiniaStateTree } from '../piniaTypes';
import { EntityStore } from './entity.store';

export interface EntityState<T> extends PiniaStateTree {
	isLoaded: boolean;
	entities: Entity<T>[];
	service: EntityService<T>;
}

export const makeEntityState =
	<T>(entityService: EntityService<T>): PiniaState<EntityStore<T>> =>
	() => ({
		isLoaded: false,
		entities: [],
		service: entityService,
	});

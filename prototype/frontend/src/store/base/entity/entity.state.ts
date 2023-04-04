import { Entity, IEntity } from '@/interfaces/base/entity.interface';
import { EntityService } from '@/services/base/entity.service';
import { PiniaState, PiniaStateTree } from '../piniaTypes';
import { EntityStore } from './entity.store';

export interface EntityState<T extends IEntity> extends PiniaStateTree {
	isLoaded: boolean;
	entities: T[];
	service: EntityService<T>;
}

export const entityState: PiniaState<EntityStore<Entity<unknown>>> = () => ({
	isLoaded: false,
	entities: [],
	service: {} as EntityService<IEntity>,
});

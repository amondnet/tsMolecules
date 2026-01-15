// Annotation-based (decorators)
export {
  AggregateRoot as AggregateRootDecorator,
  BoundedContext as BoundedContextDecorator,
  Entity as EntityDecorator,
  Factory as FactoryDecorator,
  getDDDMetadata,
  Module as ModuleDecorator,
  Repository as RepositoryDecorator,
  Service as ServiceDecorator,
  ValueObject as ValueObjectDecorator,
} from './annotation/index.js'

export type {
  BoundedContextOptions,
  DDDMetadata,
  DDDStereotype,
  ModuleOptions,
} from './annotation/index.js'

// Type-based DDD building blocks
export type {
  AggregateRoot,
  Association,
  BoundedContext,
  Entity,
  Factory,
  Identifiable,
  Identifier,
  Module,
  Repository,
  Service,
  ValueObject,
} from './types/index.js'

export { SimpleAssociation } from './types/index.js'

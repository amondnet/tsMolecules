// Type-based DDD building blocks
export type {
  Identifier,
  Identifiable,
  Entity,
  AggregateRoot,
  ValueObject,
  Repository,
  Association,
  Service,
  Factory,
  Module,
  BoundedContext,
} from './types/index.js'

export { SimpleAssociation } from './types/index.js'

// Annotation-based (decorators)
export {
  Entity as EntityDecorator,
  AggregateRoot as AggregateRootDecorator,
  ValueObject as ValueObjectDecorator,
  Repository as RepositoryDecorator,
  Service as ServiceDecorator,
  Factory as FactoryDecorator,
  Module as ModuleDecorator,
  BoundedContext as BoundedContextDecorator,
  getDDDMetadata,
} from './annotation/index.js'

export type {
  DDDStereotype,
  DDDMetadata,
  ModuleOptions,
  BoundedContextOptions,
} from './annotation/index.js'

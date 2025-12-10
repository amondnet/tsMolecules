// Type-based event building blocks
export type { DomainEvent } from './DomainEvent.js'
export type { DomainEventHandler } from './DomainEventHandler.js'
export type { DomainEventPublisher } from './DomainEventPublisher.js'

// Decorators
export {
  DomainEvent as DomainEventDecorator,
  DomainEventHandler as DomainEventHandlerDecorator,
  DomainEventPublisher as DomainEventPublisherDecorator,
  getEventMetadata,
} from './decorators.js'

export type { EventStereotype, EventMetadata } from './decorators.js'

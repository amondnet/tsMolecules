/**
 * Event stereotype types.
 */
export type EventStereotype = 'DomainEvent' | 'DomainEventHandler' | 'DomainEventPublisher'

/**
 * Metadata stored for event-related classes.
 */
export interface EventMetadata {
  stereotype: EventStereotype
  options?: Record<string, unknown>
}

/**
 * Storage for event metadata.
 */
const metadataStore = new WeakMap<object, EventMetadata>()

/**
 * Gets the event metadata for a class.
 *
 * @param target - the class constructor
 * @returns the event metadata or undefined
 */
export function getEventMetadata(target: object): EventMetadata | undefined {
  return metadataStore.get(target)
}

/**
 * Creates a class decorator for event stereotypes.
 */
function createEventDecorator(
  stereotype: EventStereotype,
  options?: Record<string, unknown>,
): ClassDecorator {
  return (target: object) => {
    metadataStore.set(target, { stereotype, options })
  }
}

/**
 * Marks a class as a Domain Event.
 *
 * @example
 * ```typescript
 * @DomainEvent()
 * class OrderPlaced {
 *   constructor(
 *     public readonly orderId: string,
 *     public readonly occurredOn: Date = new Date()
 *   ) {}
 * }
 * ```
 */
export function DomainEvent(): ClassDecorator {
  return createEventDecorator('DomainEvent')
}

/**
 * Marks a class as a Domain Event Handler.
 *
 * @example
 * ```typescript
 * @DomainEventHandler()
 * class OrderPlacedHandler {
 *   handle(event: OrderPlaced): void { ... }
 * }
 * ```
 */
export function DomainEventHandler(): ClassDecorator {
  return createEventDecorator('DomainEventHandler')
}

/**
 * Marks a class as a Domain Event Publisher.
 *
 * @example
 * ```typescript
 * @DomainEventPublisher()
 * class EventBus {
 *   publish(event: DomainEvent): void { ... }
 * }
 * ```
 */
export function DomainEventPublisher(): ClassDecorator {
  return createEventDecorator('DomainEventPublisher')
}

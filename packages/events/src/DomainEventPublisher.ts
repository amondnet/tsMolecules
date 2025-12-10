import type { DomainEvent } from './DomainEvent.js'

/**
 * Publisher for domain events.
 *
 * Implementations are responsible for distributing domain events
 * to interested handlers or external systems.
 *
 * @example
 * ```typescript
 * class InMemoryEventPublisher implements DomainEventPublisher {
 *   async publish<T extends DomainEvent>(event: T): Promise<void> {
 *     // Dispatch to registered handlers
 *   }
 *
 *   async publishAll<T extends DomainEvent>(events: T[]): Promise<void> {
 *     await Promise.all(events.map(e => this.publish(e)));
 *   }
 * }
 * ```
 */
export interface DomainEventPublisher {
  /**
   * Publishes a single domain event.
   *
   * @param event - the domain event to publish
   */
  publish<T extends DomainEvent>(event: T): void | Promise<void>

  /**
   * Publishes multiple domain events.
   *
   * @param events - the domain events to publish
   */
  publishAll<T extends DomainEvent>(events: T[]): void | Promise<void>
}

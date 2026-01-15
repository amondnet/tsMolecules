import type { DomainEvent } from './DomainEvent.js'

/**
 * Handler for domain events.
 *
 * Implementations react to domain events and perform side effects
 * or trigger other actions in response.
 *
 * @typeParam T - the domain event type this handler processes
 *
 * @example
 * ```typescript
 * class OrderPlacedHandler implements DomainEventHandler<OrderPlaced> {
 *   async handle(event: OrderPlaced): Promise<void> {
 *     // Send confirmation email, update inventory, etc.
 *   }
 * }
 * ```
 */
export interface DomainEventHandler<T extends DomainEvent> {
  /**
   * Handles the given domain event.
   *
   * @param event - the domain event to handle
   */
  handle: (event: T) => void | Promise<void>
}

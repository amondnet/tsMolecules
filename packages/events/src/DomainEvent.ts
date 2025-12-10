/**
 * Identifies a Domain Event.
 *
 * "Model information about activity in the domain as a series of discrete events.
 * Represent each event as a domain object. [...] A domain event is a full-fledged
 * part of the domain model, a representation of something that happened in the domain."
 *
 * Domain events:
 * - Represent something that happened in the domain
 * - Are significant to domain experts
 * - Usually correspond to state changes in aggregates
 * - Should be immutable
 *
 * @example
 * ```typescript
 * class OrderPlaced implements DomainEvent {
 *   constructor(
 *     public readonly orderId: string,
 *     public readonly customerId: string,
 *     public readonly occurredOn: Date = new Date()
 *   ) {}
 * }
 * ```
 */
export interface DomainEvent {}

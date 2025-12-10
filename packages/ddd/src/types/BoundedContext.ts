/**
 * Identifies a Bounded Context.
 *
 * "A description of a boundary (typically a subsystem, or the work of a particular team)
 * within which a particular model is defined and applicable."
 *
 * A Bounded Context encompasses both domain and technical logic defined within
 * an architectural style.
 *
 * Key characteristics:
 * - Defines explicit boundaries for a domain model
 * - Within the boundary, terms and concepts have specific meanings
 * - Different bounded contexts may have different models for the same concept
 */
export interface BoundedContext {
  /**
   * A stable identifier for the bounded context.
   */
  readonly id?: string

  /**
   * A human-readable name for the bounded context.
   */
  readonly name?: string

  /**
   * A human-readable description for the bounded context.
   */
  readonly description?: string
}

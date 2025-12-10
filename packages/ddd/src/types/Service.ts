/**
 * Identifies a Service.
 *
 * "When a significant process or transformation in the domain is not a natural
 * responsibility of an Entity or Value Object, add an operation to the model as
 * a standalone interface declared as a Service."
 *
 * A service should be:
 * - Stateless
 * - Part of the Ubiquitous Language
 * - Defined in terms of domain model elements
 *
 * @see Entity
 * @see ValueObject
 */
export interface Service {}

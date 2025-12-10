/**
 * Identifies a value object.
 *
 * "Domain concepts that are modeled as value objects have no conceptual identity or lifecycle."
 *
 * Key characteristics:
 * - Implementations should be immutable
 * - Operations on value objects are side-effect free
 * - Equality is based on attribute values, not identity
 * - Can be freely replaced with another instance that has the same values
 *
 * Common examples: Money, Address, DateRange, Email, Color
 */
export interface ValueObject {}

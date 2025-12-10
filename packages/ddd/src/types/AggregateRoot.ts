import type { Entity } from './Entity.js'
import type { Identifier } from './Identifier.js'

/**
 * Identifies an aggregate root, i.e., the root entity of an aggregate.
 *
 * An aggregate is a cluster of domain objects that can be treated as a single unit.
 * The aggregate root is the only member of the aggregate that outside objects are allowed
 * to hold references to.
 *
 * Key characteristics:
 * - References to other aggregates should be made via identifier instead of direct object reference
 * - Changes within an aggregate are consistent immediately
 * - Changes between aggregates are eventually consistent
 *
 * @typeParam T - the concrete aggregate root type (for self-referential typing)
 * @typeParam ID - the identifier type (should extend Identifier)
 *
 * @see Entity
 * @see Identifier
 * @see Association
 */
export interface AggregateRoot<T, ID extends Identifier> extends Entity<T, ID> {}

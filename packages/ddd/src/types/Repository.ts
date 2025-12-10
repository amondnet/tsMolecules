import type { Identifier } from './Identifier.js'

/**
 * Identifies a Repository.
 *
 * A repository simulates a collection of aggregates to which aggregate instances
 * can be added and removed. It typically exposes an API to select aggregates
 * matching certain criteria.
 *
 * Key characteristics:
 * - Provides a collection-like abstraction for accessing aggregates
 * - Encapsulates the persistence mechanism
 * - No persistence mechanism specific APIs should leak into client code
 *
 * @typeParam T - the aggregate root type this repository manages
 * @typeParam ID - the identifier type of the aggregate
 *
 * @see AggregateRoot
 * @see Identifier
 */
export interface Repository<T, ID extends Identifier> {}

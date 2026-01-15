import type { Identifiable } from './Identifiable.js'
import type { Identifier } from './Identifier.js'

/**
 * An association to an AggregateRoot.
 *
 * Associations represent cross-aggregate references via identifier rather than
 * direct object references. This is the recommended way to reference other
 * aggregates to maintain proper aggregate boundaries.
 *
 * @typeParam T - the aggregate root type
 * @typeParam ID - the identifier type
 *
 * @see AggregateRoot
 * @see Identifier
 */
export interface Association<
  _T,
  ID extends Identifier,
> extends Identifiable<ID> {
  /**
   * Returns whether this association points to the same aggregate as the given one.
   *
   * @param other - another association to compare with
   * @returns true if both associations point to the same aggregate
   */
  pointsToSameAggregateAs: (other: Association<unknown, ID>) => boolean

  /**
   * Returns whether this association points to the aggregate with the given identifier.
   *
   * @param identifier - the identifier to check
   * @returns true if this association points to the aggregate with the given identifier
   */
  pointsTo: (identifier: ID) => boolean
}

/**
 * Default implementation of Association.
 *
 * @typeParam T - the aggregate root type
 * @typeParam ID - the identifier type
 */
export class SimpleAssociation<T, ID extends Identifier> implements Association<
  T,
  ID
> {
  private readonly identifier: ID

  private constructor(identifier: ID) {
    if (identifier == null) {
      throw new Error('Identifier must not be null or undefined')
    }
    this.identifier = identifier
  }

  /**
   * Creates an Association pointing to the given aggregate.
   *
   * @param aggregate - the aggregate root to associate with
   * @returns a new Association pointing to the aggregate
   */
  static forAggregate<T extends Identifiable<ID>, ID extends Identifier>(
    aggregate: T,
  ): Association<T, ID> {
    if (aggregate == null) {
      throw new Error('Aggregate must not be null or undefined')
    }
    return new SimpleAssociation(aggregate.getId())
  }

  /**
   * Creates an Association pointing to the aggregate with the given identifier.
   *
   * @param identifier - the identifier of the aggregate
   * @returns a new Association pointing to the aggregate with the given identifier
   */
  static forId<T, ID extends Identifier>(identifier: ID): Association<T, ID> {
    return new SimpleAssociation(identifier)
  }

  getId(): ID {
    return this.identifier
  }

  pointsToSameAggregateAs(other: Association<unknown, ID>): boolean {
    if (other == null) {
      throw new Error('Other association must not be null or undefined')
    }
    return this.identifier === other.getId()
  }

  pointsTo(identifier: ID): boolean {
    if (identifier == null) {
      throw new Error('Identifier must not be null or undefined')
    }
    return this.identifier === identifier
  }
}

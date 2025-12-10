/**
 * Interface for types that expose an identifier.
 *
 * @typeParam ID - the identifier type
 */
export interface Identifiable<ID> {
  /**
   * Returns the identifier of this object.
   */
  getId(): ID
}

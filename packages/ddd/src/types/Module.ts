/**
 * Identifies a DDD Module.
 *
 * Modules are a way to organize related domain concepts. They should:
 * - Have high cohesion within the module
 * - Have low coupling between modules
 * - Reflect the Ubiquitous Language
 *
 * In TypeScript, modules typically correspond to directories or namespaces.
 */
export interface Module {
  /**
   * A stable identifier for the module.
   */
  readonly id?: string

  /**
   * A human-readable name for the module.
   */
  readonly name?: string

  /**
   * A human-readable description for the module.
   */
  readonly description?: string
}

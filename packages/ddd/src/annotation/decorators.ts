/**
 * Decorator metadata key for storing DDD stereotype information.
 */
const DDD_STEREOTYPE_KEY = Symbol('ddd:stereotype')

/**
 * DDD Stereotype types.
 */
export type DDDStereotype =
  | 'Entity'
  | 'AggregateRoot'
  | 'ValueObject'
  | 'Repository'
  | 'Service'
  | 'Factory'
  | 'Module'
  | 'BoundedContext'

/**
 * Metadata stored for each decorated class.
 */
export interface DDDMetadata {
  stereotype: DDDStereotype
  options?: Record<string, unknown>
}

/**
 * Storage for DDD metadata (WeakMap to avoid memory leaks).
 */
const metadataStore = new WeakMap<object, DDDMetadata>()

/**
 * Gets the DDD metadata for a class.
 *
 * @param target - the class constructor
 * @returns the DDD metadata or undefined
 */
export function getDDDMetadata(target: object): DDDMetadata | undefined {
  return metadataStore.get(target)
}

/**
 * Creates a class decorator for DDD stereotypes.
 *
 * @param stereotype - the DDD stereotype
 * @param options - optional metadata
 */
function createStereotypeDecorator(
  stereotype: DDDStereotype,
  options?: Record<string, unknown>,
): ClassDecorator {
  return (target: object) => {
    metadataStore.set(target, { stereotype, options })
  }
}

/**
 * Marks a class as an Entity.
 *
 * Entities represent objects with a thread of continuity and identity,
 * going through a lifecycle, though their attributes may change.
 *
 * @example
 * ```typescript
 * @Entity()
 * class User {
 *   constructor(private readonly id: string) {}
 * }
 * ```
 */
export function Entity(): ClassDecorator {
  return createStereotypeDecorator('Entity')
}

/**
 * Marks a class as an Aggregate Root.
 *
 * An aggregate root is the root entity of an aggregate - a cluster of
 * domain objects that can be treated as a single unit.
 *
 * @example
 * ```typescript
 * @AggregateRoot()
 * class Order {
 *   constructor(private readonly id: OrderId) {}
 * }
 * ```
 */
export function AggregateRoot(): ClassDecorator {
  return createStereotypeDecorator('AggregateRoot')
}

/**
 * Marks a class as a Value Object.
 *
 * Value objects have no conceptual identity or lifecycle.
 * They should be immutable and operations on them should be side-effect free.
 *
 * @example
 * ```typescript
 * @ValueObject()
 * class Money {
 *   constructor(
 *     public readonly amount: number,
 *     public readonly currency: string
 *   ) {}
 * }
 * ```
 */
export function ValueObject(): ClassDecorator {
  return createStereotypeDecorator('ValueObject')
}

/**
 * Marks a class as a Repository.
 *
 * Repositories simulate a collection of aggregates and abstract away
 * persistence mechanisms.
 *
 * @example
 * ```typescript
 * @Repository()
 * class OrderRepository {
 *   async findById(id: OrderId): Promise<Order | null> { ... }
 * }
 * ```
 */
export function Repository(): ClassDecorator {
  return createStereotypeDecorator('Repository')
}

/**
 * Marks a class as a Domain Service.
 *
 * Services represent significant processes or transformations in the domain
 * that are not a natural responsibility of an entity or value object.
 *
 * @example
 * ```typescript
 * @Service()
 * class PaymentService {
 *   processPayment(order: Order, payment: Payment): void { ... }
 * }
 * ```
 */
export function Service(): ClassDecorator {
  return createStereotypeDecorator('Service')
}

/**
 * Marks a class as a Factory.
 *
 * Factories encapsulate the responsibility of creating complex objects
 * and aggregates, ensuring they are in a valid state.
 *
 * @example
 * ```typescript
 * @Factory()
 * class OrderFactory {
 *   create(customerId: string, items: OrderItem[]): Order { ... }
 * }
 * ```
 */
export function Factory(): ClassDecorator {
  return createStereotypeDecorator('Factory')
}

/**
 * Options for the Module decorator.
 */
export interface ModuleOptions {
  /**
   * A stable identifier for the module.
   */
  id?: string

  /**
   * A human-readable name for the module.
   */
  name?: string

  /**
   * A human-readable description for the module.
   */
  description?: string

  [key: string]: unknown
}

/**
 * Marks a class or namespace as a DDD Module.
 *
 * @param options - module metadata options
 *
 * @example
 * ```typescript
 * @Module({ id: 'orders', name: 'Orders Module' })
 * class OrdersModule {}
 * ```
 */
export function Module(options?: ModuleOptions): ClassDecorator {
  return createStereotypeDecorator('Module', options)
}

/**
 * Options for the BoundedContext decorator.
 */
export interface BoundedContextOptions {
  /**
   * A stable identifier for the bounded context.
   */
  id?: string

  /**
   * A human-readable name for the bounded context.
   */
  name?: string

  /**
   * A human-readable description for the bounded context.
   */
  description?: string

  [key: string]: unknown
}

/**
 * Marks a class or namespace as a Bounded Context.
 *
 * @param options - bounded context metadata options
 *
 * @example
 * ```typescript
 * @BoundedContext({
 *   id: 'sales',
 *   name: 'Sales Context',
 *   description: 'Handles all sales operations'
 * })
 * class SalesContext {}
 * ```
 */
export function BoundedContext(options?: BoundedContextOptions): ClassDecorator {
  return createStereotypeDecorator('BoundedContext', options)
}

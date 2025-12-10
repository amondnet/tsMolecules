/**
 * Onion Architecture decorators.
 *
 * Dependency inversion-focused concentric layers:
 * - Domain Model (innermost): Core business entities
 * - Domain Services: Business logic that doesn't fit in entities
 * - Application Services: Use case orchestration
 * - Infrastructure (outermost): Technical concerns
 *
 * Dependencies always point inward.
 */

/**
 * Onion architecture stereotypes.
 */
export type OnionStereotype =
  | 'DomainModelRing'
  | 'DomainServiceRing'
  | 'ApplicationServiceRing'
  | 'InfrastructureRing'

/**
 * Metadata for onion architecture components.
 */
export interface OnionMetadata {
  stereotype: OnionStereotype
}

const metadataStore = new WeakMap<object, OnionMetadata>()

export function getOnionMetadata(target: object): OnionMetadata | undefined {
  return metadataStore.get(target)
}

function createOnionDecorator(stereotype: OnionStereotype): ClassDecorator {
  return (target: object) => {
    metadataStore.set(target, { stereotype })
  }
}

/**
 * Marks a class as belonging to the Domain Model ring.
 *
 * The innermost ring containing core domain entities and value objects.
 * Has no dependencies on outer rings.
 *
 * @example
 * ```typescript
 * @DomainModelRing()
 * class Order {
 *   constructor(
 *     private readonly id: OrderId,
 *     private items: OrderItem[]
 *   ) {}
 * }
 * ```
 */
export function DomainModelRing(): ClassDecorator {
  return createOnionDecorator('DomainModelRing')
}

/**
 * Marks a class as belonging to the Domain Service ring.
 *
 * Contains domain logic that doesn't naturally fit within entities.
 * Can depend on the Domain Model ring.
 *
 * @example
 * ```typescript
 * @DomainServiceRing()
 * class PricingService {
 *   calculateTotal(order: Order): Money { ... }
 * }
 * ```
 */
export function DomainServiceRing(): ClassDecorator {
  return createOnionDecorator('DomainServiceRing')
}

/**
 * Marks a class as belonging to the Application Service ring.
 *
 * Orchestrates use cases by coordinating domain objects.
 * Can depend on Domain Model and Domain Service rings.
 *
 * @example
 * ```typescript
 * @ApplicationServiceRing()
 * class OrderApplicationService {
 *   constructor(
 *     private orderRepository: OrderRepository,
 *     private pricingService: PricingService
 *   ) {}
 *
 *   placeOrder(command: PlaceOrderCommand): Order { ... }
 * }
 * ```
 */
export function ApplicationServiceRing(): ClassDecorator {
  return createOnionDecorator('ApplicationServiceRing')
}

/**
 * Marks a class as belonging to the Infrastructure ring.
 *
 * The outermost ring containing technical implementations.
 * Can depend on all inner rings.
 *
 * @example
 * ```typescript
 * @InfrastructureRing()
 * class PostgresOrderRepository implements OrderRepository {
 *   async save(order: Order): Promise<void> { ... }
 * }
 * ```
 */
export function InfrastructureRing(): ClassDecorator {
  return createOnionDecorator('InfrastructureRing')
}

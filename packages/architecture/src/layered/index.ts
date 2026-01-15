/**
 * Layered Architecture decorators.
 *
 * Traditional horizontal layer separation with strict dependency rules:
 * - Interface Layer → Application Layer → Domain Layer → Infrastructure Layer
 *
 * Each layer can only depend on layers below it.
 */

/**
 * Layered architecture stereotypes.
 */
export type LayeredStereotype
  = | 'InterfaceLayer'
    | 'ApplicationLayer'
    | 'DomainLayer'
    | 'InfrastructureLayer'

/**
 * Metadata for layered architecture components.
 */
export interface LayeredMetadata {
  stereotype: LayeredStereotype
}

const metadataStore = new WeakMap<object, LayeredMetadata>()

export function getLayeredMetadata(target: object): LayeredMetadata | undefined {
  return metadataStore.get(target)
}

function createLayeredDecorator(stereotype: LayeredStereotype): ClassDecorator {
  return (target: object) => {
    metadataStore.set(target, { stereotype })
  }
}

/**
 * Marks a class as belonging to the Interface Layer.
 *
 * The interface layer handles communication with external actors
 * (users, other systems). Includes controllers, views, and DTOs.
 *
 * @example
 * ```typescript
 * @InterfaceLayer()
 * class OrderController {
 *   createOrder(dto: CreateOrderDto): OrderDto { ... }
 * }
 * ```
 */
export function InterfaceLayer(): ClassDecorator {
  return createLayeredDecorator('InterfaceLayer')
}

/**
 * Marks a class as belonging to the Application Layer.
 *
 * The application layer orchestrates domain objects to perform
 * use cases. It should be thin and delegate to the domain layer.
 *
 * @example
 * ```typescript
 * @ApplicationLayer()
 * class OrderApplicationService {
 *   placeOrder(command: PlaceOrderCommand): void { ... }
 * }
 * ```
 */
export function ApplicationLayer(): ClassDecorator {
  return createLayeredDecorator('ApplicationLayer')
}

/**
 * Marks a class as belonging to the Domain Layer.
 *
 * The domain layer contains the business logic and domain model.
 * This is the heart of the software.
 *
 * @example
 * ```typescript
 * @DomainLayer()
 * class Order {
 *   addItem(item: OrderItem): void { ... }
 * }
 * ```
 */
export function DomainLayer(): ClassDecorator {
  return createLayeredDecorator('DomainLayer')
}

/**
 * Marks a class as belonging to the Infrastructure Layer.
 *
 * The infrastructure layer provides technical capabilities
 * that support the higher layers (persistence, messaging, etc.).
 *
 * @example
 * ```typescript
 * @InfrastructureLayer()
 * class PostgresOrderRepository implements OrderRepository {
 *   save(order: Order): Promise<void> { ... }
 * }
 * ```
 */
export function InfrastructureLayer(): ClassDecorator {
  return createLayeredDecorator('InfrastructureLayer')
}

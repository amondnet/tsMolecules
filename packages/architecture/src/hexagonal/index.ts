/**
 * Hexagonal Architecture (Ports & Adapters) decorators.
 *
 * Isolates the application core from external concerns:
 * - Application: The core business logic
 * - Ports: Interfaces defining how the application interacts with the outside
 * - Adapters: Implementations that connect ports to external systems
 */

/**
 * Hexagonal architecture stereotypes.
 */
export type HexagonalStereotype =
  | 'Application'
  | 'PrimaryPort'
  | 'SecondaryPort'
  | 'PrimaryAdapter'
  | 'SecondaryAdapter'
  | 'Port'
  | 'Adapter'

/**
 * Metadata for hexagonal architecture components.
 */
export interface HexagonalMetadata {
  stereotype: HexagonalStereotype
}

const metadataStore = new WeakMap<object, HexagonalMetadata>()

export function getHexagonalMetadata(target: object): HexagonalMetadata | undefined {
  return metadataStore.get(target)
}

function createHexagonalDecorator(stereotype: HexagonalStereotype): ClassDecorator {
  return (target: object) => {
    metadataStore.set(target, { stereotype })
  }
}

/**
 * Marks a class as belonging to the Application core.
 *
 * The application core contains business logic and use cases,
 * isolated from external concerns.
 *
 * @example
 * ```typescript
 * @Application()
 * class OrderService {
 *   placeOrder(items: OrderItem[]): Order { ... }
 * }
 * ```
 */
export function Application(): ClassDecorator {
  return createHexagonalDecorator('Application')
}

/**
 * Marks an interface as a Port.
 *
 * Ports define the boundary between the application and the outside world.
 *
 * @example
 * ```typescript
 * @Port()
 * interface OrderRepository {
 *   save(order: Order): Promise<void>
 * }
 * ```
 */
export function Port(): ClassDecorator {
  return createHexagonalDecorator('Port')
}

/**
 * Marks an interface as a Primary (Driving) Port.
 *
 * Primary ports define how external actors drive the application.
 * They are implemented by the application and used by adapters.
 *
 * @example
 * ```typescript
 * @PrimaryPort()
 * interface OrderUseCase {
 *   placeOrder(command: PlaceOrderCommand): Order
 * }
 * ```
 */
export function PrimaryPort(): ClassDecorator {
  return createHexagonalDecorator('PrimaryPort')
}

/**
 * Marks an interface as a Secondary (Driven) Port.
 *
 * Secondary ports define what the application needs from external systems.
 * They are defined by the application and implemented by adapters.
 *
 * @example
 * ```typescript
 * @SecondaryPort()
 * interface OrderRepository {
 *   save(order: Order): Promise<void>
 *   findById(id: OrderId): Promise<Order | null>
 * }
 * ```
 */
export function SecondaryPort(): ClassDecorator {
  return createHexagonalDecorator('SecondaryPort')
}

/**
 * Marks a class as an Adapter.
 *
 * Adapters connect ports to the outside world.
 *
 * @example
 * ```typescript
 * @Adapter()
 * class RestOrderController {
 *   constructor(private orderUseCase: OrderUseCase) {}
 * }
 * ```
 */
export function Adapter(): ClassDecorator {
  return createHexagonalDecorator('Adapter')
}

/**
 * Marks a class as a Primary (Driving) Adapter.
 *
 * Primary adapters drive the application by calling primary ports.
 * Examples: REST controllers, CLI handlers, message consumers.
 *
 * @example
 * ```typescript
 * @PrimaryAdapter()
 * class OrderRestController {
 *   constructor(private orderUseCase: OrderUseCase) {}
 *   createOrder(dto: CreateOrderDto): OrderDto { ... }
 * }
 * ```
 */
export function PrimaryAdapter(): ClassDecorator {
  return createHexagonalDecorator('PrimaryAdapter')
}

/**
 * Marks a class as a Secondary (Driven) Adapter.
 *
 * Secondary adapters implement secondary ports to connect
 * the application to external systems.
 * Examples: Database repositories, external API clients, message publishers.
 *
 * @example
 * ```typescript
 * @SecondaryAdapter()
 * class PostgresOrderRepository implements OrderRepository {
 *   async save(order: Order): Promise<void> { ... }
 * }
 * ```
 */
export function SecondaryAdapter(): ClassDecorator {
  return createHexagonalDecorator('SecondaryAdapter')
}

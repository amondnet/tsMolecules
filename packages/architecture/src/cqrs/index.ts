/**
 * CQRS (Command Query Responsibility Segregation) decorators.
 *
 * Separates read and write operations:
 * - Commands: Modify state, return nothing or acknowledgment
 * - Queries: Read state, return data, no side effects
 */

/**
 * CQRS stereotypes.
 */
export type CQRSStereotype =
  | 'Command'
  | 'CommandHandler'
  | 'CommandDispatcher'
  | 'Query'
  | 'QueryHandler'
  | 'QueryDispatcher'
  | 'QueryModel'

/**
 * Metadata for CQRS components.
 */
export interface CQRSMetadata {
  stereotype: CQRSStereotype
}

const metadataStore = new WeakMap<object, CQRSMetadata>()

export function getCQRSMetadata(target: object): CQRSMetadata | undefined {
  return metadataStore.get(target)
}

function createCQRSDecorator(stereotype: CQRSStereotype): ClassDecorator {
  return (target: object) => {
    metadataStore.set(target, { stereotype })
  }
}

/**
 * Marks a class as a Command.
 *
 * Commands represent intentions to change state. They should be
 * named with imperative verbs (e.g., PlaceOrder, CancelOrder).
 *
 * @example
 * ```typescript
 * @Command()
 * class PlaceOrder {
 *   constructor(
 *     public readonly customerId: string,
 *     public readonly items: OrderItem[]
 *   ) {}
 * }
 * ```
 */
export function Command(): ClassDecorator {
  return createCQRSDecorator('Command')
}

/**
 * Marks a class as a Command Handler.
 *
 * Command handlers execute commands and apply business logic.
 * Each handler typically handles one type of command.
 *
 * @example
 * ```typescript
 * @CommandHandler()
 * class PlaceOrderHandler {
 *   constructor(private orderRepository: OrderRepository) {}
 *
 *   handle(command: PlaceOrder): void {
 *     const order = Order.create(command.customerId, command.items);
 *     this.orderRepository.save(order);
 *   }
 * }
 * ```
 */
export function CommandHandler(): ClassDecorator {
  return createCQRSDecorator('CommandHandler')
}

/**
 * Marks a class as a Command Dispatcher.
 *
 * Command dispatchers route commands to their appropriate handlers.
 *
 * @example
 * ```typescript
 * @CommandDispatcher()
 * class CommandBus {
 *   dispatch<T>(command: T): void { ... }
 * }
 * ```
 */
export function CommandDispatcher(): ClassDecorator {
  return createCQRSDecorator('CommandDispatcher')
}

/**
 * Marks a class as a Query.
 *
 * Queries represent requests for data. They should not cause
 * any state changes.
 *
 * @example
 * ```typescript
 * @Query()
 * class GetOrderById {
 *   constructor(public readonly orderId: string) {}
 * }
 * ```
 */
export function Query(): ClassDecorator {
  return createCQRSDecorator('Query')
}

/**
 * Marks a class as a Query Handler.
 *
 * Query handlers execute queries and return data.
 *
 * @example
 * ```typescript
 * @QueryHandler()
 * class GetOrderByIdHandler {
 *   constructor(private orderQueryRepository: OrderQueryRepository) {}
 *
 *   handle(query: GetOrderById): OrderDto {
 *     return this.orderQueryRepository.findById(query.orderId);
 *   }
 * }
 * ```
 */
export function QueryHandler(): ClassDecorator {
  return createCQRSDecorator('QueryHandler')
}

/**
 * Marks a class as a Query Dispatcher.
 *
 * Query dispatchers route queries to their appropriate handlers.
 *
 * @example
 * ```typescript
 * @QueryDispatcher()
 * class QueryBus {
 *   dispatch<T, R>(query: T): R { ... }
 * }
 * ```
 */
export function QueryDispatcher(): ClassDecorator {
  return createCQRSDecorator('QueryDispatcher')
}

/**
 * Marks a class as a Query Model (Read Model).
 *
 * Query models are optimized data structures for read operations.
 * They are often denormalized and updated by domain events.
 *
 * @example
 * ```typescript
 * @QueryModel()
 * class OrderSummary {
 *   constructor(
 *     public readonly orderId: string,
 *     public readonly customerName: string,
 *     public readonly totalAmount: number,
 *     public readonly itemCount: number
 *   ) {}
 * }
 * ```
 */
export function QueryModel(): ClassDecorator {
  return createCQRSDecorator('QueryModel')
}

# tsMolecules

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)

**Architectural abstractions for TypeScript** - Express DDD concepts and architectural patterns directly in your code.

tsMolecules is the TypeScript implementation of [xMolecules](https://xmolecules.org/), providing a set of types, interfaces, and decorators to express architectural concepts in TypeScript/JavaScript applications without framework dependencies.

## Philosophy

> "Explicitly express architectural concepts for easier code reading and writing."

The core ideas behind tsMolecules:

1. **Explicit Expression** - Make architectural concepts visible in code, not just naming conventions
2. **Clean Domain Code** - Keep domain logic free from framework dependencies
3. **Type Safety** - Leverage TypeScript's type system to enforce architectural rules at compile time

## Installation

```bash
npm install tsmolecules
# or
yarn add tsmolecules
# or
pnpm add tsmolecules
```

## Modules

tsMolecules is organized into several modules:

| Module | Description |
|--------|-------------|
| `@tsmolecules/ddd` | DDD building blocks (Entity, ValueObject, Aggregate, Repository, etc.) |
| `@tsmolecules/events` | Event-driven architecture support (DomainEvent) |
| `@tsmolecules/architecture` | Architectural patterns (Layered, Hexagonal, Onion, CQRS) |

## DDD Building Blocks

tsMolecules provides two approaches for expressing DDD concepts:

### Type-Based Model

Use interfaces and types to enforce DDD relationships at compile time:

```typescript
import {
  Identifier,
  Identifiable,
  Entity,
  AggregateRoot,
  ValueObject,
  Repository,
  Association
} from '@tsmolecules/ddd';

// Define an Identifier
class AccountId implements Identifier {
  constructor(public readonly value: string) {}
}

// Define a Value Object
class Money implements ValueObject {
  constructor(
    public readonly amount: number,
    public readonly currency: string
  ) {}

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Currency mismatch');
    }
    return new Money(this.amount + other.amount, this.currency);
  }
}

// Define an Aggregate Root
class BankAccount implements AggregateRoot<BankAccount, AccountId> {
  constructor(
    private readonly _id: AccountId,
    private _balance: Money
  ) {}

  getId(): AccountId {
    return this._id;
  }

  deposit(amount: Money): void {
    this._balance = this._balance.add(amount);
  }
}

// Define a Repository
interface BankAccountRepository extends Repository<BankAccount, AccountId> {
  findById(id: AccountId): Promise<BankAccount | null>;
  save(account: BankAccount): Promise<void>;
}
```

### Decorator-Based Model

Use decorators to annotate classes without changing domain names:

```typescript
import {
  Entity,
  AggregateRoot,
  ValueObject,
  Repository,
  Service,
  Factory
} from '@tsmolecules/ddd/decorators';

@ValueObject()
class IBAN {
  constructor(public readonly value: string) {}
}

@AggregateRoot()
class BankAccount {
  constructor(
    private readonly id: string,
    private readonly iban: IBAN
  ) {}
}

@Repository()
class Accounts {
  async findByIban(iban: IBAN): Promise<BankAccount | null> {
    // Implementation
  }
}

@Service()
class TransferService {
  transfer(from: BankAccount, to: BankAccount, amount: Money): void {
    // Implementation
  }
}

@Factory()
class BankAccountFactory {
  create(iban: IBAN): BankAccount {
    // Implementation
  }
}
```

## DDD Types Reference

### Identifier

Marker interface for identifier types. Used to identify aggregate roots.

```typescript
interface Identifier {}
```

### Identifiable\<ID>

Interface for types that expose an identifier.

```typescript
interface Identifiable<ID> {
  getId(): ID;
}
```

### Entity\<T, ID>

Represents objects with continuity and identity throughout a lifecycle.

```typescript
interface Entity<T extends AggregateRoot<T, any>, ID> extends Identifiable<ID> {}
```

### AggregateRoot\<T, ID>

The root entity of an aggregate - a cluster of domain objects treated as a unit.

```typescript
interface AggregateRoot<T extends AggregateRoot<T, ID>, ID extends Identifier>
  extends Entity<T, ID> {}
```

### ValueObject

Immutable domain concepts with no identity - defined by their attributes.

```typescript
interface ValueObject {}
```

### Repository\<T, ID>

Collection-like abstraction for aggregates, hiding persistence details.

```typescript
interface Repository<T extends AggregateRoot<T, ID>, ID extends Identifier> {}
```

### Association\<T, ID>

Explicit reference to an aggregate root by its identifier (instead of direct reference).

```typescript
interface Association<T extends AggregateRoot<T, ID>, ID extends Identifier>
  extends Identifiable<ID> {

  pointsToSameAggregateAs(other: Association<any, ID>): boolean;
  pointsTo(identifier: ID): boolean;
}
```

## Events

Support for domain events in event-driven architectures:

```typescript
import { DomainEvent } from '@tsmolecules/events';

class AccountCreated implements DomainEvent {
  constructor(
    public readonly accountId: string,
    public readonly occurredOn: Date = new Date()
  ) {}
}

class MoneyDeposited implements DomainEvent {
  constructor(
    public readonly accountId: string,
    public readonly amount: Money,
    public readonly occurredOn: Date = new Date()
  ) {}
}
```

## Architectural Patterns

### Layered Architecture

```typescript
import {
  DomainLayer,
  ApplicationLayer,
  InfrastructureLayer,
  InterfaceLayer
} from '@tsmolecules/architecture/layered';

@DomainLayer()
class Order { /* ... */ }

@ApplicationLayer()
class OrderService { /* ... */ }

@InfrastructureLayer()
class OrderRepositoryImpl { /* ... */ }

@InterfaceLayer()
class OrderController { /* ... */ }
```

### Hexagonal Architecture (Ports & Adapters)

```typescript
import {
  Application,
  PrimaryPort,
  SecondaryPort,
  PrimaryAdapter,
  SecondaryAdapter
} from '@tsmolecules/architecture/hexagonal';

@Application()
class OrderService { /* ... */ }

@PrimaryPort()
interface OrderUseCase { /* ... */ }

@SecondaryPort()
interface OrderRepository { /* ... */ }

@PrimaryAdapter()
class OrderRestController { /* ... */ }

@SecondaryAdapter()
class OrderPostgresRepository { /* ... */ }
```

### Onion Architecture

```typescript
import {
  DomainModelRing,
  DomainServiceRing,
  ApplicationServiceRing,
  InfrastructureRing
} from '@tsmolecules/architecture/onion';

@DomainModelRing()
class Order { /* ... */ }

@DomainServiceRing()
class OrderDomainService { /* ... */ }

@ApplicationServiceRing()
class OrderApplicationService { /* ... */ }

@InfrastructureRing()
class OrderRepository { /* ... */ }
```

### CQRS (Command Query Responsibility Segregation)

```typescript
import {
  Command,
  CommandHandler,
  CommandDispatcher,
  QueryModel
} from '@tsmolecules/architecture/cqrs';

@Command()
class CreateOrder {
  constructor(public readonly customerId: string) {}
}

@CommandHandler()
class CreateOrderHandler {
  handle(command: CreateOrder): void { /* ... */ }
}

@QueryModel()
class OrderSummary {
  constructor(
    public readonly orderId: string,
    public readonly total: number
  ) {}
}
```

## Bounded Context & Modules

Organize your domain into bounded contexts and modules:

```typescript
import { BoundedContext, Module } from '@tsmolecules/ddd/decorators';

// Define at package/module level
@BoundedContext({
  id: 'banking',
  name: 'Banking Context',
  description: 'Handles all banking operations'
})
export namespace Banking {

  @Module({
    id: 'accounts',
    name: 'Accounts Module',
    description: 'Account management functionality'
  })
  export namespace Accounts {
    // Domain classes here
  }
}
```

## Related Projects

- [xMolecules](https://xmolecules.org/) - The umbrella project
- [jMolecules](https://github.com/xmolecules/jmolecules) - Java implementation
- [nMolecules](https://github.com/xmolecules/nmolecules) - .NET implementation
- [phpMolecules](https://github.com/xmolecules/phpmolecules) - PHP implementation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

Minsu Lee ([@amondnet](https://github.com/amondnet))
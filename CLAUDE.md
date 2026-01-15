# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

tsMolecules is the TypeScript implementation of [xMolecules](https://xmolecules.org/), providing types, interfaces, and decorators to express DDD and architectural concepts in TypeScript without framework dependencies.

## Commands

```bash
# Build all packages
bun run build

# Run linting
bun run lint

# Run type checking
bun run typecheck

# Run tests
bun run test

# Format code
bun run format

# Clean build artifacts
bun run clean

# Run single package commands (from package directory)
cd packages/ddd && bun run build
cd packages/ddd && bun run test
```

## Architecture

### Monorepo Structure

This is a Bun-based monorepo using Turborepo for task orchestration. All packages are in `packages/`.

### Packages

| Package                     | Purpose                | Exports                                                        |
| --------------------------- | ---------------------- | -------------------------------------------------------------- |
| `@tsmolecules/ddd`          | DDD building blocks    | `.` (all), `./types` (interfaces), `./annotation` (decorators) |
| `@tsmolecules/events`       | Domain events          | `.` (DomainEvent, handlers, publishers)                        |
| `@tsmolecules/architecture` | Architectural patterns | `.`, `./layered`, `./hexagonal`, `./onion`, `./cqrs`           |

### Dual API Pattern

The `@tsmolecules/ddd` package provides two ways to express DDD concepts:

1. **Type-based** (`./types`): Interfaces for compile-time enforcement
   - `Entity<T, ID>`, `AggregateRoot<T, ID>`, `ValueObject`, `Repository<T, ID>`, `Association<T, ID>`

2. **Decorator-based** (`./annotation`): Runtime decorators with metadata
   - `@Entity()`, `@AggregateRoot()`, `@ValueObject()`, `@Repository()`, `@Service()`, `@Factory()`, `@Module()`, `@BoundedContext()`
   - Metadata stored in WeakMap, retrievable via `getDDDMetadata()`

### Build Pipeline

Each package uses:

- `bun build` for bundling to `dist/`
- `tsc` with `tsconfig.build.json` for type declarations

## Code Style

- Uses `@antfu/eslint-config` v7
- Single quotes, no semicolons
- Unused type parameters prefixed with `_` (e.g., `Entity<_T, ID>`)

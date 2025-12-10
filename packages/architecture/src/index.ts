// Layered Architecture
export {
  InterfaceLayer,
  ApplicationLayer,
  DomainLayer,
  InfrastructureLayer,
  getLayeredMetadata,
} from './layered/index.js'
export type { LayeredStereotype, LayeredMetadata } from './layered/index.js'

// Hexagonal Architecture (Ports & Adapters)
export {
  Application,
  Port,
  PrimaryPort,
  SecondaryPort,
  Adapter,
  PrimaryAdapter,
  SecondaryAdapter,
  getHexagonalMetadata,
} from './hexagonal/index.js'
export type { HexagonalStereotype, HexagonalMetadata } from './hexagonal/index.js'

// Onion Architecture
export {
  DomainModelRing,
  DomainServiceRing,
  ApplicationServiceRing,
  InfrastructureRing,
  getOnionMetadata,
} from './onion/index.js'
export type { OnionStereotype, OnionMetadata } from './onion/index.js'

// CQRS
export {
  Command,
  CommandHandler,
  CommandDispatcher,
  Query,
  QueryHandler,
  QueryDispatcher,
  QueryModel,
  getCQRSMetadata,
} from './cqrs/index.js'
export type { CQRSStereotype, CQRSMetadata } from './cqrs/index.js'

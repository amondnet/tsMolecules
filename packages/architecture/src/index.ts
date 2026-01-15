// CQRS
export {
  Command,
  CommandDispatcher,
  CommandHandler,
  getCQRSMetadata,
  Query,
  QueryDispatcher,
  QueryHandler,
  QueryModel,
} from './cqrs/index.js'
export type { CQRSMetadata, CQRSStereotype } from './cqrs/index.js'

// Hexagonal Architecture (Ports & Adapters)
export {
  Adapter,
  Application,
  getHexagonalMetadata,
  Port,
  PrimaryAdapter,
  PrimaryPort,
  SecondaryAdapter,
  SecondaryPort,
} from './hexagonal/index.js'
export type { HexagonalMetadata, HexagonalStereotype } from './hexagonal/index.js'

// Layered Architecture
export {
  ApplicationLayer,
  DomainLayer,
  getLayeredMetadata,
  InfrastructureLayer,
  InterfaceLayer,
} from './layered/index.js'
export type { LayeredMetadata, LayeredStereotype } from './layered/index.js'

// Onion Architecture
export {
  ApplicationServiceRing,
  DomainModelRing,
  DomainServiceRing,
  getOnionMetadata,
  InfrastructureRing,
} from './onion/index.js'
export type { OnionMetadata, OnionStereotype } from './onion/index.js'

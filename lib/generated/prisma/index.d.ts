
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Balance
 * 
 */
export type Balance = $Result.DefaultSelection<Prisma.$BalancePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model SubRegion
 * 
 */
export type SubRegion = $Result.DefaultSelection<Prisma.$SubRegionPayload>
/**
 * Model Package
 * 
 */
export type Package = $Result.DefaultSelection<Prisma.$PackagePayload>
/**
 * Model Esim
 * 
 */
export type Esim = $Result.DefaultSelection<Prisma.$EsimPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model PaymentHistory
 * 
 */
export type PaymentHistory = $Result.DefaultSelection<Prisma.$PaymentHistoryPayload>
/**
 * Model TonHistory
 * 
 */
export type TonHistory = $Result.DefaultSelection<Prisma.$TonHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const PaymentType: {
  TOPUP: 'TOPUP',
  ORDER: 'ORDER'
};

export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType]


export const PaymentStatus: {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type PaymentType = $Enums.PaymentType

export const PaymentType: typeof $Enums.PaymentType

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Balances
 * const balances = await prisma.balance.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Balances
   * const balances = await prisma.balance.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.balance`: Exposes CRUD operations for the **Balance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Balances
    * const balances = await prisma.balance.findMany()
    * ```
    */
  get balance(): Prisma.BalanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subRegion`: Exposes CRUD operations for the **SubRegion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubRegions
    * const subRegions = await prisma.subRegion.findMany()
    * ```
    */
  get subRegion(): Prisma.SubRegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.package`: Exposes CRUD operations for the **Package** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Packages
    * const packages = await prisma.package.findMany()
    * ```
    */
  get package(): Prisma.PackageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.esim`: Exposes CRUD operations for the **Esim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Esims
    * const esims = await prisma.esim.findMany()
    * ```
    */
  get esim(): Prisma.EsimDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.paymentHistory`: Exposes CRUD operations for the **PaymentHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PaymentHistories
    * const paymentHistories = await prisma.paymentHistory.findMany()
    * ```
    */
  get paymentHistory(): Prisma.PaymentHistoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tonHistory`: Exposes CRUD operations for the **TonHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TonHistories
    * const tonHistories = await prisma.tonHistory.findMany()
    * ```
    */
  get tonHistory(): Prisma.TonHistoryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Balance: 'Balance',
    User: 'User',
    Region: 'Region',
    SubRegion: 'SubRegion',
    Package: 'Package',
    Esim: 'Esim',
    Order: 'Order',
    PaymentHistory: 'PaymentHistory',
    TonHistory: 'TonHistory'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "balance" | "user" | "region" | "subRegion" | "package" | "esim" | "order" | "paymentHistory" | "tonHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Balance: {
        payload: Prisma.$BalancePayload<ExtArgs>
        fields: Prisma.BalanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BalanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BalanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>
          }
          findFirst: {
            args: Prisma.BalanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BalanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>
          }
          findMany: {
            args: Prisma.BalanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>[]
          }
          create: {
            args: Prisma.BalanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>
          }
          createMany: {
            args: Prisma.BalanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BalanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>[]
          }
          delete: {
            args: Prisma.BalanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>
          }
          update: {
            args: Prisma.BalanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>
          }
          deleteMany: {
            args: Prisma.BalanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BalanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BalanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>[]
          }
          upsert: {
            args: Prisma.BalanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BalancePayload>
          }
          aggregate: {
            args: Prisma.BalanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBalance>
          }
          groupBy: {
            args: Prisma.BalanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<BalanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.BalanceCountArgs<ExtArgs>
            result: $Utils.Optional<BalanceCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      SubRegion: {
        payload: Prisma.$SubRegionPayload<ExtArgs>
        fields: Prisma.SubRegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubRegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubRegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>
          }
          findFirst: {
            args: Prisma.SubRegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubRegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>
          }
          findMany: {
            args: Prisma.SubRegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>[]
          }
          create: {
            args: Prisma.SubRegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>
          }
          createMany: {
            args: Prisma.SubRegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubRegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>[]
          }
          delete: {
            args: Prisma.SubRegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>
          }
          update: {
            args: Prisma.SubRegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>
          }
          deleteMany: {
            args: Prisma.SubRegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubRegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubRegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>[]
          }
          upsert: {
            args: Prisma.SubRegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubRegionPayload>
          }
          aggregate: {
            args: Prisma.SubRegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubRegion>
          }
          groupBy: {
            args: Prisma.SubRegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubRegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubRegionCountArgs<ExtArgs>
            result: $Utils.Optional<SubRegionCountAggregateOutputType> | number
          }
        }
      }
      Package: {
        payload: Prisma.$PackagePayload<ExtArgs>
        fields: Prisma.PackageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PackageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PackageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findFirst: {
            args: Prisma.PackageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PackageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          findMany: {
            args: Prisma.PackageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          create: {
            args: Prisma.PackageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          createMany: {
            args: Prisma.PackageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PackageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          delete: {
            args: Prisma.PackageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          update: {
            args: Prisma.PackageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          deleteMany: {
            args: Prisma.PackageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PackageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PackageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>[]
          }
          upsert: {
            args: Prisma.PackageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PackagePayload>
          }
          aggregate: {
            args: Prisma.PackageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePackage>
          }
          groupBy: {
            args: Prisma.PackageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PackageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PackageCountArgs<ExtArgs>
            result: $Utils.Optional<PackageCountAggregateOutputType> | number
          }
        }
      }
      Esim: {
        payload: Prisma.$EsimPayload<ExtArgs>
        fields: Prisma.EsimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EsimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EsimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>
          }
          findFirst: {
            args: Prisma.EsimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EsimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>
          }
          findMany: {
            args: Prisma.EsimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>[]
          }
          create: {
            args: Prisma.EsimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>
          }
          createMany: {
            args: Prisma.EsimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EsimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>[]
          }
          delete: {
            args: Prisma.EsimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>
          }
          update: {
            args: Prisma.EsimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>
          }
          deleteMany: {
            args: Prisma.EsimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EsimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EsimUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>[]
          }
          upsert: {
            args: Prisma.EsimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EsimPayload>
          }
          aggregate: {
            args: Prisma.EsimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEsim>
          }
          groupBy: {
            args: Prisma.EsimGroupByArgs<ExtArgs>
            result: $Utils.Optional<EsimGroupByOutputType>[]
          }
          count: {
            args: Prisma.EsimCountArgs<ExtArgs>
            result: $Utils.Optional<EsimCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      PaymentHistory: {
        payload: Prisma.$PaymentHistoryPayload<ExtArgs>
        fields: Prisma.PaymentHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>
          }
          findFirst: {
            args: Prisma.PaymentHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>
          }
          findMany: {
            args: Prisma.PaymentHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>[]
          }
          create: {
            args: Prisma.PaymentHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>
          }
          createMany: {
            args: Prisma.PaymentHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>[]
          }
          delete: {
            args: Prisma.PaymentHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>
          }
          update: {
            args: Prisma.PaymentHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>
          }
          deleteMany: {
            args: Prisma.PaymentHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>[]
          }
          upsert: {
            args: Prisma.PaymentHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentHistoryPayload>
          }
          aggregate: {
            args: Prisma.PaymentHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePaymentHistory>
          }
          groupBy: {
            args: Prisma.PaymentHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentHistoryCountAggregateOutputType> | number
          }
        }
      }
      TonHistory: {
        payload: Prisma.$TonHistoryPayload<ExtArgs>
        fields: Prisma.TonHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TonHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TonHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>
          }
          findFirst: {
            args: Prisma.TonHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TonHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>
          }
          findMany: {
            args: Prisma.TonHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>[]
          }
          create: {
            args: Prisma.TonHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>
          }
          createMany: {
            args: Prisma.TonHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TonHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>[]
          }
          delete: {
            args: Prisma.TonHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>
          }
          update: {
            args: Prisma.TonHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>
          }
          deleteMany: {
            args: Prisma.TonHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TonHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TonHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>[]
          }
          upsert: {
            args: Prisma.TonHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TonHistoryPayload>
          }
          aggregate: {
            args: Prisma.TonHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTonHistory>
          }
          groupBy: {
            args: Prisma.TonHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<TonHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.TonHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<TonHistoryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    balance?: BalanceOmit
    user?: UserOmit
    region?: RegionOmit
    subRegion?: SubRegionOmit
    package?: PackageOmit
    esim?: EsimOmit
    order?: OrderOmit
    paymentHistory?: PaymentHistoryOmit
    tonHistory?: TonHistoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    paymentHistory: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    paymentHistory?: boolean | UserCountOutputTypeCountPaymentHistoryArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentHistoryWhereInput
  }


  /**
   * Count Type RegionCountOutputType
   */

  export type RegionCountOutputType = {
    subRegions: number
    packages: number
  }

  export type RegionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subRegions?: boolean | RegionCountOutputTypeCountSubRegionsArgs
    packages?: boolean | RegionCountOutputTypeCountPackagesArgs
  }

  // Custom InputTypes
  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegionCountOutputType
     */
    select?: RegionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountSubRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubRegionWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountPackagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    esims: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    esims?: boolean | OrderCountOutputTypeCountEsimsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountEsimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EsimWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Balance
   */

  export type AggregateBalance = {
    _count: BalanceCountAggregateOutputType | null
    _avg: BalanceAvgAggregateOutputType | null
    _sum: BalanceSumAggregateOutputType | null
    _min: BalanceMinAggregateOutputType | null
    _max: BalanceMaxAggregateOutputType | null
  }

  export type BalanceAvgAggregateOutputType = {
    amount: number | null
  }

  export type BalanceSumAggregateOutputType = {
    amount: number | null
  }

  export type BalanceMinAggregateOutputType = {
    id: string | null
    amount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BalanceMaxAggregateOutputType = {
    id: string | null
    amount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BalanceCountAggregateOutputType = {
    id: number
    amount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BalanceAvgAggregateInputType = {
    amount?: true
  }

  export type BalanceSumAggregateInputType = {
    amount?: true
  }

  export type BalanceMinAggregateInputType = {
    id?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BalanceMaxAggregateInputType = {
    id?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BalanceCountAggregateInputType = {
    id?: true
    amount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BalanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Balance to aggregate.
     */
    where?: BalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Balances to fetch.
     */
    orderBy?: BalanceOrderByWithRelationInput | BalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Balances
    **/
    _count?: true | BalanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BalanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BalanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BalanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BalanceMaxAggregateInputType
  }

  export type GetBalanceAggregateType<T extends BalanceAggregateArgs> = {
        [P in keyof T & keyof AggregateBalance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBalance[P]>
      : GetScalarType<T[P], AggregateBalance[P]>
  }




  export type BalanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BalanceWhereInput
    orderBy?: BalanceOrderByWithAggregationInput | BalanceOrderByWithAggregationInput[]
    by: BalanceScalarFieldEnum[] | BalanceScalarFieldEnum
    having?: BalanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BalanceCountAggregateInputType | true
    _avg?: BalanceAvgAggregateInputType
    _sum?: BalanceSumAggregateInputType
    _min?: BalanceMinAggregateInputType
    _max?: BalanceMaxAggregateInputType
  }

  export type BalanceGroupByOutputType = {
    id: string
    amount: number
    createdAt: Date
    updatedAt: Date
    _count: BalanceCountAggregateOutputType | null
    _avg: BalanceAvgAggregateOutputType | null
    _sum: BalanceSumAggregateOutputType | null
    _min: BalanceMinAggregateOutputType | null
    _max: BalanceMaxAggregateOutputType | null
  }

  type GetBalanceGroupByPayload<T extends BalanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BalanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BalanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BalanceGroupByOutputType[P]>
            : GetScalarType<T[P], BalanceGroupByOutputType[P]>
        }
      >
    >


  export type BalanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | Balance$UserArgs<ExtArgs>
  }, ExtArgs["result"]["balance"]>

  export type BalanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["balance"]>

  export type BalanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["balance"]>

  export type BalanceSelectScalar = {
    id?: boolean
    amount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BalanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "createdAt" | "updatedAt", ExtArgs["result"]["balance"]>
  export type BalanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | Balance$UserArgs<ExtArgs>
  }
  export type BalanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BalanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BalancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Balance"
    objects: {
      User: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["balance"]>
    composites: {}
  }

  type BalanceGetPayload<S extends boolean | null | undefined | BalanceDefaultArgs> = $Result.GetResult<Prisma.$BalancePayload, S>

  type BalanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BalanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BalanceCountAggregateInputType | true
    }

  export interface BalanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Balance'], meta: { name: 'Balance' } }
    /**
     * Find zero or one Balance that matches the filter.
     * @param {BalanceFindUniqueArgs} args - Arguments to find a Balance
     * @example
     * // Get one Balance
     * const balance = await prisma.balance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BalanceFindUniqueArgs>(args: SelectSubset<T, BalanceFindUniqueArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Balance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BalanceFindUniqueOrThrowArgs} args - Arguments to find a Balance
     * @example
     * // Get one Balance
     * const balance = await prisma.balance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BalanceFindUniqueOrThrowArgs>(args: SelectSubset<T, BalanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Balance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceFindFirstArgs} args - Arguments to find a Balance
     * @example
     * // Get one Balance
     * const balance = await prisma.balance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BalanceFindFirstArgs>(args?: SelectSubset<T, BalanceFindFirstArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Balance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceFindFirstOrThrowArgs} args - Arguments to find a Balance
     * @example
     * // Get one Balance
     * const balance = await prisma.balance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BalanceFindFirstOrThrowArgs>(args?: SelectSubset<T, BalanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Balances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Balances
     * const balances = await prisma.balance.findMany()
     * 
     * // Get first 10 Balances
     * const balances = await prisma.balance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const balanceWithIdOnly = await prisma.balance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BalanceFindManyArgs>(args?: SelectSubset<T, BalanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Balance.
     * @param {BalanceCreateArgs} args - Arguments to create a Balance.
     * @example
     * // Create one Balance
     * const Balance = await prisma.balance.create({
     *   data: {
     *     // ... data to create a Balance
     *   }
     * })
     * 
     */
    create<T extends BalanceCreateArgs>(args: SelectSubset<T, BalanceCreateArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Balances.
     * @param {BalanceCreateManyArgs} args - Arguments to create many Balances.
     * @example
     * // Create many Balances
     * const balance = await prisma.balance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BalanceCreateManyArgs>(args?: SelectSubset<T, BalanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Balances and returns the data saved in the database.
     * @param {BalanceCreateManyAndReturnArgs} args - Arguments to create many Balances.
     * @example
     * // Create many Balances
     * const balance = await prisma.balance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Balances and only return the `id`
     * const balanceWithIdOnly = await prisma.balance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BalanceCreateManyAndReturnArgs>(args?: SelectSubset<T, BalanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Balance.
     * @param {BalanceDeleteArgs} args - Arguments to delete one Balance.
     * @example
     * // Delete one Balance
     * const Balance = await prisma.balance.delete({
     *   where: {
     *     // ... filter to delete one Balance
     *   }
     * })
     * 
     */
    delete<T extends BalanceDeleteArgs>(args: SelectSubset<T, BalanceDeleteArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Balance.
     * @param {BalanceUpdateArgs} args - Arguments to update one Balance.
     * @example
     * // Update one Balance
     * const balance = await prisma.balance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BalanceUpdateArgs>(args: SelectSubset<T, BalanceUpdateArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Balances.
     * @param {BalanceDeleteManyArgs} args - Arguments to filter Balances to delete.
     * @example
     * // Delete a few Balances
     * const { count } = await prisma.balance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BalanceDeleteManyArgs>(args?: SelectSubset<T, BalanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Balances
     * const balance = await prisma.balance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BalanceUpdateManyArgs>(args: SelectSubset<T, BalanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Balances and returns the data updated in the database.
     * @param {BalanceUpdateManyAndReturnArgs} args - Arguments to update many Balances.
     * @example
     * // Update many Balances
     * const balance = await prisma.balance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Balances and only return the `id`
     * const balanceWithIdOnly = await prisma.balance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BalanceUpdateManyAndReturnArgs>(args: SelectSubset<T, BalanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Balance.
     * @param {BalanceUpsertArgs} args - Arguments to update or create a Balance.
     * @example
     * // Update or create a Balance
     * const balance = await prisma.balance.upsert({
     *   create: {
     *     // ... data to create a Balance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Balance we want to update
     *   }
     * })
     */
    upsert<T extends BalanceUpsertArgs>(args: SelectSubset<T, BalanceUpsertArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Balances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceCountArgs} args - Arguments to filter Balances to count.
     * @example
     * // Count the number of Balances
     * const count = await prisma.balance.count({
     *   where: {
     *     // ... the filter for the Balances we want to count
     *   }
     * })
    **/
    count<T extends BalanceCountArgs>(
      args?: Subset<T, BalanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BalanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Balance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BalanceAggregateArgs>(args: Subset<T, BalanceAggregateArgs>): Prisma.PrismaPromise<GetBalanceAggregateType<T>>

    /**
     * Group by Balance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BalanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BalanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BalanceGroupByArgs['orderBy'] }
        : { orderBy?: BalanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BalanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBalanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Balance model
   */
  readonly fields: BalanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Balance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BalanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends Balance$UserArgs<ExtArgs> = {}>(args?: Subset<T, Balance$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Balance model
   */
  interface BalanceFieldRefs {
    readonly id: FieldRef<"Balance", 'String'>
    readonly amount: FieldRef<"Balance", 'Int'>
    readonly createdAt: FieldRef<"Balance", 'DateTime'>
    readonly updatedAt: FieldRef<"Balance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Balance findUnique
   */
  export type BalanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * Filter, which Balance to fetch.
     */
    where: BalanceWhereUniqueInput
  }

  /**
   * Balance findUniqueOrThrow
   */
  export type BalanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * Filter, which Balance to fetch.
     */
    where: BalanceWhereUniqueInput
  }

  /**
   * Balance findFirst
   */
  export type BalanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * Filter, which Balance to fetch.
     */
    where?: BalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Balances to fetch.
     */
    orderBy?: BalanceOrderByWithRelationInput | BalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Balances.
     */
    cursor?: BalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Balances.
     */
    distinct?: BalanceScalarFieldEnum | BalanceScalarFieldEnum[]
  }

  /**
   * Balance findFirstOrThrow
   */
  export type BalanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * Filter, which Balance to fetch.
     */
    where?: BalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Balances to fetch.
     */
    orderBy?: BalanceOrderByWithRelationInput | BalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Balances.
     */
    cursor?: BalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Balances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Balances.
     */
    distinct?: BalanceScalarFieldEnum | BalanceScalarFieldEnum[]
  }

  /**
   * Balance findMany
   */
  export type BalanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * Filter, which Balances to fetch.
     */
    where?: BalanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Balances to fetch.
     */
    orderBy?: BalanceOrderByWithRelationInput | BalanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Balances.
     */
    cursor?: BalanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Balances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Balances.
     */
    skip?: number
    distinct?: BalanceScalarFieldEnum | BalanceScalarFieldEnum[]
  }

  /**
   * Balance create
   */
  export type BalanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Balance.
     */
    data: XOR<BalanceCreateInput, BalanceUncheckedCreateInput>
  }

  /**
   * Balance createMany
   */
  export type BalanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Balances.
     */
    data: BalanceCreateManyInput | BalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Balance createManyAndReturn
   */
  export type BalanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * The data used to create many Balances.
     */
    data: BalanceCreateManyInput | BalanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Balance update
   */
  export type BalanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Balance.
     */
    data: XOR<BalanceUpdateInput, BalanceUncheckedUpdateInput>
    /**
     * Choose, which Balance to update.
     */
    where: BalanceWhereUniqueInput
  }

  /**
   * Balance updateMany
   */
  export type BalanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Balances.
     */
    data: XOR<BalanceUpdateManyMutationInput, BalanceUncheckedUpdateManyInput>
    /**
     * Filter which Balances to update
     */
    where?: BalanceWhereInput
    /**
     * Limit how many Balances to update.
     */
    limit?: number
  }

  /**
   * Balance updateManyAndReturn
   */
  export type BalanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * The data used to update Balances.
     */
    data: XOR<BalanceUpdateManyMutationInput, BalanceUncheckedUpdateManyInput>
    /**
     * Filter which Balances to update
     */
    where?: BalanceWhereInput
    /**
     * Limit how many Balances to update.
     */
    limit?: number
  }

  /**
   * Balance upsert
   */
  export type BalanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Balance to update in case it exists.
     */
    where: BalanceWhereUniqueInput
    /**
     * In case the Balance found by the `where` argument doesn't exist, create a new Balance with this data.
     */
    create: XOR<BalanceCreateInput, BalanceUncheckedCreateInput>
    /**
     * In case the Balance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BalanceUpdateInput, BalanceUncheckedUpdateInput>
  }

  /**
   * Balance delete
   */
  export type BalanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
    /**
     * Filter which Balance to delete.
     */
    where: BalanceWhereUniqueInput
  }

  /**
   * Balance deleteMany
   */
  export type BalanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Balances to delete
     */
    where?: BalanceWhereInput
    /**
     * Limit how many Balances to delete.
     */
    limit?: number
  }

  /**
   * Balance.User
   */
  export type Balance$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Balance without action
   */
  export type BalanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Balance
     */
    select?: BalanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Balance
     */
    omit?: BalanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BalanceInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    telegramId: string | null
    username: string | null
    fullName: string | null
    photoUrl: string | null
    languageCode: string | null
    balanceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    telegramId: string | null
    username: string | null
    fullName: string | null
    photoUrl: string | null
    languageCode: string | null
    balanceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    telegramId: number
    username: number
    fullName: number
    photoUrl: number
    languageCode: number
    balanceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    fullName?: true
    photoUrl?: true
    languageCode?: true
    balanceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    fullName?: true
    photoUrl?: true
    languageCode?: true
    balanceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    telegramId?: true
    username?: true
    fullName?: true
    photoUrl?: true
    languageCode?: true
    balanceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    telegramId: string
    username: string
    fullName: string
    photoUrl: string | null
    languageCode: string | null
    balanceId: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    fullName?: boolean
    photoUrl?: boolean
    languageCode?: boolean
    balanceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    balance?: boolean | BalanceDefaultArgs<ExtArgs>
    paymentHistory?: boolean | User$paymentHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    fullName?: boolean
    photoUrl?: boolean
    languageCode?: boolean
    balanceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    balance?: boolean | BalanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    username?: boolean
    fullName?: boolean
    photoUrl?: boolean
    languageCode?: boolean
    balanceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    balance?: boolean | BalanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    telegramId?: boolean
    username?: boolean
    fullName?: boolean
    photoUrl?: boolean
    languageCode?: boolean
    balanceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "username" | "fullName" | "photoUrl" | "languageCode" | "balanceId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    balance?: boolean | BalanceDefaultArgs<ExtArgs>
    paymentHistory?: boolean | User$paymentHistoryArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    balance?: boolean | BalanceDefaultArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    balance?: boolean | BalanceDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      balance: Prisma.$BalancePayload<ExtArgs>
      paymentHistory: Prisma.$PaymentHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: string
      username: string
      fullName: string
      photoUrl: string | null
      languageCode: string | null
      balanceId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    balance<T extends BalanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BalanceDefaultArgs<ExtArgs>>): Prisma__BalanceClient<$Result.GetResult<Prisma.$BalancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    paymentHistory<T extends User$paymentHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly telegramId: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly photoUrl: FieldRef<"User", 'String'>
    readonly languageCode: FieldRef<"User", 'String'>
    readonly balanceId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.paymentHistory
   */
  export type User$paymentHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    where?: PaymentHistoryWhereInput
    orderBy?: PaymentHistoryOrderByWithRelationInput | PaymentHistoryOrderByWithRelationInput[]
    cursor?: PaymentHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentHistoryScalarFieldEnum | PaymentHistoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RegionCountAggregateOutputType = {
    id: number
    name: number
    code: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RegionMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegionMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RegionCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    id: string
    name: string
    code: string
    createdAt: Date
    updatedAt: Date
    _count: RegionCountAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    subRegions?: boolean | Region$subRegionsArgs<ExtArgs>
    packages?: boolean | Region$packagesArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "createdAt" | "updatedAt", ExtArgs["result"]["region"]>
  export type RegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subRegions?: boolean | Region$subRegionsArgs<ExtArgs>
    packages?: boolean | Region$packagesArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {
      subRegions: Prisma.$SubRegionPayload<ExtArgs>[]
      packages: Prisma.$PackagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions and returns the data updated in the database.
     * @param {RegionUpdateManyAndReturnArgs} args - Arguments to update many Regions.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegionUpdateManyAndReturnArgs>(args: SelectSubset<T, RegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    subRegions<T extends Region$subRegionsArgs<ExtArgs> = {}>(args?: Subset<T, Region$subRegionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    packages<T extends Region$packagesArgs<ExtArgs> = {}>(args?: Subset<T, Region$packagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */
  interface RegionFieldRefs {
    readonly id: FieldRef<"Region", 'String'>
    readonly name: FieldRef<"Region", 'String'>
    readonly code: FieldRef<"Region", 'String'>
    readonly createdAt: FieldRef<"Region", 'DateTime'>
    readonly updatedAt: FieldRef<"Region", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region updateManyAndReturn
   */
  export type RegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to update.
     */
    limit?: number
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
    /**
     * Limit how many Regions to delete.
     */
    limit?: number
  }

  /**
   * Region.subRegions
   */
  export type Region$subRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    where?: SubRegionWhereInput
    orderBy?: SubRegionOrderByWithRelationInput | SubRegionOrderByWithRelationInput[]
    cursor?: SubRegionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubRegionScalarFieldEnum | SubRegionScalarFieldEnum[]
  }

  /**
   * Region.packages
   */
  export type Region$packagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    where?: PackageWhereInput
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    cursor?: PackageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
  }


  /**
   * Model SubRegion
   */

  export type AggregateSubRegion = {
    _count: SubRegionCountAggregateOutputType | null
    _min: SubRegionMinAggregateOutputType | null
    _max: SubRegionMaxAggregateOutputType | null
  }

  export type SubRegionMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    regionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubRegionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    regionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubRegionCountAggregateOutputType = {
    id: number
    name: number
    code: number
    regionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubRegionMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    regionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubRegionMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    regionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubRegionCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    regionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubRegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubRegion to aggregate.
     */
    where?: SubRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubRegions to fetch.
     */
    orderBy?: SubRegionOrderByWithRelationInput | SubRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubRegions
    **/
    _count?: true | SubRegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubRegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubRegionMaxAggregateInputType
  }

  export type GetSubRegionAggregateType<T extends SubRegionAggregateArgs> = {
        [P in keyof T & keyof AggregateSubRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubRegion[P]>
      : GetScalarType<T[P], AggregateSubRegion[P]>
  }




  export type SubRegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubRegionWhereInput
    orderBy?: SubRegionOrderByWithAggregationInput | SubRegionOrderByWithAggregationInput[]
    by: SubRegionScalarFieldEnum[] | SubRegionScalarFieldEnum
    having?: SubRegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubRegionCountAggregateInputType | true
    _min?: SubRegionMinAggregateInputType
    _max?: SubRegionMaxAggregateInputType
  }

  export type SubRegionGroupByOutputType = {
    id: string
    name: string
    code: string
    regionId: string
    createdAt: Date
    updatedAt: Date
    _count: SubRegionCountAggregateOutputType | null
    _min: SubRegionMinAggregateOutputType | null
    _max: SubRegionMaxAggregateOutputType | null
  }

  type GetSubRegionGroupByPayload<T extends SubRegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubRegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubRegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubRegionGroupByOutputType[P]>
            : GetScalarType<T[P], SubRegionGroupByOutputType[P]>
        }
      >
    >


  export type SubRegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subRegion"]>

  export type SubRegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subRegion"]>

  export type SubRegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subRegion"]>

  export type SubRegionSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubRegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "regionId" | "createdAt" | "updatedAt", ExtArgs["result"]["subRegion"]>
  export type SubRegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type SubRegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type SubRegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $SubRegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SubRegion"
    objects: {
      region: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      regionId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subRegion"]>
    composites: {}
  }

  type SubRegionGetPayload<S extends boolean | null | undefined | SubRegionDefaultArgs> = $Result.GetResult<Prisma.$SubRegionPayload, S>

  type SubRegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubRegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubRegionCountAggregateInputType | true
    }

  export interface SubRegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubRegion'], meta: { name: 'SubRegion' } }
    /**
     * Find zero or one SubRegion that matches the filter.
     * @param {SubRegionFindUniqueArgs} args - Arguments to find a SubRegion
     * @example
     * // Get one SubRegion
     * const subRegion = await prisma.subRegion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubRegionFindUniqueArgs>(args: SelectSubset<T, SubRegionFindUniqueArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SubRegion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubRegionFindUniqueOrThrowArgs} args - Arguments to find a SubRegion
     * @example
     * // Get one SubRegion
     * const subRegion = await prisma.subRegion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubRegionFindUniqueOrThrowArgs>(args: SelectSubset<T, SubRegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubRegion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubRegionFindFirstArgs} args - Arguments to find a SubRegion
     * @example
     * // Get one SubRegion
     * const subRegion = await prisma.subRegion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubRegionFindFirstArgs>(args?: SelectSubset<T, SubRegionFindFirstArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SubRegion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubRegionFindFirstOrThrowArgs} args - Arguments to find a SubRegion
     * @example
     * // Get one SubRegion
     * const subRegion = await prisma.subRegion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubRegionFindFirstOrThrowArgs>(args?: SelectSubset<T, SubRegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SubRegions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubRegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubRegions
     * const subRegions = await prisma.subRegion.findMany()
     * 
     * // Get first 10 SubRegions
     * const subRegions = await prisma.subRegion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subRegionWithIdOnly = await prisma.subRegion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubRegionFindManyArgs>(args?: SelectSubset<T, SubRegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SubRegion.
     * @param {SubRegionCreateArgs} args - Arguments to create a SubRegion.
     * @example
     * // Create one SubRegion
     * const SubRegion = await prisma.subRegion.create({
     *   data: {
     *     // ... data to create a SubRegion
     *   }
     * })
     * 
     */
    create<T extends SubRegionCreateArgs>(args: SelectSubset<T, SubRegionCreateArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SubRegions.
     * @param {SubRegionCreateManyArgs} args - Arguments to create many SubRegions.
     * @example
     * // Create many SubRegions
     * const subRegion = await prisma.subRegion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubRegionCreateManyArgs>(args?: SelectSubset<T, SubRegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SubRegions and returns the data saved in the database.
     * @param {SubRegionCreateManyAndReturnArgs} args - Arguments to create many SubRegions.
     * @example
     * // Create many SubRegions
     * const subRegion = await prisma.subRegion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SubRegions and only return the `id`
     * const subRegionWithIdOnly = await prisma.subRegion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubRegionCreateManyAndReturnArgs>(args?: SelectSubset<T, SubRegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SubRegion.
     * @param {SubRegionDeleteArgs} args - Arguments to delete one SubRegion.
     * @example
     * // Delete one SubRegion
     * const SubRegion = await prisma.subRegion.delete({
     *   where: {
     *     // ... filter to delete one SubRegion
     *   }
     * })
     * 
     */
    delete<T extends SubRegionDeleteArgs>(args: SelectSubset<T, SubRegionDeleteArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SubRegion.
     * @param {SubRegionUpdateArgs} args - Arguments to update one SubRegion.
     * @example
     * // Update one SubRegion
     * const subRegion = await prisma.subRegion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubRegionUpdateArgs>(args: SelectSubset<T, SubRegionUpdateArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SubRegions.
     * @param {SubRegionDeleteManyArgs} args - Arguments to filter SubRegions to delete.
     * @example
     * // Delete a few SubRegions
     * const { count } = await prisma.subRegion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubRegionDeleteManyArgs>(args?: SelectSubset<T, SubRegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubRegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubRegions
     * const subRegion = await prisma.subRegion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubRegionUpdateManyArgs>(args: SelectSubset<T, SubRegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubRegions and returns the data updated in the database.
     * @param {SubRegionUpdateManyAndReturnArgs} args - Arguments to update many SubRegions.
     * @example
     * // Update many SubRegions
     * const subRegion = await prisma.subRegion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SubRegions and only return the `id`
     * const subRegionWithIdOnly = await prisma.subRegion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SubRegionUpdateManyAndReturnArgs>(args: SelectSubset<T, SubRegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SubRegion.
     * @param {SubRegionUpsertArgs} args - Arguments to update or create a SubRegion.
     * @example
     * // Update or create a SubRegion
     * const subRegion = await prisma.subRegion.upsert({
     *   create: {
     *     // ... data to create a SubRegion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubRegion we want to update
     *   }
     * })
     */
    upsert<T extends SubRegionUpsertArgs>(args: SelectSubset<T, SubRegionUpsertArgs<ExtArgs>>): Prisma__SubRegionClient<$Result.GetResult<Prisma.$SubRegionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SubRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubRegionCountArgs} args - Arguments to filter SubRegions to count.
     * @example
     * // Count the number of SubRegions
     * const count = await prisma.subRegion.count({
     *   where: {
     *     // ... the filter for the SubRegions we want to count
     *   }
     * })
    **/
    count<T extends SubRegionCountArgs>(
      args?: Subset<T, SubRegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubRegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubRegion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubRegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubRegionAggregateArgs>(args: Subset<T, SubRegionAggregateArgs>): Prisma.PrismaPromise<GetSubRegionAggregateType<T>>

    /**
     * Group by SubRegion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubRegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubRegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubRegionGroupByArgs['orderBy'] }
        : { orderBy?: SubRegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubRegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubRegion model
   */
  readonly fields: SubRegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubRegion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubRegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SubRegion model
   */
  interface SubRegionFieldRefs {
    readonly id: FieldRef<"SubRegion", 'String'>
    readonly name: FieldRef<"SubRegion", 'String'>
    readonly code: FieldRef<"SubRegion", 'String'>
    readonly regionId: FieldRef<"SubRegion", 'String'>
    readonly createdAt: FieldRef<"SubRegion", 'DateTime'>
    readonly updatedAt: FieldRef<"SubRegion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SubRegion findUnique
   */
  export type SubRegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * Filter, which SubRegion to fetch.
     */
    where: SubRegionWhereUniqueInput
  }

  /**
   * SubRegion findUniqueOrThrow
   */
  export type SubRegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * Filter, which SubRegion to fetch.
     */
    where: SubRegionWhereUniqueInput
  }

  /**
   * SubRegion findFirst
   */
  export type SubRegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * Filter, which SubRegion to fetch.
     */
    where?: SubRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubRegions to fetch.
     */
    orderBy?: SubRegionOrderByWithRelationInput | SubRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubRegions.
     */
    cursor?: SubRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubRegions.
     */
    distinct?: SubRegionScalarFieldEnum | SubRegionScalarFieldEnum[]
  }

  /**
   * SubRegion findFirstOrThrow
   */
  export type SubRegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * Filter, which SubRegion to fetch.
     */
    where?: SubRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubRegions to fetch.
     */
    orderBy?: SubRegionOrderByWithRelationInput | SubRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubRegions.
     */
    cursor?: SubRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubRegions.
     */
    distinct?: SubRegionScalarFieldEnum | SubRegionScalarFieldEnum[]
  }

  /**
   * SubRegion findMany
   */
  export type SubRegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * Filter, which SubRegions to fetch.
     */
    where?: SubRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubRegions to fetch.
     */
    orderBy?: SubRegionOrderByWithRelationInput | SubRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubRegions.
     */
    cursor?: SubRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubRegions.
     */
    skip?: number
    distinct?: SubRegionScalarFieldEnum | SubRegionScalarFieldEnum[]
  }

  /**
   * SubRegion create
   */
  export type SubRegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * The data needed to create a SubRegion.
     */
    data: XOR<SubRegionCreateInput, SubRegionUncheckedCreateInput>
  }

  /**
   * SubRegion createMany
   */
  export type SubRegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubRegions.
     */
    data: SubRegionCreateManyInput | SubRegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SubRegion createManyAndReturn
   */
  export type SubRegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * The data used to create many SubRegions.
     */
    data: SubRegionCreateManyInput | SubRegionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubRegion update
   */
  export type SubRegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * The data needed to update a SubRegion.
     */
    data: XOR<SubRegionUpdateInput, SubRegionUncheckedUpdateInput>
    /**
     * Choose, which SubRegion to update.
     */
    where: SubRegionWhereUniqueInput
  }

  /**
   * SubRegion updateMany
   */
  export type SubRegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubRegions.
     */
    data: XOR<SubRegionUpdateManyMutationInput, SubRegionUncheckedUpdateManyInput>
    /**
     * Filter which SubRegions to update
     */
    where?: SubRegionWhereInput
    /**
     * Limit how many SubRegions to update.
     */
    limit?: number
  }

  /**
   * SubRegion updateManyAndReturn
   */
  export type SubRegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * The data used to update SubRegions.
     */
    data: XOR<SubRegionUpdateManyMutationInput, SubRegionUncheckedUpdateManyInput>
    /**
     * Filter which SubRegions to update
     */
    where?: SubRegionWhereInput
    /**
     * Limit how many SubRegions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SubRegion upsert
   */
  export type SubRegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * The filter to search for the SubRegion to update in case it exists.
     */
    where: SubRegionWhereUniqueInput
    /**
     * In case the SubRegion found by the `where` argument doesn't exist, create a new SubRegion with this data.
     */
    create: XOR<SubRegionCreateInput, SubRegionUncheckedCreateInput>
    /**
     * In case the SubRegion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubRegionUpdateInput, SubRegionUncheckedUpdateInput>
  }

  /**
   * SubRegion delete
   */
  export type SubRegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
    /**
     * Filter which SubRegion to delete.
     */
    where: SubRegionWhereUniqueInput
  }

  /**
   * SubRegion deleteMany
   */
  export type SubRegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubRegions to delete
     */
    where?: SubRegionWhereInput
    /**
     * Limit how many SubRegions to delete.
     */
    limit?: number
  }

  /**
   * SubRegion without action
   */
  export type SubRegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubRegion
     */
    select?: SubRegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SubRegion
     */
    omit?: SubRegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubRegionInclude<ExtArgs> | null
  }


  /**
   * Model Package
   */

  export type AggregatePackage = {
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  export type PackageAvgAggregateOutputType = {
    duration: number | null
    price: number | null
    pricePerData: number | null
  }

  export type PackageSumAggregateOutputType = {
    duration: number | null
    price: number | null
    pricePerData: number | null
  }

  export type PackageMinAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    duration: number | null
    durationUnit: string | null
    price: number | null
    data: string | null
    dataUnit: string | null
    pricePerData: number | null
    regionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PackageMaxAggregateOutputType = {
    id: string | null
    name: string | null
    code: string | null
    duration: number | null
    durationUnit: string | null
    price: number | null
    data: string | null
    dataUnit: string | null
    pricePerData: number | null
    regionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PackageCountAggregateOutputType = {
    id: number
    name: number
    code: number
    duration: number
    durationUnit: number
    price: number
    data: number
    dataUnit: number
    pricePerData: number
    regionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PackageAvgAggregateInputType = {
    duration?: true
    price?: true
    pricePerData?: true
  }

  export type PackageSumAggregateInputType = {
    duration?: true
    price?: true
    pricePerData?: true
  }

  export type PackageMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    duration?: true
    durationUnit?: true
    price?: true
    data?: true
    dataUnit?: true
    pricePerData?: true
    regionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PackageMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    duration?: true
    durationUnit?: true
    price?: true
    data?: true
    dataUnit?: true
    pricePerData?: true
    regionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PackageCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    duration?: true
    durationUnit?: true
    price?: true
    data?: true
    dataUnit?: true
    pricePerData?: true
    regionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PackageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Package to aggregate.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Packages
    **/
    _count?: true | PackageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PackageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PackageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PackageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PackageMaxAggregateInputType
  }

  export type GetPackageAggregateType<T extends PackageAggregateArgs> = {
        [P in keyof T & keyof AggregatePackage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePackage[P]>
      : GetScalarType<T[P], AggregatePackage[P]>
  }




  export type PackageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PackageWhereInput
    orderBy?: PackageOrderByWithAggregationInput | PackageOrderByWithAggregationInput[]
    by: PackageScalarFieldEnum[] | PackageScalarFieldEnum
    having?: PackageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PackageCountAggregateInputType | true
    _avg?: PackageAvgAggregateInputType
    _sum?: PackageSumAggregateInputType
    _min?: PackageMinAggregateInputType
    _max?: PackageMaxAggregateInputType
  }

  export type PackageGroupByOutputType = {
    id: string
    name: string
    code: string
    duration: number
    durationUnit: string
    price: number
    data: string
    dataUnit: string
    pricePerData: number
    regionId: string
    createdAt: Date
    updatedAt: Date
    _count: PackageCountAggregateOutputType | null
    _avg: PackageAvgAggregateOutputType | null
    _sum: PackageSumAggregateOutputType | null
    _min: PackageMinAggregateOutputType | null
    _max: PackageMaxAggregateOutputType | null
  }

  type GetPackageGroupByPayload<T extends PackageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PackageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PackageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PackageGroupByOutputType[P]>
            : GetScalarType<T[P], PackageGroupByOutputType[P]>
        }
      >
    >


  export type PackageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    duration?: boolean
    durationUnit?: boolean
    price?: boolean
    data?: boolean
    dataUnit?: boolean
    pricePerData?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    duration?: boolean
    durationUnit?: boolean
    price?: boolean
    data?: boolean
    dataUnit?: boolean
    pricePerData?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    duration?: boolean
    durationUnit?: boolean
    price?: boolean
    data?: boolean
    dataUnit?: boolean
    pricePerData?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["package"]>

  export type PackageSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    duration?: boolean
    durationUnit?: boolean
    price?: boolean
    data?: boolean
    dataUnit?: boolean
    pricePerData?: boolean
    regionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PackageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "duration" | "durationUnit" | "price" | "data" | "dataUnit" | "pricePerData" | "regionId" | "createdAt" | "updatedAt", ExtArgs["result"]["package"]>
  export type PackageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type PackageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type PackageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $PackagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Package"
    objects: {
      region: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      code: string
      duration: number
      durationUnit: string
      price: number
      data: string
      dataUnit: string
      pricePerData: number
      regionId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["package"]>
    composites: {}
  }

  type PackageGetPayload<S extends boolean | null | undefined | PackageDefaultArgs> = $Result.GetResult<Prisma.$PackagePayload, S>

  type PackageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PackageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PackageCountAggregateInputType | true
    }

  export interface PackageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Package'], meta: { name: 'Package' } }
    /**
     * Find zero or one Package that matches the filter.
     * @param {PackageFindUniqueArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PackageFindUniqueArgs>(args: SelectSubset<T, PackageFindUniqueArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Package that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PackageFindUniqueOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PackageFindUniqueOrThrowArgs>(args: SelectSubset<T, PackageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PackageFindFirstArgs>(args?: SelectSubset<T, PackageFindFirstArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Package that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindFirstOrThrowArgs} args - Arguments to find a Package
     * @example
     * // Get one Package
     * const package = await prisma.package.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PackageFindFirstOrThrowArgs>(args?: SelectSubset<T, PackageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Packages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Packages
     * const packages = await prisma.package.findMany()
     * 
     * // Get first 10 Packages
     * const packages = await prisma.package.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const packageWithIdOnly = await prisma.package.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PackageFindManyArgs>(args?: SelectSubset<T, PackageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Package.
     * @param {PackageCreateArgs} args - Arguments to create a Package.
     * @example
     * // Create one Package
     * const Package = await prisma.package.create({
     *   data: {
     *     // ... data to create a Package
     *   }
     * })
     * 
     */
    create<T extends PackageCreateArgs>(args: SelectSubset<T, PackageCreateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Packages.
     * @param {PackageCreateManyArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PackageCreateManyArgs>(args?: SelectSubset<T, PackageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Packages and returns the data saved in the database.
     * @param {PackageCreateManyAndReturnArgs} args - Arguments to create many Packages.
     * @example
     * // Create many Packages
     * const package = await prisma.package.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PackageCreateManyAndReturnArgs>(args?: SelectSubset<T, PackageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Package.
     * @param {PackageDeleteArgs} args - Arguments to delete one Package.
     * @example
     * // Delete one Package
     * const Package = await prisma.package.delete({
     *   where: {
     *     // ... filter to delete one Package
     *   }
     * })
     * 
     */
    delete<T extends PackageDeleteArgs>(args: SelectSubset<T, PackageDeleteArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Package.
     * @param {PackageUpdateArgs} args - Arguments to update one Package.
     * @example
     * // Update one Package
     * const package = await prisma.package.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PackageUpdateArgs>(args: SelectSubset<T, PackageUpdateArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Packages.
     * @param {PackageDeleteManyArgs} args - Arguments to filter Packages to delete.
     * @example
     * // Delete a few Packages
     * const { count } = await prisma.package.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PackageDeleteManyArgs>(args?: SelectSubset<T, PackageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PackageUpdateManyArgs>(args: SelectSubset<T, PackageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Packages and returns the data updated in the database.
     * @param {PackageUpdateManyAndReturnArgs} args - Arguments to update many Packages.
     * @example
     * // Update many Packages
     * const package = await prisma.package.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Packages and only return the `id`
     * const packageWithIdOnly = await prisma.package.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PackageUpdateManyAndReturnArgs>(args: SelectSubset<T, PackageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Package.
     * @param {PackageUpsertArgs} args - Arguments to update or create a Package.
     * @example
     * // Update or create a Package
     * const package = await prisma.package.upsert({
     *   create: {
     *     // ... data to create a Package
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Package we want to update
     *   }
     * })
     */
    upsert<T extends PackageUpsertArgs>(args: SelectSubset<T, PackageUpsertArgs<ExtArgs>>): Prisma__PackageClient<$Result.GetResult<Prisma.$PackagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Packages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageCountArgs} args - Arguments to filter Packages to count.
     * @example
     * // Count the number of Packages
     * const count = await prisma.package.count({
     *   where: {
     *     // ... the filter for the Packages we want to count
     *   }
     * })
    **/
    count<T extends PackageCountArgs>(
      args?: Subset<T, PackageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PackageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PackageAggregateArgs>(args: Subset<T, PackageAggregateArgs>): Prisma.PrismaPromise<GetPackageAggregateType<T>>

    /**
     * Group by Package.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PackageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PackageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PackageGroupByArgs['orderBy'] }
        : { orderBy?: PackageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PackageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPackageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Package model
   */
  readonly fields: PackageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Package.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PackageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Package model
   */
  interface PackageFieldRefs {
    readonly id: FieldRef<"Package", 'String'>
    readonly name: FieldRef<"Package", 'String'>
    readonly code: FieldRef<"Package", 'String'>
    readonly duration: FieldRef<"Package", 'Int'>
    readonly durationUnit: FieldRef<"Package", 'String'>
    readonly price: FieldRef<"Package", 'Float'>
    readonly data: FieldRef<"Package", 'String'>
    readonly dataUnit: FieldRef<"Package", 'String'>
    readonly pricePerData: FieldRef<"Package", 'Float'>
    readonly regionId: FieldRef<"Package", 'String'>
    readonly createdAt: FieldRef<"Package", 'DateTime'>
    readonly updatedAt: FieldRef<"Package", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Package findUnique
   */
  export type PackageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findUniqueOrThrow
   */
  export type PackageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package findFirst
   */
  export type PackageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findFirstOrThrow
   */
  export type PackageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Package to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Packages.
     */
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package findMany
   */
  export type PackageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter, which Packages to fetch.
     */
    where?: PackageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Packages to fetch.
     */
    orderBy?: PackageOrderByWithRelationInput | PackageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Packages.
     */
    cursor?: PackageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Packages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Packages.
     */
    skip?: number
    distinct?: PackageScalarFieldEnum | PackageScalarFieldEnum[]
  }

  /**
   * Package create
   */
  export type PackageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to create a Package.
     */
    data: XOR<PackageCreateInput, PackageUncheckedCreateInput>
  }

  /**
   * Package createMany
   */
  export type PackageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Package createManyAndReturn
   */
  export type PackageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to create many Packages.
     */
    data: PackageCreateManyInput | PackageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Package update
   */
  export type PackageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The data needed to update a Package.
     */
    data: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
    /**
     * Choose, which Package to update.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package updateMany
   */
  export type PackageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
  }

  /**
   * Package updateManyAndReturn
   */
  export type PackageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * The data used to update Packages.
     */
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyInput>
    /**
     * Filter which Packages to update
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Package upsert
   */
  export type PackageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * The filter to search for the Package to update in case it exists.
     */
    where: PackageWhereUniqueInput
    /**
     * In case the Package found by the `where` argument doesn't exist, create a new Package with this data.
     */
    create: XOR<PackageCreateInput, PackageUncheckedCreateInput>
    /**
     * In case the Package was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PackageUpdateInput, PackageUncheckedUpdateInput>
  }

  /**
   * Package delete
   */
  export type PackageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
    /**
     * Filter which Package to delete.
     */
    where: PackageWhereUniqueInput
  }

  /**
   * Package deleteMany
   */
  export type PackageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Packages to delete
     */
    where?: PackageWhereInput
    /**
     * Limit how many Packages to delete.
     */
    limit?: number
  }

  /**
   * Package without action
   */
  export type PackageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Package
     */
    select?: PackageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Package
     */
    omit?: PackageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PackageInclude<ExtArgs> | null
  }


  /**
   * Model Esim
   */

  export type AggregateEsim = {
    _count: EsimCountAggregateOutputType | null
    _avg: EsimAvgAggregateOutputType | null
    _sum: EsimSumAggregateOutputType | null
    _min: EsimMinAggregateOutputType | null
    _max: EsimMaxAggregateOutputType | null
  }

  export type EsimAvgAggregateOutputType = {
    totalDuration: number | null
    remainingData: number | null
  }

  export type EsimSumAggregateOutputType = {
    totalDuration: number | null
    remainingData: bigint | null
  }

  export type EsimMinAggregateOutputType = {
    id: string | null
    telegramId: string | null
    imsi: string | null
    iccid: string | null
    ac: string | null
    shortUrl: string | null
    totalDuration: number | null
    durationUnit: string | null
    status: string | null
    packageName: string | null
    packageCode: string | null
    remainingData: bigint | null
    orderNo: string | null
    expiredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EsimMaxAggregateOutputType = {
    id: string | null
    telegramId: string | null
    imsi: string | null
    iccid: string | null
    ac: string | null
    shortUrl: string | null
    totalDuration: number | null
    durationUnit: string | null
    status: string | null
    packageName: string | null
    packageCode: string | null
    remainingData: bigint | null
    orderNo: string | null
    expiredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EsimCountAggregateOutputType = {
    id: number
    telegramId: number
    imsi: number
    iccid: number
    ac: number
    shortUrl: number
    totalDuration: number
    durationUnit: number
    status: number
    packageName: number
    packageCode: number
    remainingData: number
    orderNo: number
    expiredAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EsimAvgAggregateInputType = {
    totalDuration?: true
    remainingData?: true
  }

  export type EsimSumAggregateInputType = {
    totalDuration?: true
    remainingData?: true
  }

  export type EsimMinAggregateInputType = {
    id?: true
    telegramId?: true
    imsi?: true
    iccid?: true
    ac?: true
    shortUrl?: true
    totalDuration?: true
    durationUnit?: true
    status?: true
    packageName?: true
    packageCode?: true
    remainingData?: true
    orderNo?: true
    expiredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EsimMaxAggregateInputType = {
    id?: true
    telegramId?: true
    imsi?: true
    iccid?: true
    ac?: true
    shortUrl?: true
    totalDuration?: true
    durationUnit?: true
    status?: true
    packageName?: true
    packageCode?: true
    remainingData?: true
    orderNo?: true
    expiredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EsimCountAggregateInputType = {
    id?: true
    telegramId?: true
    imsi?: true
    iccid?: true
    ac?: true
    shortUrl?: true
    totalDuration?: true
    durationUnit?: true
    status?: true
    packageName?: true
    packageCode?: true
    remainingData?: true
    orderNo?: true
    expiredAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EsimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Esim to aggregate.
     */
    where?: EsimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Esims to fetch.
     */
    orderBy?: EsimOrderByWithRelationInput | EsimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EsimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Esims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Esims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Esims
    **/
    _count?: true | EsimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EsimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EsimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EsimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EsimMaxAggregateInputType
  }

  export type GetEsimAggregateType<T extends EsimAggregateArgs> = {
        [P in keyof T & keyof AggregateEsim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEsim[P]>
      : GetScalarType<T[P], AggregateEsim[P]>
  }




  export type EsimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EsimWhereInput
    orderBy?: EsimOrderByWithAggregationInput | EsimOrderByWithAggregationInput[]
    by: EsimScalarFieldEnum[] | EsimScalarFieldEnum
    having?: EsimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EsimCountAggregateInputType | true
    _avg?: EsimAvgAggregateInputType
    _sum?: EsimSumAggregateInputType
    _min?: EsimMinAggregateInputType
    _max?: EsimMaxAggregateInputType
  }

  export type EsimGroupByOutputType = {
    id: string
    telegramId: string
    imsi: string
    iccid: string
    ac: string
    shortUrl: string
    totalDuration: number
    durationUnit: string
    status: string
    packageName: string
    packageCode: string
    remainingData: bigint
    orderNo: string
    expiredAt: Date
    createdAt: Date
    updatedAt: Date
    _count: EsimCountAggregateOutputType | null
    _avg: EsimAvgAggregateOutputType | null
    _sum: EsimSumAggregateOutputType | null
    _min: EsimMinAggregateOutputType | null
    _max: EsimMaxAggregateOutputType | null
  }

  type GetEsimGroupByPayload<T extends EsimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EsimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EsimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EsimGroupByOutputType[P]>
            : GetScalarType<T[P], EsimGroupByOutputType[P]>
        }
      >
    >


  export type EsimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    imsi?: boolean
    iccid?: boolean
    ac?: boolean
    shortUrl?: boolean
    totalDuration?: boolean
    durationUnit?: boolean
    status?: boolean
    packageName?: boolean
    packageCode?: boolean
    remainingData?: boolean
    orderNo?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["esim"]>

  export type EsimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    imsi?: boolean
    iccid?: boolean
    ac?: boolean
    shortUrl?: boolean
    totalDuration?: boolean
    durationUnit?: boolean
    status?: boolean
    packageName?: boolean
    packageCode?: boolean
    remainingData?: boolean
    orderNo?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["esim"]>

  export type EsimSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    imsi?: boolean
    iccid?: boolean
    ac?: boolean
    shortUrl?: boolean
    totalDuration?: boolean
    durationUnit?: boolean
    status?: boolean
    packageName?: boolean
    packageCode?: boolean
    remainingData?: boolean
    orderNo?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["esim"]>

  export type EsimSelectScalar = {
    id?: boolean
    telegramId?: boolean
    imsi?: boolean
    iccid?: boolean
    ac?: boolean
    shortUrl?: boolean
    totalDuration?: boolean
    durationUnit?: boolean
    status?: boolean
    packageName?: boolean
    packageCode?: boolean
    remainingData?: boolean
    orderNo?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EsimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "imsi" | "iccid" | "ac" | "shortUrl" | "totalDuration" | "durationUnit" | "status" | "packageName" | "packageCode" | "remainingData" | "orderNo" | "expiredAt" | "createdAt" | "updatedAt", ExtArgs["result"]["esim"]>
  export type EsimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type EsimIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type EsimIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $EsimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Esim"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: string
      imsi: string
      iccid: string
      ac: string
      shortUrl: string
      totalDuration: number
      durationUnit: string
      status: string
      packageName: string
      packageCode: string
      remainingData: bigint
      orderNo: string
      expiredAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["esim"]>
    composites: {}
  }

  type EsimGetPayload<S extends boolean | null | undefined | EsimDefaultArgs> = $Result.GetResult<Prisma.$EsimPayload, S>

  type EsimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EsimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EsimCountAggregateInputType | true
    }

  export interface EsimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Esim'], meta: { name: 'Esim' } }
    /**
     * Find zero or one Esim that matches the filter.
     * @param {EsimFindUniqueArgs} args - Arguments to find a Esim
     * @example
     * // Get one Esim
     * const esim = await prisma.esim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EsimFindUniqueArgs>(args: SelectSubset<T, EsimFindUniqueArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Esim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EsimFindUniqueOrThrowArgs} args - Arguments to find a Esim
     * @example
     * // Get one Esim
     * const esim = await prisma.esim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EsimFindUniqueOrThrowArgs>(args: SelectSubset<T, EsimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Esim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EsimFindFirstArgs} args - Arguments to find a Esim
     * @example
     * // Get one Esim
     * const esim = await prisma.esim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EsimFindFirstArgs>(args?: SelectSubset<T, EsimFindFirstArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Esim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EsimFindFirstOrThrowArgs} args - Arguments to find a Esim
     * @example
     * // Get one Esim
     * const esim = await prisma.esim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EsimFindFirstOrThrowArgs>(args?: SelectSubset<T, EsimFindFirstOrThrowArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Esims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EsimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Esims
     * const esims = await prisma.esim.findMany()
     * 
     * // Get first 10 Esims
     * const esims = await prisma.esim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const esimWithIdOnly = await prisma.esim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EsimFindManyArgs>(args?: SelectSubset<T, EsimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Esim.
     * @param {EsimCreateArgs} args - Arguments to create a Esim.
     * @example
     * // Create one Esim
     * const Esim = await prisma.esim.create({
     *   data: {
     *     // ... data to create a Esim
     *   }
     * })
     * 
     */
    create<T extends EsimCreateArgs>(args: SelectSubset<T, EsimCreateArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Esims.
     * @param {EsimCreateManyArgs} args - Arguments to create many Esims.
     * @example
     * // Create many Esims
     * const esim = await prisma.esim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EsimCreateManyArgs>(args?: SelectSubset<T, EsimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Esims and returns the data saved in the database.
     * @param {EsimCreateManyAndReturnArgs} args - Arguments to create many Esims.
     * @example
     * // Create many Esims
     * const esim = await prisma.esim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Esims and only return the `id`
     * const esimWithIdOnly = await prisma.esim.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EsimCreateManyAndReturnArgs>(args?: SelectSubset<T, EsimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Esim.
     * @param {EsimDeleteArgs} args - Arguments to delete one Esim.
     * @example
     * // Delete one Esim
     * const Esim = await prisma.esim.delete({
     *   where: {
     *     // ... filter to delete one Esim
     *   }
     * })
     * 
     */
    delete<T extends EsimDeleteArgs>(args: SelectSubset<T, EsimDeleteArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Esim.
     * @param {EsimUpdateArgs} args - Arguments to update one Esim.
     * @example
     * // Update one Esim
     * const esim = await prisma.esim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EsimUpdateArgs>(args: SelectSubset<T, EsimUpdateArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Esims.
     * @param {EsimDeleteManyArgs} args - Arguments to filter Esims to delete.
     * @example
     * // Delete a few Esims
     * const { count } = await prisma.esim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EsimDeleteManyArgs>(args?: SelectSubset<T, EsimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Esims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EsimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Esims
     * const esim = await prisma.esim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EsimUpdateManyArgs>(args: SelectSubset<T, EsimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Esims and returns the data updated in the database.
     * @param {EsimUpdateManyAndReturnArgs} args - Arguments to update many Esims.
     * @example
     * // Update many Esims
     * const esim = await prisma.esim.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Esims and only return the `id`
     * const esimWithIdOnly = await prisma.esim.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EsimUpdateManyAndReturnArgs>(args: SelectSubset<T, EsimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Esim.
     * @param {EsimUpsertArgs} args - Arguments to update or create a Esim.
     * @example
     * // Update or create a Esim
     * const esim = await prisma.esim.upsert({
     *   create: {
     *     // ... data to create a Esim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Esim we want to update
     *   }
     * })
     */
    upsert<T extends EsimUpsertArgs>(args: SelectSubset<T, EsimUpsertArgs<ExtArgs>>): Prisma__EsimClient<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Esims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EsimCountArgs} args - Arguments to filter Esims to count.
     * @example
     * // Count the number of Esims
     * const count = await prisma.esim.count({
     *   where: {
     *     // ... the filter for the Esims we want to count
     *   }
     * })
    **/
    count<T extends EsimCountArgs>(
      args?: Subset<T, EsimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EsimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Esim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EsimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EsimAggregateArgs>(args: Subset<T, EsimAggregateArgs>): Prisma.PrismaPromise<GetEsimAggregateType<T>>

    /**
     * Group by Esim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EsimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EsimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EsimGroupByArgs['orderBy'] }
        : { orderBy?: EsimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EsimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEsimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Esim model
   */
  readonly fields: EsimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Esim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EsimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Esim model
   */
  interface EsimFieldRefs {
    readonly id: FieldRef<"Esim", 'String'>
    readonly telegramId: FieldRef<"Esim", 'String'>
    readonly imsi: FieldRef<"Esim", 'String'>
    readonly iccid: FieldRef<"Esim", 'String'>
    readonly ac: FieldRef<"Esim", 'String'>
    readonly shortUrl: FieldRef<"Esim", 'String'>
    readonly totalDuration: FieldRef<"Esim", 'Int'>
    readonly durationUnit: FieldRef<"Esim", 'String'>
    readonly status: FieldRef<"Esim", 'String'>
    readonly packageName: FieldRef<"Esim", 'String'>
    readonly packageCode: FieldRef<"Esim", 'String'>
    readonly remainingData: FieldRef<"Esim", 'BigInt'>
    readonly orderNo: FieldRef<"Esim", 'String'>
    readonly expiredAt: FieldRef<"Esim", 'DateTime'>
    readonly createdAt: FieldRef<"Esim", 'DateTime'>
    readonly updatedAt: FieldRef<"Esim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Esim findUnique
   */
  export type EsimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * Filter, which Esim to fetch.
     */
    where: EsimWhereUniqueInput
  }

  /**
   * Esim findUniqueOrThrow
   */
  export type EsimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * Filter, which Esim to fetch.
     */
    where: EsimWhereUniqueInput
  }

  /**
   * Esim findFirst
   */
  export type EsimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * Filter, which Esim to fetch.
     */
    where?: EsimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Esims to fetch.
     */
    orderBy?: EsimOrderByWithRelationInput | EsimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Esims.
     */
    cursor?: EsimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Esims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Esims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Esims.
     */
    distinct?: EsimScalarFieldEnum | EsimScalarFieldEnum[]
  }

  /**
   * Esim findFirstOrThrow
   */
  export type EsimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * Filter, which Esim to fetch.
     */
    where?: EsimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Esims to fetch.
     */
    orderBy?: EsimOrderByWithRelationInput | EsimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Esims.
     */
    cursor?: EsimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Esims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Esims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Esims.
     */
    distinct?: EsimScalarFieldEnum | EsimScalarFieldEnum[]
  }

  /**
   * Esim findMany
   */
  export type EsimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * Filter, which Esims to fetch.
     */
    where?: EsimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Esims to fetch.
     */
    orderBy?: EsimOrderByWithRelationInput | EsimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Esims.
     */
    cursor?: EsimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Esims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Esims.
     */
    skip?: number
    distinct?: EsimScalarFieldEnum | EsimScalarFieldEnum[]
  }

  /**
   * Esim create
   */
  export type EsimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * The data needed to create a Esim.
     */
    data: XOR<EsimCreateInput, EsimUncheckedCreateInput>
  }

  /**
   * Esim createMany
   */
  export type EsimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Esims.
     */
    data: EsimCreateManyInput | EsimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Esim createManyAndReturn
   */
  export type EsimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * The data used to create many Esims.
     */
    data: EsimCreateManyInput | EsimCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Esim update
   */
  export type EsimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * The data needed to update a Esim.
     */
    data: XOR<EsimUpdateInput, EsimUncheckedUpdateInput>
    /**
     * Choose, which Esim to update.
     */
    where: EsimWhereUniqueInput
  }

  /**
   * Esim updateMany
   */
  export type EsimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Esims.
     */
    data: XOR<EsimUpdateManyMutationInput, EsimUncheckedUpdateManyInput>
    /**
     * Filter which Esims to update
     */
    where?: EsimWhereInput
    /**
     * Limit how many Esims to update.
     */
    limit?: number
  }

  /**
   * Esim updateManyAndReturn
   */
  export type EsimUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * The data used to update Esims.
     */
    data: XOR<EsimUpdateManyMutationInput, EsimUncheckedUpdateManyInput>
    /**
     * Filter which Esims to update
     */
    where?: EsimWhereInput
    /**
     * Limit how many Esims to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Esim upsert
   */
  export type EsimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * The filter to search for the Esim to update in case it exists.
     */
    where: EsimWhereUniqueInput
    /**
     * In case the Esim found by the `where` argument doesn't exist, create a new Esim with this data.
     */
    create: XOR<EsimCreateInput, EsimUncheckedCreateInput>
    /**
     * In case the Esim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EsimUpdateInput, EsimUncheckedUpdateInput>
  }

  /**
   * Esim delete
   */
  export type EsimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    /**
     * Filter which Esim to delete.
     */
    where: EsimWhereUniqueInput
  }

  /**
   * Esim deleteMany
   */
  export type EsimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Esims to delete
     */
    where?: EsimWhereInput
    /**
     * Limit how many Esims to delete.
     */
    limit?: number
  }

  /**
   * Esim without action
   */
  export type EsimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    amount: number | null
  }

  export type OrderSumAggregateOutputType = {
    amount: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    telegramId: string | null
    orderNo: string | null
    txId: string | null
    amount: number | null
    status: $Enums.OrderStatus | null
    paymentMethod: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    telegramId: string | null
    orderNo: string | null
    txId: string | null
    amount: number | null
    status: $Enums.OrderStatus | null
    paymentMethod: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    telegramId: number
    orderNo: number
    txId: number
    amount: number
    status: number
    paymentMethod: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    amount?: true
  }

  export type OrderSumAggregateInputType = {
    amount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    telegramId?: true
    orderNo?: true
    txId?: true
    amount?: true
    status?: true
    paymentMethod?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    telegramId?: true
    orderNo?: true
    txId?: true
    amount?: true
    status?: true
    paymentMethod?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    telegramId?: true
    orderNo?: true
    txId?: true
    amount?: true
    status?: true
    paymentMethod?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    telegramId: string
    orderNo: string
    txId: string
    amount: number
    status: $Enums.OrderStatus
    paymentMethod: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    orderNo?: boolean
    txId?: boolean
    amount?: boolean
    status?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    esims?: boolean | Order$esimsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    orderNo?: boolean
    txId?: boolean
    amount?: boolean
    status?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    telegramId?: boolean
    orderNo?: boolean
    txId?: boolean
    amount?: boolean
    status?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    telegramId?: boolean
    orderNo?: boolean
    txId?: boolean
    amount?: boolean
    status?: boolean
    paymentMethod?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "telegramId" | "orderNo" | "txId" | "amount" | "status" | "paymentMethod" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    esims?: boolean | Order$esimsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      esims: Prisma.$EsimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      telegramId: string
      orderNo: string
      txId: string
      amount: number
      status: $Enums.OrderStatus
      paymentMethod: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    esims<T extends Order$esimsArgs<ExtArgs> = {}>(args?: Subset<T, Order$esimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EsimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly telegramId: FieldRef<"Order", 'String'>
    readonly orderNo: FieldRef<"Order", 'String'>
    readonly txId: FieldRef<"Order", 'String'>
    readonly amount: FieldRef<"Order", 'Float'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly paymentMethod: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.esims
   */
  export type Order$esimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Esim
     */
    select?: EsimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Esim
     */
    omit?: EsimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EsimInclude<ExtArgs> | null
    where?: EsimWhereInput
    orderBy?: EsimOrderByWithRelationInput | EsimOrderByWithRelationInput[]
    cursor?: EsimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EsimScalarFieldEnum | EsimScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model PaymentHistory
   */

  export type AggregatePaymentHistory = {
    _count: PaymentHistoryCountAggregateOutputType | null
    _avg: PaymentHistoryAvgAggregateOutputType | null
    _sum: PaymentHistorySumAggregateOutputType | null
    _min: PaymentHistoryMinAggregateOutputType | null
    _max: PaymentHistoryMaxAggregateOutputType | null
  }

  export type PaymentHistoryAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentHistorySumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentHistoryMinAggregateOutputType = {
    id: string | null
    referenceId: string | null
    telegramId: string | null
    userId: string | null
    payerEmail: string | null
    amount: number | null
    paymentMethod: string | null
    status: $Enums.PaymentStatus | null
    paymentType: $Enums.PaymentType | null
    orderNo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentHistoryMaxAggregateOutputType = {
    id: string | null
    referenceId: string | null
    telegramId: string | null
    userId: string | null
    payerEmail: string | null
    amount: number | null
    paymentMethod: string | null
    status: $Enums.PaymentStatus | null
    paymentType: $Enums.PaymentType | null
    orderNo: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentHistoryCountAggregateOutputType = {
    id: number
    referenceId: number
    telegramId: number
    userId: number
    payerEmail: number
    amount: number
    paymentMethod: number
    status: number
    paymentType: number
    orderNo: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentHistoryAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentHistorySumAggregateInputType = {
    amount?: true
  }

  export type PaymentHistoryMinAggregateInputType = {
    id?: true
    referenceId?: true
    telegramId?: true
    userId?: true
    payerEmail?: true
    amount?: true
    paymentMethod?: true
    status?: true
    paymentType?: true
    orderNo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentHistoryMaxAggregateInputType = {
    id?: true
    referenceId?: true
    telegramId?: true
    userId?: true
    payerEmail?: true
    amount?: true
    paymentMethod?: true
    status?: true
    paymentType?: true
    orderNo?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentHistoryCountAggregateInputType = {
    id?: true
    referenceId?: true
    telegramId?: true
    userId?: true
    payerEmail?: true
    amount?: true
    paymentMethod?: true
    status?: true
    paymentType?: true
    orderNo?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentHistory to aggregate.
     */
    where?: PaymentHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentHistories to fetch.
     */
    orderBy?: PaymentHistoryOrderByWithRelationInput | PaymentHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PaymentHistories
    **/
    _count?: true | PaymentHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentHistoryMaxAggregateInputType
  }

  export type GetPaymentHistoryAggregateType<T extends PaymentHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregatePaymentHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePaymentHistory[P]>
      : GetScalarType<T[P], AggregatePaymentHistory[P]>
  }




  export type PaymentHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentHistoryWhereInput
    orderBy?: PaymentHistoryOrderByWithAggregationInput | PaymentHistoryOrderByWithAggregationInput[]
    by: PaymentHistoryScalarFieldEnum[] | PaymentHistoryScalarFieldEnum
    having?: PaymentHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentHistoryCountAggregateInputType | true
    _avg?: PaymentHistoryAvgAggregateInputType
    _sum?: PaymentHistorySumAggregateInputType
    _min?: PaymentHistoryMinAggregateInputType
    _max?: PaymentHistoryMaxAggregateInputType
  }

  export type PaymentHistoryGroupByOutputType = {
    id: string
    referenceId: string
    telegramId: string
    userId: string | null
    payerEmail: string | null
    amount: number
    paymentMethod: string | null
    status: $Enums.PaymentStatus
    paymentType: $Enums.PaymentType
    orderNo: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentHistoryCountAggregateOutputType | null
    _avg: PaymentHistoryAvgAggregateOutputType | null
    _sum: PaymentHistorySumAggregateOutputType | null
    _min: PaymentHistoryMinAggregateOutputType | null
    _max: PaymentHistoryMaxAggregateOutputType | null
  }

  type GetPaymentHistoryGroupByPayload<T extends PaymentHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentHistoryGroupByOutputType[P]>
        }
      >
    >


  export type PaymentHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referenceId?: boolean
    telegramId?: boolean
    userId?: boolean
    payerEmail?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentType?: boolean
    orderNo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | PaymentHistory$userArgs<ExtArgs>
  }, ExtArgs["result"]["paymentHistory"]>

  export type PaymentHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referenceId?: boolean
    telegramId?: boolean
    userId?: boolean
    payerEmail?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentType?: boolean
    orderNo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | PaymentHistory$userArgs<ExtArgs>
  }, ExtArgs["result"]["paymentHistory"]>

  export type PaymentHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    referenceId?: boolean
    telegramId?: boolean
    userId?: boolean
    payerEmail?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentType?: boolean
    orderNo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | PaymentHistory$userArgs<ExtArgs>
  }, ExtArgs["result"]["paymentHistory"]>

  export type PaymentHistorySelectScalar = {
    id?: boolean
    referenceId?: boolean
    telegramId?: boolean
    userId?: boolean
    payerEmail?: boolean
    amount?: boolean
    paymentMethod?: boolean
    status?: boolean
    paymentType?: boolean
    orderNo?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "referenceId" | "telegramId" | "userId" | "payerEmail" | "amount" | "paymentMethod" | "status" | "paymentType" | "orderNo" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentHistory"]>
  export type PaymentHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PaymentHistory$userArgs<ExtArgs>
  }
  export type PaymentHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PaymentHistory$userArgs<ExtArgs>
  }
  export type PaymentHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | PaymentHistory$userArgs<ExtArgs>
  }

  export type $PaymentHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PaymentHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      referenceId: string
      telegramId: string
      userId: string | null
      payerEmail: string | null
      amount: number
      paymentMethod: string | null
      status: $Enums.PaymentStatus
      paymentType: $Enums.PaymentType
      orderNo: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["paymentHistory"]>
    composites: {}
  }

  type PaymentHistoryGetPayload<S extends boolean | null | undefined | PaymentHistoryDefaultArgs> = $Result.GetResult<Prisma.$PaymentHistoryPayload, S>

  type PaymentHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentHistoryCountAggregateInputType | true
    }

  export interface PaymentHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PaymentHistory'], meta: { name: 'PaymentHistory' } }
    /**
     * Find zero or one PaymentHistory that matches the filter.
     * @param {PaymentHistoryFindUniqueArgs} args - Arguments to find a PaymentHistory
     * @example
     * // Get one PaymentHistory
     * const paymentHistory = await prisma.paymentHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentHistoryFindUniqueArgs>(args: SelectSubset<T, PaymentHistoryFindUniqueArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PaymentHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentHistoryFindUniqueOrThrowArgs} args - Arguments to find a PaymentHistory
     * @example
     * // Get one PaymentHistory
     * const paymentHistory = await prisma.paymentHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentHistoryFindFirstArgs} args - Arguments to find a PaymentHistory
     * @example
     * // Get one PaymentHistory
     * const paymentHistory = await prisma.paymentHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentHistoryFindFirstArgs>(args?: SelectSubset<T, PaymentHistoryFindFirstArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PaymentHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentHistoryFindFirstOrThrowArgs} args - Arguments to find a PaymentHistory
     * @example
     * // Get one PaymentHistory
     * const paymentHistory = await prisma.paymentHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PaymentHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PaymentHistories
     * const paymentHistories = await prisma.paymentHistory.findMany()
     * 
     * // Get first 10 PaymentHistories
     * const paymentHistories = await prisma.paymentHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentHistoryWithIdOnly = await prisma.paymentHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentHistoryFindManyArgs>(args?: SelectSubset<T, PaymentHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PaymentHistory.
     * @param {PaymentHistoryCreateArgs} args - Arguments to create a PaymentHistory.
     * @example
     * // Create one PaymentHistory
     * const PaymentHistory = await prisma.paymentHistory.create({
     *   data: {
     *     // ... data to create a PaymentHistory
     *   }
     * })
     * 
     */
    create<T extends PaymentHistoryCreateArgs>(args: SelectSubset<T, PaymentHistoryCreateArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PaymentHistories.
     * @param {PaymentHistoryCreateManyArgs} args - Arguments to create many PaymentHistories.
     * @example
     * // Create many PaymentHistories
     * const paymentHistory = await prisma.paymentHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentHistoryCreateManyArgs>(args?: SelectSubset<T, PaymentHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PaymentHistories and returns the data saved in the database.
     * @param {PaymentHistoryCreateManyAndReturnArgs} args - Arguments to create many PaymentHistories.
     * @example
     * // Create many PaymentHistories
     * const paymentHistory = await prisma.paymentHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PaymentHistories and only return the `id`
     * const paymentHistoryWithIdOnly = await prisma.paymentHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PaymentHistory.
     * @param {PaymentHistoryDeleteArgs} args - Arguments to delete one PaymentHistory.
     * @example
     * // Delete one PaymentHistory
     * const PaymentHistory = await prisma.paymentHistory.delete({
     *   where: {
     *     // ... filter to delete one PaymentHistory
     *   }
     * })
     * 
     */
    delete<T extends PaymentHistoryDeleteArgs>(args: SelectSubset<T, PaymentHistoryDeleteArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PaymentHistory.
     * @param {PaymentHistoryUpdateArgs} args - Arguments to update one PaymentHistory.
     * @example
     * // Update one PaymentHistory
     * const paymentHistory = await prisma.paymentHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentHistoryUpdateArgs>(args: SelectSubset<T, PaymentHistoryUpdateArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PaymentHistories.
     * @param {PaymentHistoryDeleteManyArgs} args - Arguments to filter PaymentHistories to delete.
     * @example
     * // Delete a few PaymentHistories
     * const { count } = await prisma.paymentHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentHistoryDeleteManyArgs>(args?: SelectSubset<T, PaymentHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PaymentHistories
     * const paymentHistory = await prisma.paymentHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentHistoryUpdateManyArgs>(args: SelectSubset<T, PaymentHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PaymentHistories and returns the data updated in the database.
     * @param {PaymentHistoryUpdateManyAndReturnArgs} args - Arguments to update many PaymentHistories.
     * @example
     * // Update many PaymentHistories
     * const paymentHistory = await prisma.paymentHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PaymentHistories and only return the `id`
     * const paymentHistoryWithIdOnly = await prisma.paymentHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PaymentHistory.
     * @param {PaymentHistoryUpsertArgs} args - Arguments to update or create a PaymentHistory.
     * @example
     * // Update or create a PaymentHistory
     * const paymentHistory = await prisma.paymentHistory.upsert({
     *   create: {
     *     // ... data to create a PaymentHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PaymentHistory we want to update
     *   }
     * })
     */
    upsert<T extends PaymentHistoryUpsertArgs>(args: SelectSubset<T, PaymentHistoryUpsertArgs<ExtArgs>>): Prisma__PaymentHistoryClient<$Result.GetResult<Prisma.$PaymentHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PaymentHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentHistoryCountArgs} args - Arguments to filter PaymentHistories to count.
     * @example
     * // Count the number of PaymentHistories
     * const count = await prisma.paymentHistory.count({
     *   where: {
     *     // ... the filter for the PaymentHistories we want to count
     *   }
     * })
    **/
    count<T extends PaymentHistoryCountArgs>(
      args?: Subset<T, PaymentHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PaymentHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentHistoryAggregateArgs>(args: Subset<T, PaymentHistoryAggregateArgs>): Prisma.PrismaPromise<GetPaymentHistoryAggregateType<T>>

    /**
     * Group by PaymentHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentHistoryGroupByArgs['orderBy'] }
        : { orderBy?: PaymentHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PaymentHistory model
   */
  readonly fields: PaymentHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PaymentHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends PaymentHistory$userArgs<ExtArgs> = {}>(args?: Subset<T, PaymentHistory$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PaymentHistory model
   */
  interface PaymentHistoryFieldRefs {
    readonly id: FieldRef<"PaymentHistory", 'String'>
    readonly referenceId: FieldRef<"PaymentHistory", 'String'>
    readonly telegramId: FieldRef<"PaymentHistory", 'String'>
    readonly userId: FieldRef<"PaymentHistory", 'String'>
    readonly payerEmail: FieldRef<"PaymentHistory", 'String'>
    readonly amount: FieldRef<"PaymentHistory", 'Float'>
    readonly paymentMethod: FieldRef<"PaymentHistory", 'String'>
    readonly status: FieldRef<"PaymentHistory", 'PaymentStatus'>
    readonly paymentType: FieldRef<"PaymentHistory", 'PaymentType'>
    readonly orderNo: FieldRef<"PaymentHistory", 'String'>
    readonly createdAt: FieldRef<"PaymentHistory", 'DateTime'>
    readonly updatedAt: FieldRef<"PaymentHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PaymentHistory findUnique
   */
  export type PaymentHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PaymentHistory to fetch.
     */
    where: PaymentHistoryWhereUniqueInput
  }

  /**
   * PaymentHistory findUniqueOrThrow
   */
  export type PaymentHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PaymentHistory to fetch.
     */
    where: PaymentHistoryWhereUniqueInput
  }

  /**
   * PaymentHistory findFirst
   */
  export type PaymentHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PaymentHistory to fetch.
     */
    where?: PaymentHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentHistories to fetch.
     */
    orderBy?: PaymentHistoryOrderByWithRelationInput | PaymentHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentHistories.
     */
    cursor?: PaymentHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentHistories.
     */
    distinct?: PaymentHistoryScalarFieldEnum | PaymentHistoryScalarFieldEnum[]
  }

  /**
   * PaymentHistory findFirstOrThrow
   */
  export type PaymentHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PaymentHistory to fetch.
     */
    where?: PaymentHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentHistories to fetch.
     */
    orderBy?: PaymentHistoryOrderByWithRelationInput | PaymentHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PaymentHistories.
     */
    cursor?: PaymentHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PaymentHistories.
     */
    distinct?: PaymentHistoryScalarFieldEnum | PaymentHistoryScalarFieldEnum[]
  }

  /**
   * PaymentHistory findMany
   */
  export type PaymentHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * Filter, which PaymentHistories to fetch.
     */
    where?: PaymentHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PaymentHistories to fetch.
     */
    orderBy?: PaymentHistoryOrderByWithRelationInput | PaymentHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PaymentHistories.
     */
    cursor?: PaymentHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PaymentHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PaymentHistories.
     */
    skip?: number
    distinct?: PaymentHistoryScalarFieldEnum | PaymentHistoryScalarFieldEnum[]
  }

  /**
   * PaymentHistory create
   */
  export type PaymentHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a PaymentHistory.
     */
    data: XOR<PaymentHistoryCreateInput, PaymentHistoryUncheckedCreateInput>
  }

  /**
   * PaymentHistory createMany
   */
  export type PaymentHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PaymentHistories.
     */
    data: PaymentHistoryCreateManyInput | PaymentHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PaymentHistory createManyAndReturn
   */
  export type PaymentHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many PaymentHistories.
     */
    data: PaymentHistoryCreateManyInput | PaymentHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentHistory update
   */
  export type PaymentHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a PaymentHistory.
     */
    data: XOR<PaymentHistoryUpdateInput, PaymentHistoryUncheckedUpdateInput>
    /**
     * Choose, which PaymentHistory to update.
     */
    where: PaymentHistoryWhereUniqueInput
  }

  /**
   * PaymentHistory updateMany
   */
  export type PaymentHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PaymentHistories.
     */
    data: XOR<PaymentHistoryUpdateManyMutationInput, PaymentHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PaymentHistories to update
     */
    where?: PaymentHistoryWhereInput
    /**
     * Limit how many PaymentHistories to update.
     */
    limit?: number
  }

  /**
   * PaymentHistory updateManyAndReturn
   */
  export type PaymentHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * The data used to update PaymentHistories.
     */
    data: XOR<PaymentHistoryUpdateManyMutationInput, PaymentHistoryUncheckedUpdateManyInput>
    /**
     * Filter which PaymentHistories to update
     */
    where?: PaymentHistoryWhereInput
    /**
     * Limit how many PaymentHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PaymentHistory upsert
   */
  export type PaymentHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the PaymentHistory to update in case it exists.
     */
    where: PaymentHistoryWhereUniqueInput
    /**
     * In case the PaymentHistory found by the `where` argument doesn't exist, create a new PaymentHistory with this data.
     */
    create: XOR<PaymentHistoryCreateInput, PaymentHistoryUncheckedCreateInput>
    /**
     * In case the PaymentHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentHistoryUpdateInput, PaymentHistoryUncheckedUpdateInput>
  }

  /**
   * PaymentHistory delete
   */
  export type PaymentHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
    /**
     * Filter which PaymentHistory to delete.
     */
    where: PaymentHistoryWhereUniqueInput
  }

  /**
   * PaymentHistory deleteMany
   */
  export type PaymentHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PaymentHistories to delete
     */
    where?: PaymentHistoryWhereInput
    /**
     * Limit how many PaymentHistories to delete.
     */
    limit?: number
  }

  /**
   * PaymentHistory.user
   */
  export type PaymentHistory$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PaymentHistory without action
   */
  export type PaymentHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PaymentHistory
     */
    select?: PaymentHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PaymentHistory
     */
    omit?: PaymentHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentHistoryInclude<ExtArgs> | null
  }


  /**
   * Model TonHistory
   */

  export type AggregateTonHistory = {
    _count: TonHistoryCountAggregateOutputType | null
    _avg: TonHistoryAvgAggregateOutputType | null
    _sum: TonHistorySumAggregateOutputType | null
    _min: TonHistoryMinAggregateOutputType | null
    _max: TonHistoryMaxAggregateOutputType | null
  }

  export type TonHistoryAvgAggregateOutputType = {
    nanoTon: number | null
  }

  export type TonHistorySumAggregateOutputType = {
    nanoTon: bigint | null
  }

  export type TonHistoryMinAggregateOutputType = {
    id: string | null
    hash: string | null
    nanoTon: bigint | null
    senderAddress: string | null
    createdAt: Date | null
  }

  export type TonHistoryMaxAggregateOutputType = {
    id: string | null
    hash: string | null
    nanoTon: bigint | null
    senderAddress: string | null
    createdAt: Date | null
  }

  export type TonHistoryCountAggregateOutputType = {
    id: number
    hash: number
    nanoTon: number
    senderAddress: number
    createdAt: number
    _all: number
  }


  export type TonHistoryAvgAggregateInputType = {
    nanoTon?: true
  }

  export type TonHistorySumAggregateInputType = {
    nanoTon?: true
  }

  export type TonHistoryMinAggregateInputType = {
    id?: true
    hash?: true
    nanoTon?: true
    senderAddress?: true
    createdAt?: true
  }

  export type TonHistoryMaxAggregateInputType = {
    id?: true
    hash?: true
    nanoTon?: true
    senderAddress?: true
    createdAt?: true
  }

  export type TonHistoryCountAggregateInputType = {
    id?: true
    hash?: true
    nanoTon?: true
    senderAddress?: true
    createdAt?: true
    _all?: true
  }

  export type TonHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TonHistory to aggregate.
     */
    where?: TonHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TonHistories to fetch.
     */
    orderBy?: TonHistoryOrderByWithRelationInput | TonHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TonHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TonHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TonHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TonHistories
    **/
    _count?: true | TonHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TonHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TonHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TonHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TonHistoryMaxAggregateInputType
  }

  export type GetTonHistoryAggregateType<T extends TonHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateTonHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTonHistory[P]>
      : GetScalarType<T[P], AggregateTonHistory[P]>
  }




  export type TonHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TonHistoryWhereInput
    orderBy?: TonHistoryOrderByWithAggregationInput | TonHistoryOrderByWithAggregationInput[]
    by: TonHistoryScalarFieldEnum[] | TonHistoryScalarFieldEnum
    having?: TonHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TonHistoryCountAggregateInputType | true
    _avg?: TonHistoryAvgAggregateInputType
    _sum?: TonHistorySumAggregateInputType
    _min?: TonHistoryMinAggregateInputType
    _max?: TonHistoryMaxAggregateInputType
  }

  export type TonHistoryGroupByOutputType = {
    id: string
    hash: string
    nanoTon: bigint
    senderAddress: string
    createdAt: Date
    _count: TonHistoryCountAggregateOutputType | null
    _avg: TonHistoryAvgAggregateOutputType | null
    _sum: TonHistorySumAggregateOutputType | null
    _min: TonHistoryMinAggregateOutputType | null
    _max: TonHistoryMaxAggregateOutputType | null
  }

  type GetTonHistoryGroupByPayload<T extends TonHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TonHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TonHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TonHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], TonHistoryGroupByOutputType[P]>
        }
      >
    >


  export type TonHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    nanoTon?: boolean
    senderAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tonHistory"]>

  export type TonHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    nanoTon?: boolean
    senderAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tonHistory"]>

  export type TonHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hash?: boolean
    nanoTon?: boolean
    senderAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tonHistory"]>

  export type TonHistorySelectScalar = {
    id?: boolean
    hash?: boolean
    nanoTon?: boolean
    senderAddress?: boolean
    createdAt?: boolean
  }

  export type TonHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hash" | "nanoTon" | "senderAddress" | "createdAt", ExtArgs["result"]["tonHistory"]>

  export type $TonHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TonHistory"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      hash: string
      nanoTon: bigint
      senderAddress: string
      createdAt: Date
    }, ExtArgs["result"]["tonHistory"]>
    composites: {}
  }

  type TonHistoryGetPayload<S extends boolean | null | undefined | TonHistoryDefaultArgs> = $Result.GetResult<Prisma.$TonHistoryPayload, S>

  type TonHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TonHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TonHistoryCountAggregateInputType | true
    }

  export interface TonHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TonHistory'], meta: { name: 'TonHistory' } }
    /**
     * Find zero or one TonHistory that matches the filter.
     * @param {TonHistoryFindUniqueArgs} args - Arguments to find a TonHistory
     * @example
     * // Get one TonHistory
     * const tonHistory = await prisma.tonHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TonHistoryFindUniqueArgs>(args: SelectSubset<T, TonHistoryFindUniqueArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TonHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TonHistoryFindUniqueOrThrowArgs} args - Arguments to find a TonHistory
     * @example
     * // Get one TonHistory
     * const tonHistory = await prisma.tonHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TonHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, TonHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TonHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TonHistoryFindFirstArgs} args - Arguments to find a TonHistory
     * @example
     * // Get one TonHistory
     * const tonHistory = await prisma.tonHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TonHistoryFindFirstArgs>(args?: SelectSubset<T, TonHistoryFindFirstArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TonHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TonHistoryFindFirstOrThrowArgs} args - Arguments to find a TonHistory
     * @example
     * // Get one TonHistory
     * const tonHistory = await prisma.tonHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TonHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, TonHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TonHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TonHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TonHistories
     * const tonHistories = await prisma.tonHistory.findMany()
     * 
     * // Get first 10 TonHistories
     * const tonHistories = await prisma.tonHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tonHistoryWithIdOnly = await prisma.tonHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TonHistoryFindManyArgs>(args?: SelectSubset<T, TonHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TonHistory.
     * @param {TonHistoryCreateArgs} args - Arguments to create a TonHistory.
     * @example
     * // Create one TonHistory
     * const TonHistory = await prisma.tonHistory.create({
     *   data: {
     *     // ... data to create a TonHistory
     *   }
     * })
     * 
     */
    create<T extends TonHistoryCreateArgs>(args: SelectSubset<T, TonHistoryCreateArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TonHistories.
     * @param {TonHistoryCreateManyArgs} args - Arguments to create many TonHistories.
     * @example
     * // Create many TonHistories
     * const tonHistory = await prisma.tonHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TonHistoryCreateManyArgs>(args?: SelectSubset<T, TonHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TonHistories and returns the data saved in the database.
     * @param {TonHistoryCreateManyAndReturnArgs} args - Arguments to create many TonHistories.
     * @example
     * // Create many TonHistories
     * const tonHistory = await prisma.tonHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TonHistories and only return the `id`
     * const tonHistoryWithIdOnly = await prisma.tonHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TonHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, TonHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TonHistory.
     * @param {TonHistoryDeleteArgs} args - Arguments to delete one TonHistory.
     * @example
     * // Delete one TonHistory
     * const TonHistory = await prisma.tonHistory.delete({
     *   where: {
     *     // ... filter to delete one TonHistory
     *   }
     * })
     * 
     */
    delete<T extends TonHistoryDeleteArgs>(args: SelectSubset<T, TonHistoryDeleteArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TonHistory.
     * @param {TonHistoryUpdateArgs} args - Arguments to update one TonHistory.
     * @example
     * // Update one TonHistory
     * const tonHistory = await prisma.tonHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TonHistoryUpdateArgs>(args: SelectSubset<T, TonHistoryUpdateArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TonHistories.
     * @param {TonHistoryDeleteManyArgs} args - Arguments to filter TonHistories to delete.
     * @example
     * // Delete a few TonHistories
     * const { count } = await prisma.tonHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TonHistoryDeleteManyArgs>(args?: SelectSubset<T, TonHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TonHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TonHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TonHistories
     * const tonHistory = await prisma.tonHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TonHistoryUpdateManyArgs>(args: SelectSubset<T, TonHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TonHistories and returns the data updated in the database.
     * @param {TonHistoryUpdateManyAndReturnArgs} args - Arguments to update many TonHistories.
     * @example
     * // Update many TonHistories
     * const tonHistory = await prisma.tonHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TonHistories and only return the `id`
     * const tonHistoryWithIdOnly = await prisma.tonHistory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TonHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, TonHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TonHistory.
     * @param {TonHistoryUpsertArgs} args - Arguments to update or create a TonHistory.
     * @example
     * // Update or create a TonHistory
     * const tonHistory = await prisma.tonHistory.upsert({
     *   create: {
     *     // ... data to create a TonHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TonHistory we want to update
     *   }
     * })
     */
    upsert<T extends TonHistoryUpsertArgs>(args: SelectSubset<T, TonHistoryUpsertArgs<ExtArgs>>): Prisma__TonHistoryClient<$Result.GetResult<Prisma.$TonHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TonHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TonHistoryCountArgs} args - Arguments to filter TonHistories to count.
     * @example
     * // Count the number of TonHistories
     * const count = await prisma.tonHistory.count({
     *   where: {
     *     // ... the filter for the TonHistories we want to count
     *   }
     * })
    **/
    count<T extends TonHistoryCountArgs>(
      args?: Subset<T, TonHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TonHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TonHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TonHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TonHistoryAggregateArgs>(args: Subset<T, TonHistoryAggregateArgs>): Prisma.PrismaPromise<GetTonHistoryAggregateType<T>>

    /**
     * Group by TonHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TonHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TonHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TonHistoryGroupByArgs['orderBy'] }
        : { orderBy?: TonHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TonHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTonHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TonHistory model
   */
  readonly fields: TonHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TonHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TonHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TonHistory model
   */
  interface TonHistoryFieldRefs {
    readonly id: FieldRef<"TonHistory", 'String'>
    readonly hash: FieldRef<"TonHistory", 'String'>
    readonly nanoTon: FieldRef<"TonHistory", 'BigInt'>
    readonly senderAddress: FieldRef<"TonHistory", 'String'>
    readonly createdAt: FieldRef<"TonHistory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TonHistory findUnique
   */
  export type TonHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * Filter, which TonHistory to fetch.
     */
    where: TonHistoryWhereUniqueInput
  }

  /**
   * TonHistory findUniqueOrThrow
   */
  export type TonHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * Filter, which TonHistory to fetch.
     */
    where: TonHistoryWhereUniqueInput
  }

  /**
   * TonHistory findFirst
   */
  export type TonHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * Filter, which TonHistory to fetch.
     */
    where?: TonHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TonHistories to fetch.
     */
    orderBy?: TonHistoryOrderByWithRelationInput | TonHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TonHistories.
     */
    cursor?: TonHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TonHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TonHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TonHistories.
     */
    distinct?: TonHistoryScalarFieldEnum | TonHistoryScalarFieldEnum[]
  }

  /**
   * TonHistory findFirstOrThrow
   */
  export type TonHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * Filter, which TonHistory to fetch.
     */
    where?: TonHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TonHistories to fetch.
     */
    orderBy?: TonHistoryOrderByWithRelationInput | TonHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TonHistories.
     */
    cursor?: TonHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TonHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TonHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TonHistories.
     */
    distinct?: TonHistoryScalarFieldEnum | TonHistoryScalarFieldEnum[]
  }

  /**
   * TonHistory findMany
   */
  export type TonHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * Filter, which TonHistories to fetch.
     */
    where?: TonHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TonHistories to fetch.
     */
    orderBy?: TonHistoryOrderByWithRelationInput | TonHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TonHistories.
     */
    cursor?: TonHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TonHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TonHistories.
     */
    skip?: number
    distinct?: TonHistoryScalarFieldEnum | TonHistoryScalarFieldEnum[]
  }

  /**
   * TonHistory create
   */
  export type TonHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * The data needed to create a TonHistory.
     */
    data: XOR<TonHistoryCreateInput, TonHistoryUncheckedCreateInput>
  }

  /**
   * TonHistory createMany
   */
  export type TonHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TonHistories.
     */
    data: TonHistoryCreateManyInput | TonHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TonHistory createManyAndReturn
   */
  export type TonHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many TonHistories.
     */
    data: TonHistoryCreateManyInput | TonHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TonHistory update
   */
  export type TonHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * The data needed to update a TonHistory.
     */
    data: XOR<TonHistoryUpdateInput, TonHistoryUncheckedUpdateInput>
    /**
     * Choose, which TonHistory to update.
     */
    where: TonHistoryWhereUniqueInput
  }

  /**
   * TonHistory updateMany
   */
  export type TonHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TonHistories.
     */
    data: XOR<TonHistoryUpdateManyMutationInput, TonHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TonHistories to update
     */
    where?: TonHistoryWhereInput
    /**
     * Limit how many TonHistories to update.
     */
    limit?: number
  }

  /**
   * TonHistory updateManyAndReturn
   */
  export type TonHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * The data used to update TonHistories.
     */
    data: XOR<TonHistoryUpdateManyMutationInput, TonHistoryUncheckedUpdateManyInput>
    /**
     * Filter which TonHistories to update
     */
    where?: TonHistoryWhereInput
    /**
     * Limit how many TonHistories to update.
     */
    limit?: number
  }

  /**
   * TonHistory upsert
   */
  export type TonHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * The filter to search for the TonHistory to update in case it exists.
     */
    where: TonHistoryWhereUniqueInput
    /**
     * In case the TonHistory found by the `where` argument doesn't exist, create a new TonHistory with this data.
     */
    create: XOR<TonHistoryCreateInput, TonHistoryUncheckedCreateInput>
    /**
     * In case the TonHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TonHistoryUpdateInput, TonHistoryUncheckedUpdateInput>
  }

  /**
   * TonHistory delete
   */
  export type TonHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
    /**
     * Filter which TonHistory to delete.
     */
    where: TonHistoryWhereUniqueInput
  }

  /**
   * TonHistory deleteMany
   */
  export type TonHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TonHistories to delete
     */
    where?: TonHistoryWhereInput
    /**
     * Limit how many TonHistories to delete.
     */
    limit?: number
  }

  /**
   * TonHistory without action
   */
  export type TonHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TonHistory
     */
    select?: TonHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TonHistory
     */
    omit?: TonHistoryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BalanceScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BalanceScalarFieldEnum = (typeof BalanceScalarFieldEnum)[keyof typeof BalanceScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    username: 'username',
    fullName: 'fullName',
    photoUrl: 'photoUrl',
    languageCode: 'languageCode',
    balanceId: 'balanceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RegionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const SubRegionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    regionId: 'regionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubRegionScalarFieldEnum = (typeof SubRegionScalarFieldEnum)[keyof typeof SubRegionScalarFieldEnum]


  export const PackageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    duration: 'duration',
    durationUnit: 'durationUnit',
    price: 'price',
    data: 'data',
    dataUnit: 'dataUnit',
    pricePerData: 'pricePerData',
    regionId: 'regionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PackageScalarFieldEnum = (typeof PackageScalarFieldEnum)[keyof typeof PackageScalarFieldEnum]


  export const EsimScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    imsi: 'imsi',
    iccid: 'iccid',
    ac: 'ac',
    shortUrl: 'shortUrl',
    totalDuration: 'totalDuration',
    durationUnit: 'durationUnit',
    status: 'status',
    packageName: 'packageName',
    packageCode: 'packageCode',
    remainingData: 'remainingData',
    orderNo: 'orderNo',
    expiredAt: 'expiredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type EsimScalarFieldEnum = (typeof EsimScalarFieldEnum)[keyof typeof EsimScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    telegramId: 'telegramId',
    orderNo: 'orderNo',
    txId: 'txId',
    amount: 'amount',
    status: 'status',
    paymentMethod: 'paymentMethod',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const PaymentHistoryScalarFieldEnum: {
    id: 'id',
    referenceId: 'referenceId',
    telegramId: 'telegramId',
    userId: 'userId',
    payerEmail: 'payerEmail',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    status: 'status',
    paymentType: 'paymentType',
    orderNo: 'orderNo',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentHistoryScalarFieldEnum = (typeof PaymentHistoryScalarFieldEnum)[keyof typeof PaymentHistoryScalarFieldEnum]


  export const TonHistoryScalarFieldEnum: {
    id: 'id',
    hash: 'hash',
    nanoTon: 'nanoTon',
    senderAddress: 'senderAddress',
    createdAt: 'createdAt'
  };

  export type TonHistoryScalarFieldEnum = (typeof TonHistoryScalarFieldEnum)[keyof typeof TonHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentType'
   */
  export type EnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType'>
    


  /**
   * Reference to a field of type 'PaymentType[]'
   */
  export type ListEnumPaymentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentType[]'>
    
  /**
   * Deep Input Types
   */


  export type BalanceWhereInput = {
    AND?: BalanceWhereInput | BalanceWhereInput[]
    OR?: BalanceWhereInput[]
    NOT?: BalanceWhereInput | BalanceWhereInput[]
    id?: StringFilter<"Balance"> | string
    amount?: IntFilter<"Balance"> | number
    createdAt?: DateTimeFilter<"Balance"> | Date | string
    updatedAt?: DateTimeFilter<"Balance"> | Date | string
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type BalanceOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type BalanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BalanceWhereInput | BalanceWhereInput[]
    OR?: BalanceWhereInput[]
    NOT?: BalanceWhereInput | BalanceWhereInput[]
    amount?: IntFilter<"Balance"> | number
    createdAt?: DateTimeFilter<"Balance"> | Date | string
    updatedAt?: DateTimeFilter<"Balance"> | Date | string
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type BalanceOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BalanceCountOrderByAggregateInput
    _avg?: BalanceAvgOrderByAggregateInput
    _max?: BalanceMaxOrderByAggregateInput
    _min?: BalanceMinOrderByAggregateInput
    _sum?: BalanceSumOrderByAggregateInput
  }

  export type BalanceScalarWhereWithAggregatesInput = {
    AND?: BalanceScalarWhereWithAggregatesInput | BalanceScalarWhereWithAggregatesInput[]
    OR?: BalanceScalarWhereWithAggregatesInput[]
    NOT?: BalanceScalarWhereWithAggregatesInput | BalanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Balance"> | string
    amount?: IntWithAggregatesFilter<"Balance"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Balance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Balance"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    telegramId?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    photoUrl?: StringNullableFilter<"User"> | string | null
    languageCode?: StringNullableFilter<"User"> | string | null
    balanceId?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    balance?: XOR<BalanceScalarRelationFilter, BalanceWhereInput>
    paymentHistory?: PaymentHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    languageCode?: SortOrderInput | SortOrder
    balanceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    balance?: BalanceOrderByWithRelationInput
    paymentHistory?: PaymentHistoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    telegramId?: string
    balanceId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    photoUrl?: StringNullableFilter<"User"> | string | null
    languageCode?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    balance?: XOR<BalanceScalarRelationFilter, BalanceWhereInput>
    paymentHistory?: PaymentHistoryListRelationFilter
  }, "id" | "telegramId" | "balanceId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    photoUrl?: SortOrderInput | SortOrder
    languageCode?: SortOrderInput | SortOrder
    balanceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    telegramId?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    photoUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    languageCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    balanceId?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    id?: StringFilter<"Region"> | string
    name?: StringFilter<"Region"> | string
    code?: StringFilter<"Region"> | string
    createdAt?: DateTimeFilter<"Region"> | Date | string
    updatedAt?: DateTimeFilter<"Region"> | Date | string
    subRegions?: SubRegionListRelationFilter
    packages?: PackageListRelationFilter
  }

  export type RegionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    subRegions?: SubRegionOrderByRelationAggregateInput
    packages?: PackageOrderByRelationAggregateInput
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    name?: StringFilter<"Region"> | string
    createdAt?: DateTimeFilter<"Region"> | Date | string
    updatedAt?: DateTimeFilter<"Region"> | Date | string
    subRegions?: SubRegionListRelationFilter
    packages?: PackageListRelationFilter
  }, "id" | "code">

  export type RegionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Region"> | string
    name?: StringWithAggregatesFilter<"Region"> | string
    code?: StringWithAggregatesFilter<"Region"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Region"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Region"> | Date | string
  }

  export type SubRegionWhereInput = {
    AND?: SubRegionWhereInput | SubRegionWhereInput[]
    OR?: SubRegionWhereInput[]
    NOT?: SubRegionWhereInput | SubRegionWhereInput[]
    id?: StringFilter<"SubRegion"> | string
    name?: StringFilter<"SubRegion"> | string
    code?: StringFilter<"SubRegion"> | string
    regionId?: StringFilter<"SubRegion"> | string
    createdAt?: DateTimeFilter<"SubRegion"> | Date | string
    updatedAt?: DateTimeFilter<"SubRegion"> | Date | string
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type SubRegionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    region?: RegionOrderByWithRelationInput
  }

  export type SubRegionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubRegionWhereInput | SubRegionWhereInput[]
    OR?: SubRegionWhereInput[]
    NOT?: SubRegionWhereInput | SubRegionWhereInput[]
    name?: StringFilter<"SubRegion"> | string
    code?: StringFilter<"SubRegion"> | string
    regionId?: StringFilter<"SubRegion"> | string
    createdAt?: DateTimeFilter<"SubRegion"> | Date | string
    updatedAt?: DateTimeFilter<"SubRegion"> | Date | string
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id">

  export type SubRegionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubRegionCountOrderByAggregateInput
    _max?: SubRegionMaxOrderByAggregateInput
    _min?: SubRegionMinOrderByAggregateInput
  }

  export type SubRegionScalarWhereWithAggregatesInput = {
    AND?: SubRegionScalarWhereWithAggregatesInput | SubRegionScalarWhereWithAggregatesInput[]
    OR?: SubRegionScalarWhereWithAggregatesInput[]
    NOT?: SubRegionScalarWhereWithAggregatesInput | SubRegionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SubRegion"> | string
    name?: StringWithAggregatesFilter<"SubRegion"> | string
    code?: StringWithAggregatesFilter<"SubRegion"> | string
    regionId?: StringWithAggregatesFilter<"SubRegion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SubRegion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SubRegion"> | Date | string
  }

  export type PackageWhereInput = {
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    id?: StringFilter<"Package"> | string
    name?: StringFilter<"Package"> | string
    code?: StringFilter<"Package"> | string
    duration?: IntFilter<"Package"> | number
    durationUnit?: StringFilter<"Package"> | string
    price?: FloatFilter<"Package"> | number
    data?: StringFilter<"Package"> | string
    dataUnit?: StringFilter<"Package"> | string
    pricePerData?: FloatFilter<"Package"> | number
    regionId?: StringFilter<"Package"> | string
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type PackageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    duration?: SortOrder
    durationUnit?: SortOrder
    price?: SortOrder
    data?: SortOrder
    dataUnit?: SortOrder
    pricePerData?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    region?: RegionOrderByWithRelationInput
  }

  export type PackageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PackageWhereInput | PackageWhereInput[]
    OR?: PackageWhereInput[]
    NOT?: PackageWhereInput | PackageWhereInput[]
    name?: StringFilter<"Package"> | string
    duration?: IntFilter<"Package"> | number
    durationUnit?: StringFilter<"Package"> | string
    price?: FloatFilter<"Package"> | number
    data?: StringFilter<"Package"> | string
    dataUnit?: StringFilter<"Package"> | string
    pricePerData?: FloatFilter<"Package"> | number
    regionId?: StringFilter<"Package"> | string
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "id" | "code">

  export type PackageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    duration?: SortOrder
    durationUnit?: SortOrder
    price?: SortOrder
    data?: SortOrder
    dataUnit?: SortOrder
    pricePerData?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PackageCountOrderByAggregateInput
    _avg?: PackageAvgOrderByAggregateInput
    _max?: PackageMaxOrderByAggregateInput
    _min?: PackageMinOrderByAggregateInput
    _sum?: PackageSumOrderByAggregateInput
  }

  export type PackageScalarWhereWithAggregatesInput = {
    AND?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    OR?: PackageScalarWhereWithAggregatesInput[]
    NOT?: PackageScalarWhereWithAggregatesInput | PackageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Package"> | string
    name?: StringWithAggregatesFilter<"Package"> | string
    code?: StringWithAggregatesFilter<"Package"> | string
    duration?: IntWithAggregatesFilter<"Package"> | number
    durationUnit?: StringWithAggregatesFilter<"Package"> | string
    price?: FloatWithAggregatesFilter<"Package"> | number
    data?: StringWithAggregatesFilter<"Package"> | string
    dataUnit?: StringWithAggregatesFilter<"Package"> | string
    pricePerData?: FloatWithAggregatesFilter<"Package"> | number
    regionId?: StringWithAggregatesFilter<"Package"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Package"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Package"> | Date | string
  }

  export type EsimWhereInput = {
    AND?: EsimWhereInput | EsimWhereInput[]
    OR?: EsimWhereInput[]
    NOT?: EsimWhereInput | EsimWhereInput[]
    id?: StringFilter<"Esim"> | string
    telegramId?: StringFilter<"Esim"> | string
    imsi?: StringFilter<"Esim"> | string
    iccid?: StringFilter<"Esim"> | string
    ac?: StringFilter<"Esim"> | string
    shortUrl?: StringFilter<"Esim"> | string
    totalDuration?: IntFilter<"Esim"> | number
    durationUnit?: StringFilter<"Esim"> | string
    status?: StringFilter<"Esim"> | string
    packageName?: StringFilter<"Esim"> | string
    packageCode?: StringFilter<"Esim"> | string
    remainingData?: BigIntFilter<"Esim"> | bigint | number
    orderNo?: StringFilter<"Esim"> | string
    expiredAt?: DateTimeFilter<"Esim"> | Date | string
    createdAt?: DateTimeFilter<"Esim"> | Date | string
    updatedAt?: DateTimeFilter<"Esim"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type EsimOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    imsi?: SortOrder
    iccid?: SortOrder
    ac?: SortOrder
    shortUrl?: SortOrder
    totalDuration?: SortOrder
    durationUnit?: SortOrder
    status?: SortOrder
    packageName?: SortOrder
    packageCode?: SortOrder
    remainingData?: SortOrder
    orderNo?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type EsimWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    iccid?: string
    AND?: EsimWhereInput | EsimWhereInput[]
    OR?: EsimWhereInput[]
    NOT?: EsimWhereInput | EsimWhereInput[]
    telegramId?: StringFilter<"Esim"> | string
    imsi?: StringFilter<"Esim"> | string
    ac?: StringFilter<"Esim"> | string
    shortUrl?: StringFilter<"Esim"> | string
    totalDuration?: IntFilter<"Esim"> | number
    durationUnit?: StringFilter<"Esim"> | string
    status?: StringFilter<"Esim"> | string
    packageName?: StringFilter<"Esim"> | string
    packageCode?: StringFilter<"Esim"> | string
    remainingData?: BigIntFilter<"Esim"> | bigint | number
    orderNo?: StringFilter<"Esim"> | string
    expiredAt?: DateTimeFilter<"Esim"> | Date | string
    createdAt?: DateTimeFilter<"Esim"> | Date | string
    updatedAt?: DateTimeFilter<"Esim"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id" | "iccid">

  export type EsimOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    imsi?: SortOrder
    iccid?: SortOrder
    ac?: SortOrder
    shortUrl?: SortOrder
    totalDuration?: SortOrder
    durationUnit?: SortOrder
    status?: SortOrder
    packageName?: SortOrder
    packageCode?: SortOrder
    remainingData?: SortOrder
    orderNo?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EsimCountOrderByAggregateInput
    _avg?: EsimAvgOrderByAggregateInput
    _max?: EsimMaxOrderByAggregateInput
    _min?: EsimMinOrderByAggregateInput
    _sum?: EsimSumOrderByAggregateInput
  }

  export type EsimScalarWhereWithAggregatesInput = {
    AND?: EsimScalarWhereWithAggregatesInput | EsimScalarWhereWithAggregatesInput[]
    OR?: EsimScalarWhereWithAggregatesInput[]
    NOT?: EsimScalarWhereWithAggregatesInput | EsimScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Esim"> | string
    telegramId?: StringWithAggregatesFilter<"Esim"> | string
    imsi?: StringWithAggregatesFilter<"Esim"> | string
    iccid?: StringWithAggregatesFilter<"Esim"> | string
    ac?: StringWithAggregatesFilter<"Esim"> | string
    shortUrl?: StringWithAggregatesFilter<"Esim"> | string
    totalDuration?: IntWithAggregatesFilter<"Esim"> | number
    durationUnit?: StringWithAggregatesFilter<"Esim"> | string
    status?: StringWithAggregatesFilter<"Esim"> | string
    packageName?: StringWithAggregatesFilter<"Esim"> | string
    packageCode?: StringWithAggregatesFilter<"Esim"> | string
    remainingData?: BigIntWithAggregatesFilter<"Esim"> | bigint | number
    orderNo?: StringWithAggregatesFilter<"Esim"> | string
    expiredAt?: DateTimeWithAggregatesFilter<"Esim"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Esim"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Esim"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    telegramId?: StringFilter<"Order"> | string
    orderNo?: StringFilter<"Order"> | string
    txId?: StringFilter<"Order"> | string
    amount?: FloatFilter<"Order"> | number
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentMethod?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    esims?: EsimListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    orderNo?: SortOrder
    txId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    esims?: EsimOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderNo?: string
    txId?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    telegramId?: StringFilter<"Order"> | string
    amount?: FloatFilter<"Order"> | number
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    paymentMethod?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    esims?: EsimListRelationFilter
  }, "id" | "orderNo" | "txId">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    telegramId?: SortOrder
    orderNo?: SortOrder
    txId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    telegramId?: StringWithAggregatesFilter<"Order"> | string
    orderNo?: StringWithAggregatesFilter<"Order"> | string
    txId?: StringWithAggregatesFilter<"Order"> | string
    amount?: FloatWithAggregatesFilter<"Order"> | number
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    paymentMethod?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type PaymentHistoryWhereInput = {
    AND?: PaymentHistoryWhereInput | PaymentHistoryWhereInput[]
    OR?: PaymentHistoryWhereInput[]
    NOT?: PaymentHistoryWhereInput | PaymentHistoryWhereInput[]
    id?: StringFilter<"PaymentHistory"> | string
    referenceId?: StringFilter<"PaymentHistory"> | string
    telegramId?: StringFilter<"PaymentHistory"> | string
    userId?: StringNullableFilter<"PaymentHistory"> | string | null
    payerEmail?: StringNullableFilter<"PaymentHistory"> | string | null
    amount?: FloatFilter<"PaymentHistory"> | number
    paymentMethod?: StringNullableFilter<"PaymentHistory"> | string | null
    status?: EnumPaymentStatusFilter<"PaymentHistory"> | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFilter<"PaymentHistory"> | $Enums.PaymentType
    orderNo?: StringNullableFilter<"PaymentHistory"> | string | null
    createdAt?: DateTimeFilter<"PaymentHistory"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentHistory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type PaymentHistoryOrderByWithRelationInput = {
    id?: SortOrder
    referenceId?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrderInput | SortOrder
    payerEmail?: SortOrderInput | SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentType?: SortOrder
    orderNo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PaymentHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    referenceId?: string
    orderNo?: string
    AND?: PaymentHistoryWhereInput | PaymentHistoryWhereInput[]
    OR?: PaymentHistoryWhereInput[]
    NOT?: PaymentHistoryWhereInput | PaymentHistoryWhereInput[]
    telegramId?: StringFilter<"PaymentHistory"> | string
    userId?: StringNullableFilter<"PaymentHistory"> | string | null
    payerEmail?: StringNullableFilter<"PaymentHistory"> | string | null
    amount?: FloatFilter<"PaymentHistory"> | number
    paymentMethod?: StringNullableFilter<"PaymentHistory"> | string | null
    status?: EnumPaymentStatusFilter<"PaymentHistory"> | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFilter<"PaymentHistory"> | $Enums.PaymentType
    createdAt?: DateTimeFilter<"PaymentHistory"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentHistory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "referenceId" | "orderNo">

  export type PaymentHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    referenceId?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrderInput | SortOrder
    payerEmail?: SortOrderInput | SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    status?: SortOrder
    paymentType?: SortOrder
    orderNo?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentHistoryCountOrderByAggregateInput
    _avg?: PaymentHistoryAvgOrderByAggregateInput
    _max?: PaymentHistoryMaxOrderByAggregateInput
    _min?: PaymentHistoryMinOrderByAggregateInput
    _sum?: PaymentHistorySumOrderByAggregateInput
  }

  export type PaymentHistoryScalarWhereWithAggregatesInput = {
    AND?: PaymentHistoryScalarWhereWithAggregatesInput | PaymentHistoryScalarWhereWithAggregatesInput[]
    OR?: PaymentHistoryScalarWhereWithAggregatesInput[]
    NOT?: PaymentHistoryScalarWhereWithAggregatesInput | PaymentHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PaymentHistory"> | string
    referenceId?: StringWithAggregatesFilter<"PaymentHistory"> | string
    telegramId?: StringWithAggregatesFilter<"PaymentHistory"> | string
    userId?: StringNullableWithAggregatesFilter<"PaymentHistory"> | string | null
    payerEmail?: StringNullableWithAggregatesFilter<"PaymentHistory"> | string | null
    amount?: FloatWithAggregatesFilter<"PaymentHistory"> | number
    paymentMethod?: StringNullableWithAggregatesFilter<"PaymentHistory"> | string | null
    status?: EnumPaymentStatusWithAggregatesFilter<"PaymentHistory"> | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeWithAggregatesFilter<"PaymentHistory"> | $Enums.PaymentType
    orderNo?: StringNullableWithAggregatesFilter<"PaymentHistory"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PaymentHistory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PaymentHistory"> | Date | string
  }

  export type TonHistoryWhereInput = {
    AND?: TonHistoryWhereInput | TonHistoryWhereInput[]
    OR?: TonHistoryWhereInput[]
    NOT?: TonHistoryWhereInput | TonHistoryWhereInput[]
    id?: StringFilter<"TonHistory"> | string
    hash?: StringFilter<"TonHistory"> | string
    nanoTon?: BigIntFilter<"TonHistory"> | bigint | number
    senderAddress?: StringFilter<"TonHistory"> | string
    createdAt?: DateTimeFilter<"TonHistory"> | Date | string
  }

  export type TonHistoryOrderByWithRelationInput = {
    id?: SortOrder
    hash?: SortOrder
    nanoTon?: SortOrder
    senderAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type TonHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    hash?: string
    AND?: TonHistoryWhereInput | TonHistoryWhereInput[]
    OR?: TonHistoryWhereInput[]
    NOT?: TonHistoryWhereInput | TonHistoryWhereInput[]
    nanoTon?: BigIntFilter<"TonHistory"> | bigint | number
    senderAddress?: StringFilter<"TonHistory"> | string
    createdAt?: DateTimeFilter<"TonHistory"> | Date | string
  }, "id" | "hash">

  export type TonHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    hash?: SortOrder
    nanoTon?: SortOrder
    senderAddress?: SortOrder
    createdAt?: SortOrder
    _count?: TonHistoryCountOrderByAggregateInput
    _avg?: TonHistoryAvgOrderByAggregateInput
    _max?: TonHistoryMaxOrderByAggregateInput
    _min?: TonHistoryMinOrderByAggregateInput
    _sum?: TonHistorySumOrderByAggregateInput
  }

  export type TonHistoryScalarWhereWithAggregatesInput = {
    AND?: TonHistoryScalarWhereWithAggregatesInput | TonHistoryScalarWhereWithAggregatesInput[]
    OR?: TonHistoryScalarWhereWithAggregatesInput[]
    NOT?: TonHistoryScalarWhereWithAggregatesInput | TonHistoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TonHistory"> | string
    hash?: StringWithAggregatesFilter<"TonHistory"> | string
    nanoTon?: BigIntWithAggregatesFilter<"TonHistory"> | bigint | number
    senderAddress?: StringWithAggregatesFilter<"TonHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"TonHistory"> | Date | string
  }

  export type BalanceCreateInput = {
    id?: string
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    User?: UserCreateNestedOneWithoutBalanceInput
  }

  export type BalanceUncheckedCreateInput = {
    id?: string
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
    User?: UserUncheckedCreateNestedOneWithoutBalanceInput
  }

  export type BalanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneWithoutBalanceNestedInput
  }

  export type BalanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUncheckedUpdateOneWithoutBalanceNestedInput
  }

  export type BalanceCreateManyInput = {
    id?: string
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BalanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    telegramId: string
    username: string
    fullName: string
    photoUrl?: string | null
    languageCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    balance: BalanceCreateNestedOneWithoutUserInput
    paymentHistory?: PaymentHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    telegramId: string
    username: string
    fullName: string
    photoUrl?: string | null
    languageCode?: string | null
    balanceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentHistory?: PaymentHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    balance?: BalanceUpdateOneRequiredWithoutUserNestedInput
    paymentHistory?: PaymentHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    balanceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentHistory?: PaymentHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    telegramId: string
    username: string
    fullName: string
    photoUrl?: string | null
    languageCode?: string | null
    balanceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    balanceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionCreateInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subRegions?: SubRegionCreateNestedManyWithoutRegionInput
    packages?: PackageCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subRegions?: SubRegionUncheckedCreateNestedManyWithoutRegionInput
    packages?: PackageUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subRegions?: SubRegionUpdateManyWithoutRegionNestedInput
    packages?: PackageUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subRegions?: SubRegionUncheckedUpdateManyWithoutRegionNestedInput
    packages?: PackageUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionCreateManyInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RegionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubRegionCreateInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    region: RegionCreateNestedOneWithoutSubRegionsInput
  }

  export type SubRegionUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    regionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubRegionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutSubRegionsNestedInput
  }

  export type SubRegionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    regionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubRegionCreateManyInput = {
    id?: string
    name: string
    code: string
    regionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubRegionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubRegionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    regionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageCreateInput = {
    id?: string
    name: string
    code: string
    duration: number
    durationUnit: string
    price: number
    data: string
    dataUnit: string
    pricePerData: number
    createdAt?: Date | string
    updatedAt?: Date | string
    region: RegionCreateNestedOneWithoutPackagesInput
  }

  export type PackageUncheckedCreateInput = {
    id?: string
    name: string
    code: string
    duration: number
    durationUnit: string
    price: number
    data: string
    dataUnit: string
    pricePerData: number
    regionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    data?: StringFieldUpdateOperationsInput | string
    dataUnit?: StringFieldUpdateOperationsInput | string
    pricePerData?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutPackagesNestedInput
  }

  export type PackageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    data?: StringFieldUpdateOperationsInput | string
    dataUnit?: StringFieldUpdateOperationsInput | string
    pricePerData?: FloatFieldUpdateOperationsInput | number
    regionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageCreateManyInput = {
    id?: string
    name: string
    code: string
    duration: number
    durationUnit: string
    price: number
    data: string
    dataUnit: string
    pricePerData: number
    regionId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    data?: StringFieldUpdateOperationsInput | string
    dataUnit?: StringFieldUpdateOperationsInput | string
    pricePerData?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    data?: StringFieldUpdateOperationsInput | string
    dataUnit?: StringFieldUpdateOperationsInput | string
    pricePerData?: FloatFieldUpdateOperationsInput | number
    regionId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EsimCreateInput = {
    id?: string
    telegramId: string
    imsi: string
    iccid: string
    ac: string
    shortUrl?: string
    totalDuration: number
    durationUnit: string
    status: string
    packageName: string
    packageCode: string
    remainingData: bigint | number
    expiredAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutEsimsInput
  }

  export type EsimUncheckedCreateInput = {
    id?: string
    telegramId: string
    imsi: string
    iccid: string
    ac: string
    shortUrl?: string
    totalDuration: number
    durationUnit: string
    status: string
    packageName: string
    packageCode: string
    remainingData: bigint | number
    orderNo: string
    expiredAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EsimUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    imsi?: StringFieldUpdateOperationsInput | string
    iccid?: StringFieldUpdateOperationsInput | string
    ac?: StringFieldUpdateOperationsInput | string
    shortUrl?: StringFieldUpdateOperationsInput | string
    totalDuration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    packageCode?: StringFieldUpdateOperationsInput | string
    remainingData?: BigIntFieldUpdateOperationsInput | bigint | number
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutEsimsNestedInput
  }

  export type EsimUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    imsi?: StringFieldUpdateOperationsInput | string
    iccid?: StringFieldUpdateOperationsInput | string
    ac?: StringFieldUpdateOperationsInput | string
    shortUrl?: StringFieldUpdateOperationsInput | string
    totalDuration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    packageCode?: StringFieldUpdateOperationsInput | string
    remainingData?: BigIntFieldUpdateOperationsInput | bigint | number
    orderNo?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EsimCreateManyInput = {
    id?: string
    telegramId: string
    imsi: string
    iccid: string
    ac: string
    shortUrl?: string
    totalDuration: number
    durationUnit: string
    status: string
    packageName: string
    packageCode: string
    remainingData: bigint | number
    orderNo: string
    expiredAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EsimUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    imsi?: StringFieldUpdateOperationsInput | string
    iccid?: StringFieldUpdateOperationsInput | string
    ac?: StringFieldUpdateOperationsInput | string
    shortUrl?: StringFieldUpdateOperationsInput | string
    totalDuration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    packageCode?: StringFieldUpdateOperationsInput | string
    remainingData?: BigIntFieldUpdateOperationsInput | bigint | number
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EsimUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    imsi?: StringFieldUpdateOperationsInput | string
    iccid?: StringFieldUpdateOperationsInput | string
    ac?: StringFieldUpdateOperationsInput | string
    shortUrl?: StringFieldUpdateOperationsInput | string
    totalDuration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    packageCode?: StringFieldUpdateOperationsInput | string
    remainingData?: BigIntFieldUpdateOperationsInput | bigint | number
    orderNo?: StringFieldUpdateOperationsInput | string
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    telegramId: string
    orderNo: string
    txId: string
    amount: number
    status: $Enums.OrderStatus
    paymentMethod?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    esims?: EsimCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    telegramId: string
    orderNo: string
    txId: string
    amount: number
    status: $Enums.OrderStatus
    paymentMethod?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    esims?: EsimUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    txId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    esims?: EsimUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    txId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    esims?: EsimUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    telegramId: string
    orderNo: string
    txId: string
    amount: number
    status: $Enums.OrderStatus
    paymentMethod?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    txId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    txId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentHistoryCreateInput = {
    id?: string
    referenceId?: string
    telegramId: string
    payerEmail?: string | null
    amount: number
    paymentMethod?: string | null
    status: $Enums.PaymentStatus
    paymentType: $Enums.PaymentType
    orderNo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutPaymentHistoryInput
  }

  export type PaymentHistoryUncheckedCreateInput = {
    id?: string
    referenceId?: string
    telegramId: string
    userId?: string | null
    payerEmail?: string | null
    amount: number
    paymentMethod?: string | null
    status: $Enums.PaymentStatus
    paymentType: $Enums.PaymentType
    orderNo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceId?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    orderNo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutPaymentHistoryNestedInput
  }

  export type PaymentHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceId?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    orderNo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentHistoryCreateManyInput = {
    id?: string
    referenceId?: string
    telegramId: string
    userId?: string | null
    payerEmail?: string | null
    amount: number
    paymentMethod?: string | null
    status: $Enums.PaymentStatus
    paymentType: $Enums.PaymentType
    orderNo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceId?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    orderNo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceId?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    orderNo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TonHistoryCreateInput = {
    id?: string
    hash: string
    nanoTon: bigint | number
    senderAddress: string
    createdAt?: Date | string
  }

  export type TonHistoryUncheckedCreateInput = {
    id?: string
    hash: string
    nanoTon: bigint | number
    senderAddress: string
    createdAt?: Date | string
  }

  export type TonHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    nanoTon?: BigIntFieldUpdateOperationsInput | bigint | number
    senderAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TonHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    nanoTon?: BigIntFieldUpdateOperationsInput | bigint | number
    senderAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TonHistoryCreateManyInput = {
    id?: string
    hash: string
    nanoTon: bigint | number
    senderAddress: string
    createdAt?: Date | string
  }

  export type TonHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    nanoTon?: BigIntFieldUpdateOperationsInput | bigint | number
    senderAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TonHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    hash?: StringFieldUpdateOperationsInput | string
    nanoTon?: BigIntFieldUpdateOperationsInput | bigint | number
    senderAddress?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type BalanceCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BalanceAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type BalanceMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BalanceMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BalanceSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BalanceScalarRelationFilter = {
    is?: BalanceWhereInput
    isNot?: BalanceWhereInput
  }

  export type PaymentHistoryListRelationFilter = {
    every?: PaymentHistoryWhereInput
    some?: PaymentHistoryWhereInput
    none?: PaymentHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PaymentHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    photoUrl?: SortOrder
    languageCode?: SortOrder
    balanceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    photoUrl?: SortOrder
    languageCode?: SortOrder
    balanceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    username?: SortOrder
    fullName?: SortOrder
    photoUrl?: SortOrder
    languageCode?: SortOrder
    balanceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type SubRegionListRelationFilter = {
    every?: SubRegionWhereInput
    some?: SubRegionWhereInput
    none?: SubRegionWhereInput
  }

  export type PackageListRelationFilter = {
    every?: PackageWhereInput
    some?: PackageWhereInput
    none?: PackageWhereInput
  }

  export type SubRegionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PackageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RegionScalarRelationFilter = {
    is?: RegionWhereInput
    isNot?: RegionWhereInput
  }

  export type SubRegionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubRegionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubRegionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PackageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    duration?: SortOrder
    durationUnit?: SortOrder
    price?: SortOrder
    data?: SortOrder
    dataUnit?: SortOrder
    pricePerData?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageAvgOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
    pricePerData?: SortOrder
  }

  export type PackageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    duration?: SortOrder
    durationUnit?: SortOrder
    price?: SortOrder
    data?: SortOrder
    dataUnit?: SortOrder
    pricePerData?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    duration?: SortOrder
    durationUnit?: SortOrder
    price?: SortOrder
    data?: SortOrder
    dataUnit?: SortOrder
    pricePerData?: SortOrder
    regionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PackageSumOrderByAggregateInput = {
    duration?: SortOrder
    price?: SortOrder
    pricePerData?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type EsimCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    imsi?: SortOrder
    iccid?: SortOrder
    ac?: SortOrder
    shortUrl?: SortOrder
    totalDuration?: SortOrder
    durationUnit?: SortOrder
    status?: SortOrder
    packageName?: SortOrder
    packageCode?: SortOrder
    remainingData?: SortOrder
    orderNo?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EsimAvgOrderByAggregateInput = {
    totalDuration?: SortOrder
    remainingData?: SortOrder
  }

  export type EsimMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    imsi?: SortOrder
    iccid?: SortOrder
    ac?: SortOrder
    shortUrl?: SortOrder
    totalDuration?: SortOrder
    durationUnit?: SortOrder
    status?: SortOrder
    packageName?: SortOrder
    packageCode?: SortOrder
    remainingData?: SortOrder
    orderNo?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EsimMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    imsi?: SortOrder
    iccid?: SortOrder
    ac?: SortOrder
    shortUrl?: SortOrder
    totalDuration?: SortOrder
    durationUnit?: SortOrder
    status?: SortOrder
    packageName?: SortOrder
    packageCode?: SortOrder
    remainingData?: SortOrder
    orderNo?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EsimSumOrderByAggregateInput = {
    totalDuration?: SortOrder
    remainingData?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type EsimListRelationFilter = {
    every?: EsimWhereInput
    some?: EsimWhereInput
    none?: EsimWhereInput
  }

  export type EsimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    orderNo?: SortOrder
    txId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    orderNo?: SortOrder
    txId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    telegramId?: SortOrder
    orderNo?: SortOrder
    txId?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    paymentMethod?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type EnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type PaymentHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    referenceId?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrder
    payerEmail?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentType?: SortOrder
    orderNo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentHistoryAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    referenceId?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrder
    payerEmail?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentType?: SortOrder
    orderNo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    referenceId?: SortOrder
    telegramId?: SortOrder
    userId?: SortOrder
    payerEmail?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    paymentType?: SortOrder
    orderNo?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentHistorySumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type EnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type TonHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    nanoTon?: SortOrder
    senderAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type TonHistoryAvgOrderByAggregateInput = {
    nanoTon?: SortOrder
  }

  export type TonHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    nanoTon?: SortOrder
    senderAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type TonHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    hash?: SortOrder
    nanoTon?: SortOrder
    senderAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type TonHistorySumOrderByAggregateInput = {
    nanoTon?: SortOrder
  }

  export type UserCreateNestedOneWithoutBalanceInput = {
    create?: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBalanceInput
    connect?: UserWhereUniqueInput
  }

  export type UserUncheckedCreateNestedOneWithoutBalanceInput = {
    create?: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBalanceInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneWithoutBalanceNestedInput = {
    create?: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBalanceInput
    upsert?: UserUpsertWithoutBalanceInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBalanceInput, UserUpdateWithoutBalanceInput>, UserUncheckedUpdateWithoutBalanceInput>
  }

  export type UserUncheckedUpdateOneWithoutBalanceNestedInput = {
    create?: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBalanceInput
    upsert?: UserUpsertWithoutBalanceInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBalanceInput, UserUpdateWithoutBalanceInput>, UserUncheckedUpdateWithoutBalanceInput>
  }

  export type BalanceCreateNestedOneWithoutUserInput = {
    create?: XOR<BalanceCreateWithoutUserInput, BalanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: BalanceCreateOrConnectWithoutUserInput
    connect?: BalanceWhereUniqueInput
  }

  export type PaymentHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentHistoryCreateWithoutUserInput, PaymentHistoryUncheckedCreateWithoutUserInput> | PaymentHistoryCreateWithoutUserInput[] | PaymentHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentHistoryCreateOrConnectWithoutUserInput | PaymentHistoryCreateOrConnectWithoutUserInput[]
    createMany?: PaymentHistoryCreateManyUserInputEnvelope
    connect?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
  }

  export type PaymentHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentHistoryCreateWithoutUserInput, PaymentHistoryUncheckedCreateWithoutUserInput> | PaymentHistoryCreateWithoutUserInput[] | PaymentHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentHistoryCreateOrConnectWithoutUserInput | PaymentHistoryCreateOrConnectWithoutUserInput[]
    createMany?: PaymentHistoryCreateManyUserInputEnvelope
    connect?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BalanceUpdateOneRequiredWithoutUserNestedInput = {
    create?: XOR<BalanceCreateWithoutUserInput, BalanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: BalanceCreateOrConnectWithoutUserInput
    upsert?: BalanceUpsertWithoutUserInput
    connect?: BalanceWhereUniqueInput
    update?: XOR<XOR<BalanceUpdateToOneWithWhereWithoutUserInput, BalanceUpdateWithoutUserInput>, BalanceUncheckedUpdateWithoutUserInput>
  }

  export type PaymentHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentHistoryCreateWithoutUserInput, PaymentHistoryUncheckedCreateWithoutUserInput> | PaymentHistoryCreateWithoutUserInput[] | PaymentHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentHistoryCreateOrConnectWithoutUserInput | PaymentHistoryCreateOrConnectWithoutUserInput[]
    upsert?: PaymentHistoryUpsertWithWhereUniqueWithoutUserInput | PaymentHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentHistoryCreateManyUserInputEnvelope
    set?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    disconnect?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    delete?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    connect?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    update?: PaymentHistoryUpdateWithWhereUniqueWithoutUserInput | PaymentHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentHistoryUpdateManyWithWhereWithoutUserInput | PaymentHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentHistoryScalarWhereInput | PaymentHistoryScalarWhereInput[]
  }

  export type PaymentHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentHistoryCreateWithoutUserInput, PaymentHistoryUncheckedCreateWithoutUserInput> | PaymentHistoryCreateWithoutUserInput[] | PaymentHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentHistoryCreateOrConnectWithoutUserInput | PaymentHistoryCreateOrConnectWithoutUserInput[]
    upsert?: PaymentHistoryUpsertWithWhereUniqueWithoutUserInput | PaymentHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentHistoryCreateManyUserInputEnvelope
    set?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    disconnect?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    delete?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    connect?: PaymentHistoryWhereUniqueInput | PaymentHistoryWhereUniqueInput[]
    update?: PaymentHistoryUpdateWithWhereUniqueWithoutUserInput | PaymentHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentHistoryUpdateManyWithWhereWithoutUserInput | PaymentHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentHistoryScalarWhereInput | PaymentHistoryScalarWhereInput[]
  }

  export type SubRegionCreateNestedManyWithoutRegionInput = {
    create?: XOR<SubRegionCreateWithoutRegionInput, SubRegionUncheckedCreateWithoutRegionInput> | SubRegionCreateWithoutRegionInput[] | SubRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SubRegionCreateOrConnectWithoutRegionInput | SubRegionCreateOrConnectWithoutRegionInput[]
    createMany?: SubRegionCreateManyRegionInputEnvelope
    connect?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
  }

  export type PackageCreateNestedManyWithoutRegionInput = {
    create?: XOR<PackageCreateWithoutRegionInput, PackageUncheckedCreateWithoutRegionInput> | PackageCreateWithoutRegionInput[] | PackageUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutRegionInput | PackageCreateOrConnectWithoutRegionInput[]
    createMany?: PackageCreateManyRegionInputEnvelope
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
  }

  export type SubRegionUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<SubRegionCreateWithoutRegionInput, SubRegionUncheckedCreateWithoutRegionInput> | SubRegionCreateWithoutRegionInput[] | SubRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SubRegionCreateOrConnectWithoutRegionInput | SubRegionCreateOrConnectWithoutRegionInput[]
    createMany?: SubRegionCreateManyRegionInputEnvelope
    connect?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
  }

  export type PackageUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<PackageCreateWithoutRegionInput, PackageUncheckedCreateWithoutRegionInput> | PackageCreateWithoutRegionInput[] | PackageUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutRegionInput | PackageCreateOrConnectWithoutRegionInput[]
    createMany?: PackageCreateManyRegionInputEnvelope
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
  }

  export type SubRegionUpdateManyWithoutRegionNestedInput = {
    create?: XOR<SubRegionCreateWithoutRegionInput, SubRegionUncheckedCreateWithoutRegionInput> | SubRegionCreateWithoutRegionInput[] | SubRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SubRegionCreateOrConnectWithoutRegionInput | SubRegionCreateOrConnectWithoutRegionInput[]
    upsert?: SubRegionUpsertWithWhereUniqueWithoutRegionInput | SubRegionUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: SubRegionCreateManyRegionInputEnvelope
    set?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    disconnect?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    delete?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    connect?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    update?: SubRegionUpdateWithWhereUniqueWithoutRegionInput | SubRegionUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: SubRegionUpdateManyWithWhereWithoutRegionInput | SubRegionUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: SubRegionScalarWhereInput | SubRegionScalarWhereInput[]
  }

  export type PackageUpdateManyWithoutRegionNestedInput = {
    create?: XOR<PackageCreateWithoutRegionInput, PackageUncheckedCreateWithoutRegionInput> | PackageCreateWithoutRegionInput[] | PackageUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutRegionInput | PackageCreateOrConnectWithoutRegionInput[]
    upsert?: PackageUpsertWithWhereUniqueWithoutRegionInput | PackageUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: PackageCreateManyRegionInputEnvelope
    set?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    disconnect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    delete?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    update?: PackageUpdateWithWhereUniqueWithoutRegionInput | PackageUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: PackageUpdateManyWithWhereWithoutRegionInput | PackageUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: PackageScalarWhereInput | PackageScalarWhereInput[]
  }

  export type SubRegionUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<SubRegionCreateWithoutRegionInput, SubRegionUncheckedCreateWithoutRegionInput> | SubRegionCreateWithoutRegionInput[] | SubRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SubRegionCreateOrConnectWithoutRegionInput | SubRegionCreateOrConnectWithoutRegionInput[]
    upsert?: SubRegionUpsertWithWhereUniqueWithoutRegionInput | SubRegionUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: SubRegionCreateManyRegionInputEnvelope
    set?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    disconnect?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    delete?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    connect?: SubRegionWhereUniqueInput | SubRegionWhereUniqueInput[]
    update?: SubRegionUpdateWithWhereUniqueWithoutRegionInput | SubRegionUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: SubRegionUpdateManyWithWhereWithoutRegionInput | SubRegionUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: SubRegionScalarWhereInput | SubRegionScalarWhereInput[]
  }

  export type PackageUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<PackageCreateWithoutRegionInput, PackageUncheckedCreateWithoutRegionInput> | PackageCreateWithoutRegionInput[] | PackageUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: PackageCreateOrConnectWithoutRegionInput | PackageCreateOrConnectWithoutRegionInput[]
    upsert?: PackageUpsertWithWhereUniqueWithoutRegionInput | PackageUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: PackageCreateManyRegionInputEnvelope
    set?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    disconnect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    delete?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    connect?: PackageWhereUniqueInput | PackageWhereUniqueInput[]
    update?: PackageUpdateWithWhereUniqueWithoutRegionInput | PackageUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: PackageUpdateManyWithWhereWithoutRegionInput | PackageUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: PackageScalarWhereInput | PackageScalarWhereInput[]
  }

  export type RegionCreateNestedOneWithoutSubRegionsInput = {
    create?: XOR<RegionCreateWithoutSubRegionsInput, RegionUncheckedCreateWithoutSubRegionsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutSubRegionsInput
    connect?: RegionWhereUniqueInput
  }

  export type RegionUpdateOneRequiredWithoutSubRegionsNestedInput = {
    create?: XOR<RegionCreateWithoutSubRegionsInput, RegionUncheckedCreateWithoutSubRegionsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutSubRegionsInput
    upsert?: RegionUpsertWithoutSubRegionsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutSubRegionsInput, RegionUpdateWithoutSubRegionsInput>, RegionUncheckedUpdateWithoutSubRegionsInput>
  }

  export type RegionCreateNestedOneWithoutPackagesInput = {
    create?: XOR<RegionCreateWithoutPackagesInput, RegionUncheckedCreateWithoutPackagesInput>
    connectOrCreate?: RegionCreateOrConnectWithoutPackagesInput
    connect?: RegionWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RegionUpdateOneRequiredWithoutPackagesNestedInput = {
    create?: XOR<RegionCreateWithoutPackagesInput, RegionUncheckedCreateWithoutPackagesInput>
    connectOrCreate?: RegionCreateOrConnectWithoutPackagesInput
    upsert?: RegionUpsertWithoutPackagesInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutPackagesInput, RegionUpdateWithoutPackagesInput>, RegionUncheckedUpdateWithoutPackagesInput>
  }

  export type OrderCreateNestedOneWithoutEsimsInput = {
    create?: XOR<OrderCreateWithoutEsimsInput, OrderUncheckedCreateWithoutEsimsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutEsimsInput
    connect?: OrderWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type OrderUpdateOneRequiredWithoutEsimsNestedInput = {
    create?: XOR<OrderCreateWithoutEsimsInput, OrderUncheckedCreateWithoutEsimsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutEsimsInput
    upsert?: OrderUpsertWithoutEsimsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutEsimsInput, OrderUpdateWithoutEsimsInput>, OrderUncheckedUpdateWithoutEsimsInput>
  }

  export type EsimCreateNestedManyWithoutOrderInput = {
    create?: XOR<EsimCreateWithoutOrderInput, EsimUncheckedCreateWithoutOrderInput> | EsimCreateWithoutOrderInput[] | EsimUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: EsimCreateOrConnectWithoutOrderInput | EsimCreateOrConnectWithoutOrderInput[]
    createMany?: EsimCreateManyOrderInputEnvelope
    connect?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
  }

  export type EsimUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<EsimCreateWithoutOrderInput, EsimUncheckedCreateWithoutOrderInput> | EsimCreateWithoutOrderInput[] | EsimUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: EsimCreateOrConnectWithoutOrderInput | EsimCreateOrConnectWithoutOrderInput[]
    createMany?: EsimCreateManyOrderInputEnvelope
    connect?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type EsimUpdateManyWithoutOrderNestedInput = {
    create?: XOR<EsimCreateWithoutOrderInput, EsimUncheckedCreateWithoutOrderInput> | EsimCreateWithoutOrderInput[] | EsimUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: EsimCreateOrConnectWithoutOrderInput | EsimCreateOrConnectWithoutOrderInput[]
    upsert?: EsimUpsertWithWhereUniqueWithoutOrderInput | EsimUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: EsimCreateManyOrderInputEnvelope
    set?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    disconnect?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    delete?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    connect?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    update?: EsimUpdateWithWhereUniqueWithoutOrderInput | EsimUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: EsimUpdateManyWithWhereWithoutOrderInput | EsimUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: EsimScalarWhereInput | EsimScalarWhereInput[]
  }

  export type EsimUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<EsimCreateWithoutOrderInput, EsimUncheckedCreateWithoutOrderInput> | EsimCreateWithoutOrderInput[] | EsimUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: EsimCreateOrConnectWithoutOrderInput | EsimCreateOrConnectWithoutOrderInput[]
    upsert?: EsimUpsertWithWhereUniqueWithoutOrderInput | EsimUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: EsimCreateManyOrderInputEnvelope
    set?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    disconnect?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    delete?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    connect?: EsimWhereUniqueInput | EsimWhereUniqueInput[]
    update?: EsimUpdateWithWhereUniqueWithoutOrderInput | EsimUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: EsimUpdateManyWithWhereWithoutOrderInput | EsimUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: EsimScalarWhereInput | EsimScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPaymentHistoryInput = {
    create?: XOR<UserCreateWithoutPaymentHistoryInput, UserUncheckedCreateWithoutPaymentHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type EnumPaymentTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentType
  }

  export type UserUpdateOneWithoutPaymentHistoryNestedInput = {
    create?: XOR<UserCreateWithoutPaymentHistoryInput, UserUncheckedCreateWithoutPaymentHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentHistoryInput
    upsert?: UserUpsertWithoutPaymentHistoryInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentHistoryInput, UserUpdateWithoutPaymentHistoryInput>, UserUncheckedUpdateWithoutPaymentHistoryInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeFilter<$PrismaModel> | $Enums.PaymentType
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentType | EnumPaymentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentType[] | ListEnumPaymentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentTypeWithAggregatesFilter<$PrismaModel> | $Enums.PaymentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentTypeFilter<$PrismaModel>
    _max?: NestedEnumPaymentTypeFilter<$PrismaModel>
  }

  export type UserCreateWithoutBalanceInput = {
    id?: string
    telegramId: string
    username: string
    fullName: string
    photoUrl?: string | null
    languageCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentHistory?: PaymentHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBalanceInput = {
    id?: string
    telegramId: string
    username: string
    fullName: string
    photoUrl?: string | null
    languageCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    paymentHistory?: PaymentHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBalanceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
  }

  export type UserUpsertWithoutBalanceInput = {
    update: XOR<UserUpdateWithoutBalanceInput, UserUncheckedUpdateWithoutBalanceInput>
    create: XOR<UserCreateWithoutBalanceInput, UserUncheckedCreateWithoutBalanceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBalanceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBalanceInput, UserUncheckedUpdateWithoutBalanceInput>
  }

  export type UserUpdateWithoutBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentHistory?: PaymentHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBalanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentHistory?: PaymentHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BalanceCreateWithoutUserInput = {
    id?: string
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BalanceUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BalanceCreateOrConnectWithoutUserInput = {
    where: BalanceWhereUniqueInput
    create: XOR<BalanceCreateWithoutUserInput, BalanceUncheckedCreateWithoutUserInput>
  }

  export type PaymentHistoryCreateWithoutUserInput = {
    id?: string
    referenceId?: string
    telegramId: string
    payerEmail?: string | null
    amount: number
    paymentMethod?: string | null
    status: $Enums.PaymentStatus
    paymentType: $Enums.PaymentType
    orderNo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    referenceId?: string
    telegramId: string
    payerEmail?: string | null
    amount: number
    paymentMethod?: string | null
    status: $Enums.PaymentStatus
    paymentType: $Enums.PaymentType
    orderNo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentHistoryCreateOrConnectWithoutUserInput = {
    where: PaymentHistoryWhereUniqueInput
    create: XOR<PaymentHistoryCreateWithoutUserInput, PaymentHistoryUncheckedCreateWithoutUserInput>
  }

  export type PaymentHistoryCreateManyUserInputEnvelope = {
    data: PaymentHistoryCreateManyUserInput | PaymentHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BalanceUpsertWithoutUserInput = {
    update: XOR<BalanceUpdateWithoutUserInput, BalanceUncheckedUpdateWithoutUserInput>
    create: XOR<BalanceCreateWithoutUserInput, BalanceUncheckedCreateWithoutUserInput>
    where?: BalanceWhereInput
  }

  export type BalanceUpdateToOneWithWhereWithoutUserInput = {
    where?: BalanceWhereInput
    data: XOR<BalanceUpdateWithoutUserInput, BalanceUncheckedUpdateWithoutUserInput>
  }

  export type BalanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BalanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentHistoryWhereUniqueInput
    update: XOR<PaymentHistoryUpdateWithoutUserInput, PaymentHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentHistoryCreateWithoutUserInput, PaymentHistoryUncheckedCreateWithoutUserInput>
  }

  export type PaymentHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentHistoryWhereUniqueInput
    data: XOR<PaymentHistoryUpdateWithoutUserInput, PaymentHistoryUncheckedUpdateWithoutUserInput>
  }

  export type PaymentHistoryUpdateManyWithWhereWithoutUserInput = {
    where: PaymentHistoryScalarWhereInput
    data: XOR<PaymentHistoryUpdateManyMutationInput, PaymentHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentHistoryScalarWhereInput = {
    AND?: PaymentHistoryScalarWhereInput | PaymentHistoryScalarWhereInput[]
    OR?: PaymentHistoryScalarWhereInput[]
    NOT?: PaymentHistoryScalarWhereInput | PaymentHistoryScalarWhereInput[]
    id?: StringFilter<"PaymentHistory"> | string
    referenceId?: StringFilter<"PaymentHistory"> | string
    telegramId?: StringFilter<"PaymentHistory"> | string
    userId?: StringNullableFilter<"PaymentHistory"> | string | null
    payerEmail?: StringNullableFilter<"PaymentHistory"> | string | null
    amount?: FloatFilter<"PaymentHistory"> | number
    paymentMethod?: StringNullableFilter<"PaymentHistory"> | string | null
    status?: EnumPaymentStatusFilter<"PaymentHistory"> | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFilter<"PaymentHistory"> | $Enums.PaymentType
    orderNo?: StringNullableFilter<"PaymentHistory"> | string | null
    createdAt?: DateTimeFilter<"PaymentHistory"> | Date | string
    updatedAt?: DateTimeFilter<"PaymentHistory"> | Date | string
  }

  export type SubRegionCreateWithoutRegionInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubRegionUncheckedCreateWithoutRegionInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubRegionCreateOrConnectWithoutRegionInput = {
    where: SubRegionWhereUniqueInput
    create: XOR<SubRegionCreateWithoutRegionInput, SubRegionUncheckedCreateWithoutRegionInput>
  }

  export type SubRegionCreateManyRegionInputEnvelope = {
    data: SubRegionCreateManyRegionInput | SubRegionCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type PackageCreateWithoutRegionInput = {
    id?: string
    name: string
    code: string
    duration: number
    durationUnit: string
    price: number
    data: string
    dataUnit: string
    pricePerData: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageUncheckedCreateWithoutRegionInput = {
    id?: string
    name: string
    code: string
    duration: number
    durationUnit: string
    price: number
    data: string
    dataUnit: string
    pricePerData: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageCreateOrConnectWithoutRegionInput = {
    where: PackageWhereUniqueInput
    create: XOR<PackageCreateWithoutRegionInput, PackageUncheckedCreateWithoutRegionInput>
  }

  export type PackageCreateManyRegionInputEnvelope = {
    data: PackageCreateManyRegionInput | PackageCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type SubRegionUpsertWithWhereUniqueWithoutRegionInput = {
    where: SubRegionWhereUniqueInput
    update: XOR<SubRegionUpdateWithoutRegionInput, SubRegionUncheckedUpdateWithoutRegionInput>
    create: XOR<SubRegionCreateWithoutRegionInput, SubRegionUncheckedCreateWithoutRegionInput>
  }

  export type SubRegionUpdateWithWhereUniqueWithoutRegionInput = {
    where: SubRegionWhereUniqueInput
    data: XOR<SubRegionUpdateWithoutRegionInput, SubRegionUncheckedUpdateWithoutRegionInput>
  }

  export type SubRegionUpdateManyWithWhereWithoutRegionInput = {
    where: SubRegionScalarWhereInput
    data: XOR<SubRegionUpdateManyMutationInput, SubRegionUncheckedUpdateManyWithoutRegionInput>
  }

  export type SubRegionScalarWhereInput = {
    AND?: SubRegionScalarWhereInput | SubRegionScalarWhereInput[]
    OR?: SubRegionScalarWhereInput[]
    NOT?: SubRegionScalarWhereInput | SubRegionScalarWhereInput[]
    id?: StringFilter<"SubRegion"> | string
    name?: StringFilter<"SubRegion"> | string
    code?: StringFilter<"SubRegion"> | string
    regionId?: StringFilter<"SubRegion"> | string
    createdAt?: DateTimeFilter<"SubRegion"> | Date | string
    updatedAt?: DateTimeFilter<"SubRegion"> | Date | string
  }

  export type PackageUpsertWithWhereUniqueWithoutRegionInput = {
    where: PackageWhereUniqueInput
    update: XOR<PackageUpdateWithoutRegionInput, PackageUncheckedUpdateWithoutRegionInput>
    create: XOR<PackageCreateWithoutRegionInput, PackageUncheckedCreateWithoutRegionInput>
  }

  export type PackageUpdateWithWhereUniqueWithoutRegionInput = {
    where: PackageWhereUniqueInput
    data: XOR<PackageUpdateWithoutRegionInput, PackageUncheckedUpdateWithoutRegionInput>
  }

  export type PackageUpdateManyWithWhereWithoutRegionInput = {
    where: PackageScalarWhereInput
    data: XOR<PackageUpdateManyMutationInput, PackageUncheckedUpdateManyWithoutRegionInput>
  }

  export type PackageScalarWhereInput = {
    AND?: PackageScalarWhereInput | PackageScalarWhereInput[]
    OR?: PackageScalarWhereInput[]
    NOT?: PackageScalarWhereInput | PackageScalarWhereInput[]
    id?: StringFilter<"Package"> | string
    name?: StringFilter<"Package"> | string
    code?: StringFilter<"Package"> | string
    duration?: IntFilter<"Package"> | number
    durationUnit?: StringFilter<"Package"> | string
    price?: FloatFilter<"Package"> | number
    data?: StringFilter<"Package"> | string
    dataUnit?: StringFilter<"Package"> | string
    pricePerData?: FloatFilter<"Package"> | number
    regionId?: StringFilter<"Package"> | string
    createdAt?: DateTimeFilter<"Package"> | Date | string
    updatedAt?: DateTimeFilter<"Package"> | Date | string
  }

  export type RegionCreateWithoutSubRegionsInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    packages?: PackageCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutSubRegionsInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    packages?: PackageUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutSubRegionsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutSubRegionsInput, RegionUncheckedCreateWithoutSubRegionsInput>
  }

  export type RegionUpsertWithoutSubRegionsInput = {
    update: XOR<RegionUpdateWithoutSubRegionsInput, RegionUncheckedUpdateWithoutSubRegionsInput>
    create: XOR<RegionCreateWithoutSubRegionsInput, RegionUncheckedCreateWithoutSubRegionsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutSubRegionsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutSubRegionsInput, RegionUncheckedUpdateWithoutSubRegionsInput>
  }

  export type RegionUpdateWithoutSubRegionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packages?: PackageUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutSubRegionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    packages?: PackageUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionCreateWithoutPackagesInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subRegions?: SubRegionCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutPackagesInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subRegions?: SubRegionUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutPackagesInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutPackagesInput, RegionUncheckedCreateWithoutPackagesInput>
  }

  export type RegionUpsertWithoutPackagesInput = {
    update: XOR<RegionUpdateWithoutPackagesInput, RegionUncheckedUpdateWithoutPackagesInput>
    create: XOR<RegionCreateWithoutPackagesInput, RegionUncheckedCreateWithoutPackagesInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutPackagesInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutPackagesInput, RegionUncheckedUpdateWithoutPackagesInput>
  }

  export type RegionUpdateWithoutPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subRegions?: SubRegionUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutPackagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subRegions?: SubRegionUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type OrderCreateWithoutEsimsInput = {
    id?: string
    telegramId: string
    orderNo: string
    txId: string
    amount: number
    status: $Enums.OrderStatus
    paymentMethod?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUncheckedCreateWithoutEsimsInput = {
    id?: string
    telegramId: string
    orderNo: string
    txId: string
    amount: number
    status: $Enums.OrderStatus
    paymentMethod?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutEsimsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutEsimsInput, OrderUncheckedCreateWithoutEsimsInput>
  }

  export type OrderUpsertWithoutEsimsInput = {
    update: XOR<OrderUpdateWithoutEsimsInput, OrderUncheckedUpdateWithoutEsimsInput>
    create: XOR<OrderCreateWithoutEsimsInput, OrderUncheckedCreateWithoutEsimsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutEsimsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutEsimsInput, OrderUncheckedUpdateWithoutEsimsInput>
  }

  export type OrderUpdateWithoutEsimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    txId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateWithoutEsimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    orderNo?: StringFieldUpdateOperationsInput | string
    txId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EsimCreateWithoutOrderInput = {
    id?: string
    telegramId: string
    imsi: string
    iccid: string
    ac: string
    shortUrl?: string
    totalDuration: number
    durationUnit: string
    status: string
    packageName: string
    packageCode: string
    remainingData: bigint | number
    expiredAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EsimUncheckedCreateWithoutOrderInput = {
    id?: string
    telegramId: string
    imsi: string
    iccid: string
    ac: string
    shortUrl?: string
    totalDuration: number
    durationUnit: string
    status: string
    packageName: string
    packageCode: string
    remainingData: bigint | number
    expiredAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EsimCreateOrConnectWithoutOrderInput = {
    where: EsimWhereUniqueInput
    create: XOR<EsimCreateWithoutOrderInput, EsimUncheckedCreateWithoutOrderInput>
  }

  export type EsimCreateManyOrderInputEnvelope = {
    data: EsimCreateManyOrderInput | EsimCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type EsimUpsertWithWhereUniqueWithoutOrderInput = {
    where: EsimWhereUniqueInput
    update: XOR<EsimUpdateWithoutOrderInput, EsimUncheckedUpdateWithoutOrderInput>
    create: XOR<EsimCreateWithoutOrderInput, EsimUncheckedCreateWithoutOrderInput>
  }

  export type EsimUpdateWithWhereUniqueWithoutOrderInput = {
    where: EsimWhereUniqueInput
    data: XOR<EsimUpdateWithoutOrderInput, EsimUncheckedUpdateWithoutOrderInput>
  }

  export type EsimUpdateManyWithWhereWithoutOrderInput = {
    where: EsimScalarWhereInput
    data: XOR<EsimUpdateManyMutationInput, EsimUncheckedUpdateManyWithoutOrderInput>
  }

  export type EsimScalarWhereInput = {
    AND?: EsimScalarWhereInput | EsimScalarWhereInput[]
    OR?: EsimScalarWhereInput[]
    NOT?: EsimScalarWhereInput | EsimScalarWhereInput[]
    id?: StringFilter<"Esim"> | string
    telegramId?: StringFilter<"Esim"> | string
    imsi?: StringFilter<"Esim"> | string
    iccid?: StringFilter<"Esim"> | string
    ac?: StringFilter<"Esim"> | string
    shortUrl?: StringFilter<"Esim"> | string
    totalDuration?: IntFilter<"Esim"> | number
    durationUnit?: StringFilter<"Esim"> | string
    status?: StringFilter<"Esim"> | string
    packageName?: StringFilter<"Esim"> | string
    packageCode?: StringFilter<"Esim"> | string
    remainingData?: BigIntFilter<"Esim"> | bigint | number
    orderNo?: StringFilter<"Esim"> | string
    expiredAt?: DateTimeFilter<"Esim"> | Date | string
    createdAt?: DateTimeFilter<"Esim"> | Date | string
    updatedAt?: DateTimeFilter<"Esim"> | Date | string
  }

  export type UserCreateWithoutPaymentHistoryInput = {
    id?: string
    telegramId: string
    username: string
    fullName: string
    photoUrl?: string | null
    languageCode?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    balance: BalanceCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentHistoryInput = {
    id?: string
    telegramId: string
    username: string
    fullName: string
    photoUrl?: string | null
    languageCode?: string | null
    balanceId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutPaymentHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentHistoryInput, UserUncheckedCreateWithoutPaymentHistoryInput>
  }

  export type UserUpsertWithoutPaymentHistoryInput = {
    update: XOR<UserUpdateWithoutPaymentHistoryInput, UserUncheckedUpdateWithoutPaymentHistoryInput>
    create: XOR<UserCreateWithoutPaymentHistoryInput, UserUncheckedCreateWithoutPaymentHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentHistoryInput, UserUncheckedUpdateWithoutPaymentHistoryInput>
  }

  export type UserUpdateWithoutPaymentHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    balance?: BalanceUpdateOneRequiredWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    languageCode?: NullableStringFieldUpdateOperationsInput | string | null
    balanceId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentHistoryCreateManyUserInput = {
    id?: string
    referenceId?: string
    telegramId: string
    payerEmail?: string | null
    amount: number
    paymentMethod?: string | null
    status: $Enums.PaymentStatus
    paymentType: $Enums.PaymentType
    orderNo?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceId?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    orderNo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceId?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    orderNo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    referenceId?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    payerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentType?: EnumPaymentTypeFieldUpdateOperationsInput | $Enums.PaymentType
    orderNo?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubRegionCreateManyRegionInput = {
    id?: string
    name: string
    code: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PackageCreateManyRegionInput = {
    id?: string
    name: string
    code: string
    duration: number
    durationUnit: string
    price: number
    data: string
    dataUnit: string
    pricePerData: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubRegionUpdateWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubRegionUncheckedUpdateWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubRegionUncheckedUpdateManyWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUpdateWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    data?: StringFieldUpdateOperationsInput | string
    dataUnit?: StringFieldUpdateOperationsInput | string
    pricePerData?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUncheckedUpdateWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    data?: StringFieldUpdateOperationsInput | string
    dataUnit?: StringFieldUpdateOperationsInput | string
    pricePerData?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PackageUncheckedUpdateManyWithoutRegionInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    data?: StringFieldUpdateOperationsInput | string
    dataUnit?: StringFieldUpdateOperationsInput | string
    pricePerData?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EsimCreateManyOrderInput = {
    id?: string
    telegramId: string
    imsi: string
    iccid: string
    ac: string
    shortUrl?: string
    totalDuration: number
    durationUnit: string
    status: string
    packageName: string
    packageCode: string
    remainingData: bigint | number
    expiredAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EsimUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    imsi?: StringFieldUpdateOperationsInput | string
    iccid?: StringFieldUpdateOperationsInput | string
    ac?: StringFieldUpdateOperationsInput | string
    shortUrl?: StringFieldUpdateOperationsInput | string
    totalDuration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    packageCode?: StringFieldUpdateOperationsInput | string
    remainingData?: BigIntFieldUpdateOperationsInput | bigint | number
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EsimUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    imsi?: StringFieldUpdateOperationsInput | string
    iccid?: StringFieldUpdateOperationsInput | string
    ac?: StringFieldUpdateOperationsInput | string
    shortUrl?: StringFieldUpdateOperationsInput | string
    totalDuration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    packageCode?: StringFieldUpdateOperationsInput | string
    remainingData?: BigIntFieldUpdateOperationsInput | bigint | number
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EsimUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    telegramId?: StringFieldUpdateOperationsInput | string
    imsi?: StringFieldUpdateOperationsInput | string
    iccid?: StringFieldUpdateOperationsInput | string
    ac?: StringFieldUpdateOperationsInput | string
    shortUrl?: StringFieldUpdateOperationsInput | string
    totalDuration?: IntFieldUpdateOperationsInput | number
    durationUnit?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    packageName?: StringFieldUpdateOperationsInput | string
    packageCode?: StringFieldUpdateOperationsInput | string
    remainingData?: BigIntFieldUpdateOperationsInput | bigint | number
    expiredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
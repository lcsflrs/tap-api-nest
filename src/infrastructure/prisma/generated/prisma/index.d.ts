
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Payout
 * 
 */
export type Payout = $Result.DefaultSelection<Prisma.$PayoutPayload>
/**
 * Model PayoutItem
 * 
 */
export type PayoutItem = $Result.DefaultSelection<Prisma.$PayoutItemPayload>
/**
 * Model Adjustment
 * 
 */
export type Adjustment = $Result.DefaultSelection<Prisma.$AdjustmentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AdjustmentType: {
  CREDIT: 'CREDIT',
  DEBIT: 'DEBIT'
};

export type AdjustmentType = (typeof AdjustmentType)[keyof typeof AdjustmentType]

}

export type AdjustmentType = $Enums.AdjustmentType

export const AdjustmentType: typeof $Enums.AdjustmentType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Payouts
 * const payouts = await prisma.payout.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * // Fetch zero or more Payouts
   * const payouts = await prisma.payout.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * `prisma.payout`: Exposes CRUD operations for the **Payout** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payouts
    * const payouts = await prisma.payout.findMany()
    * ```
    */
  get payout(): Prisma.PayoutDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payoutItem`: Exposes CRUD operations for the **PayoutItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PayoutItems
    * const payoutItems = await prisma.payoutItem.findMany()
    * ```
    */
  get payoutItem(): Prisma.PayoutItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adjustment`: Exposes CRUD operations for the **Adjustment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Adjustments
    * const adjustments = await prisma.adjustment.findMany()
    * ```
    */
  get adjustment(): Prisma.AdjustmentDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.1.0
   * Query Engine version: ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Payout: 'Payout',
    PayoutItem: 'PayoutItem',
    Adjustment: 'Adjustment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "payout" | "payoutItem" | "adjustment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Payout: {
        payload: Prisma.$PayoutPayload<ExtArgs>
        fields: Prisma.PayoutFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findFirst: {
            args: Prisma.PayoutFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          findMany: {
            args: Prisma.PayoutFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>[]
          }
          create: {
            args: Prisma.PayoutCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          createMany: {
            args: Prisma.PayoutCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PayoutDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          update: {
            args: Prisma.PayoutUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          deleteMany: {
            args: Prisma.PayoutDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PayoutUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutPayload>
          }
          aggregate: {
            args: Prisma.PayoutAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayout>
          }
          groupBy: {
            args: Prisma.PayoutGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutCountAggregateOutputType> | number
          }
        }
      }
      PayoutItem: {
        payload: Prisma.$PayoutItemPayload<ExtArgs>
        fields: Prisma.PayoutItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PayoutItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PayoutItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload>
          }
          findFirst: {
            args: Prisma.PayoutItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PayoutItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload>
          }
          findMany: {
            args: Prisma.PayoutItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload>[]
          }
          create: {
            args: Prisma.PayoutItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload>
          }
          createMany: {
            args: Prisma.PayoutItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PayoutItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload>
          }
          update: {
            args: Prisma.PayoutItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload>
          }
          deleteMany: {
            args: Prisma.PayoutItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PayoutItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PayoutItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PayoutItemPayload>
          }
          aggregate: {
            args: Prisma.PayoutItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayoutItem>
          }
          groupBy: {
            args: Prisma.PayoutItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PayoutItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PayoutItemCountArgs<ExtArgs>
            result: $Utils.Optional<PayoutItemCountAggregateOutputType> | number
          }
        }
      }
      Adjustment: {
        payload: Prisma.$AdjustmentPayload<ExtArgs>
        fields: Prisma.AdjustmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdjustmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdjustmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          findFirst: {
            args: Prisma.AdjustmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdjustmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          findMany: {
            args: Prisma.AdjustmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>[]
          }
          create: {
            args: Prisma.AdjustmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          createMany: {
            args: Prisma.AdjustmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AdjustmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          update: {
            args: Prisma.AdjustmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          deleteMany: {
            args: Prisma.AdjustmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdjustmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdjustmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjustmentPayload>
          }
          aggregate: {
            args: Prisma.AdjustmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdjustment>
          }
          groupBy: {
            args: Prisma.AdjustmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdjustmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdjustmentCountArgs<ExtArgs>
            result: $Utils.Optional<AdjustmentCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    payout?: PayoutOmit
    payoutItem?: PayoutItemOmit
    adjustment?: AdjustmentOmit
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
   * Count Type PayoutCountOutputType
   */

  export type PayoutCountOutputType = {
    items: number
  }

  export type PayoutCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | PayoutCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * PayoutCountOutputType without action
   */
  export type PayoutCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutCountOutputType
     */
    select?: PayoutCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PayoutCountOutputType without action
   */
  export type PayoutCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Payout
   */

  export type AggregatePayout = {
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  export type PayoutAvgAggregateOutputType = {
    grossInCents: number | null
    feeInCents: number | null
    netInCents: number | null
  }

  export type PayoutSumAggregateOutputType = {
    grossInCents: number | null
    feeInCents: number | null
    netInCents: number | null
  }

  export type PayoutMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    grossInCents: number | null
    feeInCents: number | null
    netInCents: number | null
    status: string | null
    paidAt: Date | null
    proofFileUrl: string | null
    payoutDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PayoutMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    grossInCents: number | null
    feeInCents: number | null
    netInCents: number | null
    status: string | null
    paidAt: Date | null
    proofFileUrl: string | null
    payoutDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PayoutCountAggregateOutputType = {
    id: number
    clientId: number
    grossInCents: number
    feeInCents: number
    netInCents: number
    status: number
    paidAt: number
    proofFileUrl: number
    payoutDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PayoutAvgAggregateInputType = {
    grossInCents?: true
    feeInCents?: true
    netInCents?: true
  }

  export type PayoutSumAggregateInputType = {
    grossInCents?: true
    feeInCents?: true
    netInCents?: true
  }

  export type PayoutMinAggregateInputType = {
    id?: true
    clientId?: true
    grossInCents?: true
    feeInCents?: true
    netInCents?: true
    status?: true
    paidAt?: true
    proofFileUrl?: true
    payoutDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PayoutMaxAggregateInputType = {
    id?: true
    clientId?: true
    grossInCents?: true
    feeInCents?: true
    netInCents?: true
    status?: true
    paidAt?: true
    proofFileUrl?: true
    payoutDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PayoutCountAggregateInputType = {
    id?: true
    clientId?: true
    grossInCents?: true
    feeInCents?: true
    netInCents?: true
    status?: true
    paidAt?: true
    proofFileUrl?: true
    payoutDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PayoutAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payout to aggregate.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payouts
    **/
    _count?: true | PayoutCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutMaxAggregateInputType
  }

  export type GetPayoutAggregateType<T extends PayoutAggregateArgs> = {
        [P in keyof T & keyof AggregatePayout]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayout[P]>
      : GetScalarType<T[P], AggregatePayout[P]>
  }




  export type PayoutGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutWhereInput
    orderBy?: PayoutOrderByWithAggregationInput | PayoutOrderByWithAggregationInput[]
    by: PayoutScalarFieldEnum[] | PayoutScalarFieldEnum
    having?: PayoutScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutCountAggregateInputType | true
    _avg?: PayoutAvgAggregateInputType
    _sum?: PayoutSumAggregateInputType
    _min?: PayoutMinAggregateInputType
    _max?: PayoutMaxAggregateInputType
  }

  export type PayoutGroupByOutputType = {
    id: string
    clientId: string
    grossInCents: number
    feeInCents: number
    netInCents: number
    status: string
    paidAt: Date | null
    proofFileUrl: string | null
    payoutDate: Date
    createdAt: Date
    updatedAt: Date
    _count: PayoutCountAggregateOutputType | null
    _avg: PayoutAvgAggregateOutputType | null
    _sum: PayoutSumAggregateOutputType | null
    _min: PayoutMinAggregateOutputType | null
    _max: PayoutMaxAggregateOutputType | null
  }

  type GetPayoutGroupByPayload<T extends PayoutGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutGroupByOutputType[P]>
        }
      >
    >


  export type PayoutSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    grossInCents?: boolean
    feeInCents?: boolean
    netInCents?: boolean
    status?: boolean
    paidAt?: boolean
    proofFileUrl?: boolean
    payoutDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | Payout$itemsArgs<ExtArgs>
    _count?: boolean | PayoutCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payout"]>



  export type PayoutSelectScalar = {
    id?: boolean
    clientId?: boolean
    grossInCents?: boolean
    feeInCents?: boolean
    netInCents?: boolean
    status?: boolean
    paidAt?: boolean
    proofFileUrl?: boolean
    payoutDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PayoutOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "grossInCents" | "feeInCents" | "netInCents" | "status" | "paidAt" | "proofFileUrl" | "payoutDate" | "createdAt" | "updatedAt", ExtArgs["result"]["payout"]>
  export type PayoutInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Payout$itemsArgs<ExtArgs>
    _count?: boolean | PayoutCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PayoutPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payout"
    objects: {
      items: Prisma.$PayoutItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      grossInCents: number
      feeInCents: number
      netInCents: number
      status: string
      paidAt: Date | null
      proofFileUrl: string | null
      payoutDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payout"]>
    composites: {}
  }

  type PayoutGetPayload<S extends boolean | null | undefined | PayoutDefaultArgs> = $Result.GetResult<Prisma.$PayoutPayload, S>

  type PayoutCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayoutFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayoutCountAggregateInputType | true
    }

  export interface PayoutDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payout'], meta: { name: 'Payout' } }
    /**
     * Find zero or one Payout that matches the filter.
     * @param {PayoutFindUniqueArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutFindUniqueArgs>(args: SelectSubset<T, PayoutFindUniqueArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payout that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoutFindUniqueOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutFindFirstArgs>(args?: SelectSubset<T, PayoutFindFirstArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payout that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindFirstOrThrowArgs} args - Arguments to find a Payout
     * @example
     * // Get one Payout
     * const payout = await prisma.payout.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payouts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payouts
     * const payouts = await prisma.payout.findMany()
     * 
     * // Get first 10 Payouts
     * const payouts = await prisma.payout.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutWithIdOnly = await prisma.payout.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutFindManyArgs>(args?: SelectSubset<T, PayoutFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payout.
     * @param {PayoutCreateArgs} args - Arguments to create a Payout.
     * @example
     * // Create one Payout
     * const Payout = await prisma.payout.create({
     *   data: {
     *     // ... data to create a Payout
     *   }
     * })
     * 
     */
    create<T extends PayoutCreateArgs>(args: SelectSubset<T, PayoutCreateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payouts.
     * @param {PayoutCreateManyArgs} args - Arguments to create many Payouts.
     * @example
     * // Create many Payouts
     * const payout = await prisma.payout.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutCreateManyArgs>(args?: SelectSubset<T, PayoutCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Payout.
     * @param {PayoutDeleteArgs} args - Arguments to delete one Payout.
     * @example
     * // Delete one Payout
     * const Payout = await prisma.payout.delete({
     *   where: {
     *     // ... filter to delete one Payout
     *   }
     * })
     * 
     */
    delete<T extends PayoutDeleteArgs>(args: SelectSubset<T, PayoutDeleteArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payout.
     * @param {PayoutUpdateArgs} args - Arguments to update one Payout.
     * @example
     * // Update one Payout
     * const payout = await prisma.payout.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutUpdateArgs>(args: SelectSubset<T, PayoutUpdateArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payouts.
     * @param {PayoutDeleteManyArgs} args - Arguments to filter Payouts to delete.
     * @example
     * // Delete a few Payouts
     * const { count } = await prisma.payout.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutDeleteManyArgs>(args?: SelectSubset<T, PayoutDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payouts
     * const payout = await prisma.payout.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutUpdateManyArgs>(args: SelectSubset<T, PayoutUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payout.
     * @param {PayoutUpsertArgs} args - Arguments to update or create a Payout.
     * @example
     * // Update or create a Payout
     * const payout = await prisma.payout.upsert({
     *   create: {
     *     // ... data to create a Payout
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payout we want to update
     *   }
     * })
     */
    upsert<T extends PayoutUpsertArgs>(args: SelectSubset<T, PayoutUpsertArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payouts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutCountArgs} args - Arguments to filter Payouts to count.
     * @example
     * // Count the number of Payouts
     * const count = await prisma.payout.count({
     *   where: {
     *     // ... the filter for the Payouts we want to count
     *   }
     * })
    **/
    count<T extends PayoutCountArgs>(
      args?: Subset<T, PayoutCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayoutAggregateArgs>(args: Subset<T, PayoutAggregateArgs>): Prisma.PrismaPromise<GetPayoutAggregateType<T>>

    /**
     * Group by Payout.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutGroupByArgs} args - Group by arguments.
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
      T extends PayoutGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutGroupByArgs['orderBy'] }
        : { orderBy?: PayoutGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayoutGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payout model
   */
  readonly fields: PayoutFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payout.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Payout$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Payout$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Payout model
   */
  interface PayoutFieldRefs {
    readonly id: FieldRef<"Payout", 'String'>
    readonly clientId: FieldRef<"Payout", 'String'>
    readonly grossInCents: FieldRef<"Payout", 'Int'>
    readonly feeInCents: FieldRef<"Payout", 'Int'>
    readonly netInCents: FieldRef<"Payout", 'Int'>
    readonly status: FieldRef<"Payout", 'String'>
    readonly paidAt: FieldRef<"Payout", 'DateTime'>
    readonly proofFileUrl: FieldRef<"Payout", 'String'>
    readonly payoutDate: FieldRef<"Payout", 'DateTime'>
    readonly createdAt: FieldRef<"Payout", 'DateTime'>
    readonly updatedAt: FieldRef<"Payout", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payout findUnique
   */
  export type PayoutFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findUniqueOrThrow
   */
  export type PayoutFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout findFirst
   */
  export type PayoutFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findFirstOrThrow
   */
  export type PayoutFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payout to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payouts.
     */
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout findMany
   */
  export type PayoutFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter, which Payouts to fetch.
     */
    where?: PayoutWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payouts to fetch.
     */
    orderBy?: PayoutOrderByWithRelationInput | PayoutOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payouts.
     */
    cursor?: PayoutWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payouts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payouts.
     */
    skip?: number
    distinct?: PayoutScalarFieldEnum | PayoutScalarFieldEnum[]
  }

  /**
   * Payout create
   */
  export type PayoutCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to create a Payout.
     */
    data: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
  }

  /**
   * Payout createMany
   */
  export type PayoutCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payouts.
     */
    data: PayoutCreateManyInput | PayoutCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payout update
   */
  export type PayoutUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The data needed to update a Payout.
     */
    data: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
    /**
     * Choose, which Payout to update.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout updateMany
   */
  export type PayoutUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payouts.
     */
    data: XOR<PayoutUpdateManyMutationInput, PayoutUncheckedUpdateManyInput>
    /**
     * Filter which Payouts to update
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to update.
     */
    limit?: number
  }

  /**
   * Payout upsert
   */
  export type PayoutUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * The filter to search for the Payout to update in case it exists.
     */
    where: PayoutWhereUniqueInput
    /**
     * In case the Payout found by the `where` argument doesn't exist, create a new Payout with this data.
     */
    create: XOR<PayoutCreateInput, PayoutUncheckedCreateInput>
    /**
     * In case the Payout was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutUpdateInput, PayoutUncheckedUpdateInput>
  }

  /**
   * Payout delete
   */
  export type PayoutDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
    /**
     * Filter which Payout to delete.
     */
    where: PayoutWhereUniqueInput
  }

  /**
   * Payout deleteMany
   */
  export type PayoutDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payouts to delete
     */
    where?: PayoutWhereInput
    /**
     * Limit how many Payouts to delete.
     */
    limit?: number
  }

  /**
   * Payout.items
   */
  export type Payout$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    where?: PayoutItemWhereInput
    orderBy?: PayoutItemOrderByWithRelationInput | PayoutItemOrderByWithRelationInput[]
    cursor?: PayoutItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PayoutItemScalarFieldEnum | PayoutItemScalarFieldEnum[]
  }

  /**
   * Payout without action
   */
  export type PayoutDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payout
     */
    select?: PayoutSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payout
     */
    omit?: PayoutOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutInclude<ExtArgs> | null
  }


  /**
   * Model PayoutItem
   */

  export type AggregatePayoutItem = {
    _count: PayoutItemCountAggregateOutputType | null
    _avg: PayoutItemAvgAggregateOutputType | null
    _sum: PayoutItemSumAggregateOutputType | null
    _min: PayoutItemMinAggregateOutputType | null
    _max: PayoutItemMaxAggregateOutputType | null
  }

  export type PayoutItemAvgAggregateOutputType = {
    amountInCents: number | null
  }

  export type PayoutItemSumAggregateOutputType = {
    amountInCents: number | null
  }

  export type PayoutItemMinAggregateOutputType = {
    id: string | null
    payoutId: string | null
    amountInCents: number | null
    consumptionId: string | null
  }

  export type PayoutItemMaxAggregateOutputType = {
    id: string | null
    payoutId: string | null
    amountInCents: number | null
    consumptionId: string | null
  }

  export type PayoutItemCountAggregateOutputType = {
    id: number
    payoutId: number
    amountInCents: number
    consumptionId: number
    _all: number
  }


  export type PayoutItemAvgAggregateInputType = {
    amountInCents?: true
  }

  export type PayoutItemSumAggregateInputType = {
    amountInCents?: true
  }

  export type PayoutItemMinAggregateInputType = {
    id?: true
    payoutId?: true
    amountInCents?: true
    consumptionId?: true
  }

  export type PayoutItemMaxAggregateInputType = {
    id?: true
    payoutId?: true
    amountInCents?: true
    consumptionId?: true
  }

  export type PayoutItemCountAggregateInputType = {
    id?: true
    payoutId?: true
    amountInCents?: true
    consumptionId?: true
    _all?: true
  }

  export type PayoutItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutItem to aggregate.
     */
    where?: PayoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutItems to fetch.
     */
    orderBy?: PayoutItemOrderByWithRelationInput | PayoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PayoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PayoutItems
    **/
    _count?: true | PayoutItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PayoutItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PayoutItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PayoutItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PayoutItemMaxAggregateInputType
  }

  export type GetPayoutItemAggregateType<T extends PayoutItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePayoutItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayoutItem[P]>
      : GetScalarType<T[P], AggregatePayoutItem[P]>
  }




  export type PayoutItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PayoutItemWhereInput
    orderBy?: PayoutItemOrderByWithAggregationInput | PayoutItemOrderByWithAggregationInput[]
    by: PayoutItemScalarFieldEnum[] | PayoutItemScalarFieldEnum
    having?: PayoutItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PayoutItemCountAggregateInputType | true
    _avg?: PayoutItemAvgAggregateInputType
    _sum?: PayoutItemSumAggregateInputType
    _min?: PayoutItemMinAggregateInputType
    _max?: PayoutItemMaxAggregateInputType
  }

  export type PayoutItemGroupByOutputType = {
    id: string
    payoutId: string
    amountInCents: number
    consumptionId: string
    _count: PayoutItemCountAggregateOutputType | null
    _avg: PayoutItemAvgAggregateOutputType | null
    _sum: PayoutItemSumAggregateOutputType | null
    _min: PayoutItemMinAggregateOutputType | null
    _max: PayoutItemMaxAggregateOutputType | null
  }

  type GetPayoutItemGroupByPayload<T extends PayoutItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PayoutItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PayoutItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PayoutItemGroupByOutputType[P]>
            : GetScalarType<T[P], PayoutItemGroupByOutputType[P]>
        }
      >
    >


  export type PayoutItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payoutId?: boolean
    amountInCents?: boolean
    consumptionId?: boolean
    payout?: boolean | PayoutDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payoutItem"]>



  export type PayoutItemSelectScalar = {
    id?: boolean
    payoutId?: boolean
    amountInCents?: boolean
    consumptionId?: boolean
  }

  export type PayoutItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "payoutId" | "amountInCents" | "consumptionId", ExtArgs["result"]["payoutItem"]>
  export type PayoutItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payout?: boolean | PayoutDefaultArgs<ExtArgs>
  }

  export type $PayoutItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PayoutItem"
    objects: {
      payout: Prisma.$PayoutPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      payoutId: string
      amountInCents: number
      consumptionId: string
    }, ExtArgs["result"]["payoutItem"]>
    composites: {}
  }

  type PayoutItemGetPayload<S extends boolean | null | undefined | PayoutItemDefaultArgs> = $Result.GetResult<Prisma.$PayoutItemPayload, S>

  type PayoutItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PayoutItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PayoutItemCountAggregateInputType | true
    }

  export interface PayoutItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PayoutItem'], meta: { name: 'PayoutItem' } }
    /**
     * Find zero or one PayoutItem that matches the filter.
     * @param {PayoutItemFindUniqueArgs} args - Arguments to find a PayoutItem
     * @example
     * // Get one PayoutItem
     * const payoutItem = await prisma.payoutItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PayoutItemFindUniqueArgs>(args: SelectSubset<T, PayoutItemFindUniqueArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PayoutItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PayoutItemFindUniqueOrThrowArgs} args - Arguments to find a PayoutItem
     * @example
     * // Get one PayoutItem
     * const payoutItem = await prisma.payoutItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PayoutItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PayoutItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayoutItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutItemFindFirstArgs} args - Arguments to find a PayoutItem
     * @example
     * // Get one PayoutItem
     * const payoutItem = await prisma.payoutItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PayoutItemFindFirstArgs>(args?: SelectSubset<T, PayoutItemFindFirstArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PayoutItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutItemFindFirstOrThrowArgs} args - Arguments to find a PayoutItem
     * @example
     * // Get one PayoutItem
     * const payoutItem = await prisma.payoutItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PayoutItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PayoutItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PayoutItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PayoutItems
     * const payoutItems = await prisma.payoutItem.findMany()
     * 
     * // Get first 10 PayoutItems
     * const payoutItems = await prisma.payoutItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const payoutItemWithIdOnly = await prisma.payoutItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PayoutItemFindManyArgs>(args?: SelectSubset<T, PayoutItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PayoutItem.
     * @param {PayoutItemCreateArgs} args - Arguments to create a PayoutItem.
     * @example
     * // Create one PayoutItem
     * const PayoutItem = await prisma.payoutItem.create({
     *   data: {
     *     // ... data to create a PayoutItem
     *   }
     * })
     * 
     */
    create<T extends PayoutItemCreateArgs>(args: SelectSubset<T, PayoutItemCreateArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PayoutItems.
     * @param {PayoutItemCreateManyArgs} args - Arguments to create many PayoutItems.
     * @example
     * // Create many PayoutItems
     * const payoutItem = await prisma.payoutItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PayoutItemCreateManyArgs>(args?: SelectSubset<T, PayoutItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PayoutItem.
     * @param {PayoutItemDeleteArgs} args - Arguments to delete one PayoutItem.
     * @example
     * // Delete one PayoutItem
     * const PayoutItem = await prisma.payoutItem.delete({
     *   where: {
     *     // ... filter to delete one PayoutItem
     *   }
     * })
     * 
     */
    delete<T extends PayoutItemDeleteArgs>(args: SelectSubset<T, PayoutItemDeleteArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PayoutItem.
     * @param {PayoutItemUpdateArgs} args - Arguments to update one PayoutItem.
     * @example
     * // Update one PayoutItem
     * const payoutItem = await prisma.payoutItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PayoutItemUpdateArgs>(args: SelectSubset<T, PayoutItemUpdateArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PayoutItems.
     * @param {PayoutItemDeleteManyArgs} args - Arguments to filter PayoutItems to delete.
     * @example
     * // Delete a few PayoutItems
     * const { count } = await prisma.payoutItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PayoutItemDeleteManyArgs>(args?: SelectSubset<T, PayoutItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PayoutItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PayoutItems
     * const payoutItem = await prisma.payoutItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PayoutItemUpdateManyArgs>(args: SelectSubset<T, PayoutItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PayoutItem.
     * @param {PayoutItemUpsertArgs} args - Arguments to update or create a PayoutItem.
     * @example
     * // Update or create a PayoutItem
     * const payoutItem = await prisma.payoutItem.upsert({
     *   create: {
     *     // ... data to create a PayoutItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PayoutItem we want to update
     *   }
     * })
     */
    upsert<T extends PayoutItemUpsertArgs>(args: SelectSubset<T, PayoutItemUpsertArgs<ExtArgs>>): Prisma__PayoutItemClient<$Result.GetResult<Prisma.$PayoutItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PayoutItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutItemCountArgs} args - Arguments to filter PayoutItems to count.
     * @example
     * // Count the number of PayoutItems
     * const count = await prisma.payoutItem.count({
     *   where: {
     *     // ... the filter for the PayoutItems we want to count
     *   }
     * })
    **/
    count<T extends PayoutItemCountArgs>(
      args?: Subset<T, PayoutItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PayoutItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PayoutItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PayoutItemAggregateArgs>(args: Subset<T, PayoutItemAggregateArgs>): Prisma.PrismaPromise<GetPayoutItemAggregateType<T>>

    /**
     * Group by PayoutItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PayoutItemGroupByArgs} args - Group by arguments.
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
      T extends PayoutItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PayoutItemGroupByArgs['orderBy'] }
        : { orderBy?: PayoutItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PayoutItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPayoutItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PayoutItem model
   */
  readonly fields: PayoutItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PayoutItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PayoutItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payout<T extends PayoutDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PayoutDefaultArgs<ExtArgs>>): Prisma__PayoutClient<$Result.GetResult<Prisma.$PayoutPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PayoutItem model
   */
  interface PayoutItemFieldRefs {
    readonly id: FieldRef<"PayoutItem", 'String'>
    readonly payoutId: FieldRef<"PayoutItem", 'String'>
    readonly amountInCents: FieldRef<"PayoutItem", 'Int'>
    readonly consumptionId: FieldRef<"PayoutItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PayoutItem findUnique
   */
  export type PayoutItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * Filter, which PayoutItem to fetch.
     */
    where: PayoutItemWhereUniqueInput
  }

  /**
   * PayoutItem findUniqueOrThrow
   */
  export type PayoutItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * Filter, which PayoutItem to fetch.
     */
    where: PayoutItemWhereUniqueInput
  }

  /**
   * PayoutItem findFirst
   */
  export type PayoutItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * Filter, which PayoutItem to fetch.
     */
    where?: PayoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutItems to fetch.
     */
    orderBy?: PayoutItemOrderByWithRelationInput | PayoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutItems.
     */
    cursor?: PayoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutItems.
     */
    distinct?: PayoutItemScalarFieldEnum | PayoutItemScalarFieldEnum[]
  }

  /**
   * PayoutItem findFirstOrThrow
   */
  export type PayoutItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * Filter, which PayoutItem to fetch.
     */
    where?: PayoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutItems to fetch.
     */
    orderBy?: PayoutItemOrderByWithRelationInput | PayoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PayoutItems.
     */
    cursor?: PayoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PayoutItems.
     */
    distinct?: PayoutItemScalarFieldEnum | PayoutItemScalarFieldEnum[]
  }

  /**
   * PayoutItem findMany
   */
  export type PayoutItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * Filter, which PayoutItems to fetch.
     */
    where?: PayoutItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PayoutItems to fetch.
     */
    orderBy?: PayoutItemOrderByWithRelationInput | PayoutItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PayoutItems.
     */
    cursor?: PayoutItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PayoutItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PayoutItems.
     */
    skip?: number
    distinct?: PayoutItemScalarFieldEnum | PayoutItemScalarFieldEnum[]
  }

  /**
   * PayoutItem create
   */
  export type PayoutItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PayoutItem.
     */
    data: XOR<PayoutItemCreateInput, PayoutItemUncheckedCreateInput>
  }

  /**
   * PayoutItem createMany
   */
  export type PayoutItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PayoutItems.
     */
    data: PayoutItemCreateManyInput | PayoutItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PayoutItem update
   */
  export type PayoutItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PayoutItem.
     */
    data: XOR<PayoutItemUpdateInput, PayoutItemUncheckedUpdateInput>
    /**
     * Choose, which PayoutItem to update.
     */
    where: PayoutItemWhereUniqueInput
  }

  /**
   * PayoutItem updateMany
   */
  export type PayoutItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PayoutItems.
     */
    data: XOR<PayoutItemUpdateManyMutationInput, PayoutItemUncheckedUpdateManyInput>
    /**
     * Filter which PayoutItems to update
     */
    where?: PayoutItemWhereInput
    /**
     * Limit how many PayoutItems to update.
     */
    limit?: number
  }

  /**
   * PayoutItem upsert
   */
  export type PayoutItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PayoutItem to update in case it exists.
     */
    where: PayoutItemWhereUniqueInput
    /**
     * In case the PayoutItem found by the `where` argument doesn't exist, create a new PayoutItem with this data.
     */
    create: XOR<PayoutItemCreateInput, PayoutItemUncheckedCreateInput>
    /**
     * In case the PayoutItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PayoutItemUpdateInput, PayoutItemUncheckedUpdateInput>
  }

  /**
   * PayoutItem delete
   */
  export type PayoutItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
    /**
     * Filter which PayoutItem to delete.
     */
    where: PayoutItemWhereUniqueInput
  }

  /**
   * PayoutItem deleteMany
   */
  export type PayoutItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PayoutItems to delete
     */
    where?: PayoutItemWhereInput
    /**
     * Limit how many PayoutItems to delete.
     */
    limit?: number
  }

  /**
   * PayoutItem without action
   */
  export type PayoutItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PayoutItem
     */
    select?: PayoutItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PayoutItem
     */
    omit?: PayoutItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PayoutItemInclude<ExtArgs> | null
  }


  /**
   * Model Adjustment
   */

  export type AggregateAdjustment = {
    _count: AdjustmentCountAggregateOutputType | null
    _avg: AdjustmentAvgAggregateOutputType | null
    _sum: AdjustmentSumAggregateOutputType | null
    _min: AdjustmentMinAggregateOutputType | null
    _max: AdjustmentMaxAggregateOutputType | null
  }

  export type AdjustmentAvgAggregateOutputType = {
    valueInCents: number | null
  }

  export type AdjustmentSumAggregateOutputType = {
    valueInCents: number | null
  }

  export type AdjustmentMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    valueInCents: number | null
    reason: string | null
    type: $Enums.AdjustmentType | null
    attachment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdjustmentMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    valueInCents: number | null
    reason: string | null
    type: $Enums.AdjustmentType | null
    attachment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdjustmentCountAggregateOutputType = {
    id: number
    clientId: number
    valueInCents: number
    reason: number
    type: number
    attachment: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdjustmentAvgAggregateInputType = {
    valueInCents?: true
  }

  export type AdjustmentSumAggregateInputType = {
    valueInCents?: true
  }

  export type AdjustmentMinAggregateInputType = {
    id?: true
    clientId?: true
    valueInCents?: true
    reason?: true
    type?: true
    attachment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdjustmentMaxAggregateInputType = {
    id?: true
    clientId?: true
    valueInCents?: true
    reason?: true
    type?: true
    attachment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdjustmentCountAggregateInputType = {
    id?: true
    clientId?: true
    valueInCents?: true
    reason?: true
    type?: true
    attachment?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdjustmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Adjustment to aggregate.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Adjustments
    **/
    _count?: true | AdjustmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdjustmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdjustmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdjustmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdjustmentMaxAggregateInputType
  }

  export type GetAdjustmentAggregateType<T extends AdjustmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAdjustment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdjustment[P]>
      : GetScalarType<T[P], AggregateAdjustment[P]>
  }




  export type AdjustmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdjustmentWhereInput
    orderBy?: AdjustmentOrderByWithAggregationInput | AdjustmentOrderByWithAggregationInput[]
    by: AdjustmentScalarFieldEnum[] | AdjustmentScalarFieldEnum
    having?: AdjustmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdjustmentCountAggregateInputType | true
    _avg?: AdjustmentAvgAggregateInputType
    _sum?: AdjustmentSumAggregateInputType
    _min?: AdjustmentMinAggregateInputType
    _max?: AdjustmentMaxAggregateInputType
  }

  export type AdjustmentGroupByOutputType = {
    id: string
    clientId: string
    valueInCents: number
    reason: string
    type: $Enums.AdjustmentType
    attachment: string | null
    createdAt: Date
    updatedAt: Date
    _count: AdjustmentCountAggregateOutputType | null
    _avg: AdjustmentAvgAggregateOutputType | null
    _sum: AdjustmentSumAggregateOutputType | null
    _min: AdjustmentMinAggregateOutputType | null
    _max: AdjustmentMaxAggregateOutputType | null
  }

  type GetAdjustmentGroupByPayload<T extends AdjustmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdjustmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdjustmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdjustmentGroupByOutputType[P]>
            : GetScalarType<T[P], AdjustmentGroupByOutputType[P]>
        }
      >
    >


  export type AdjustmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    valueInCents?: boolean
    reason?: boolean
    type?: boolean
    attachment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adjustment"]>



  export type AdjustmentSelectScalar = {
    id?: boolean
    clientId?: boolean
    valueInCents?: boolean
    reason?: boolean
    type?: boolean
    attachment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdjustmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "valueInCents" | "reason" | "type" | "attachment" | "createdAt" | "updatedAt", ExtArgs["result"]["adjustment"]>

  export type $AdjustmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Adjustment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      valueInCents: number
      reason: string
      type: $Enums.AdjustmentType
      attachment: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adjustment"]>
    composites: {}
  }

  type AdjustmentGetPayload<S extends boolean | null | undefined | AdjustmentDefaultArgs> = $Result.GetResult<Prisma.$AdjustmentPayload, S>

  type AdjustmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdjustmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdjustmentCountAggregateInputType | true
    }

  export interface AdjustmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Adjustment'], meta: { name: 'Adjustment' } }
    /**
     * Find zero or one Adjustment that matches the filter.
     * @param {AdjustmentFindUniqueArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdjustmentFindUniqueArgs>(args: SelectSubset<T, AdjustmentFindUniqueArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Adjustment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdjustmentFindUniqueOrThrowArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdjustmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AdjustmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Adjustment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentFindFirstArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdjustmentFindFirstArgs>(args?: SelectSubset<T, AdjustmentFindFirstArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Adjustment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentFindFirstOrThrowArgs} args - Arguments to find a Adjustment
     * @example
     * // Get one Adjustment
     * const adjustment = await prisma.adjustment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdjustmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AdjustmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Adjustments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Adjustments
     * const adjustments = await prisma.adjustment.findMany()
     * 
     * // Get first 10 Adjustments
     * const adjustments = await prisma.adjustment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adjustmentWithIdOnly = await prisma.adjustment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdjustmentFindManyArgs>(args?: SelectSubset<T, AdjustmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Adjustment.
     * @param {AdjustmentCreateArgs} args - Arguments to create a Adjustment.
     * @example
     * // Create one Adjustment
     * const Adjustment = await prisma.adjustment.create({
     *   data: {
     *     // ... data to create a Adjustment
     *   }
     * })
     * 
     */
    create<T extends AdjustmentCreateArgs>(args: SelectSubset<T, AdjustmentCreateArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Adjustments.
     * @param {AdjustmentCreateManyArgs} args - Arguments to create many Adjustments.
     * @example
     * // Create many Adjustments
     * const adjustment = await prisma.adjustment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdjustmentCreateManyArgs>(args?: SelectSubset<T, AdjustmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Adjustment.
     * @param {AdjustmentDeleteArgs} args - Arguments to delete one Adjustment.
     * @example
     * // Delete one Adjustment
     * const Adjustment = await prisma.adjustment.delete({
     *   where: {
     *     // ... filter to delete one Adjustment
     *   }
     * })
     * 
     */
    delete<T extends AdjustmentDeleteArgs>(args: SelectSubset<T, AdjustmentDeleteArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Adjustment.
     * @param {AdjustmentUpdateArgs} args - Arguments to update one Adjustment.
     * @example
     * // Update one Adjustment
     * const adjustment = await prisma.adjustment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdjustmentUpdateArgs>(args: SelectSubset<T, AdjustmentUpdateArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Adjustments.
     * @param {AdjustmentDeleteManyArgs} args - Arguments to filter Adjustments to delete.
     * @example
     * // Delete a few Adjustments
     * const { count } = await prisma.adjustment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdjustmentDeleteManyArgs>(args?: SelectSubset<T, AdjustmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Adjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Adjustments
     * const adjustment = await prisma.adjustment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdjustmentUpdateManyArgs>(args: SelectSubset<T, AdjustmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Adjustment.
     * @param {AdjustmentUpsertArgs} args - Arguments to update or create a Adjustment.
     * @example
     * // Update or create a Adjustment
     * const adjustment = await prisma.adjustment.upsert({
     *   create: {
     *     // ... data to create a Adjustment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Adjustment we want to update
     *   }
     * })
     */
    upsert<T extends AdjustmentUpsertArgs>(args: SelectSubset<T, AdjustmentUpsertArgs<ExtArgs>>): Prisma__AdjustmentClient<$Result.GetResult<Prisma.$AdjustmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Adjustments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentCountArgs} args - Arguments to filter Adjustments to count.
     * @example
     * // Count the number of Adjustments
     * const count = await prisma.adjustment.count({
     *   where: {
     *     // ... the filter for the Adjustments we want to count
     *   }
     * })
    **/
    count<T extends AdjustmentCountArgs>(
      args?: Subset<T, AdjustmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdjustmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Adjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdjustmentAggregateArgs>(args: Subset<T, AdjustmentAggregateArgs>): Prisma.PrismaPromise<GetAdjustmentAggregateType<T>>

    /**
     * Group by Adjustment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjustmentGroupByArgs} args - Group by arguments.
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
      T extends AdjustmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdjustmentGroupByArgs['orderBy'] }
        : { orderBy?: AdjustmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdjustmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdjustmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Adjustment model
   */
  readonly fields: AdjustmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Adjustment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdjustmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Adjustment model
   */
  interface AdjustmentFieldRefs {
    readonly id: FieldRef<"Adjustment", 'String'>
    readonly clientId: FieldRef<"Adjustment", 'String'>
    readonly valueInCents: FieldRef<"Adjustment", 'Int'>
    readonly reason: FieldRef<"Adjustment", 'String'>
    readonly type: FieldRef<"Adjustment", 'AdjustmentType'>
    readonly attachment: FieldRef<"Adjustment", 'String'>
    readonly createdAt: FieldRef<"Adjustment", 'DateTime'>
    readonly updatedAt: FieldRef<"Adjustment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Adjustment findUnique
   */
  export type AdjustmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment findUniqueOrThrow
   */
  export type AdjustmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment findFirst
   */
  export type AdjustmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Adjustments.
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Adjustments.
     */
    distinct?: AdjustmentScalarFieldEnum | AdjustmentScalarFieldEnum[]
  }

  /**
   * Adjustment findFirstOrThrow
   */
  export type AdjustmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * Filter, which Adjustment to fetch.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Adjustments.
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Adjustments.
     */
    distinct?: AdjustmentScalarFieldEnum | AdjustmentScalarFieldEnum[]
  }

  /**
   * Adjustment findMany
   */
  export type AdjustmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * Filter, which Adjustments to fetch.
     */
    where?: AdjustmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Adjustments to fetch.
     */
    orderBy?: AdjustmentOrderByWithRelationInput | AdjustmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Adjustments.
     */
    cursor?: AdjustmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Adjustments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Adjustments.
     */
    skip?: number
    distinct?: AdjustmentScalarFieldEnum | AdjustmentScalarFieldEnum[]
  }

  /**
   * Adjustment create
   */
  export type AdjustmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * The data needed to create a Adjustment.
     */
    data: XOR<AdjustmentCreateInput, AdjustmentUncheckedCreateInput>
  }

  /**
   * Adjustment createMany
   */
  export type AdjustmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Adjustments.
     */
    data: AdjustmentCreateManyInput | AdjustmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Adjustment update
   */
  export type AdjustmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * The data needed to update a Adjustment.
     */
    data: XOR<AdjustmentUpdateInput, AdjustmentUncheckedUpdateInput>
    /**
     * Choose, which Adjustment to update.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment updateMany
   */
  export type AdjustmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Adjustments.
     */
    data: XOR<AdjustmentUpdateManyMutationInput, AdjustmentUncheckedUpdateManyInput>
    /**
     * Filter which Adjustments to update
     */
    where?: AdjustmentWhereInput
    /**
     * Limit how many Adjustments to update.
     */
    limit?: number
  }

  /**
   * Adjustment upsert
   */
  export type AdjustmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * The filter to search for the Adjustment to update in case it exists.
     */
    where: AdjustmentWhereUniqueInput
    /**
     * In case the Adjustment found by the `where` argument doesn't exist, create a new Adjustment with this data.
     */
    create: XOR<AdjustmentCreateInput, AdjustmentUncheckedCreateInput>
    /**
     * In case the Adjustment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdjustmentUpdateInput, AdjustmentUncheckedUpdateInput>
  }

  /**
   * Adjustment delete
   */
  export type AdjustmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
    /**
     * Filter which Adjustment to delete.
     */
    where: AdjustmentWhereUniqueInput
  }

  /**
   * Adjustment deleteMany
   */
  export type AdjustmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Adjustments to delete
     */
    where?: AdjustmentWhereInput
    /**
     * Limit how many Adjustments to delete.
     */
    limit?: number
  }

  /**
   * Adjustment without action
   */
  export type AdjustmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Adjustment
     */
    select?: AdjustmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Adjustment
     */
    omit?: AdjustmentOmit<ExtArgs> | null
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


  export const PayoutScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    grossInCents: 'grossInCents',
    feeInCents: 'feeInCents',
    netInCents: 'netInCents',
    status: 'status',
    paidAt: 'paidAt',
    proofFileUrl: 'proofFileUrl',
    payoutDate: 'payoutDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PayoutScalarFieldEnum = (typeof PayoutScalarFieldEnum)[keyof typeof PayoutScalarFieldEnum]


  export const PayoutItemScalarFieldEnum: {
    id: 'id',
    payoutId: 'payoutId',
    amountInCents: 'amountInCents',
    consumptionId: 'consumptionId'
  };

  export type PayoutItemScalarFieldEnum = (typeof PayoutItemScalarFieldEnum)[keyof typeof PayoutItemScalarFieldEnum]


  export const AdjustmentScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    valueInCents: 'valueInCents',
    reason: 'reason',
    type: 'type',
    attachment: 'attachment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdjustmentScalarFieldEnum = (typeof AdjustmentScalarFieldEnum)[keyof typeof AdjustmentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const PayoutOrderByRelevanceFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    status: 'status',
    proofFileUrl: 'proofFileUrl'
  };

  export type PayoutOrderByRelevanceFieldEnum = (typeof PayoutOrderByRelevanceFieldEnum)[keyof typeof PayoutOrderByRelevanceFieldEnum]


  export const PayoutItemOrderByRelevanceFieldEnum: {
    id: 'id',
    payoutId: 'payoutId',
    consumptionId: 'consumptionId'
  };

  export type PayoutItemOrderByRelevanceFieldEnum = (typeof PayoutItemOrderByRelevanceFieldEnum)[keyof typeof PayoutItemOrderByRelevanceFieldEnum]


  export const AdjustmentOrderByRelevanceFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    reason: 'reason',
    attachment: 'attachment'
  };

  export type AdjustmentOrderByRelevanceFieldEnum = (typeof AdjustmentOrderByRelevanceFieldEnum)[keyof typeof AdjustmentOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'AdjustmentType'
   */
  export type EnumAdjustmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdjustmentType'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type PayoutWhereInput = {
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    id?: StringFilter<"Payout"> | string
    clientId?: StringFilter<"Payout"> | string
    grossInCents?: IntFilter<"Payout"> | number
    feeInCents?: IntFilter<"Payout"> | number
    netInCents?: IntFilter<"Payout"> | number
    status?: StringFilter<"Payout"> | string
    paidAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    proofFileUrl?: StringNullableFilter<"Payout"> | string | null
    payoutDate?: DateTimeFilter<"Payout"> | Date | string
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
    items?: PayoutItemListRelationFilter
  }

  export type PayoutOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    grossInCents?: SortOrder
    feeInCents?: SortOrder
    netInCents?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    proofFileUrl?: SortOrderInput | SortOrder
    payoutDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: PayoutItemOrderByRelationAggregateInput
    _relevance?: PayoutOrderByRelevanceInput
  }

  export type PayoutWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PayoutWhereInput | PayoutWhereInput[]
    OR?: PayoutWhereInput[]
    NOT?: PayoutWhereInput | PayoutWhereInput[]
    clientId?: StringFilter<"Payout"> | string
    grossInCents?: IntFilter<"Payout"> | number
    feeInCents?: IntFilter<"Payout"> | number
    netInCents?: IntFilter<"Payout"> | number
    status?: StringFilter<"Payout"> | string
    paidAt?: DateTimeNullableFilter<"Payout"> | Date | string | null
    proofFileUrl?: StringNullableFilter<"Payout"> | string | null
    payoutDate?: DateTimeFilter<"Payout"> | Date | string
    createdAt?: DateTimeFilter<"Payout"> | Date | string
    updatedAt?: DateTimeFilter<"Payout"> | Date | string
    items?: PayoutItemListRelationFilter
  }, "id">

  export type PayoutOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    grossInCents?: SortOrder
    feeInCents?: SortOrder
    netInCents?: SortOrder
    status?: SortOrder
    paidAt?: SortOrderInput | SortOrder
    proofFileUrl?: SortOrderInput | SortOrder
    payoutDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PayoutCountOrderByAggregateInput
    _avg?: PayoutAvgOrderByAggregateInput
    _max?: PayoutMaxOrderByAggregateInput
    _min?: PayoutMinOrderByAggregateInput
    _sum?: PayoutSumOrderByAggregateInput
  }

  export type PayoutScalarWhereWithAggregatesInput = {
    AND?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    OR?: PayoutScalarWhereWithAggregatesInput[]
    NOT?: PayoutScalarWhereWithAggregatesInput | PayoutScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payout"> | string
    clientId?: StringWithAggregatesFilter<"Payout"> | string
    grossInCents?: IntWithAggregatesFilter<"Payout"> | number
    feeInCents?: IntWithAggregatesFilter<"Payout"> | number
    netInCents?: IntWithAggregatesFilter<"Payout"> | number
    status?: StringWithAggregatesFilter<"Payout"> | string
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payout"> | Date | string | null
    proofFileUrl?: StringNullableWithAggregatesFilter<"Payout"> | string | null
    payoutDate?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payout"> | Date | string
  }

  export type PayoutItemWhereInput = {
    AND?: PayoutItemWhereInput | PayoutItemWhereInput[]
    OR?: PayoutItemWhereInput[]
    NOT?: PayoutItemWhereInput | PayoutItemWhereInput[]
    id?: StringFilter<"PayoutItem"> | string
    payoutId?: StringFilter<"PayoutItem"> | string
    amountInCents?: IntFilter<"PayoutItem"> | number
    consumptionId?: StringFilter<"PayoutItem"> | string
    payout?: XOR<PayoutScalarRelationFilter, PayoutWhereInput>
  }

  export type PayoutItemOrderByWithRelationInput = {
    id?: SortOrder
    payoutId?: SortOrder
    amountInCents?: SortOrder
    consumptionId?: SortOrder
    payout?: PayoutOrderByWithRelationInput
    _relevance?: PayoutItemOrderByRelevanceInput
  }

  export type PayoutItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    consumptionId?: string
    AND?: PayoutItemWhereInput | PayoutItemWhereInput[]
    OR?: PayoutItemWhereInput[]
    NOT?: PayoutItemWhereInput | PayoutItemWhereInput[]
    payoutId?: StringFilter<"PayoutItem"> | string
    amountInCents?: IntFilter<"PayoutItem"> | number
    payout?: XOR<PayoutScalarRelationFilter, PayoutWhereInput>
  }, "id" | "consumptionId">

  export type PayoutItemOrderByWithAggregationInput = {
    id?: SortOrder
    payoutId?: SortOrder
    amountInCents?: SortOrder
    consumptionId?: SortOrder
    _count?: PayoutItemCountOrderByAggregateInput
    _avg?: PayoutItemAvgOrderByAggregateInput
    _max?: PayoutItemMaxOrderByAggregateInput
    _min?: PayoutItemMinOrderByAggregateInput
    _sum?: PayoutItemSumOrderByAggregateInput
  }

  export type PayoutItemScalarWhereWithAggregatesInput = {
    AND?: PayoutItemScalarWhereWithAggregatesInput | PayoutItemScalarWhereWithAggregatesInput[]
    OR?: PayoutItemScalarWhereWithAggregatesInput[]
    NOT?: PayoutItemScalarWhereWithAggregatesInput | PayoutItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PayoutItem"> | string
    payoutId?: StringWithAggregatesFilter<"PayoutItem"> | string
    amountInCents?: IntWithAggregatesFilter<"PayoutItem"> | number
    consumptionId?: StringWithAggregatesFilter<"PayoutItem"> | string
  }

  export type AdjustmentWhereInput = {
    AND?: AdjustmentWhereInput | AdjustmentWhereInput[]
    OR?: AdjustmentWhereInput[]
    NOT?: AdjustmentWhereInput | AdjustmentWhereInput[]
    id?: StringFilter<"Adjustment"> | string
    clientId?: StringFilter<"Adjustment"> | string
    valueInCents?: IntFilter<"Adjustment"> | number
    reason?: StringFilter<"Adjustment"> | string
    type?: EnumAdjustmentTypeFilter<"Adjustment"> | $Enums.AdjustmentType
    attachment?: StringNullableFilter<"Adjustment"> | string | null
    createdAt?: DateTimeFilter<"Adjustment"> | Date | string
    updatedAt?: DateTimeFilter<"Adjustment"> | Date | string
  }

  export type AdjustmentOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    valueInCents?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    attachment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: AdjustmentOrderByRelevanceInput
  }

  export type AdjustmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdjustmentWhereInput | AdjustmentWhereInput[]
    OR?: AdjustmentWhereInput[]
    NOT?: AdjustmentWhereInput | AdjustmentWhereInput[]
    clientId?: StringFilter<"Adjustment"> | string
    valueInCents?: IntFilter<"Adjustment"> | number
    reason?: StringFilter<"Adjustment"> | string
    type?: EnumAdjustmentTypeFilter<"Adjustment"> | $Enums.AdjustmentType
    attachment?: StringNullableFilter<"Adjustment"> | string | null
    createdAt?: DateTimeFilter<"Adjustment"> | Date | string
    updatedAt?: DateTimeFilter<"Adjustment"> | Date | string
  }, "id">

  export type AdjustmentOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    valueInCents?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    attachment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdjustmentCountOrderByAggregateInput
    _avg?: AdjustmentAvgOrderByAggregateInput
    _max?: AdjustmentMaxOrderByAggregateInput
    _min?: AdjustmentMinOrderByAggregateInput
    _sum?: AdjustmentSumOrderByAggregateInput
  }

  export type AdjustmentScalarWhereWithAggregatesInput = {
    AND?: AdjustmentScalarWhereWithAggregatesInput | AdjustmentScalarWhereWithAggregatesInput[]
    OR?: AdjustmentScalarWhereWithAggregatesInput[]
    NOT?: AdjustmentScalarWhereWithAggregatesInput | AdjustmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Adjustment"> | string
    clientId?: StringWithAggregatesFilter<"Adjustment"> | string
    valueInCents?: IntWithAggregatesFilter<"Adjustment"> | number
    reason?: StringWithAggregatesFilter<"Adjustment"> | string
    type?: EnumAdjustmentTypeWithAggregatesFilter<"Adjustment"> | $Enums.AdjustmentType
    attachment?: StringNullableWithAggregatesFilter<"Adjustment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Adjustment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Adjustment"> | Date | string
  }

  export type PayoutCreateInput = {
    id: string
    clientId: string
    grossInCents: number
    feeInCents: number
    netInCents: number
    status?: string
    paidAt?: Date | string | null
    proofFileUrl?: string | null
    payoutDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PayoutItemCreateNestedManyWithoutPayoutInput
  }

  export type PayoutUncheckedCreateInput = {
    id: string
    clientId: string
    grossInCents: number
    feeInCents: number
    netInCents: number
    status?: string
    paidAt?: Date | string | null
    proofFileUrl?: string | null
    payoutDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PayoutItemUncheckedCreateNestedManyWithoutPayoutInput
  }

  export type PayoutUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    grossInCents?: IntFieldUpdateOperationsInput | number
    feeInCents?: IntFieldUpdateOperationsInput | number
    netInCents?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    payoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PayoutItemUpdateManyWithoutPayoutNestedInput
  }

  export type PayoutUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    grossInCents?: IntFieldUpdateOperationsInput | number
    feeInCents?: IntFieldUpdateOperationsInput | number
    netInCents?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    payoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PayoutItemUncheckedUpdateManyWithoutPayoutNestedInput
  }

  export type PayoutCreateManyInput = {
    id: string
    clientId: string
    grossInCents: number
    feeInCents: number
    netInCents: number
    status?: string
    paidAt?: Date | string | null
    proofFileUrl?: string | null
    payoutDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    grossInCents?: IntFieldUpdateOperationsInput | number
    feeInCents?: IntFieldUpdateOperationsInput | number
    netInCents?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    payoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    grossInCents?: IntFieldUpdateOperationsInput | number
    feeInCents?: IntFieldUpdateOperationsInput | number
    netInCents?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    payoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutItemCreateInput = {
    id: string
    amountInCents: number
    consumptionId: string
    payout: PayoutCreateNestedOneWithoutItemsInput
  }

  export type PayoutItemUncheckedCreateInput = {
    id: string
    payoutId: string
    amountInCents: number
    consumptionId: string
  }

  export type PayoutItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountInCents?: IntFieldUpdateOperationsInput | number
    consumptionId?: StringFieldUpdateOperationsInput | string
    payout?: PayoutUpdateOneRequiredWithoutItemsNestedInput
  }

  export type PayoutItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payoutId?: StringFieldUpdateOperationsInput | string
    amountInCents?: IntFieldUpdateOperationsInput | number
    consumptionId?: StringFieldUpdateOperationsInput | string
  }

  export type PayoutItemCreateManyInput = {
    id: string
    payoutId: string
    amountInCents: number
    consumptionId: string
  }

  export type PayoutItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountInCents?: IntFieldUpdateOperationsInput | number
    consumptionId?: StringFieldUpdateOperationsInput | string
  }

  export type PayoutItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    payoutId?: StringFieldUpdateOperationsInput | string
    amountInCents?: IntFieldUpdateOperationsInput | number
    consumptionId?: StringFieldUpdateOperationsInput | string
  }

  export type AdjustmentCreateInput = {
    id: string
    clientId: string
    valueInCents: number
    reason: string
    type: $Enums.AdjustmentType
    attachment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdjustmentUncheckedCreateInput = {
    id: string
    clientId: string
    valueInCents: number
    reason: string
    type: $Enums.AdjustmentType
    attachment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdjustmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    valueInCents?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumAdjustmentTypeFieldUpdateOperationsInput | $Enums.AdjustmentType
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdjustmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    valueInCents?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumAdjustmentTypeFieldUpdateOperationsInput | $Enums.AdjustmentType
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdjustmentCreateManyInput = {
    id: string
    clientId: string
    valueInCents: number
    reason: string
    type: $Enums.AdjustmentType
    attachment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdjustmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    valueInCents?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumAdjustmentTypeFieldUpdateOperationsInput | $Enums.AdjustmentType
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdjustmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    valueInCents?: IntFieldUpdateOperationsInput | number
    reason?: StringFieldUpdateOperationsInput | string
    type?: EnumAdjustmentTypeFieldUpdateOperationsInput | $Enums.AdjustmentType
    attachment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PayoutItemListRelationFilter = {
    every?: PayoutItemWhereInput
    some?: PayoutItemWhereInput
    none?: PayoutItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PayoutItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PayoutOrderByRelevanceInput = {
    fields: PayoutOrderByRelevanceFieldEnum | PayoutOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PayoutCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    grossInCents?: SortOrder
    feeInCents?: SortOrder
    netInCents?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    proofFileUrl?: SortOrder
    payoutDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutAvgOrderByAggregateInput = {
    grossInCents?: SortOrder
    feeInCents?: SortOrder
    netInCents?: SortOrder
  }

  export type PayoutMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    grossInCents?: SortOrder
    feeInCents?: SortOrder
    netInCents?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    proofFileUrl?: SortOrder
    payoutDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    grossInCents?: SortOrder
    feeInCents?: SortOrder
    netInCents?: SortOrder
    status?: SortOrder
    paidAt?: SortOrder
    proofFileUrl?: SortOrder
    payoutDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PayoutSumOrderByAggregateInput = {
    grossInCents?: SortOrder
    feeInCents?: SortOrder
    netInCents?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PayoutScalarRelationFilter = {
    is?: PayoutWhereInput
    isNot?: PayoutWhereInput
  }

  export type PayoutItemOrderByRelevanceInput = {
    fields: PayoutItemOrderByRelevanceFieldEnum | PayoutItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PayoutItemCountOrderByAggregateInput = {
    id?: SortOrder
    payoutId?: SortOrder
    amountInCents?: SortOrder
    consumptionId?: SortOrder
  }

  export type PayoutItemAvgOrderByAggregateInput = {
    amountInCents?: SortOrder
  }

  export type PayoutItemMaxOrderByAggregateInput = {
    id?: SortOrder
    payoutId?: SortOrder
    amountInCents?: SortOrder
    consumptionId?: SortOrder
  }

  export type PayoutItemMinOrderByAggregateInput = {
    id?: SortOrder
    payoutId?: SortOrder
    amountInCents?: SortOrder
    consumptionId?: SortOrder
  }

  export type PayoutItemSumOrderByAggregateInput = {
    amountInCents?: SortOrder
  }

  export type EnumAdjustmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AdjustmentType | EnumAdjustmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AdjustmentType[]
    notIn?: $Enums.AdjustmentType[]
    not?: NestedEnumAdjustmentTypeFilter<$PrismaModel> | $Enums.AdjustmentType
  }

  export type AdjustmentOrderByRelevanceInput = {
    fields: AdjustmentOrderByRelevanceFieldEnum | AdjustmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AdjustmentCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    valueInCents?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    attachment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdjustmentAvgOrderByAggregateInput = {
    valueInCents?: SortOrder
  }

  export type AdjustmentMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    valueInCents?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    attachment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdjustmentMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    valueInCents?: SortOrder
    reason?: SortOrder
    type?: SortOrder
    attachment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdjustmentSumOrderByAggregateInput = {
    valueInCents?: SortOrder
  }

  export type EnumAdjustmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdjustmentType | EnumAdjustmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AdjustmentType[]
    notIn?: $Enums.AdjustmentType[]
    not?: NestedEnumAdjustmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AdjustmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdjustmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAdjustmentTypeFilter<$PrismaModel>
  }

  export type PayoutItemCreateNestedManyWithoutPayoutInput = {
    create?: XOR<PayoutItemCreateWithoutPayoutInput, PayoutItemUncheckedCreateWithoutPayoutInput> | PayoutItemCreateWithoutPayoutInput[] | PayoutItemUncheckedCreateWithoutPayoutInput[]
    connectOrCreate?: PayoutItemCreateOrConnectWithoutPayoutInput | PayoutItemCreateOrConnectWithoutPayoutInput[]
    createMany?: PayoutItemCreateManyPayoutInputEnvelope
    connect?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
  }

  export type PayoutItemUncheckedCreateNestedManyWithoutPayoutInput = {
    create?: XOR<PayoutItemCreateWithoutPayoutInput, PayoutItemUncheckedCreateWithoutPayoutInput> | PayoutItemCreateWithoutPayoutInput[] | PayoutItemUncheckedCreateWithoutPayoutInput[]
    connectOrCreate?: PayoutItemCreateOrConnectWithoutPayoutInput | PayoutItemCreateOrConnectWithoutPayoutInput[]
    createMany?: PayoutItemCreateManyPayoutInputEnvelope
    connect?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PayoutItemUpdateManyWithoutPayoutNestedInput = {
    create?: XOR<PayoutItemCreateWithoutPayoutInput, PayoutItemUncheckedCreateWithoutPayoutInput> | PayoutItemCreateWithoutPayoutInput[] | PayoutItemUncheckedCreateWithoutPayoutInput[]
    connectOrCreate?: PayoutItemCreateOrConnectWithoutPayoutInput | PayoutItemCreateOrConnectWithoutPayoutInput[]
    upsert?: PayoutItemUpsertWithWhereUniqueWithoutPayoutInput | PayoutItemUpsertWithWhereUniqueWithoutPayoutInput[]
    createMany?: PayoutItemCreateManyPayoutInputEnvelope
    set?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    disconnect?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    delete?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    connect?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    update?: PayoutItemUpdateWithWhereUniqueWithoutPayoutInput | PayoutItemUpdateWithWhereUniqueWithoutPayoutInput[]
    updateMany?: PayoutItemUpdateManyWithWhereWithoutPayoutInput | PayoutItemUpdateManyWithWhereWithoutPayoutInput[]
    deleteMany?: PayoutItemScalarWhereInput | PayoutItemScalarWhereInput[]
  }

  export type PayoutItemUncheckedUpdateManyWithoutPayoutNestedInput = {
    create?: XOR<PayoutItemCreateWithoutPayoutInput, PayoutItemUncheckedCreateWithoutPayoutInput> | PayoutItemCreateWithoutPayoutInput[] | PayoutItemUncheckedCreateWithoutPayoutInput[]
    connectOrCreate?: PayoutItemCreateOrConnectWithoutPayoutInput | PayoutItemCreateOrConnectWithoutPayoutInput[]
    upsert?: PayoutItemUpsertWithWhereUniqueWithoutPayoutInput | PayoutItemUpsertWithWhereUniqueWithoutPayoutInput[]
    createMany?: PayoutItemCreateManyPayoutInputEnvelope
    set?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    disconnect?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    delete?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    connect?: PayoutItemWhereUniqueInput | PayoutItemWhereUniqueInput[]
    update?: PayoutItemUpdateWithWhereUniqueWithoutPayoutInput | PayoutItemUpdateWithWhereUniqueWithoutPayoutInput[]
    updateMany?: PayoutItemUpdateManyWithWhereWithoutPayoutInput | PayoutItemUpdateManyWithWhereWithoutPayoutInput[]
    deleteMany?: PayoutItemScalarWhereInput | PayoutItemScalarWhereInput[]
  }

  export type PayoutCreateNestedOneWithoutItemsInput = {
    create?: XOR<PayoutCreateWithoutItemsInput, PayoutUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PayoutCreateOrConnectWithoutItemsInput
    connect?: PayoutWhereUniqueInput
  }

  export type PayoutUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<PayoutCreateWithoutItemsInput, PayoutUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PayoutCreateOrConnectWithoutItemsInput
    upsert?: PayoutUpsertWithoutItemsInput
    connect?: PayoutWhereUniqueInput
    update?: XOR<XOR<PayoutUpdateToOneWithWhereWithoutItemsInput, PayoutUpdateWithoutItemsInput>, PayoutUncheckedUpdateWithoutItemsInput>
  }

  export type EnumAdjustmentTypeFieldUpdateOperationsInput = {
    set?: $Enums.AdjustmentType
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumAdjustmentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AdjustmentType | EnumAdjustmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AdjustmentType[]
    notIn?: $Enums.AdjustmentType[]
    not?: NestedEnumAdjustmentTypeFilter<$PrismaModel> | $Enums.AdjustmentType
  }

  export type NestedEnumAdjustmentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AdjustmentType | EnumAdjustmentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AdjustmentType[]
    notIn?: $Enums.AdjustmentType[]
    not?: NestedEnumAdjustmentTypeWithAggregatesFilter<$PrismaModel> | $Enums.AdjustmentType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAdjustmentTypeFilter<$PrismaModel>
    _max?: NestedEnumAdjustmentTypeFilter<$PrismaModel>
  }

  export type PayoutItemCreateWithoutPayoutInput = {
    id: string
    amountInCents: number
    consumptionId: string
  }

  export type PayoutItemUncheckedCreateWithoutPayoutInput = {
    id: string
    amountInCents: number
    consumptionId: string
  }

  export type PayoutItemCreateOrConnectWithoutPayoutInput = {
    where: PayoutItemWhereUniqueInput
    create: XOR<PayoutItemCreateWithoutPayoutInput, PayoutItemUncheckedCreateWithoutPayoutInput>
  }

  export type PayoutItemCreateManyPayoutInputEnvelope = {
    data: PayoutItemCreateManyPayoutInput | PayoutItemCreateManyPayoutInput[]
    skipDuplicates?: boolean
  }

  export type PayoutItemUpsertWithWhereUniqueWithoutPayoutInput = {
    where: PayoutItemWhereUniqueInput
    update: XOR<PayoutItemUpdateWithoutPayoutInput, PayoutItemUncheckedUpdateWithoutPayoutInput>
    create: XOR<PayoutItemCreateWithoutPayoutInput, PayoutItemUncheckedCreateWithoutPayoutInput>
  }

  export type PayoutItemUpdateWithWhereUniqueWithoutPayoutInput = {
    where: PayoutItemWhereUniqueInput
    data: XOR<PayoutItemUpdateWithoutPayoutInput, PayoutItemUncheckedUpdateWithoutPayoutInput>
  }

  export type PayoutItemUpdateManyWithWhereWithoutPayoutInput = {
    where: PayoutItemScalarWhereInput
    data: XOR<PayoutItemUpdateManyMutationInput, PayoutItemUncheckedUpdateManyWithoutPayoutInput>
  }

  export type PayoutItemScalarWhereInput = {
    AND?: PayoutItemScalarWhereInput | PayoutItemScalarWhereInput[]
    OR?: PayoutItemScalarWhereInput[]
    NOT?: PayoutItemScalarWhereInput | PayoutItemScalarWhereInput[]
    id?: StringFilter<"PayoutItem"> | string
    payoutId?: StringFilter<"PayoutItem"> | string
    amountInCents?: IntFilter<"PayoutItem"> | number
    consumptionId?: StringFilter<"PayoutItem"> | string
  }

  export type PayoutCreateWithoutItemsInput = {
    id: string
    clientId: string
    grossInCents: number
    feeInCents: number
    netInCents: number
    status?: string
    paidAt?: Date | string | null
    proofFileUrl?: string | null
    payoutDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutUncheckedCreateWithoutItemsInput = {
    id: string
    clientId: string
    grossInCents: number
    feeInCents: number
    netInCents: number
    status?: string
    paidAt?: Date | string | null
    proofFileUrl?: string | null
    payoutDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PayoutCreateOrConnectWithoutItemsInput = {
    where: PayoutWhereUniqueInput
    create: XOR<PayoutCreateWithoutItemsInput, PayoutUncheckedCreateWithoutItemsInput>
  }

  export type PayoutUpsertWithoutItemsInput = {
    update: XOR<PayoutUpdateWithoutItemsInput, PayoutUncheckedUpdateWithoutItemsInput>
    create: XOR<PayoutCreateWithoutItemsInput, PayoutUncheckedCreateWithoutItemsInput>
    where?: PayoutWhereInput
  }

  export type PayoutUpdateToOneWithWhereWithoutItemsInput = {
    where?: PayoutWhereInput
    data: XOR<PayoutUpdateWithoutItemsInput, PayoutUncheckedUpdateWithoutItemsInput>
  }

  export type PayoutUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    grossInCents?: IntFieldUpdateOperationsInput | number
    feeInCents?: IntFieldUpdateOperationsInput | number
    netInCents?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    payoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    grossInCents?: IntFieldUpdateOperationsInput | number
    feeInCents?: IntFieldUpdateOperationsInput | number
    netInCents?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    proofFileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    payoutDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PayoutItemCreateManyPayoutInput = {
    id: string
    amountInCents: number
    consumptionId: string
  }

  export type PayoutItemUpdateWithoutPayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountInCents?: IntFieldUpdateOperationsInput | number
    consumptionId?: StringFieldUpdateOperationsInput | string
  }

  export type PayoutItemUncheckedUpdateWithoutPayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountInCents?: IntFieldUpdateOperationsInput | number
    consumptionId?: StringFieldUpdateOperationsInput | string
  }

  export type PayoutItemUncheckedUpdateManyWithoutPayoutInput = {
    id?: StringFieldUpdateOperationsInput | string
    amountInCents?: IntFieldUpdateOperationsInput | number
    consumptionId?: StringFieldUpdateOperationsInput | string
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

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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Task
 * 
 */
export type Task = $Result.DefaultSelection<Prisma.$TaskPayload>
/**
 * Model Subtask
 * 
 */
export type Subtask = $Result.DefaultSelection<Prisma.$SubtaskPayload>
/**
 * Model ChatMessage
 * 
 */
export type ChatMessage = $Result.DefaultSelection<Prisma.$ChatMessagePayload>
/**
 * Model ActionHistory
 * 
 */
export type ActionHistory = $Result.DefaultSelection<Prisma.$ActionHistoryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const TaskStatus: {
  BACKLOG: 'BACKLOG',
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED: 'BLOCKED',
  DONE: 'DONE',
  ARCHIVED: 'ARCHIVED'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]


export const TaskPriority: {
  NONE: 'NONE',
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority]


export const InputType: {
  TEXT: 'TEXT',
  VOICE: 'VOICE'
};

export type InputType = (typeof InputType)[keyof typeof InputType]


export const ChatRole: {
  USER: 'USER',
  ASSISTANT: 'ASSISTANT',
  SYSTEM: 'SYSTEM'
};

export type ChatRole = (typeof ChatRole)[keyof typeof ChatRole]


export const ActionType: {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  RESTORE: 'RESTORE',
  AI_MUTATION: 'AI_MUTATION',
  REORDER: 'REORDER'
};

export type ActionType = (typeof ActionType)[keyof typeof ActionType]


export const EntityType: {
  PROJECT: 'PROJECT',
  TASK: 'TASK',
  SUBTASK: 'SUBTASK',
  CHAT_MESSAGE: 'CHAT_MESSAGE'
};

export type EntityType = (typeof EntityType)[keyof typeof EntityType]


export const SubscriptionTier: {
  FREE: 'FREE',
  PRO: 'PRO',
  TEAM: 'TEAM'
};

export type SubscriptionTier = (typeof SubscriptionTier)[keyof typeof SubscriptionTier]

}

export type TaskStatus = $Enums.TaskStatus

export const TaskStatus: typeof $Enums.TaskStatus

export type TaskPriority = $Enums.TaskPriority

export const TaskPriority: typeof $Enums.TaskPriority

export type InputType = $Enums.InputType

export const InputType: typeof $Enums.InputType

export type ChatRole = $Enums.ChatRole

export const ChatRole: typeof $Enums.ChatRole

export type ActionType = $Enums.ActionType

export const ActionType: typeof $Enums.ActionType

export type EntityType = $Enums.EntityType

export const EntityType: typeof $Enums.EntityType

export type SubscriptionTier = $Enums.SubscriptionTier

export const SubscriptionTier: typeof $Enums.SubscriptionTier

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.task`: Exposes CRUD operations for the **Task** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tasks
    * const tasks = await prisma.task.findMany()
    * ```
    */
  get task(): Prisma.TaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subtask`: Exposes CRUD operations for the **Subtask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subtasks
    * const subtasks = await prisma.subtask.findMany()
    * ```
    */
  get subtask(): Prisma.SubtaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.chatMessage`: Exposes CRUD operations for the **ChatMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ChatMessages
    * const chatMessages = await prisma.chatMessage.findMany()
    * ```
    */
  get chatMessage(): Prisma.ChatMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.actionHistory`: Exposes CRUD operations for the **ActionHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActionHistories
    * const actionHistories = await prisma.actionHistory.findMany()
    * ```
    */
  get actionHistory(): Prisma.ActionHistoryDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
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
    User: 'User',
    Project: 'Project',
    Task: 'Task',
    Subtask: 'Subtask',
    ChatMessage: 'ChatMessage',
    ActionHistory: 'ActionHistory'
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
      modelProps: "user" | "project" | "task" | "subtask" | "chatMessage" | "actionHistory"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Task: {
        payload: Prisma.$TaskPayload<ExtArgs>
        fields: Prisma.TaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findFirst: {
            args: Prisma.TaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          findMany: {
            args: Prisma.TaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          create: {
            args: Prisma.TaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          createMany: {
            args: Prisma.TaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          delete: {
            args: Prisma.TaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          update: {
            args: Prisma.TaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          deleteMany: {
            args: Prisma.TaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>[]
          }
          upsert: {
            args: Prisma.TaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TaskPayload>
          }
          aggregate: {
            args: Prisma.TaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTask>
          }
          groupBy: {
            args: Prisma.TaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<TaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.TaskCountArgs<ExtArgs>
            result: $Utils.Optional<TaskCountAggregateOutputType> | number
          }
        }
      }
      Subtask: {
        payload: Prisma.$SubtaskPayload<ExtArgs>
        fields: Prisma.SubtaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubtaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubtaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          findFirst: {
            args: Prisma.SubtaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubtaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          findMany: {
            args: Prisma.SubtaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          create: {
            args: Prisma.SubtaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          createMany: {
            args: Prisma.SubtaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubtaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          delete: {
            args: Prisma.SubtaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          update: {
            args: Prisma.SubtaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          deleteMany: {
            args: Prisma.SubtaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubtaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubtaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>[]
          }
          upsert: {
            args: Prisma.SubtaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubtaskPayload>
          }
          aggregate: {
            args: Prisma.SubtaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubtask>
          }
          groupBy: {
            args: Prisma.SubtaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubtaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubtaskCountArgs<ExtArgs>
            result: $Utils.Optional<SubtaskCountAggregateOutputType> | number
          }
        }
      }
      ChatMessage: {
        payload: Prisma.$ChatMessagePayload<ExtArgs>
        fields: Prisma.ChatMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findFirst: {
            args: Prisma.ChatMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          findMany: {
            args: Prisma.ChatMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          create: {
            args: Prisma.ChatMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          createMany: {
            args: Prisma.ChatMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          delete: {
            args: Prisma.ChatMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          update: {
            args: Prisma.ChatMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          deleteMany: {
            args: Prisma.ChatMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>[]
          }
          upsert: {
            args: Prisma.ChatMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatMessagePayload>
          }
          aggregate: {
            args: Prisma.ChatMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChatMessage>
          }
          groupBy: {
            args: Prisma.ChatMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatMessageCountArgs<ExtArgs>
            result: $Utils.Optional<ChatMessageCountAggregateOutputType> | number
          }
        }
      }
      ActionHistory: {
        payload: Prisma.$ActionHistoryPayload<ExtArgs>
        fields: Prisma.ActionHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActionHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActionHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          findFirst: {
            args: Prisma.ActionHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActionHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          findMany: {
            args: Prisma.ActionHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>[]
          }
          create: {
            args: Prisma.ActionHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          createMany: {
            args: Prisma.ActionHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActionHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>[]
          }
          delete: {
            args: Prisma.ActionHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          update: {
            args: Prisma.ActionHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          deleteMany: {
            args: Prisma.ActionHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActionHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActionHistoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>[]
          }
          upsert: {
            args: Prisma.ActionHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActionHistoryPayload>
          }
          aggregate: {
            args: Prisma.ActionHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActionHistory>
          }
          groupBy: {
            args: Prisma.ActionHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActionHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActionHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<ActionHistoryCountAggregateOutputType> | number
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
    user?: UserOmit
    project?: ProjectOmit
    task?: TaskOmit
    subtask?: SubtaskOmit
    chatMessage?: ChatMessageOmit
    actionHistory?: ActionHistoryOmit
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
    projects: number
    tasks: number
    actionHistory: number
    undoneActions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    tasks?: boolean | UserCountOutputTypeCountTasksArgs
    actionHistory?: boolean | UserCountOutputTypeCountActionHistoryArgs
    undoneActions?: boolean | UserCountOutputTypeCountUndoneActionsArgs
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
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActionHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionHistoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUndoneActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionHistoryWhereInput
  }


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    children: number
    tasks: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | ProjectCountOutputTypeCountChildrenArgs
    tasks?: boolean | ProjectCountOutputTypeCountTasksArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountTasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
  }


  /**
   * Count Type TaskCountOutputType
   */

  export type TaskCountOutputType = {
    subtasks: number
    chatMessages: number
  }

  export type TaskCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subtasks?: boolean | TaskCountOutputTypeCountSubtasksArgs
    chatMessages?: boolean | TaskCountOutputTypeCountChatMessagesArgs
  }

  // Custom InputTypes
  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TaskCountOutputType
     */
    select?: TaskCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountSubtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
  }

  /**
   * TaskCountOutputType without action
   */
  export type TaskCountOutputTypeCountChatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
  }


  /**
   * Count Type ActionHistoryCountOutputType
   */

  export type ActionHistoryCountOutputType = {
    chatMessages: number
  }

  export type ActionHistoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chatMessages?: boolean | ActionHistoryCountOutputTypeCountChatMessagesArgs
  }

  // Custom InputTypes
  /**
   * ActionHistoryCountOutputType without action
   */
  export type ActionHistoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistoryCountOutputType
     */
    select?: ActionHistoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActionHistoryCountOutputType without action
   */
  export type ActionHistoryCountOutputTypeCountChatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    telegramId: number | null
    aiCreditsUsed: number | null
  }

  export type UserSumAggregateOutputType = {
    telegramId: bigint | null
    aiCreditsUsed: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    telegramId: bigint | null
    telegramName: string | null
    telegramPhoto: string | null
    encryptedApiKey: string | null
    tier: $Enums.SubscriptionTier | null
    aiCreditsUsed: number | null
    aiCreditsResetAt: Date | null
    timezone: string | null
    locale: string | null
    isOnboarded: boolean | null
    deletedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    telegramId: bigint | null
    telegramName: string | null
    telegramPhoto: string | null
    encryptedApiKey: string | null
    tier: $Enums.SubscriptionTier | null
    aiCreditsUsed: number | null
    aiCreditsResetAt: Date | null
    timezone: string | null
    locale: string | null
    isOnboarded: boolean | null
    deletedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    telegramId: number
    telegramName: number
    telegramPhoto: number
    encryptedApiKey: number
    tier: number
    aiCreditsUsed: number
    aiCreditsResetAt: number
    timezone: number
    locale: number
    isOnboarded: number
    deletedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    telegramId?: true
    aiCreditsUsed?: true
  }

  export type UserSumAggregateInputType = {
    telegramId?: true
    aiCreditsUsed?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    telegramId?: true
    telegramName?: true
    telegramPhoto?: true
    encryptedApiKey?: true
    tier?: true
    aiCreditsUsed?: true
    aiCreditsResetAt?: true
    timezone?: true
    locale?: true
    isOnboarded?: true
    deletedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    telegramId?: true
    telegramName?: true
    telegramPhoto?: true
    encryptedApiKey?: true
    tier?: true
    aiCreditsUsed?: true
    aiCreditsResetAt?: true
    timezone?: true
    locale?: true
    isOnboarded?: true
    deletedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    telegramId?: true
    telegramName?: true
    telegramPhoto?: true
    encryptedApiKey?: true
    tier?: true
    aiCreditsUsed?: true
    aiCreditsResetAt?: true
    timezone?: true
    locale?: true
    isOnboarded?: true
    deletedAt?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    telegramId: bigint
    telegramName: string | null
    telegramPhoto: string | null
    encryptedApiKey: string | null
    tier: $Enums.SubscriptionTier
    aiCreditsUsed: number
    aiCreditsResetAt: Date | null
    timezone: string
    locale: string
    isOnboarded: boolean
    deletedAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    createdAt?: boolean
    updatedAt?: boolean
    telegramId?: boolean
    telegramName?: boolean
    telegramPhoto?: boolean
    encryptedApiKey?: boolean
    tier?: boolean
    aiCreditsUsed?: boolean
    aiCreditsResetAt?: boolean
    timezone?: boolean
    locale?: boolean
    isOnboarded?: boolean
    deletedAt?: boolean
    projects?: boolean | User$projectsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    actionHistory?: boolean | User$actionHistoryArgs<ExtArgs>
    undoneActions?: boolean | User$undoneActionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    telegramId?: boolean
    telegramName?: boolean
    telegramPhoto?: boolean
    encryptedApiKey?: boolean
    tier?: boolean
    aiCreditsUsed?: boolean
    aiCreditsResetAt?: boolean
    timezone?: boolean
    locale?: boolean
    isOnboarded?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    telegramId?: boolean
    telegramName?: boolean
    telegramPhoto?: boolean
    encryptedApiKey?: boolean
    tier?: boolean
    aiCreditsUsed?: boolean
    aiCreditsResetAt?: boolean
    timezone?: boolean
    locale?: boolean
    isOnboarded?: boolean
    deletedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    telegramId?: boolean
    telegramName?: boolean
    telegramPhoto?: boolean
    encryptedApiKey?: boolean
    tier?: boolean
    aiCreditsUsed?: boolean
    aiCreditsResetAt?: boolean
    timezone?: boolean
    locale?: boolean
    isOnboarded?: boolean
    deletedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "telegramId" | "telegramName" | "telegramPhoto" | "encryptedApiKey" | "tier" | "aiCreditsUsed" | "aiCreditsResetAt" | "timezone" | "locale" | "isOnboarded" | "deletedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | User$projectsArgs<ExtArgs>
    tasks?: boolean | User$tasksArgs<ExtArgs>
    actionHistory?: boolean | User$actionHistoryArgs<ExtArgs>
    undoneActions?: boolean | User$undoneActionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      tasks: Prisma.$TaskPayload<ExtArgs>[]
      actionHistory: Prisma.$ActionHistoryPayload<ExtArgs>[]
      undoneActions: Prisma.$ActionHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      telegramId: bigint
      telegramName: string | null
      telegramPhoto: string | null
      encryptedApiKey: string | null
      tier: $Enums.SubscriptionTier
      aiCreditsUsed: number
      aiCreditsResetAt: Date | null
      timezone: string
      locale: string
      isOnboarded: boolean
      deletedAt: Date | null
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
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tasks<T extends User$tasksArgs<ExtArgs> = {}>(args?: Subset<T, User$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    actionHistory<T extends User$actionHistoryArgs<ExtArgs> = {}>(args?: Subset<T, User$actionHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    undoneActions<T extends User$undoneActionsArgs<ExtArgs> = {}>(args?: Subset<T, User$undoneActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly telegramId: FieldRef<"User", 'BigInt'>
    readonly telegramName: FieldRef<"User", 'String'>
    readonly telegramPhoto: FieldRef<"User", 'String'>
    readonly encryptedApiKey: FieldRef<"User", 'String'>
    readonly tier: FieldRef<"User", 'SubscriptionTier'>
    readonly aiCreditsUsed: FieldRef<"User", 'Int'>
    readonly aiCreditsResetAt: FieldRef<"User", 'DateTime'>
    readonly timezone: FieldRef<"User", 'String'>
    readonly locale: FieldRef<"User", 'String'>
    readonly isOnboarded: FieldRef<"User", 'Boolean'>
    readonly deletedAt: FieldRef<"User", 'DateTime'>
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
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.tasks
   */
  export type User$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * User.actionHistory
   */
  export type User$actionHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    where?: ActionHistoryWhereInput
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    cursor?: ActionHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * User.undoneActions
   */
  export type User$undoneActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    where?: ActionHistoryWhereInput
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    cursor?: ActionHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
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
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    order: number | null
  }

  export type ProjectSumAggregateOutputType = {
    order: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    description: string | null
    emoji: string | null
    color: string | null
    aiContext: string | null
    order: number | null
    parentId: string | null
    isArchived: boolean | null
    deletedAt: Date | null
    userId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    name: string | null
    description: string | null
    emoji: string | null
    color: string | null
    aiContext: string | null
    order: number | null
    parentId: string | null
    isArchived: boolean | null
    deletedAt: Date | null
    userId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    name: number
    description: number
    emoji: number
    color: number
    aiContext: number
    order: number
    parentId: number
    isArchived: number
    deletedAt: number
    userId: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    order?: true
  }

  export type ProjectSumAggregateInputType = {
    order?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    emoji?: true
    color?: true
    aiContext?: true
    order?: true
    parentId?: true
    isArchived?: true
    deletedAt?: true
    userId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    emoji?: true
    color?: true
    aiContext?: true
    order?: true
    parentId?: true
    isArchived?: true
    deletedAt?: true
    userId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    name?: true
    description?: true
    emoji?: true
    color?: true
    aiContext?: true
    order?: true
    parentId?: true
    isArchived?: true
    deletedAt?: true
    userId?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    description: string | null
    emoji: string | null
    color: string | null
    aiContext: string | null
    order: number
    parentId: string | null
    isArchived: boolean
    deletedAt: Date | null
    userId: string
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    emoji?: boolean
    color?: boolean
    aiContext?: boolean
    order?: boolean
    parentId?: boolean
    isArchived?: boolean
    deletedAt?: boolean
    userId?: boolean
    parent?: boolean | Project$parentArgs<ExtArgs>
    children?: boolean | Project$childrenArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    emoji?: boolean
    color?: boolean
    aiContext?: boolean
    order?: boolean
    parentId?: boolean
    isArchived?: boolean
    deletedAt?: boolean
    userId?: boolean
    parent?: boolean | Project$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    emoji?: boolean
    color?: boolean
    aiContext?: boolean
    order?: boolean
    parentId?: boolean
    isArchived?: boolean
    deletedAt?: boolean
    userId?: boolean
    parent?: boolean | Project$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    name?: boolean
    description?: boolean
    emoji?: boolean
    color?: boolean
    aiContext?: boolean
    order?: boolean
    parentId?: boolean
    isArchived?: boolean
    deletedAt?: boolean
    userId?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "name" | "description" | "emoji" | "color" | "aiContext" | "order" | "parentId" | "isArchived" | "deletedAt" | "userId", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Project$parentArgs<ExtArgs>
    children?: boolean | Project$childrenArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    tasks?: boolean | Project$tasksArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Project$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Project$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      parent: Prisma.$ProjectPayload<ExtArgs> | null
      children: Prisma.$ProjectPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
      tasks: Prisma.$TaskPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      name: string
      description: string | null
      emoji: string | null
      color: string | null
      aiContext: string | null
      order: number
      parentId: string | null
      isArchived: boolean
      deletedAt: Date | null
      userId: string
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
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
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Project$parentArgs<ExtArgs> = {}>(args?: Subset<T, Project$parentArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Project$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Project$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tasks<T extends Project$tasksArgs<ExtArgs> = {}>(args?: Subset<T, Project$tasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly emoji: FieldRef<"Project", 'String'>
    readonly color: FieldRef<"Project", 'String'>
    readonly aiContext: FieldRef<"Project", 'String'>
    readonly order: FieldRef<"Project", 'Int'>
    readonly parentId: FieldRef<"Project", 'String'>
    readonly isArchived: FieldRef<"Project", 'Boolean'>
    readonly deletedAt: FieldRef<"Project", 'DateTime'>
    readonly userId: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.parent
   */
  export type Project$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Project.children
   */
  export type Project$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project.tasks
   */
  export type Project$tasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    cursor?: TaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Task
   */

  export type AggregateTask = {
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  export type TaskAvgAggregateOutputType = {
    estimatedMinutes: number | null
    order: number | null
    aiTokensUsed: number | null
  }

  export type TaskSumAggregateOutputType = {
    estimatedMinutes: number | null
    order: number | null
    aiTokensUsed: number | null
  }

  export type TaskMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    summary: string | null
    originalInput: string | null
    originalInputType: $Enums.InputType | null
    status: $Enums.TaskStatus | null
    priority: $Enums.TaskPriority | null
    deadline: Date | null
    startDate: Date | null
    estimatedMinutes: number | null
    order: number | null
    aiProcessedAt: Date | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    deletedAt: Date | null
    userId: string | null
    projectId: string | null
  }

  export type TaskMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    summary: string | null
    originalInput: string | null
    originalInputType: $Enums.InputType | null
    status: $Enums.TaskStatus | null
    priority: $Enums.TaskPriority | null
    deadline: Date | null
    startDate: Date | null
    estimatedMinutes: number | null
    order: number | null
    aiProcessedAt: Date | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    deletedAt: Date | null
    userId: string | null
    projectId: string | null
  }

  export type TaskCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    summary: number
    originalInput: number
    originalInputType: number
    status: number
    priority: number
    deadline: number
    startDate: number
    estimatedMinutes: number
    order: number
    aiProcessedAt: number
    aiModelUsed: number
    aiTokensUsed: number
    deletedAt: number
    userId: number
    projectId: number
    _all: number
  }


  export type TaskAvgAggregateInputType = {
    estimatedMinutes?: true
    order?: true
    aiTokensUsed?: true
  }

  export type TaskSumAggregateInputType = {
    estimatedMinutes?: true
    order?: true
    aiTokensUsed?: true
  }

  export type TaskMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    summary?: true
    originalInput?: true
    originalInputType?: true
    status?: true
    priority?: true
    deadline?: true
    startDate?: true
    estimatedMinutes?: true
    order?: true
    aiProcessedAt?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    deletedAt?: true
    userId?: true
    projectId?: true
  }

  export type TaskMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    summary?: true
    originalInput?: true
    originalInputType?: true
    status?: true
    priority?: true
    deadline?: true
    startDate?: true
    estimatedMinutes?: true
    order?: true
    aiProcessedAt?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    deletedAt?: true
    userId?: true
    projectId?: true
  }

  export type TaskCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    summary?: true
    originalInput?: true
    originalInputType?: true
    status?: true
    priority?: true
    deadline?: true
    startDate?: true
    estimatedMinutes?: true
    order?: true
    aiProcessedAt?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    deletedAt?: true
    userId?: true
    projectId?: true
    _all?: true
  }

  export type TaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Task to aggregate.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tasks
    **/
    _count?: true | TaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TaskMaxAggregateInputType
  }

  export type GetTaskAggregateType<T extends TaskAggregateArgs> = {
        [P in keyof T & keyof AggregateTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTask[P]>
      : GetScalarType<T[P], AggregateTask[P]>
  }




  export type TaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TaskWhereInput
    orderBy?: TaskOrderByWithAggregationInput | TaskOrderByWithAggregationInput[]
    by: TaskScalarFieldEnum[] | TaskScalarFieldEnum
    having?: TaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TaskCountAggregateInputType | true
    _avg?: TaskAvgAggregateInputType
    _sum?: TaskSumAggregateInputType
    _min?: TaskMinAggregateInputType
    _max?: TaskMaxAggregateInputType
  }

  export type TaskGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    summary: string | null
    originalInput: string | null
    originalInputType: $Enums.InputType | null
    status: $Enums.TaskStatus
    priority: $Enums.TaskPriority
    deadline: Date | null
    startDate: Date | null
    estimatedMinutes: number | null
    order: number
    aiProcessedAt: Date | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    deletedAt: Date | null
    userId: string
    projectId: string | null
    _count: TaskCountAggregateOutputType | null
    _avg: TaskAvgAggregateOutputType | null
    _sum: TaskSumAggregateOutputType | null
    _min: TaskMinAggregateOutputType | null
    _max: TaskMaxAggregateOutputType | null
  }

  type GetTaskGroupByPayload<T extends TaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TaskGroupByOutputType[P]>
            : GetScalarType<T[P], TaskGroupByOutputType[P]>
        }
      >
    >


  export type TaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    summary?: boolean
    originalInput?: boolean
    originalInputType?: boolean
    status?: boolean
    priority?: boolean
    deadline?: boolean
    startDate?: boolean
    estimatedMinutes?: boolean
    order?: boolean
    aiProcessedAt?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    deletedAt?: boolean
    userId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Task$projectArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    chatMessages?: boolean | Task$chatMessagesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    summary?: boolean
    originalInput?: boolean
    originalInputType?: boolean
    status?: boolean
    priority?: boolean
    deadline?: boolean
    startDate?: boolean
    estimatedMinutes?: boolean
    order?: boolean
    aiProcessedAt?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    deletedAt?: boolean
    userId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Task$projectArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    summary?: boolean
    originalInput?: boolean
    originalInputType?: boolean
    status?: boolean
    priority?: boolean
    deadline?: boolean
    startDate?: boolean
    estimatedMinutes?: boolean
    order?: boolean
    aiProcessedAt?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    deletedAt?: boolean
    userId?: boolean
    projectId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Task$projectArgs<ExtArgs>
  }, ExtArgs["result"]["task"]>

  export type TaskSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    summary?: boolean
    originalInput?: boolean
    originalInputType?: boolean
    status?: boolean
    priority?: boolean
    deadline?: boolean
    startDate?: boolean
    estimatedMinutes?: boolean
    order?: boolean
    aiProcessedAt?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    deletedAt?: boolean
    userId?: boolean
    projectId?: boolean
  }

  export type TaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "title" | "summary" | "originalInput" | "originalInputType" | "status" | "priority" | "deadline" | "startDate" | "estimatedMinutes" | "order" | "aiProcessedAt" | "aiModelUsed" | "aiTokensUsed" | "deletedAt" | "userId" | "projectId", ExtArgs["result"]["task"]>
  export type TaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Task$projectArgs<ExtArgs>
    subtasks?: boolean | Task$subtasksArgs<ExtArgs>
    chatMessages?: boolean | Task$chatMessagesArgs<ExtArgs>
    _count?: boolean | TaskCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Task$projectArgs<ExtArgs>
  }
  export type TaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    project?: boolean | Task$projectArgs<ExtArgs>
  }

  export type $TaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Task"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      project: Prisma.$ProjectPayload<ExtArgs> | null
      subtasks: Prisma.$SubtaskPayload<ExtArgs>[]
      chatMessages: Prisma.$ChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      title: string
      summary: string | null
      originalInput: string | null
      originalInputType: $Enums.InputType | null
      status: $Enums.TaskStatus
      priority: $Enums.TaskPriority
      deadline: Date | null
      startDate: Date | null
      estimatedMinutes: number | null
      order: number
      aiProcessedAt: Date | null
      aiModelUsed: string | null
      aiTokensUsed: number | null
      deletedAt: Date | null
      userId: string
      projectId: string | null
    }, ExtArgs["result"]["task"]>
    composites: {}
  }

  type TaskGetPayload<S extends boolean | null | undefined | TaskDefaultArgs> = $Result.GetResult<Prisma.$TaskPayload, S>

  type TaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TaskCountAggregateInputType | true
    }

  export interface TaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Task'], meta: { name: 'Task' } }
    /**
     * Find zero or one Task that matches the filter.
     * @param {TaskFindUniqueArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TaskFindUniqueArgs>(args: SelectSubset<T, TaskFindUniqueArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Task that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TaskFindUniqueOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TaskFindUniqueOrThrowArgs>(args: SelectSubset<T, TaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TaskFindFirstArgs>(args?: SelectSubset<T, TaskFindFirstArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Task that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindFirstOrThrowArgs} args - Arguments to find a Task
     * @example
     * // Get one Task
     * const task = await prisma.task.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TaskFindFirstOrThrowArgs>(args?: SelectSubset<T, TaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tasks
     * const tasks = await prisma.task.findMany()
     * 
     * // Get first 10 Tasks
     * const tasks = await prisma.task.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const taskWithIdOnly = await prisma.task.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TaskFindManyArgs>(args?: SelectSubset<T, TaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Task.
     * @param {TaskCreateArgs} args - Arguments to create a Task.
     * @example
     * // Create one Task
     * const Task = await prisma.task.create({
     *   data: {
     *     // ... data to create a Task
     *   }
     * })
     * 
     */
    create<T extends TaskCreateArgs>(args: SelectSubset<T, TaskCreateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tasks.
     * @param {TaskCreateManyArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TaskCreateManyArgs>(args?: SelectSubset<T, TaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tasks and returns the data saved in the database.
     * @param {TaskCreateManyAndReturnArgs} args - Arguments to create many Tasks.
     * @example
     * // Create many Tasks
     * const task = await prisma.task.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TaskCreateManyAndReturnArgs>(args?: SelectSubset<T, TaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Task.
     * @param {TaskDeleteArgs} args - Arguments to delete one Task.
     * @example
     * // Delete one Task
     * const Task = await prisma.task.delete({
     *   where: {
     *     // ... filter to delete one Task
     *   }
     * })
     * 
     */
    delete<T extends TaskDeleteArgs>(args: SelectSubset<T, TaskDeleteArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Task.
     * @param {TaskUpdateArgs} args - Arguments to update one Task.
     * @example
     * // Update one Task
     * const task = await prisma.task.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TaskUpdateArgs>(args: SelectSubset<T, TaskUpdateArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tasks.
     * @param {TaskDeleteManyArgs} args - Arguments to filter Tasks to delete.
     * @example
     * // Delete a few Tasks
     * const { count } = await prisma.task.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TaskDeleteManyArgs>(args?: SelectSubset<T, TaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TaskUpdateManyArgs>(args: SelectSubset<T, TaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tasks and returns the data updated in the database.
     * @param {TaskUpdateManyAndReturnArgs} args - Arguments to update many Tasks.
     * @example
     * // Update many Tasks
     * const task = await prisma.task.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tasks and only return the `id`
     * const taskWithIdOnly = await prisma.task.updateManyAndReturn({
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
    updateManyAndReturn<T extends TaskUpdateManyAndReturnArgs>(args: SelectSubset<T, TaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Task.
     * @param {TaskUpsertArgs} args - Arguments to update or create a Task.
     * @example
     * // Update or create a Task
     * const task = await prisma.task.upsert({
     *   create: {
     *     // ... data to create a Task
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Task we want to update
     *   }
     * })
     */
    upsert<T extends TaskUpsertArgs>(args: SelectSubset<T, TaskUpsertArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskCountArgs} args - Arguments to filter Tasks to count.
     * @example
     * // Count the number of Tasks
     * const count = await prisma.task.count({
     *   where: {
     *     // ... the filter for the Tasks we want to count
     *   }
     * })
    **/
    count<T extends TaskCountArgs>(
      args?: Subset<T, TaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TaskAggregateArgs>(args: Subset<T, TaskAggregateArgs>): Prisma.PrismaPromise<GetTaskAggregateType<T>>

    /**
     * Group by Task.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TaskGroupByArgs} args - Group by arguments.
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
      T extends TaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TaskGroupByArgs['orderBy'] }
        : { orderBy?: TaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Task model
   */
  readonly fields: TaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Task.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    project<T extends Task$projectArgs<ExtArgs> = {}>(args?: Subset<T, Task$projectArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subtasks<T extends Task$subtasksArgs<ExtArgs> = {}>(args?: Subset<T, Task$subtasksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    chatMessages<T extends Task$chatMessagesArgs<ExtArgs> = {}>(args?: Subset<T, Task$chatMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Task model
   */
  interface TaskFieldRefs {
    readonly id: FieldRef<"Task", 'String'>
    readonly createdAt: FieldRef<"Task", 'DateTime'>
    readonly updatedAt: FieldRef<"Task", 'DateTime'>
    readonly title: FieldRef<"Task", 'String'>
    readonly summary: FieldRef<"Task", 'String'>
    readonly originalInput: FieldRef<"Task", 'String'>
    readonly originalInputType: FieldRef<"Task", 'InputType'>
    readonly status: FieldRef<"Task", 'TaskStatus'>
    readonly priority: FieldRef<"Task", 'TaskPriority'>
    readonly deadline: FieldRef<"Task", 'DateTime'>
    readonly startDate: FieldRef<"Task", 'DateTime'>
    readonly estimatedMinutes: FieldRef<"Task", 'Int'>
    readonly order: FieldRef<"Task", 'Int'>
    readonly aiProcessedAt: FieldRef<"Task", 'DateTime'>
    readonly aiModelUsed: FieldRef<"Task", 'String'>
    readonly aiTokensUsed: FieldRef<"Task", 'Int'>
    readonly deletedAt: FieldRef<"Task", 'DateTime'>
    readonly userId: FieldRef<"Task", 'String'>
    readonly projectId: FieldRef<"Task", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Task findUnique
   */
  export type TaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findUniqueOrThrow
   */
  export type TaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task findFirst
   */
  export type TaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findFirstOrThrow
   */
  export type TaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Task to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tasks.
     */
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task findMany
   */
  export type TaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter, which Tasks to fetch.
     */
    where?: TaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tasks to fetch.
     */
    orderBy?: TaskOrderByWithRelationInput | TaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tasks.
     */
    cursor?: TaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tasks.
     */
    skip?: number
    distinct?: TaskScalarFieldEnum | TaskScalarFieldEnum[]
  }

  /**
   * Task create
   */
  export type TaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Task.
     */
    data: XOR<TaskCreateInput, TaskUncheckedCreateInput>
  }

  /**
   * Task createMany
   */
  export type TaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Task createManyAndReturn
   */
  export type TaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to create many Tasks.
     */
    data: TaskCreateManyInput | TaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task update
   */
  export type TaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Task.
     */
    data: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
    /**
     * Choose, which Task to update.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task updateMany
   */
  export type TaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
  }

  /**
   * Task updateManyAndReturn
   */
  export type TaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * The data used to update Tasks.
     */
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyInput>
    /**
     * Filter which Tasks to update
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Task upsert
   */
  export type TaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Task to update in case it exists.
     */
    where: TaskWhereUniqueInput
    /**
     * In case the Task found by the `where` argument doesn't exist, create a new Task with this data.
     */
    create: XOR<TaskCreateInput, TaskUncheckedCreateInput>
    /**
     * In case the Task was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TaskUpdateInput, TaskUncheckedUpdateInput>
  }

  /**
   * Task delete
   */
  export type TaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
    /**
     * Filter which Task to delete.
     */
    where: TaskWhereUniqueInput
  }

  /**
   * Task deleteMany
   */
  export type TaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tasks to delete
     */
    where?: TaskWhereInput
    /**
     * Limit how many Tasks to delete.
     */
    limit?: number
  }

  /**
   * Task.project
   */
  export type Task$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
  }

  /**
   * Task.subtasks
   */
  export type Task$subtasksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    cursor?: SubtaskWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Task.chatMessages
   */
  export type Task$chatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * Task without action
   */
  export type TaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Task
     */
    select?: TaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Task
     */
    omit?: TaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TaskInclude<ExtArgs> | null
  }


  /**
   * Model Subtask
   */

  export type AggregateSubtask = {
    _count: SubtaskCountAggregateOutputType | null
    _avg: SubtaskAvgAggregateOutputType | null
    _sum: SubtaskSumAggregateOutputType | null
    _min: SubtaskMinAggregateOutputType | null
    _max: SubtaskMaxAggregateOutputType | null
  }

  export type SubtaskAvgAggregateOutputType = {
    order: number | null
  }

  export type SubtaskSumAggregateOutputType = {
    order: number | null
  }

  export type SubtaskMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    isCompleted: boolean | null
    completedAt: Date | null
    order: number | null
    isAiGenerated: boolean | null
    deletedAt: Date | null
    taskId: string | null
  }

  export type SubtaskMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    title: string | null
    isCompleted: boolean | null
    completedAt: Date | null
    order: number | null
    isAiGenerated: boolean | null
    deletedAt: Date | null
    taskId: string | null
  }

  export type SubtaskCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    title: number
    isCompleted: number
    completedAt: number
    order: number
    isAiGenerated: number
    deletedAt: number
    taskId: number
    _all: number
  }


  export type SubtaskAvgAggregateInputType = {
    order?: true
  }

  export type SubtaskSumAggregateInputType = {
    order?: true
  }

  export type SubtaskMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    isCompleted?: true
    completedAt?: true
    order?: true
    isAiGenerated?: true
    deletedAt?: true
    taskId?: true
  }

  export type SubtaskMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    isCompleted?: true
    completedAt?: true
    order?: true
    isAiGenerated?: true
    deletedAt?: true
    taskId?: true
  }

  export type SubtaskCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    title?: true
    isCompleted?: true
    completedAt?: true
    order?: true
    isAiGenerated?: true
    deletedAt?: true
    taskId?: true
    _all?: true
  }

  export type SubtaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtask to aggregate.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subtasks
    **/
    _count?: true | SubtaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubtaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubtaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubtaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubtaskMaxAggregateInputType
  }

  export type GetSubtaskAggregateType<T extends SubtaskAggregateArgs> = {
        [P in keyof T & keyof AggregateSubtask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubtask[P]>
      : GetScalarType<T[P], AggregateSubtask[P]>
  }




  export type SubtaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubtaskWhereInput
    orderBy?: SubtaskOrderByWithAggregationInput | SubtaskOrderByWithAggregationInput[]
    by: SubtaskScalarFieldEnum[] | SubtaskScalarFieldEnum
    having?: SubtaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubtaskCountAggregateInputType | true
    _avg?: SubtaskAvgAggregateInputType
    _sum?: SubtaskSumAggregateInputType
    _min?: SubtaskMinAggregateInputType
    _max?: SubtaskMaxAggregateInputType
  }

  export type SubtaskGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    title: string
    isCompleted: boolean
    completedAt: Date | null
    order: number
    isAiGenerated: boolean
    deletedAt: Date | null
    taskId: string
    _count: SubtaskCountAggregateOutputType | null
    _avg: SubtaskAvgAggregateOutputType | null
    _sum: SubtaskSumAggregateOutputType | null
    _min: SubtaskMinAggregateOutputType | null
    _max: SubtaskMaxAggregateOutputType | null
  }

  type GetSubtaskGroupByPayload<T extends SubtaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubtaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubtaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubtaskGroupByOutputType[P]>
            : GetScalarType<T[P], SubtaskGroupByOutputType[P]>
        }
      >
    >


  export type SubtaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    isAiGenerated?: boolean
    deletedAt?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    isAiGenerated?: boolean
    deletedAt?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    isAiGenerated?: boolean
    deletedAt?: boolean
    taskId?: boolean
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subtask"]>

  export type SubtaskSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    title?: boolean
    isCompleted?: boolean
    completedAt?: boolean
    order?: boolean
    isAiGenerated?: boolean
    deletedAt?: boolean
    taskId?: boolean
  }

  export type SubtaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt" | "title" | "isCompleted" | "completedAt" | "order" | "isAiGenerated" | "deletedAt" | "taskId", ExtArgs["result"]["subtask"]>
  export type SubtaskInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type SubtaskIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type SubtaskIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $SubtaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subtask"
    objects: {
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      updatedAt: Date
      title: string
      isCompleted: boolean
      completedAt: Date | null
      order: number
      isAiGenerated: boolean
      deletedAt: Date | null
      taskId: string
    }, ExtArgs["result"]["subtask"]>
    composites: {}
  }

  type SubtaskGetPayload<S extends boolean | null | undefined | SubtaskDefaultArgs> = $Result.GetResult<Prisma.$SubtaskPayload, S>

  type SubtaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubtaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubtaskCountAggregateInputType | true
    }

  export interface SubtaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subtask'], meta: { name: 'Subtask' } }
    /**
     * Find zero or one Subtask that matches the filter.
     * @param {SubtaskFindUniqueArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubtaskFindUniqueArgs>(args: SelectSubset<T, SubtaskFindUniqueArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subtask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubtaskFindUniqueOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubtaskFindUniqueOrThrowArgs>(args: SelectSubset<T, SubtaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubtaskFindFirstArgs>(args?: SelectSubset<T, SubtaskFindFirstArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subtask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindFirstOrThrowArgs} args - Arguments to find a Subtask
     * @example
     * // Get one Subtask
     * const subtask = await prisma.subtask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubtaskFindFirstOrThrowArgs>(args?: SelectSubset<T, SubtaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subtasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subtasks
     * const subtasks = await prisma.subtask.findMany()
     * 
     * // Get first 10 Subtasks
     * const subtasks = await prisma.subtask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subtaskWithIdOnly = await prisma.subtask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubtaskFindManyArgs>(args?: SelectSubset<T, SubtaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subtask.
     * @param {SubtaskCreateArgs} args - Arguments to create a Subtask.
     * @example
     * // Create one Subtask
     * const Subtask = await prisma.subtask.create({
     *   data: {
     *     // ... data to create a Subtask
     *   }
     * })
     * 
     */
    create<T extends SubtaskCreateArgs>(args: SelectSubset<T, SubtaskCreateArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subtasks.
     * @param {SubtaskCreateManyArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubtaskCreateManyArgs>(args?: SelectSubset<T, SubtaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subtasks and returns the data saved in the database.
     * @param {SubtaskCreateManyAndReturnArgs} args - Arguments to create many Subtasks.
     * @example
     * // Create many Subtasks
     * const subtask = await prisma.subtask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubtaskCreateManyAndReturnArgs>(args?: SelectSubset<T, SubtaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subtask.
     * @param {SubtaskDeleteArgs} args - Arguments to delete one Subtask.
     * @example
     * // Delete one Subtask
     * const Subtask = await prisma.subtask.delete({
     *   where: {
     *     // ... filter to delete one Subtask
     *   }
     * })
     * 
     */
    delete<T extends SubtaskDeleteArgs>(args: SelectSubset<T, SubtaskDeleteArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subtask.
     * @param {SubtaskUpdateArgs} args - Arguments to update one Subtask.
     * @example
     * // Update one Subtask
     * const subtask = await prisma.subtask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubtaskUpdateArgs>(args: SelectSubset<T, SubtaskUpdateArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subtasks.
     * @param {SubtaskDeleteManyArgs} args - Arguments to filter Subtasks to delete.
     * @example
     * // Delete a few Subtasks
     * const { count } = await prisma.subtask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubtaskDeleteManyArgs>(args?: SelectSubset<T, SubtaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubtaskUpdateManyArgs>(args: SelectSubset<T, SubtaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subtasks and returns the data updated in the database.
     * @param {SubtaskUpdateManyAndReturnArgs} args - Arguments to update many Subtasks.
     * @example
     * // Update many Subtasks
     * const subtask = await prisma.subtask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subtasks and only return the `id`
     * const subtaskWithIdOnly = await prisma.subtask.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubtaskUpdateManyAndReturnArgs>(args: SelectSubset<T, SubtaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subtask.
     * @param {SubtaskUpsertArgs} args - Arguments to update or create a Subtask.
     * @example
     * // Update or create a Subtask
     * const subtask = await prisma.subtask.upsert({
     *   create: {
     *     // ... data to create a Subtask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subtask we want to update
     *   }
     * })
     */
    upsert<T extends SubtaskUpsertArgs>(args: SelectSubset<T, SubtaskUpsertArgs<ExtArgs>>): Prisma__SubtaskClient<$Result.GetResult<Prisma.$SubtaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subtasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskCountArgs} args - Arguments to filter Subtasks to count.
     * @example
     * // Count the number of Subtasks
     * const count = await prisma.subtask.count({
     *   where: {
     *     // ... the filter for the Subtasks we want to count
     *   }
     * })
    **/
    count<T extends SubtaskCountArgs>(
      args?: Subset<T, SubtaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubtaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubtaskAggregateArgs>(args: Subset<T, SubtaskAggregateArgs>): Prisma.PrismaPromise<GetSubtaskAggregateType<T>>

    /**
     * Group by Subtask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubtaskGroupByArgs} args - Group by arguments.
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
      T extends SubtaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubtaskGroupByArgs['orderBy'] }
        : { orderBy?: SubtaskGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubtaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubtaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subtask model
   */
  readonly fields: SubtaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subtask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubtaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Subtask model
   */
  interface SubtaskFieldRefs {
    readonly id: FieldRef<"Subtask", 'String'>
    readonly createdAt: FieldRef<"Subtask", 'DateTime'>
    readonly updatedAt: FieldRef<"Subtask", 'DateTime'>
    readonly title: FieldRef<"Subtask", 'String'>
    readonly isCompleted: FieldRef<"Subtask", 'Boolean'>
    readonly completedAt: FieldRef<"Subtask", 'DateTime'>
    readonly order: FieldRef<"Subtask", 'Int'>
    readonly isAiGenerated: FieldRef<"Subtask", 'Boolean'>
    readonly deletedAt: FieldRef<"Subtask", 'DateTime'>
    readonly taskId: FieldRef<"Subtask", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Subtask findUnique
   */
  export type SubtaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask findUniqueOrThrow
   */
  export type SubtaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask findFirst
   */
  export type SubtaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask findFirstOrThrow
   */
  export type SubtaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtask to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subtasks.
     */
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask findMany
   */
  export type SubtaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter, which Subtasks to fetch.
     */
    where?: SubtaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subtasks to fetch.
     */
    orderBy?: SubtaskOrderByWithRelationInput | SubtaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subtasks.
     */
    cursor?: SubtaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subtasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subtasks.
     */
    skip?: number
    distinct?: SubtaskScalarFieldEnum | SubtaskScalarFieldEnum[]
  }

  /**
   * Subtask create
   */
  export type SubtaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The data needed to create a Subtask.
     */
    data: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>
  }

  /**
   * Subtask createMany
   */
  export type SubtaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subtask createManyAndReturn
   */
  export type SubtaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * The data used to create many Subtasks.
     */
    data: SubtaskCreateManyInput | SubtaskCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtask update
   */
  export type SubtaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The data needed to update a Subtask.
     */
    data: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>
    /**
     * Choose, which Subtask to update.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask updateMany
   */
  export type SubtaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number
  }

  /**
   * Subtask updateManyAndReturn
   */
  export type SubtaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * The data used to update Subtasks.
     */
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyInput>
    /**
     * Filter which Subtasks to update
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Subtask upsert
   */
  export type SubtaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * The filter to search for the Subtask to update in case it exists.
     */
    where: SubtaskWhereUniqueInput
    /**
     * In case the Subtask found by the `where` argument doesn't exist, create a new Subtask with this data.
     */
    create: XOR<SubtaskCreateInput, SubtaskUncheckedCreateInput>
    /**
     * In case the Subtask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubtaskUpdateInput, SubtaskUncheckedUpdateInput>
  }

  /**
   * Subtask delete
   */
  export type SubtaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
    /**
     * Filter which Subtask to delete.
     */
    where: SubtaskWhereUniqueInput
  }

  /**
   * Subtask deleteMany
   */
  export type SubtaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subtasks to delete
     */
    where?: SubtaskWhereInput
    /**
     * Limit how many Subtasks to delete.
     */
    limit?: number
  }

  /**
   * Subtask without action
   */
  export type SubtaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subtask
     */
    select?: SubtaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subtask
     */
    omit?: SubtaskOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubtaskInclude<ExtArgs> | null
  }


  /**
   * Model ChatMessage
   */

  export type AggregateChatMessage = {
    _count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  export type ChatMessageAvgAggregateOutputType = {
    aiTokensUsed: number | null
  }

  export type ChatMessageSumAggregateOutputType = {
    aiTokensUsed: number | null
  }

  export type ChatMessageMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    role: $Enums.ChatRole | null
    content: string | null
    isExcluded: boolean | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    appliedAt: Date | null
    mutationId: string | null
    deletedAt: Date | null
    taskId: string | null
  }

  export type ChatMessageMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    role: $Enums.ChatRole | null
    content: string | null
    isExcluded: boolean | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    appliedAt: Date | null
    mutationId: string | null
    deletedAt: Date | null
    taskId: string | null
  }

  export type ChatMessageCountAggregateOutputType = {
    id: number
    createdAt: number
    role: number
    content: number
    isExcluded: number
    aiModelUsed: number
    aiTokensUsed: number
    appliedAt: number
    mutationId: number
    deletedAt: number
    taskId: number
    _all: number
  }


  export type ChatMessageAvgAggregateInputType = {
    aiTokensUsed?: true
  }

  export type ChatMessageSumAggregateInputType = {
    aiTokensUsed?: true
  }

  export type ChatMessageMinAggregateInputType = {
    id?: true
    createdAt?: true
    role?: true
    content?: true
    isExcluded?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    appliedAt?: true
    mutationId?: true
    deletedAt?: true
    taskId?: true
  }

  export type ChatMessageMaxAggregateInputType = {
    id?: true
    createdAt?: true
    role?: true
    content?: true
    isExcluded?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    appliedAt?: true
    mutationId?: true
    deletedAt?: true
    taskId?: true
  }

  export type ChatMessageCountAggregateInputType = {
    id?: true
    createdAt?: true
    role?: true
    content?: true
    isExcluded?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    appliedAt?: true
    mutationId?: true
    deletedAt?: true
    taskId?: true
    _all?: true
  }

  export type ChatMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessage to aggregate.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ChatMessages
    **/
    _count?: true | ChatMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChatMessageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatMessageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMessageMaxAggregateInputType
  }

  export type GetChatMessageAggregateType<T extends ChatMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateChatMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChatMessage[P]>
      : GetScalarType<T[P], AggregateChatMessage[P]>
  }




  export type ChatMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithAggregationInput | ChatMessageOrderByWithAggregationInput[]
    by: ChatMessageScalarFieldEnum[] | ChatMessageScalarFieldEnum
    having?: ChatMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatMessageCountAggregateInputType | true
    _avg?: ChatMessageAvgAggregateInputType
    _sum?: ChatMessageSumAggregateInputType
    _min?: ChatMessageMinAggregateInputType
    _max?: ChatMessageMaxAggregateInputType
  }

  export type ChatMessageGroupByOutputType = {
    id: string
    createdAt: Date
    role: $Enums.ChatRole
    content: string
    isExcluded: boolean
    aiModelUsed: string | null
    aiTokensUsed: number | null
    appliedAt: Date | null
    mutationId: string | null
    deletedAt: Date | null
    taskId: string
    _count: ChatMessageCountAggregateOutputType | null
    _avg: ChatMessageAvgAggregateOutputType | null
    _sum: ChatMessageSumAggregateOutputType | null
    _min: ChatMessageMinAggregateOutputType | null
    _max: ChatMessageMaxAggregateOutputType | null
  }

  type GetChatMessageGroupByPayload<T extends ChatMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
            : GetScalarType<T[P], ChatMessageGroupByOutputType[P]>
        }
      >
    >


  export type ChatMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    role?: boolean
    content?: boolean
    isExcluded?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    appliedAt?: boolean
    mutationId?: boolean
    deletedAt?: boolean
    taskId?: boolean
    mutation?: boolean | ChatMessage$mutationArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    role?: boolean
    content?: boolean
    isExcluded?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    appliedAt?: boolean
    mutationId?: boolean
    deletedAt?: boolean
    taskId?: boolean
    mutation?: boolean | ChatMessage$mutationArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    role?: boolean
    content?: boolean
    isExcluded?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    appliedAt?: boolean
    mutationId?: boolean
    deletedAt?: boolean
    taskId?: boolean
    mutation?: boolean | ChatMessage$mutationArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chatMessage"]>

  export type ChatMessageSelectScalar = {
    id?: boolean
    createdAt?: boolean
    role?: boolean
    content?: boolean
    isExcluded?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    appliedAt?: boolean
    mutationId?: boolean
    deletedAt?: boolean
    taskId?: boolean
  }

  export type ChatMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "role" | "content" | "isExcluded" | "aiModelUsed" | "aiTokensUsed" | "appliedAt" | "mutationId" | "deletedAt" | "taskId", ExtArgs["result"]["chatMessage"]>
  export type ChatMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mutation?: boolean | ChatMessage$mutationArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type ChatMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mutation?: boolean | ChatMessage$mutationArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }
  export type ChatMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mutation?: boolean | ChatMessage$mutationArgs<ExtArgs>
    task?: boolean | TaskDefaultArgs<ExtArgs>
  }

  export type $ChatMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ChatMessage"
    objects: {
      mutation: Prisma.$ActionHistoryPayload<ExtArgs> | null
      task: Prisma.$TaskPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      role: $Enums.ChatRole
      content: string
      isExcluded: boolean
      aiModelUsed: string | null
      aiTokensUsed: number | null
      appliedAt: Date | null
      mutationId: string | null
      deletedAt: Date | null
      taskId: string
    }, ExtArgs["result"]["chatMessage"]>
    composites: {}
  }

  type ChatMessageGetPayload<S extends boolean | null | undefined | ChatMessageDefaultArgs> = $Result.GetResult<Prisma.$ChatMessagePayload, S>

  type ChatMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatMessageCountAggregateInputType | true
    }

  export interface ChatMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ChatMessage'], meta: { name: 'ChatMessage' } }
    /**
     * Find zero or one ChatMessage that matches the filter.
     * @param {ChatMessageFindUniqueArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatMessageFindUniqueArgs>(args: SelectSubset<T, ChatMessageFindUniqueArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ChatMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatMessageFindUniqueOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatMessageFindFirstArgs>(args?: SelectSubset<T, ChatMessageFindFirstArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ChatMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindFirstOrThrowArgs} args - Arguments to find a ChatMessage
     * @example
     * // Get one ChatMessage
     * const chatMessage = await prisma.chatMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ChatMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany()
     * 
     * // Get first 10 ChatMessages
     * const chatMessages = await prisma.chatMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatMessageFindManyArgs>(args?: SelectSubset<T, ChatMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ChatMessage.
     * @param {ChatMessageCreateArgs} args - Arguments to create a ChatMessage.
     * @example
     * // Create one ChatMessage
     * const ChatMessage = await prisma.chatMessage.create({
     *   data: {
     *     // ... data to create a ChatMessage
     *   }
     * })
     * 
     */
    create<T extends ChatMessageCreateArgs>(args: SelectSubset<T, ChatMessageCreateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ChatMessages.
     * @param {ChatMessageCreateManyArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatMessageCreateManyArgs>(args?: SelectSubset<T, ChatMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ChatMessages and returns the data saved in the database.
     * @param {ChatMessageCreateManyAndReturnArgs} args - Arguments to create many ChatMessages.
     * @example
     * // Create many ChatMessages
     * const chatMessage = await prisma.chatMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ChatMessage.
     * @param {ChatMessageDeleteArgs} args - Arguments to delete one ChatMessage.
     * @example
     * // Delete one ChatMessage
     * const ChatMessage = await prisma.chatMessage.delete({
     *   where: {
     *     // ... filter to delete one ChatMessage
     *   }
     * })
     * 
     */
    delete<T extends ChatMessageDeleteArgs>(args: SelectSubset<T, ChatMessageDeleteArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ChatMessage.
     * @param {ChatMessageUpdateArgs} args - Arguments to update one ChatMessage.
     * @example
     * // Update one ChatMessage
     * const chatMessage = await prisma.chatMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatMessageUpdateArgs>(args: SelectSubset<T, ChatMessageUpdateArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ChatMessages.
     * @param {ChatMessageDeleteManyArgs} args - Arguments to filter ChatMessages to delete.
     * @example
     * // Delete a few ChatMessages
     * const { count } = await prisma.chatMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatMessageDeleteManyArgs>(args?: SelectSubset<T, ChatMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatMessageUpdateManyArgs>(args: SelectSubset<T, ChatMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ChatMessages and returns the data updated in the database.
     * @param {ChatMessageUpdateManyAndReturnArgs} args - Arguments to update many ChatMessages.
     * @example
     * // Update many ChatMessages
     * const chatMessage = await prisma.chatMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ChatMessages and only return the `id`
     * const chatMessageWithIdOnly = await prisma.chatMessage.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChatMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ChatMessage.
     * @param {ChatMessageUpsertArgs} args - Arguments to update or create a ChatMessage.
     * @example
     * // Update or create a ChatMessage
     * const chatMessage = await prisma.chatMessage.upsert({
     *   create: {
     *     // ... data to create a ChatMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChatMessage we want to update
     *   }
     * })
     */
    upsert<T extends ChatMessageUpsertArgs>(args: SelectSubset<T, ChatMessageUpsertArgs<ExtArgs>>): Prisma__ChatMessageClient<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ChatMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageCountArgs} args - Arguments to filter ChatMessages to count.
     * @example
     * // Count the number of ChatMessages
     * const count = await prisma.chatMessage.count({
     *   where: {
     *     // ... the filter for the ChatMessages we want to count
     *   }
     * })
    **/
    count<T extends ChatMessageCountArgs>(
      args?: Subset<T, ChatMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChatMessageAggregateArgs>(args: Subset<T, ChatMessageAggregateArgs>): Prisma.PrismaPromise<GetChatMessageAggregateType<T>>

    /**
     * Group by ChatMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatMessageGroupByArgs} args - Group by arguments.
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
      T extends ChatMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatMessageGroupByArgs['orderBy'] }
        : { orderBy?: ChatMessageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ChatMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ChatMessage model
   */
  readonly fields: ChatMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ChatMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mutation<T extends ChatMessage$mutationArgs<ExtArgs> = {}>(args?: Subset<T, ChatMessage$mutationArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    task<T extends TaskDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TaskDefaultArgs<ExtArgs>>): Prisma__TaskClient<$Result.GetResult<Prisma.$TaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ChatMessage model
   */
  interface ChatMessageFieldRefs {
    readonly id: FieldRef<"ChatMessage", 'String'>
    readonly createdAt: FieldRef<"ChatMessage", 'DateTime'>
    readonly role: FieldRef<"ChatMessage", 'ChatRole'>
    readonly content: FieldRef<"ChatMessage", 'String'>
    readonly isExcluded: FieldRef<"ChatMessage", 'Boolean'>
    readonly aiModelUsed: FieldRef<"ChatMessage", 'String'>
    readonly aiTokensUsed: FieldRef<"ChatMessage", 'Int'>
    readonly appliedAt: FieldRef<"ChatMessage", 'DateTime'>
    readonly mutationId: FieldRef<"ChatMessage", 'String'>
    readonly deletedAt: FieldRef<"ChatMessage", 'DateTime'>
    readonly taskId: FieldRef<"ChatMessage", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ChatMessage findUnique
   */
  export type ChatMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findUniqueOrThrow
   */
  export type ChatMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage findFirst
   */
  export type ChatMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findFirstOrThrow
   */
  export type ChatMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessage to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ChatMessages.
     */
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage findMany
   */
  export type ChatMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter, which ChatMessages to fetch.
     */
    where?: ChatMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ChatMessages to fetch.
     */
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ChatMessages.
     */
    cursor?: ChatMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ChatMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ChatMessages.
     */
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ChatMessage create
   */
  export type ChatMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a ChatMessage.
     */
    data: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
  }

  /**
   * ChatMessage createMany
   */
  export type ChatMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ChatMessage createManyAndReturn
   */
  export type ChatMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to create many ChatMessages.
     */
    data: ChatMessageCreateManyInput | ChatMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMessage update
   */
  export type ChatMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a ChatMessage.
     */
    data: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
    /**
     * Choose, which ChatMessage to update.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage updateMany
   */
  export type ChatMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
  }

  /**
   * ChatMessage updateManyAndReturn
   */
  export type ChatMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * The data used to update ChatMessages.
     */
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyInput>
    /**
     * Filter which ChatMessages to update
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ChatMessage upsert
   */
  export type ChatMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the ChatMessage to update in case it exists.
     */
    where: ChatMessageWhereUniqueInput
    /**
     * In case the ChatMessage found by the `where` argument doesn't exist, create a new ChatMessage with this data.
     */
    create: XOR<ChatMessageCreateInput, ChatMessageUncheckedCreateInput>
    /**
     * In case the ChatMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatMessageUpdateInput, ChatMessageUncheckedUpdateInput>
  }

  /**
   * ChatMessage delete
   */
  export type ChatMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    /**
     * Filter which ChatMessage to delete.
     */
    where: ChatMessageWhereUniqueInput
  }

  /**
   * ChatMessage deleteMany
   */
  export type ChatMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ChatMessages to delete
     */
    where?: ChatMessageWhereInput
    /**
     * Limit how many ChatMessages to delete.
     */
    limit?: number
  }

  /**
   * ChatMessage.mutation
   */
  export type ChatMessage$mutationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    where?: ActionHistoryWhereInput
  }

  /**
   * ChatMessage without action
   */
  export type ChatMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
  }


  /**
   * Model ActionHistory
   */

  export type AggregateActionHistory = {
    _count: ActionHistoryCountAggregateOutputType | null
    _avg: ActionHistoryAvgAggregateOutputType | null
    _sum: ActionHistorySumAggregateOutputType | null
    _min: ActionHistoryMinAggregateOutputType | null
    _max: ActionHistoryMaxAggregateOutputType | null
  }

  export type ActionHistoryAvgAggregateOutputType = {
    aiTokensUsed: number | null
  }

  export type ActionHistorySumAggregateOutputType = {
    aiTokensUsed: number | null
  }

  export type ActionHistoryMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    actionType: $Enums.ActionType | null
    entityType: $Enums.EntityType | null
    entityId: string | null
    aiPromptUsed: string | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    isUndone: boolean | null
    undoneAt: Date | null
    undoneById: string | null
  }

  export type ActionHistoryMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    userId: string | null
    actionType: $Enums.ActionType | null
    entityType: $Enums.EntityType | null
    entityId: string | null
    aiPromptUsed: string | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    isUndone: boolean | null
    undoneAt: Date | null
    undoneById: string | null
  }

  export type ActionHistoryCountAggregateOutputType = {
    id: number
    createdAt: number
    userId: number
    actionType: number
    entityType: number
    entityId: number
    payload: number
    aiPromptUsed: number
    aiModelUsed: number
    aiTokensUsed: number
    isUndone: number
    undoneAt: number
    undoneById: number
    _all: number
  }


  export type ActionHistoryAvgAggregateInputType = {
    aiTokensUsed?: true
  }

  export type ActionHistorySumAggregateInputType = {
    aiTokensUsed?: true
  }

  export type ActionHistoryMinAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    actionType?: true
    entityType?: true
    entityId?: true
    aiPromptUsed?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    isUndone?: true
    undoneAt?: true
    undoneById?: true
  }

  export type ActionHistoryMaxAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    actionType?: true
    entityType?: true
    entityId?: true
    aiPromptUsed?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    isUndone?: true
    undoneAt?: true
    undoneById?: true
  }

  export type ActionHistoryCountAggregateInputType = {
    id?: true
    createdAt?: true
    userId?: true
    actionType?: true
    entityType?: true
    entityId?: true
    payload?: true
    aiPromptUsed?: true
    aiModelUsed?: true
    aiTokensUsed?: true
    isUndone?: true
    undoneAt?: true
    undoneById?: true
    _all?: true
  }

  export type ActionHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionHistory to aggregate.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActionHistories
    **/
    _count?: true | ActionHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActionHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActionHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActionHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActionHistoryMaxAggregateInputType
  }

  export type GetActionHistoryAggregateType<T extends ActionHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateActionHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActionHistory[P]>
      : GetScalarType<T[P], AggregateActionHistory[P]>
  }




  export type ActionHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActionHistoryWhereInput
    orderBy?: ActionHistoryOrderByWithAggregationInput | ActionHistoryOrderByWithAggregationInput[]
    by: ActionHistoryScalarFieldEnum[] | ActionHistoryScalarFieldEnum
    having?: ActionHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActionHistoryCountAggregateInputType | true
    _avg?: ActionHistoryAvgAggregateInputType
    _sum?: ActionHistorySumAggregateInputType
    _min?: ActionHistoryMinAggregateInputType
    _max?: ActionHistoryMaxAggregateInputType
  }

  export type ActionHistoryGroupByOutputType = {
    id: string
    createdAt: Date
    userId: string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonValue
    aiPromptUsed: string | null
    aiModelUsed: string | null
    aiTokensUsed: number | null
    isUndone: boolean
    undoneAt: Date | null
    undoneById: string | null
    _count: ActionHistoryCountAggregateOutputType | null
    _avg: ActionHistoryAvgAggregateOutputType | null
    _sum: ActionHistorySumAggregateOutputType | null
    _min: ActionHistoryMinAggregateOutputType | null
    _max: ActionHistoryMaxAggregateOutputType | null
  }

  type GetActionHistoryGroupByPayload<T extends ActionHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActionHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActionHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActionHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], ActionHistoryGroupByOutputType[P]>
        }
      >
    >


  export type ActionHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    actionType?: boolean
    entityType?: boolean
    entityId?: boolean
    payload?: boolean
    aiPromptUsed?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    isUndone?: boolean
    undoneAt?: boolean
    undoneById?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    undoneBy?: boolean | ActionHistory$undoneByArgs<ExtArgs>
    chatMessages?: boolean | ActionHistory$chatMessagesArgs<ExtArgs>
    _count?: boolean | ActionHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["actionHistory"]>

  export type ActionHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    actionType?: boolean
    entityType?: boolean
    entityId?: boolean
    payload?: boolean
    aiPromptUsed?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    isUndone?: boolean
    undoneAt?: boolean
    undoneById?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    undoneBy?: boolean | ActionHistory$undoneByArgs<ExtArgs>
  }, ExtArgs["result"]["actionHistory"]>

  export type ActionHistorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    actionType?: boolean
    entityType?: boolean
    entityId?: boolean
    payload?: boolean
    aiPromptUsed?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    isUndone?: boolean
    undoneAt?: boolean
    undoneById?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    undoneBy?: boolean | ActionHistory$undoneByArgs<ExtArgs>
  }, ExtArgs["result"]["actionHistory"]>

  export type ActionHistorySelectScalar = {
    id?: boolean
    createdAt?: boolean
    userId?: boolean
    actionType?: boolean
    entityType?: boolean
    entityId?: boolean
    payload?: boolean
    aiPromptUsed?: boolean
    aiModelUsed?: boolean
    aiTokensUsed?: boolean
    isUndone?: boolean
    undoneAt?: boolean
    undoneById?: boolean
  }

  export type ActionHistoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "userId" | "actionType" | "entityType" | "entityId" | "payload" | "aiPromptUsed" | "aiModelUsed" | "aiTokensUsed" | "isUndone" | "undoneAt" | "undoneById", ExtArgs["result"]["actionHistory"]>
  export type ActionHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    undoneBy?: boolean | ActionHistory$undoneByArgs<ExtArgs>
    chatMessages?: boolean | ActionHistory$chatMessagesArgs<ExtArgs>
    _count?: boolean | ActionHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActionHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    undoneBy?: boolean | ActionHistory$undoneByArgs<ExtArgs>
  }
  export type ActionHistoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    undoneBy?: boolean | ActionHistory$undoneByArgs<ExtArgs>
  }

  export type $ActionHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActionHistory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      undoneBy: Prisma.$UserPayload<ExtArgs> | null
      chatMessages: Prisma.$ChatMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      userId: string
      actionType: $Enums.ActionType
      entityType: $Enums.EntityType
      entityId: string
      payload: Prisma.JsonValue
      aiPromptUsed: string | null
      aiModelUsed: string | null
      aiTokensUsed: number | null
      isUndone: boolean
      undoneAt: Date | null
      undoneById: string | null
    }, ExtArgs["result"]["actionHistory"]>
    composites: {}
  }

  type ActionHistoryGetPayload<S extends boolean | null | undefined | ActionHistoryDefaultArgs> = $Result.GetResult<Prisma.$ActionHistoryPayload, S>

  type ActionHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActionHistoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActionHistoryCountAggregateInputType | true
    }

  export interface ActionHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActionHistory'], meta: { name: 'ActionHistory' } }
    /**
     * Find zero or one ActionHistory that matches the filter.
     * @param {ActionHistoryFindUniqueArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActionHistoryFindUniqueArgs>(args: SelectSubset<T, ActionHistoryFindUniqueArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActionHistory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActionHistoryFindUniqueOrThrowArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActionHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ActionHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryFindFirstArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActionHistoryFindFirstArgs>(args?: SelectSubset<T, ActionHistoryFindFirstArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActionHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryFindFirstOrThrowArgs} args - Arguments to find a ActionHistory
     * @example
     * // Get one ActionHistory
     * const actionHistory = await prisma.actionHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActionHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ActionHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActionHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActionHistories
     * const actionHistories = await prisma.actionHistory.findMany()
     * 
     * // Get first 10 ActionHistories
     * const actionHistories = await prisma.actionHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const actionHistoryWithIdOnly = await prisma.actionHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActionHistoryFindManyArgs>(args?: SelectSubset<T, ActionHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActionHistory.
     * @param {ActionHistoryCreateArgs} args - Arguments to create a ActionHistory.
     * @example
     * // Create one ActionHistory
     * const ActionHistory = await prisma.actionHistory.create({
     *   data: {
     *     // ... data to create a ActionHistory
     *   }
     * })
     * 
     */
    create<T extends ActionHistoryCreateArgs>(args: SelectSubset<T, ActionHistoryCreateArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActionHistories.
     * @param {ActionHistoryCreateManyArgs} args - Arguments to create many ActionHistories.
     * @example
     * // Create many ActionHistories
     * const actionHistory = await prisma.actionHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActionHistoryCreateManyArgs>(args?: SelectSubset<T, ActionHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActionHistories and returns the data saved in the database.
     * @param {ActionHistoryCreateManyAndReturnArgs} args - Arguments to create many ActionHistories.
     * @example
     * // Create many ActionHistories
     * const actionHistory = await prisma.actionHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActionHistories and only return the `id`
     * const actionHistoryWithIdOnly = await prisma.actionHistory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActionHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ActionHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActionHistory.
     * @param {ActionHistoryDeleteArgs} args - Arguments to delete one ActionHistory.
     * @example
     * // Delete one ActionHistory
     * const ActionHistory = await prisma.actionHistory.delete({
     *   where: {
     *     // ... filter to delete one ActionHistory
     *   }
     * })
     * 
     */
    delete<T extends ActionHistoryDeleteArgs>(args: SelectSubset<T, ActionHistoryDeleteArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActionHistory.
     * @param {ActionHistoryUpdateArgs} args - Arguments to update one ActionHistory.
     * @example
     * // Update one ActionHistory
     * const actionHistory = await prisma.actionHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActionHistoryUpdateArgs>(args: SelectSubset<T, ActionHistoryUpdateArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActionHistories.
     * @param {ActionHistoryDeleteManyArgs} args - Arguments to filter ActionHistories to delete.
     * @example
     * // Delete a few ActionHistories
     * const { count } = await prisma.actionHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActionHistoryDeleteManyArgs>(args?: SelectSubset<T, ActionHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActionHistories
     * const actionHistory = await prisma.actionHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActionHistoryUpdateManyArgs>(args: SelectSubset<T, ActionHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActionHistories and returns the data updated in the database.
     * @param {ActionHistoryUpdateManyAndReturnArgs} args - Arguments to update many ActionHistories.
     * @example
     * // Update many ActionHistories
     * const actionHistory = await prisma.actionHistory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActionHistories and only return the `id`
     * const actionHistoryWithIdOnly = await prisma.actionHistory.updateManyAndReturn({
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
    updateManyAndReturn<T extends ActionHistoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ActionHistoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActionHistory.
     * @param {ActionHistoryUpsertArgs} args - Arguments to update or create a ActionHistory.
     * @example
     * // Update or create a ActionHistory
     * const actionHistory = await prisma.actionHistory.upsert({
     *   create: {
     *     // ... data to create a ActionHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActionHistory we want to update
     *   }
     * })
     */
    upsert<T extends ActionHistoryUpsertArgs>(args: SelectSubset<T, ActionHistoryUpsertArgs<ExtArgs>>): Prisma__ActionHistoryClient<$Result.GetResult<Prisma.$ActionHistoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActionHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryCountArgs} args - Arguments to filter ActionHistories to count.
     * @example
     * // Count the number of ActionHistories
     * const count = await prisma.actionHistory.count({
     *   where: {
     *     // ... the filter for the ActionHistories we want to count
     *   }
     * })
    **/
    count<T extends ActionHistoryCountArgs>(
      args?: Subset<T, ActionHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActionHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActionHistoryAggregateArgs>(args: Subset<T, ActionHistoryAggregateArgs>): Prisma.PrismaPromise<GetActionHistoryAggregateType<T>>

    /**
     * Group by ActionHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActionHistoryGroupByArgs} args - Group by arguments.
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
      T extends ActionHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActionHistoryGroupByArgs['orderBy'] }
        : { orderBy?: ActionHistoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActionHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActionHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActionHistory model
   */
  readonly fields: ActionHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActionHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActionHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    undoneBy<T extends ActionHistory$undoneByArgs<ExtArgs> = {}>(args?: Subset<T, ActionHistory$undoneByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    chatMessages<T extends ActionHistory$chatMessagesArgs<ExtArgs> = {}>(args?: Subset<T, ActionHistory$chatMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ActionHistory model
   */
  interface ActionHistoryFieldRefs {
    readonly id: FieldRef<"ActionHistory", 'String'>
    readonly createdAt: FieldRef<"ActionHistory", 'DateTime'>
    readonly userId: FieldRef<"ActionHistory", 'String'>
    readonly actionType: FieldRef<"ActionHistory", 'ActionType'>
    readonly entityType: FieldRef<"ActionHistory", 'EntityType'>
    readonly entityId: FieldRef<"ActionHistory", 'String'>
    readonly payload: FieldRef<"ActionHistory", 'Json'>
    readonly aiPromptUsed: FieldRef<"ActionHistory", 'String'>
    readonly aiModelUsed: FieldRef<"ActionHistory", 'String'>
    readonly aiTokensUsed: FieldRef<"ActionHistory", 'Int'>
    readonly isUndone: FieldRef<"ActionHistory", 'Boolean'>
    readonly undoneAt: FieldRef<"ActionHistory", 'DateTime'>
    readonly undoneById: FieldRef<"ActionHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ActionHistory findUnique
   */
  export type ActionHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory findUniqueOrThrow
   */
  export type ActionHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory findFirst
   */
  export type ActionHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionHistories.
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionHistories.
     */
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * ActionHistory findFirstOrThrow
   */
  export type ActionHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistory to fetch.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActionHistories.
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActionHistories.
     */
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * ActionHistory findMany
   */
  export type ActionHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter, which ActionHistories to fetch.
     */
    where?: ActionHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActionHistories to fetch.
     */
    orderBy?: ActionHistoryOrderByWithRelationInput | ActionHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActionHistories.
     */
    cursor?: ActionHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActionHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActionHistories.
     */
    skip?: number
    distinct?: ActionHistoryScalarFieldEnum | ActionHistoryScalarFieldEnum[]
  }

  /**
   * ActionHistory create
   */
  export type ActionHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ActionHistory.
     */
    data: XOR<ActionHistoryCreateInput, ActionHistoryUncheckedCreateInput>
  }

  /**
   * ActionHistory createMany
   */
  export type ActionHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActionHistories.
     */
    data: ActionHistoryCreateManyInput | ActionHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActionHistory createManyAndReturn
   */
  export type ActionHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * The data used to create many ActionHistories.
     */
    data: ActionHistoryCreateManyInput | ActionHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionHistory update
   */
  export type ActionHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ActionHistory.
     */
    data: XOR<ActionHistoryUpdateInput, ActionHistoryUncheckedUpdateInput>
    /**
     * Choose, which ActionHistory to update.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory updateMany
   */
  export type ActionHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActionHistories.
     */
    data: XOR<ActionHistoryUpdateManyMutationInput, ActionHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ActionHistories to update
     */
    where?: ActionHistoryWhereInput
    /**
     * Limit how many ActionHistories to update.
     */
    limit?: number
  }

  /**
   * ActionHistory updateManyAndReturn
   */
  export type ActionHistoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * The data used to update ActionHistories.
     */
    data: XOR<ActionHistoryUpdateManyMutationInput, ActionHistoryUncheckedUpdateManyInput>
    /**
     * Filter which ActionHistories to update
     */
    where?: ActionHistoryWhereInput
    /**
     * Limit how many ActionHistories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActionHistory upsert
   */
  export type ActionHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ActionHistory to update in case it exists.
     */
    where: ActionHistoryWhereUniqueInput
    /**
     * In case the ActionHistory found by the `where` argument doesn't exist, create a new ActionHistory with this data.
     */
    create: XOR<ActionHistoryCreateInput, ActionHistoryUncheckedCreateInput>
    /**
     * In case the ActionHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActionHistoryUpdateInput, ActionHistoryUncheckedUpdateInput>
  }

  /**
   * ActionHistory delete
   */
  export type ActionHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
    /**
     * Filter which ActionHistory to delete.
     */
    where: ActionHistoryWhereUniqueInput
  }

  /**
   * ActionHistory deleteMany
   */
  export type ActionHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActionHistories to delete
     */
    where?: ActionHistoryWhereInput
    /**
     * Limit how many ActionHistories to delete.
     */
    limit?: number
  }

  /**
   * ActionHistory.undoneBy
   */
  export type ActionHistory$undoneByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * ActionHistory.chatMessages
   */
  export type ActionHistory$chatMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessage
     */
    select?: ChatMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ChatMessage
     */
    omit?: ChatMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatMessageInclude<ExtArgs> | null
    where?: ChatMessageWhereInput
    orderBy?: ChatMessageOrderByWithRelationInput | ChatMessageOrderByWithRelationInput[]
    cursor?: ChatMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ChatMessageScalarFieldEnum | ChatMessageScalarFieldEnum[]
  }

  /**
   * ActionHistory without action
   */
  export type ActionHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActionHistory
     */
    select?: ActionHistorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActionHistory
     */
    omit?: ActionHistoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActionHistoryInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    telegramId: 'telegramId',
    telegramName: 'telegramName',
    telegramPhoto: 'telegramPhoto',
    encryptedApiKey: 'encryptedApiKey',
    tier: 'tier',
    aiCreditsUsed: 'aiCreditsUsed',
    aiCreditsResetAt: 'aiCreditsResetAt',
    timezone: 'timezone',
    locale: 'locale',
    isOnboarded: 'isOnboarded',
    deletedAt: 'deletedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    name: 'name',
    description: 'description',
    emoji: 'emoji',
    color: 'color',
    aiContext: 'aiContext',
    order: 'order',
    parentId: 'parentId',
    isArchived: 'isArchived',
    deletedAt: 'deletedAt',
    userId: 'userId'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const TaskScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    summary: 'summary',
    originalInput: 'originalInput',
    originalInputType: 'originalInputType',
    status: 'status',
    priority: 'priority',
    deadline: 'deadline',
    startDate: 'startDate',
    estimatedMinutes: 'estimatedMinutes',
    order: 'order',
    aiProcessedAt: 'aiProcessedAt',
    aiModelUsed: 'aiModelUsed',
    aiTokensUsed: 'aiTokensUsed',
    deletedAt: 'deletedAt',
    userId: 'userId',
    projectId: 'projectId'
  };

  export type TaskScalarFieldEnum = (typeof TaskScalarFieldEnum)[keyof typeof TaskScalarFieldEnum]


  export const SubtaskScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    title: 'title',
    isCompleted: 'isCompleted',
    completedAt: 'completedAt',
    order: 'order',
    isAiGenerated: 'isAiGenerated',
    deletedAt: 'deletedAt',
    taskId: 'taskId'
  };

  export type SubtaskScalarFieldEnum = (typeof SubtaskScalarFieldEnum)[keyof typeof SubtaskScalarFieldEnum]


  export const ChatMessageScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    role: 'role',
    content: 'content',
    isExcluded: 'isExcluded',
    aiModelUsed: 'aiModelUsed',
    aiTokensUsed: 'aiTokensUsed',
    appliedAt: 'appliedAt',
    mutationId: 'mutationId',
    deletedAt: 'deletedAt',
    taskId: 'taskId'
  };

  export type ChatMessageScalarFieldEnum = (typeof ChatMessageScalarFieldEnum)[keyof typeof ChatMessageScalarFieldEnum]


  export const ActionHistoryScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    userId: 'userId',
    actionType: 'actionType',
    entityType: 'entityType',
    entityId: 'entityId',
    payload: 'payload',
    aiPromptUsed: 'aiPromptUsed',
    aiModelUsed: 'aiModelUsed',
    aiTokensUsed: 'aiTokensUsed',
    isUndone: 'isUndone',
    undoneAt: 'undoneAt',
    undoneById: 'undoneById'
  };

  export type ActionHistoryScalarFieldEnum = (typeof ActionHistoryScalarFieldEnum)[keyof typeof ActionHistoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    telegramName: 'telegramName',
    telegramPhoto: 'telegramPhoto',
    encryptedApiKey: 'encryptedApiKey',
    timezone: 'timezone',
    locale: 'locale'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ProjectOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    emoji: 'emoji',
    color: 'color',
    aiContext: 'aiContext',
    parentId: 'parentId',
    userId: 'userId'
  };

  export type ProjectOrderByRelevanceFieldEnum = (typeof ProjectOrderByRelevanceFieldEnum)[keyof typeof ProjectOrderByRelevanceFieldEnum]


  export const TaskOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    summary: 'summary',
    originalInput: 'originalInput',
    aiModelUsed: 'aiModelUsed',
    userId: 'userId',
    projectId: 'projectId'
  };

  export type TaskOrderByRelevanceFieldEnum = (typeof TaskOrderByRelevanceFieldEnum)[keyof typeof TaskOrderByRelevanceFieldEnum]


  export const SubtaskOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    taskId: 'taskId'
  };

  export type SubtaskOrderByRelevanceFieldEnum = (typeof SubtaskOrderByRelevanceFieldEnum)[keyof typeof SubtaskOrderByRelevanceFieldEnum]


  export const ChatMessageOrderByRelevanceFieldEnum: {
    id: 'id',
    content: 'content',
    aiModelUsed: 'aiModelUsed',
    mutationId: 'mutationId',
    taskId: 'taskId'
  };

  export type ChatMessageOrderByRelevanceFieldEnum = (typeof ChatMessageOrderByRelevanceFieldEnum)[keyof typeof ChatMessageOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const ActionHistoryOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    entityId: 'entityId',
    aiPromptUsed: 'aiPromptUsed',
    aiModelUsed: 'aiModelUsed',
    undoneById: 'undoneById'
  };

  export type ActionHistoryOrderByRelevanceFieldEnum = (typeof ActionHistoryOrderByRelevanceFieldEnum)[keyof typeof ActionHistoryOrderByRelevanceFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'SubscriptionTier'
   */
  export type EnumSubscriptionTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionTier'>
    


  /**
   * Reference to a field of type 'SubscriptionTier[]'
   */
  export type ListEnumSubscriptionTierFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionTier[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'InputType'
   */
  export type EnumInputTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InputType'>
    


  /**
   * Reference to a field of type 'InputType[]'
   */
  export type ListEnumInputTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InputType[]'>
    


  /**
   * Reference to a field of type 'TaskStatus'
   */
  export type EnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus'>
    


  /**
   * Reference to a field of type 'TaskStatus[]'
   */
  export type ListEnumTaskStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskStatus[]'>
    


  /**
   * Reference to a field of type 'TaskPriority'
   */
  export type EnumTaskPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskPriority'>
    


  /**
   * Reference to a field of type 'TaskPriority[]'
   */
  export type ListEnumTaskPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TaskPriority[]'>
    


  /**
   * Reference to a field of type 'ChatRole'
   */
  export type EnumChatRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatRole'>
    


  /**
   * Reference to a field of type 'ChatRole[]'
   */
  export type ListEnumChatRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatRole[]'>
    


  /**
   * Reference to a field of type 'ActionType'
   */
  export type EnumActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActionType'>
    


  /**
   * Reference to a field of type 'ActionType[]'
   */
  export type ListEnumActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ActionType[]'>
    


  /**
   * Reference to a field of type 'EntityType'
   */
  export type EnumEntityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntityType'>
    


  /**
   * Reference to a field of type 'EntityType[]'
   */
  export type ListEnumEntityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EntityType[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    telegramId?: BigIntFilter<"User"> | bigint | number
    telegramName?: StringNullableFilter<"User"> | string | null
    telegramPhoto?: StringNullableFilter<"User"> | string | null
    encryptedApiKey?: StringNullableFilter<"User"> | string | null
    tier?: EnumSubscriptionTierFilter<"User"> | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFilter<"User"> | number
    aiCreditsResetAt?: DateTimeNullableFilter<"User"> | Date | string | null
    timezone?: StringFilter<"User"> | string
    locale?: StringFilter<"User"> | string
    isOnboarded?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    projects?: ProjectListRelationFilter
    tasks?: TaskListRelationFilter
    actionHistory?: ActionHistoryListRelationFilter
    undoneActions?: ActionHistoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    telegramId?: SortOrder
    telegramName?: SortOrderInput | SortOrder
    telegramPhoto?: SortOrderInput | SortOrder
    encryptedApiKey?: SortOrderInput | SortOrder
    tier?: SortOrder
    aiCreditsUsed?: SortOrder
    aiCreditsResetAt?: SortOrderInput | SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    isOnboarded?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    projects?: ProjectOrderByRelationAggregateInput
    tasks?: TaskOrderByRelationAggregateInput
    actionHistory?: ActionHistoryOrderByRelationAggregateInput
    undoneActions?: ActionHistoryOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    telegramId?: bigint | number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    telegramName?: StringNullableFilter<"User"> | string | null
    telegramPhoto?: StringNullableFilter<"User"> | string | null
    encryptedApiKey?: StringNullableFilter<"User"> | string | null
    tier?: EnumSubscriptionTierFilter<"User"> | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFilter<"User"> | number
    aiCreditsResetAt?: DateTimeNullableFilter<"User"> | Date | string | null
    timezone?: StringFilter<"User"> | string
    locale?: StringFilter<"User"> | string
    isOnboarded?: BoolFilter<"User"> | boolean
    deletedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    projects?: ProjectListRelationFilter
    tasks?: TaskListRelationFilter
    actionHistory?: ActionHistoryListRelationFilter
    undoneActions?: ActionHistoryListRelationFilter
  }, "id" | "telegramId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    telegramId?: SortOrder
    telegramName?: SortOrderInput | SortOrder
    telegramPhoto?: SortOrderInput | SortOrder
    encryptedApiKey?: SortOrderInput | SortOrder
    tier?: SortOrder
    aiCreditsUsed?: SortOrder
    aiCreditsResetAt?: SortOrderInput | SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    isOnboarded?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    telegramId?: BigIntWithAggregatesFilter<"User"> | bigint | number
    telegramName?: StringNullableWithAggregatesFilter<"User"> | string | null
    telegramPhoto?: StringNullableWithAggregatesFilter<"User"> | string | null
    encryptedApiKey?: StringNullableWithAggregatesFilter<"User"> | string | null
    tier?: EnumSubscriptionTierWithAggregatesFilter<"User"> | $Enums.SubscriptionTier
    aiCreditsUsed?: IntWithAggregatesFilter<"User"> | number
    aiCreditsResetAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    timezone?: StringWithAggregatesFilter<"User"> | string
    locale?: StringWithAggregatesFilter<"User"> | string
    isOnboarded?: BoolWithAggregatesFilter<"User"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: UuidFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    emoji?: StringNullableFilter<"Project"> | string | null
    color?: StringNullableFilter<"Project"> | string | null
    aiContext?: StringNullableFilter<"Project"> | string | null
    order?: IntFilter<"Project"> | number
    parentId?: UuidNullableFilter<"Project"> | string | null
    isArchived?: BoolFilter<"Project"> | boolean
    deletedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    userId?: UuidFilter<"Project"> | string
    parent?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    children?: ProjectListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    aiContext?: SortOrderInput | SortOrder
    order?: SortOrder
    parentId?: SortOrderInput | SortOrder
    isArchived?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    parent?: ProjectOrderByWithRelationInput
    children?: ProjectOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
    tasks?: TaskOrderByRelationAggregateInput
    _relevance?: ProjectOrderByRelevanceInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    emoji?: StringNullableFilter<"Project"> | string | null
    color?: StringNullableFilter<"Project"> | string | null
    aiContext?: StringNullableFilter<"Project"> | string | null
    order?: IntFilter<"Project"> | number
    parentId?: UuidNullableFilter<"Project"> | string | null
    isArchived?: BoolFilter<"Project"> | boolean
    deletedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    userId?: UuidFilter<"Project"> | string
    parent?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    children?: ProjectListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tasks?: TaskListRelationFilter
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    emoji?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    aiContext?: SortOrderInput | SortOrder
    order?: SortOrder
    parentId?: SortOrderInput | SortOrder
    isArchived?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Project"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    emoji?: StringNullableWithAggregatesFilter<"Project"> | string | null
    color?: StringNullableWithAggregatesFilter<"Project"> | string | null
    aiContext?: StringNullableWithAggregatesFilter<"Project"> | string | null
    order?: IntWithAggregatesFilter<"Project"> | number
    parentId?: UuidNullableWithAggregatesFilter<"Project"> | string | null
    isArchived?: BoolWithAggregatesFilter<"Project"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null
    userId?: UuidWithAggregatesFilter<"Project"> | string
  }

  export type TaskWhereInput = {
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    id?: UuidFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    title?: StringFilter<"Task"> | string
    summary?: StringNullableFilter<"Task"> | string | null
    originalInput?: StringNullableFilter<"Task"> | string | null
    originalInputType?: EnumInputTypeNullableFilter<"Task"> | $Enums.InputType | null
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumTaskPriorityFilter<"Task"> | $Enums.TaskPriority
    deadline?: DateTimeNullableFilter<"Task"> | Date | string | null
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    estimatedMinutes?: IntNullableFilter<"Task"> | number | null
    order?: IntFilter<"Task"> | number
    aiProcessedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    aiModelUsed?: StringNullableFilter<"Task"> | string | null
    aiTokensUsed?: IntNullableFilter<"Task"> | number | null
    deletedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    userId?: UuidFilter<"Task"> | string
    projectId?: UuidNullableFilter<"Task"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    subtasks?: SubtaskListRelationFilter
    chatMessages?: ChatMessageListRelationFilter
  }

  export type TaskOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    summary?: SortOrderInput | SortOrder
    originalInput?: SortOrderInput | SortOrder
    originalInputType?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    deadline?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    estimatedMinutes?: SortOrderInput | SortOrder
    order?: SortOrder
    aiProcessedAt?: SortOrderInput | SortOrder
    aiModelUsed?: SortOrderInput | SortOrder
    aiTokensUsed?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    project?: ProjectOrderByWithRelationInput
    subtasks?: SubtaskOrderByRelationAggregateInput
    chatMessages?: ChatMessageOrderByRelationAggregateInput
    _relevance?: TaskOrderByRelevanceInput
  }

  export type TaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TaskWhereInput | TaskWhereInput[]
    OR?: TaskWhereInput[]
    NOT?: TaskWhereInput | TaskWhereInput[]
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    title?: StringFilter<"Task"> | string
    summary?: StringNullableFilter<"Task"> | string | null
    originalInput?: StringNullableFilter<"Task"> | string | null
    originalInputType?: EnumInputTypeNullableFilter<"Task"> | $Enums.InputType | null
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumTaskPriorityFilter<"Task"> | $Enums.TaskPriority
    deadline?: DateTimeNullableFilter<"Task"> | Date | string | null
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    estimatedMinutes?: IntNullableFilter<"Task"> | number | null
    order?: IntFilter<"Task"> | number
    aiProcessedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    aiModelUsed?: StringNullableFilter<"Task"> | string | null
    aiTokensUsed?: IntNullableFilter<"Task"> | number | null
    deletedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    userId?: UuidFilter<"Task"> | string
    projectId?: UuidNullableFilter<"Task"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    project?: XOR<ProjectNullableScalarRelationFilter, ProjectWhereInput> | null
    subtasks?: SubtaskListRelationFilter
    chatMessages?: ChatMessageListRelationFilter
  }, "id">

  export type TaskOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    summary?: SortOrderInput | SortOrder
    originalInput?: SortOrderInput | SortOrder
    originalInputType?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrder
    deadline?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    estimatedMinutes?: SortOrderInput | SortOrder
    order?: SortOrder
    aiProcessedAt?: SortOrderInput | SortOrder
    aiModelUsed?: SortOrderInput | SortOrder
    aiTokensUsed?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    userId?: SortOrder
    projectId?: SortOrderInput | SortOrder
    _count?: TaskCountOrderByAggregateInput
    _avg?: TaskAvgOrderByAggregateInput
    _max?: TaskMaxOrderByAggregateInput
    _min?: TaskMinOrderByAggregateInput
    _sum?: TaskSumOrderByAggregateInput
  }

  export type TaskScalarWhereWithAggregatesInput = {
    AND?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    OR?: TaskScalarWhereWithAggregatesInput[]
    NOT?: TaskScalarWhereWithAggregatesInput | TaskScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Task"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Task"> | Date | string
    title?: StringWithAggregatesFilter<"Task"> | string
    summary?: StringNullableWithAggregatesFilter<"Task"> | string | null
    originalInput?: StringNullableWithAggregatesFilter<"Task"> | string | null
    originalInputType?: EnumInputTypeNullableWithAggregatesFilter<"Task"> | $Enums.InputType | null
    status?: EnumTaskStatusWithAggregatesFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumTaskPriorityWithAggregatesFilter<"Task"> | $Enums.TaskPriority
    deadline?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    estimatedMinutes?: IntNullableWithAggregatesFilter<"Task"> | number | null
    order?: IntWithAggregatesFilter<"Task"> | number
    aiProcessedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    aiModelUsed?: StringNullableWithAggregatesFilter<"Task"> | string | null
    aiTokensUsed?: IntNullableWithAggregatesFilter<"Task"> | number | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Task"> | Date | string | null
    userId?: UuidWithAggregatesFilter<"Task"> | string
    projectId?: UuidNullableWithAggregatesFilter<"Task"> | string | null
  }

  export type SubtaskWhereInput = {
    AND?: SubtaskWhereInput | SubtaskWhereInput[]
    OR?: SubtaskWhereInput[]
    NOT?: SubtaskWhereInput | SubtaskWhereInput[]
    id?: UuidFilter<"Subtask"> | string
    createdAt?: DateTimeFilter<"Subtask"> | Date | string
    updatedAt?: DateTimeFilter<"Subtask"> | Date | string
    title?: StringFilter<"Subtask"> | string
    isCompleted?: BoolFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    order?: IntFilter<"Subtask"> | number
    isAiGenerated?: BoolFilter<"Subtask"> | boolean
    deletedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    taskId?: UuidFilter<"Subtask"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type SubtaskOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    order?: SortOrder
    isAiGenerated?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    taskId?: SortOrder
    task?: TaskOrderByWithRelationInput
    _relevance?: SubtaskOrderByRelevanceInput
  }

  export type SubtaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SubtaskWhereInput | SubtaskWhereInput[]
    OR?: SubtaskWhereInput[]
    NOT?: SubtaskWhereInput | SubtaskWhereInput[]
    createdAt?: DateTimeFilter<"Subtask"> | Date | string
    updatedAt?: DateTimeFilter<"Subtask"> | Date | string
    title?: StringFilter<"Subtask"> | string
    isCompleted?: BoolFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    order?: IntFilter<"Subtask"> | number
    isAiGenerated?: BoolFilter<"Subtask"> | boolean
    deletedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    taskId?: UuidFilter<"Subtask"> | string
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type SubtaskOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    order?: SortOrder
    isAiGenerated?: SortOrder
    deletedAt?: SortOrderInput | SortOrder
    taskId?: SortOrder
    _count?: SubtaskCountOrderByAggregateInput
    _avg?: SubtaskAvgOrderByAggregateInput
    _max?: SubtaskMaxOrderByAggregateInput
    _min?: SubtaskMinOrderByAggregateInput
    _sum?: SubtaskSumOrderByAggregateInput
  }

  export type SubtaskScalarWhereWithAggregatesInput = {
    AND?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[]
    OR?: SubtaskScalarWhereWithAggregatesInput[]
    NOT?: SubtaskScalarWhereWithAggregatesInput | SubtaskScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Subtask"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Subtask"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subtask"> | Date | string
    title?: StringWithAggregatesFilter<"Subtask"> | string
    isCompleted?: BoolWithAggregatesFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"Subtask"> | Date | string | null
    order?: IntWithAggregatesFilter<"Subtask"> | number
    isAiGenerated?: BoolWithAggregatesFilter<"Subtask"> | boolean
    deletedAt?: DateTimeNullableWithAggregatesFilter<"Subtask"> | Date | string | null
    taskId?: UuidWithAggregatesFilter<"Subtask"> | string
  }

  export type ChatMessageWhereInput = {
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    id?: UuidFilter<"ChatMessage"> | string
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    role?: EnumChatRoleFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringFilter<"ChatMessage"> | string
    isExcluded?: BoolFilter<"ChatMessage"> | boolean
    aiModelUsed?: StringNullableFilter<"ChatMessage"> | string | null
    aiTokensUsed?: IntNullableFilter<"ChatMessage"> | number | null
    appliedAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
    mutationId?: UuidNullableFilter<"ChatMessage"> | string | null
    deletedAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
    taskId?: UuidFilter<"ChatMessage"> | string
    mutation?: XOR<ActionHistoryNullableScalarRelationFilter, ActionHistoryWhereInput> | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }

  export type ChatMessageOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    content?: SortOrder
    isExcluded?: SortOrder
    aiModelUsed?: SortOrderInput | SortOrder
    aiTokensUsed?: SortOrderInput | SortOrder
    appliedAt?: SortOrderInput | SortOrder
    mutationId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    taskId?: SortOrder
    mutation?: ActionHistoryOrderByWithRelationInput
    task?: TaskOrderByWithRelationInput
    _relevance?: ChatMessageOrderByRelevanceInput
  }

  export type ChatMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatMessageWhereInput | ChatMessageWhereInput[]
    OR?: ChatMessageWhereInput[]
    NOT?: ChatMessageWhereInput | ChatMessageWhereInput[]
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    role?: EnumChatRoleFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringFilter<"ChatMessage"> | string
    isExcluded?: BoolFilter<"ChatMessage"> | boolean
    aiModelUsed?: StringNullableFilter<"ChatMessage"> | string | null
    aiTokensUsed?: IntNullableFilter<"ChatMessage"> | number | null
    appliedAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
    mutationId?: UuidNullableFilter<"ChatMessage"> | string | null
    deletedAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
    taskId?: UuidFilter<"ChatMessage"> | string
    mutation?: XOR<ActionHistoryNullableScalarRelationFilter, ActionHistoryWhereInput> | null
    task?: XOR<TaskScalarRelationFilter, TaskWhereInput>
  }, "id">

  export type ChatMessageOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    content?: SortOrder
    isExcluded?: SortOrder
    aiModelUsed?: SortOrderInput | SortOrder
    aiTokensUsed?: SortOrderInput | SortOrder
    appliedAt?: SortOrderInput | SortOrder
    mutationId?: SortOrderInput | SortOrder
    deletedAt?: SortOrderInput | SortOrder
    taskId?: SortOrder
    _count?: ChatMessageCountOrderByAggregateInput
    _avg?: ChatMessageAvgOrderByAggregateInput
    _max?: ChatMessageMaxOrderByAggregateInput
    _min?: ChatMessageMinOrderByAggregateInput
    _sum?: ChatMessageSumOrderByAggregateInput
  }

  export type ChatMessageScalarWhereWithAggregatesInput = {
    AND?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    OR?: ChatMessageScalarWhereWithAggregatesInput[]
    NOT?: ChatMessageScalarWhereWithAggregatesInput | ChatMessageScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ChatMessage"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ChatMessage"> | Date | string
    role?: EnumChatRoleWithAggregatesFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringWithAggregatesFilter<"ChatMessage"> | string
    isExcluded?: BoolWithAggregatesFilter<"ChatMessage"> | boolean
    aiModelUsed?: StringNullableWithAggregatesFilter<"ChatMessage"> | string | null
    aiTokensUsed?: IntNullableWithAggregatesFilter<"ChatMessage"> | number | null
    appliedAt?: DateTimeNullableWithAggregatesFilter<"ChatMessage"> | Date | string | null
    mutationId?: UuidNullableWithAggregatesFilter<"ChatMessage"> | string | null
    deletedAt?: DateTimeNullableWithAggregatesFilter<"ChatMessage"> | Date | string | null
    taskId?: UuidWithAggregatesFilter<"ChatMessage"> | string
  }

  export type ActionHistoryWhereInput = {
    AND?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    OR?: ActionHistoryWhereInput[]
    NOT?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    id?: UuidFilter<"ActionHistory"> | string
    createdAt?: DateTimeFilter<"ActionHistory"> | Date | string
    userId?: UuidFilter<"ActionHistory"> | string
    actionType?: EnumActionTypeFilter<"ActionHistory"> | $Enums.ActionType
    entityType?: EnumEntityTypeFilter<"ActionHistory"> | $Enums.EntityType
    entityId?: UuidFilter<"ActionHistory"> | string
    payload?: JsonFilter<"ActionHistory">
    aiPromptUsed?: StringNullableFilter<"ActionHistory"> | string | null
    aiModelUsed?: StringNullableFilter<"ActionHistory"> | string | null
    aiTokensUsed?: IntNullableFilter<"ActionHistory"> | number | null
    isUndone?: BoolFilter<"ActionHistory"> | boolean
    undoneAt?: DateTimeNullableFilter<"ActionHistory"> | Date | string | null
    undoneById?: UuidNullableFilter<"ActionHistory"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    undoneBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    chatMessages?: ChatMessageListRelationFilter
  }

  export type ActionHistoryOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    payload?: SortOrder
    aiPromptUsed?: SortOrderInput | SortOrder
    aiModelUsed?: SortOrderInput | SortOrder
    aiTokensUsed?: SortOrderInput | SortOrder
    isUndone?: SortOrder
    undoneAt?: SortOrderInput | SortOrder
    undoneById?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    undoneBy?: UserOrderByWithRelationInput
    chatMessages?: ChatMessageOrderByRelationAggregateInput
    _relevance?: ActionHistoryOrderByRelevanceInput
  }

  export type ActionHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    OR?: ActionHistoryWhereInput[]
    NOT?: ActionHistoryWhereInput | ActionHistoryWhereInput[]
    createdAt?: DateTimeFilter<"ActionHistory"> | Date | string
    userId?: UuidFilter<"ActionHistory"> | string
    actionType?: EnumActionTypeFilter<"ActionHistory"> | $Enums.ActionType
    entityType?: EnumEntityTypeFilter<"ActionHistory"> | $Enums.EntityType
    entityId?: UuidFilter<"ActionHistory"> | string
    payload?: JsonFilter<"ActionHistory">
    aiPromptUsed?: StringNullableFilter<"ActionHistory"> | string | null
    aiModelUsed?: StringNullableFilter<"ActionHistory"> | string | null
    aiTokensUsed?: IntNullableFilter<"ActionHistory"> | number | null
    isUndone?: BoolFilter<"ActionHistory"> | boolean
    undoneAt?: DateTimeNullableFilter<"ActionHistory"> | Date | string | null
    undoneById?: UuidNullableFilter<"ActionHistory"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    undoneBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    chatMessages?: ChatMessageListRelationFilter
  }, "id">

  export type ActionHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    payload?: SortOrder
    aiPromptUsed?: SortOrderInput | SortOrder
    aiModelUsed?: SortOrderInput | SortOrder
    aiTokensUsed?: SortOrderInput | SortOrder
    isUndone?: SortOrder
    undoneAt?: SortOrderInput | SortOrder
    undoneById?: SortOrderInput | SortOrder
    _count?: ActionHistoryCountOrderByAggregateInput
    _avg?: ActionHistoryAvgOrderByAggregateInput
    _max?: ActionHistoryMaxOrderByAggregateInput
    _min?: ActionHistoryMinOrderByAggregateInput
    _sum?: ActionHistorySumOrderByAggregateInput
  }

  export type ActionHistoryScalarWhereWithAggregatesInput = {
    AND?: ActionHistoryScalarWhereWithAggregatesInput | ActionHistoryScalarWhereWithAggregatesInput[]
    OR?: ActionHistoryScalarWhereWithAggregatesInput[]
    NOT?: ActionHistoryScalarWhereWithAggregatesInput | ActionHistoryScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ActionHistory"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ActionHistory"> | Date | string
    userId?: UuidWithAggregatesFilter<"ActionHistory"> | string
    actionType?: EnumActionTypeWithAggregatesFilter<"ActionHistory"> | $Enums.ActionType
    entityType?: EnumEntityTypeWithAggregatesFilter<"ActionHistory"> | $Enums.EntityType
    entityId?: UuidWithAggregatesFilter<"ActionHistory"> | string
    payload?: JsonWithAggregatesFilter<"ActionHistory">
    aiPromptUsed?: StringNullableWithAggregatesFilter<"ActionHistory"> | string | null
    aiModelUsed?: StringNullableWithAggregatesFilter<"ActionHistory"> | string | null
    aiTokensUsed?: IntNullableWithAggregatesFilter<"ActionHistory"> | number | null
    isUndone?: BoolWithAggregatesFilter<"ActionHistory"> | boolean
    undoneAt?: DateTimeNullableWithAggregatesFilter<"ActionHistory"> | Date | string | null
    undoneById?: UuidNullableWithAggregatesFilter<"ActionHistory"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryCreateNestedManyWithoutUndoneByInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryUncheckedCreateNestedManyWithoutUndoneByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUpdateManyWithoutUndoneByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUncheckedUpdateManyWithoutUndoneByNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    isArchived?: boolean
    deletedAt?: Date | string | null
    parent?: ProjectCreateNestedOneWithoutChildrenInput
    children?: ProjectCreateNestedManyWithoutParentInput
    user: UserCreateNestedOneWithoutProjectsInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    parentId?: string | null
    isArchived?: boolean
    deletedAt?: Date | string | null
    userId: string
    children?: ProjectUncheckedCreateNestedManyWithoutParentInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: ProjectUpdateOneWithoutChildrenNestedInput
    children?: ProjectUpdateManyWithoutParentNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    children?: ProjectUncheckedUpdateManyWithoutParentNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    parentId?: string | null
    isArchived?: boolean
    deletedAt?: Date | string | null
    userId: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTasksInput
    project?: ProjectCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    chatMessages?: ChatMessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    userId: string
    projectId?: string | null
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    project?: ProjectUpdateOneWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    userId: string
    projectId?: string | null
  }

  export type TaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubtaskCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    isAiGenerated?: boolean
    deletedAt?: Date | string | null
    task: TaskCreateNestedOneWithoutSubtasksInput
  }

  export type SubtaskUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    isAiGenerated?: boolean
    deletedAt?: Date | string | null
    taskId: string
  }

  export type SubtaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    task?: TaskUpdateOneRequiredWithoutSubtasksNestedInput
  }

  export type SubtaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type SubtaskCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    isAiGenerated?: boolean
    deletedAt?: Date | string | null
    taskId: string
  }

  export type SubtaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubtaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageCreateInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    deletedAt?: Date | string | null
    mutation?: ActionHistoryCreateNestedOneWithoutChatMessagesInput
    task: TaskCreateNestedOneWithoutChatMessagesInput
  }

  export type ChatMessageUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    mutationId?: string | null
    deletedAt?: Date | string | null
    taskId: string
  }

  export type ChatMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mutation?: ActionHistoryUpdateOneWithoutChatMessagesNestedInput
    task?: TaskUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mutationId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageCreateManyInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    mutationId?: string | null
    deletedAt?: Date | string | null
    taskId: string
  }

  export type ChatMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mutationId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ActionHistoryCreateInput = {
    id?: string
    createdAt?: Date | string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    user: UserCreateNestedOneWithoutActionHistoryInput
    undoneBy?: UserCreateNestedOneWithoutUndoneActionsInput
    chatMessages?: ChatMessageCreateNestedManyWithoutMutationInput
  }

  export type ActionHistoryUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    undoneById?: string | null
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutMutationInput
  }

  export type ActionHistoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutActionHistoryNestedInput
    undoneBy?: UserUpdateOneWithoutUndoneActionsNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutMutationNestedInput
  }

  export type ActionHistoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    undoneById?: NullableStringFieldUpdateOperationsInput | string | null
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutMutationNestedInput
  }

  export type ActionHistoryCreateManyInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    undoneById?: string | null
  }

  export type ActionHistoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActionHistoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    undoneById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
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
    search?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumSubscriptionTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierFilter<$PrismaModel> | $Enums.SubscriptionTier
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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
    search?: string
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type TaskListRelationFilter = {
    every?: TaskWhereInput
    some?: TaskWhereInput
    none?: TaskWhereInput
  }

  export type ActionHistoryListRelationFilter = {
    every?: ActionHistoryWhereInput
    some?: ActionHistoryWhereInput
    none?: ActionHistoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActionHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    telegramId?: SortOrder
    telegramName?: SortOrder
    telegramPhoto?: SortOrder
    encryptedApiKey?: SortOrder
    tier?: SortOrder
    aiCreditsUsed?: SortOrder
    aiCreditsResetAt?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    isOnboarded?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    telegramId?: SortOrder
    aiCreditsUsed?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    telegramId?: SortOrder
    telegramName?: SortOrder
    telegramPhoto?: SortOrder
    encryptedApiKey?: SortOrder
    tier?: SortOrder
    aiCreditsUsed?: SortOrder
    aiCreditsResetAt?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    isOnboarded?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    telegramId?: SortOrder
    telegramName?: SortOrder
    telegramPhoto?: SortOrder
    encryptedApiKey?: SortOrder
    tier?: SortOrder
    aiCreditsUsed?: SortOrder
    aiCreditsResetAt?: SortOrder
    timezone?: SortOrder
    locale?: SortOrder
    isOnboarded?: SortOrder
    deletedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    telegramId?: SortOrder
    aiCreditsUsed?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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
    search?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumSubscriptionTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionTierFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionTierFilter<$PrismaModel>
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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
    search?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type ProjectNullableScalarRelationFilter = {
    is?: ProjectWhereInput | null
    isNot?: ProjectWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ProjectOrderByRelevanceInput = {
    fields: ProjectOrderByRelevanceFieldEnum | ProjectOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    emoji?: SortOrder
    color?: SortOrder
    aiContext?: SortOrder
    order?: SortOrder
    parentId?: SortOrder
    isArchived?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    emoji?: SortOrder
    color?: SortOrder
    aiContext?: SortOrder
    order?: SortOrder
    parentId?: SortOrder
    isArchived?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    name?: SortOrder
    description?: SortOrder
    emoji?: SortOrder
    color?: SortOrder
    aiContext?: SortOrder
    order?: SortOrder
    parentId?: SortOrder
    isArchived?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumInputTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.InputType | EnumInputTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInputTypeNullableFilter<$PrismaModel> | $Enums.InputType | null
  }

  export type EnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type EnumTaskPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskPriorityFilter<$PrismaModel> | $Enums.TaskPriority
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SubtaskListRelationFilter = {
    every?: SubtaskWhereInput
    some?: SubtaskWhereInput
    none?: SubtaskWhereInput
  }

  export type ChatMessageListRelationFilter = {
    every?: ChatMessageWhereInput
    some?: ChatMessageWhereInput
    none?: ChatMessageWhereInput
  }

  export type SubtaskOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TaskOrderByRelevanceInput = {
    fields: TaskOrderByRelevanceFieldEnum | TaskOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TaskCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    originalInput?: SortOrder
    originalInputType?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    deadline?: SortOrder
    startDate?: SortOrder
    estimatedMinutes?: SortOrder
    order?: SortOrder
    aiProcessedAt?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type TaskAvgOrderByAggregateInput = {
    estimatedMinutes?: SortOrder
    order?: SortOrder
    aiTokensUsed?: SortOrder
  }

  export type TaskMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    originalInput?: SortOrder
    originalInputType?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    deadline?: SortOrder
    startDate?: SortOrder
    estimatedMinutes?: SortOrder
    order?: SortOrder
    aiProcessedAt?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type TaskMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    originalInput?: SortOrder
    originalInputType?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    deadline?: SortOrder
    startDate?: SortOrder
    estimatedMinutes?: SortOrder
    order?: SortOrder
    aiProcessedAt?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    deletedAt?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type TaskSumOrderByAggregateInput = {
    estimatedMinutes?: SortOrder
    order?: SortOrder
    aiTokensUsed?: SortOrder
  }

  export type EnumInputTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InputType | EnumInputTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInputTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.InputType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInputTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumInputTypeNullableFilter<$PrismaModel>
  }

  export type EnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type EnumTaskPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TaskPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskPriorityFilter<$PrismaModel>
    _max?: NestedEnumTaskPriorityFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TaskScalarRelationFilter = {
    is?: TaskWhereInput
    isNot?: TaskWhereInput
  }

  export type SubtaskOrderByRelevanceInput = {
    fields: SubtaskOrderByRelevanceFieldEnum | SubtaskOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SubtaskCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    order?: SortOrder
    isAiGenerated?: SortOrder
    deletedAt?: SortOrder
    taskId?: SortOrder
  }

  export type SubtaskAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type SubtaskMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    order?: SortOrder
    isAiGenerated?: SortOrder
    deletedAt?: SortOrder
    taskId?: SortOrder
  }

  export type SubtaskMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    title?: SortOrder
    isCompleted?: SortOrder
    completedAt?: SortOrder
    order?: SortOrder
    isAiGenerated?: SortOrder
    deletedAt?: SortOrder
    taskId?: SortOrder
  }

  export type SubtaskSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type EnumChatRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleFilter<$PrismaModel> | $Enums.ChatRole
  }

  export type ActionHistoryNullableScalarRelationFilter = {
    is?: ActionHistoryWhereInput | null
    isNot?: ActionHistoryWhereInput | null
  }

  export type ChatMessageOrderByRelevanceInput = {
    fields: ChatMessageOrderByRelevanceFieldEnum | ChatMessageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ChatMessageCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    content?: SortOrder
    isExcluded?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    appliedAt?: SortOrder
    mutationId?: SortOrder
    deletedAt?: SortOrder
    taskId?: SortOrder
  }

  export type ChatMessageAvgOrderByAggregateInput = {
    aiTokensUsed?: SortOrder
  }

  export type ChatMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    content?: SortOrder
    isExcluded?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    appliedAt?: SortOrder
    mutationId?: SortOrder
    deletedAt?: SortOrder
    taskId?: SortOrder
  }

  export type ChatMessageMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    role?: SortOrder
    content?: SortOrder
    isExcluded?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    appliedAt?: SortOrder
    mutationId?: SortOrder
    deletedAt?: SortOrder
    taskId?: SortOrder
  }

  export type ChatMessageSumOrderByAggregateInput = {
    aiTokensUsed?: SortOrder
  }

  export type EnumChatRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatRoleFilter<$PrismaModel>
    _max?: NestedEnumChatRoleFilter<$PrismaModel>
  }

  export type EnumActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeFilter<$PrismaModel> | $Enums.ActionType
  }

  export type EnumEntityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityType | EnumEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityTypeFilter<$PrismaModel> | $Enums.EntityType
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ActionHistoryOrderByRelevanceInput = {
    fields: ActionHistoryOrderByRelevanceFieldEnum | ActionHistoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ActionHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    payload?: SortOrder
    aiPromptUsed?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    isUndone?: SortOrder
    undoneAt?: SortOrder
    undoneById?: SortOrder
  }

  export type ActionHistoryAvgOrderByAggregateInput = {
    aiTokensUsed?: SortOrder
  }

  export type ActionHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    aiPromptUsed?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    isUndone?: SortOrder
    undoneAt?: SortOrder
    undoneById?: SortOrder
  }

  export type ActionHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    userId?: SortOrder
    actionType?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    aiPromptUsed?: SortOrder
    aiModelUsed?: SortOrder
    aiTokensUsed?: SortOrder
    isUndone?: SortOrder
    undoneAt?: SortOrder
    undoneById?: SortOrder
  }

  export type ActionHistorySumOrderByAggregateInput = {
    aiTokensUsed?: SortOrder
  }

  export type EnumActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActionTypeFilter<$PrismaModel>
    _max?: NestedEnumActionTypeFilter<$PrismaModel>
  }

  export type EnumEntityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityType | EnumEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntityTypeFilter<$PrismaModel>
    _max?: NestedEnumEntityTypeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TaskCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ActionHistoryCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionHistoryCreateWithoutUserInput, ActionHistoryUncheckedCreateWithoutUserInput> | ActionHistoryCreateWithoutUserInput[] | ActionHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUserInput | ActionHistoryCreateOrConnectWithoutUserInput[]
    createMany?: ActionHistoryCreateManyUserInputEnvelope
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
  }

  export type ActionHistoryCreateNestedManyWithoutUndoneByInput = {
    create?: XOR<ActionHistoryCreateWithoutUndoneByInput, ActionHistoryUncheckedCreateWithoutUndoneByInput> | ActionHistoryCreateWithoutUndoneByInput[] | ActionHistoryUncheckedCreateWithoutUndoneByInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUndoneByInput | ActionHistoryCreateOrConnectWithoutUndoneByInput[]
    createMany?: ActionHistoryCreateManyUndoneByInputEnvelope
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ActionHistoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActionHistoryCreateWithoutUserInput, ActionHistoryUncheckedCreateWithoutUserInput> | ActionHistoryCreateWithoutUserInput[] | ActionHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUserInput | ActionHistoryCreateOrConnectWithoutUserInput[]
    createMany?: ActionHistoryCreateManyUserInputEnvelope
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
  }

  export type ActionHistoryUncheckedCreateNestedManyWithoutUndoneByInput = {
    create?: XOR<ActionHistoryCreateWithoutUndoneByInput, ActionHistoryUncheckedCreateWithoutUndoneByInput> | ActionHistoryCreateWithoutUndoneByInput[] | ActionHistoryUncheckedCreateWithoutUndoneByInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUndoneByInput | ActionHistoryCreateOrConnectWithoutUndoneByInput[]
    createMany?: ActionHistoryCreateManyUndoneByInputEnvelope
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumSubscriptionTierFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionTier
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

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TaskUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ActionHistoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionHistoryCreateWithoutUserInput, ActionHistoryUncheckedCreateWithoutUserInput> | ActionHistoryCreateWithoutUserInput[] | ActionHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUserInput | ActionHistoryCreateOrConnectWithoutUserInput[]
    upsert?: ActionHistoryUpsertWithWhereUniqueWithoutUserInput | ActionHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionHistoryCreateManyUserInputEnvelope
    set?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    disconnect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    delete?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    update?: ActionHistoryUpdateWithWhereUniqueWithoutUserInput | ActionHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionHistoryUpdateManyWithWhereWithoutUserInput | ActionHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
  }

  export type ActionHistoryUpdateManyWithoutUndoneByNestedInput = {
    create?: XOR<ActionHistoryCreateWithoutUndoneByInput, ActionHistoryUncheckedCreateWithoutUndoneByInput> | ActionHistoryCreateWithoutUndoneByInput[] | ActionHistoryUncheckedCreateWithoutUndoneByInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUndoneByInput | ActionHistoryCreateOrConnectWithoutUndoneByInput[]
    upsert?: ActionHistoryUpsertWithWhereUniqueWithoutUndoneByInput | ActionHistoryUpsertWithWhereUniqueWithoutUndoneByInput[]
    createMany?: ActionHistoryCreateManyUndoneByInputEnvelope
    set?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    disconnect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    delete?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    update?: ActionHistoryUpdateWithWhereUniqueWithoutUndoneByInput | ActionHistoryUpdateWithWhereUniqueWithoutUndoneByInput[]
    updateMany?: ActionHistoryUpdateManyWithWhereWithoutUndoneByInput | ActionHistoryUpdateManyWithWhereWithoutUndoneByInput[]
    deleteMany?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput> | TaskCreateWithoutUserInput[] | TaskUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutUserInput | TaskCreateOrConnectWithoutUserInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutUserInput | TaskUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TaskCreateManyUserInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutUserInput | TaskUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutUserInput | TaskUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ActionHistoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActionHistoryCreateWithoutUserInput, ActionHistoryUncheckedCreateWithoutUserInput> | ActionHistoryCreateWithoutUserInput[] | ActionHistoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUserInput | ActionHistoryCreateOrConnectWithoutUserInput[]
    upsert?: ActionHistoryUpsertWithWhereUniqueWithoutUserInput | ActionHistoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActionHistoryCreateManyUserInputEnvelope
    set?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    disconnect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    delete?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    update?: ActionHistoryUpdateWithWhereUniqueWithoutUserInput | ActionHistoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActionHistoryUpdateManyWithWhereWithoutUserInput | ActionHistoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
  }

  export type ActionHistoryUncheckedUpdateManyWithoutUndoneByNestedInput = {
    create?: XOR<ActionHistoryCreateWithoutUndoneByInput, ActionHistoryUncheckedCreateWithoutUndoneByInput> | ActionHistoryCreateWithoutUndoneByInput[] | ActionHistoryUncheckedCreateWithoutUndoneByInput[]
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutUndoneByInput | ActionHistoryCreateOrConnectWithoutUndoneByInput[]
    upsert?: ActionHistoryUpsertWithWhereUniqueWithoutUndoneByInput | ActionHistoryUpsertWithWhereUniqueWithoutUndoneByInput[]
    createMany?: ActionHistoryCreateManyUndoneByInputEnvelope
    set?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    disconnect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    delete?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    connect?: ActionHistoryWhereUniqueInput | ActionHistoryWhereUniqueInput[]
    update?: ActionHistoryUpdateWithWhereUniqueWithoutUndoneByInput | ActionHistoryUpdateWithWhereUniqueWithoutUndoneByInput[]
    updateMany?: ActionHistoryUpdateManyWithWhereWithoutUndoneByInput | ActionHistoryUpdateManyWithWhereWithoutUndoneByInput[]
    deleteMany?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutChildrenInput = {
    create?: XOR<ProjectCreateWithoutChildrenInput, ProjectUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutChildrenInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectCreateNestedManyWithoutParentInput = {
    create?: XOR<ProjectCreateWithoutParentInput, ProjectUncheckedCreateWithoutParentInput> | ProjectCreateWithoutParentInput[] | ProjectUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutParentInput | ProjectCreateOrConnectWithoutParentInput[]
    createMany?: ProjectCreateManyParentInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type TaskCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ProjectCreateWithoutParentInput, ProjectUncheckedCreateWithoutParentInput> | ProjectCreateWithoutParentInput[] | ProjectUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutParentInput | ProjectCreateOrConnectWithoutParentInput[]
    createMany?: ProjectCreateManyParentInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type TaskUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
  }

  export type ProjectUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<ProjectCreateWithoutChildrenInput, ProjectUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutChildrenInput
    upsert?: ProjectUpsertWithoutChildrenInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutChildrenInput, ProjectUpdateWithoutChildrenInput>, ProjectUncheckedUpdateWithoutChildrenInput>
  }

  export type ProjectUpdateManyWithoutParentNestedInput = {
    create?: XOR<ProjectCreateWithoutParentInput, ProjectUncheckedCreateWithoutParentInput> | ProjectCreateWithoutParentInput[] | ProjectUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutParentInput | ProjectCreateOrConnectWithoutParentInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutParentInput | ProjectUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ProjectCreateManyParentInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutParentInput | ProjectUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutParentInput | ProjectUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type TaskUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type ProjectUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ProjectCreateWithoutParentInput, ProjectUncheckedCreateWithoutParentInput> | ProjectCreateWithoutParentInput[] | ProjectUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutParentInput | ProjectCreateOrConnectWithoutParentInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutParentInput | ProjectUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ProjectCreateManyParentInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutParentInput | ProjectUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutParentInput | ProjectUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type TaskUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput> | TaskCreateWithoutProjectInput[] | TaskUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: TaskCreateOrConnectWithoutProjectInput | TaskCreateOrConnectWithoutProjectInput[]
    upsert?: TaskUpsertWithWhereUniqueWithoutProjectInput | TaskUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: TaskCreateManyProjectInputEnvelope
    set?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    disconnect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    delete?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    connect?: TaskWhereUniqueInput | TaskWhereUniqueInput[]
    update?: TaskUpdateWithWhereUniqueWithoutProjectInput | TaskUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: TaskUpdateManyWithWhereWithoutProjectInput | TaskUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: TaskScalarWhereInput | TaskScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTasksInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutTasksInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    connect?: ProjectWhereUniqueInput
  }

  export type SubtaskCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type ChatMessageCreateNestedManyWithoutTaskInput = {
    create?: XOR<ChatMessageCreateWithoutTaskInput, ChatMessageUncheckedCreateWithoutTaskInput> | ChatMessageCreateWithoutTaskInput[] | ChatMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutTaskInput | ChatMessageCreateOrConnectWithoutTaskInput[]
    createMany?: ChatMessageCreateManyTaskInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type SubtaskUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutTaskInput = {
    create?: XOR<ChatMessageCreateWithoutTaskInput, ChatMessageUncheckedCreateWithoutTaskInput> | ChatMessageCreateWithoutTaskInput[] | ChatMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutTaskInput | ChatMessageCreateOrConnectWithoutTaskInput[]
    createMany?: ChatMessageCreateManyTaskInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type NullableEnumInputTypeFieldUpdateOperationsInput = {
    set?: $Enums.InputType | null
  }

  export type EnumTaskStatusFieldUpdateOperationsInput = {
    set?: $Enums.TaskStatus
  }

  export type EnumTaskPriorityFieldUpdateOperationsInput = {
    set?: $Enums.TaskPriority
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutTasksNestedInput = {
    create?: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    connectOrCreate?: UserCreateOrConnectWithoutTasksInput
    upsert?: UserUpsertWithoutTasksInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTasksInput, UserUpdateWithoutTasksInput>, UserUncheckedUpdateWithoutTasksInput>
  }

  export type ProjectUpdateOneWithoutTasksNestedInput = {
    create?: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTasksInput
    upsert?: ProjectUpsertWithoutTasksInput
    disconnect?: ProjectWhereInput | boolean
    delete?: ProjectWhereInput | boolean
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutTasksInput, ProjectUpdateWithoutTasksInput>, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type SubtaskUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type ChatMessageUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ChatMessageCreateWithoutTaskInput, ChatMessageUncheckedCreateWithoutTaskInput> | ChatMessageCreateWithoutTaskInput[] | ChatMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutTaskInput | ChatMessageCreateOrConnectWithoutTaskInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutTaskInput | ChatMessageUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ChatMessageCreateManyTaskInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutTaskInput | ChatMessageUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutTaskInput | ChatMessageUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type SubtaskUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput> | SubtaskCreateWithoutTaskInput[] | SubtaskUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: SubtaskCreateOrConnectWithoutTaskInput | SubtaskCreateOrConnectWithoutTaskInput[]
    upsert?: SubtaskUpsertWithWhereUniqueWithoutTaskInput | SubtaskUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: SubtaskCreateManyTaskInputEnvelope
    set?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    disconnect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    delete?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    connect?: SubtaskWhereUniqueInput | SubtaskWhereUniqueInput[]
    update?: SubtaskUpdateWithWhereUniqueWithoutTaskInput | SubtaskUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: SubtaskUpdateManyWithWhereWithoutTaskInput | SubtaskUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
  }

  export type ChatMessageUncheckedUpdateManyWithoutTaskNestedInput = {
    create?: XOR<ChatMessageCreateWithoutTaskInput, ChatMessageUncheckedCreateWithoutTaskInput> | ChatMessageCreateWithoutTaskInput[] | ChatMessageUncheckedCreateWithoutTaskInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutTaskInput | ChatMessageCreateOrConnectWithoutTaskInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutTaskInput | ChatMessageUpsertWithWhereUniqueWithoutTaskInput[]
    createMany?: ChatMessageCreateManyTaskInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutTaskInput | ChatMessageUpdateWithWhereUniqueWithoutTaskInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutTaskInput | ChatMessageUpdateManyWithWhereWithoutTaskInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type TaskCreateNestedOneWithoutSubtasksInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    connect?: TaskWhereUniqueInput
  }

  export type TaskUpdateOneRequiredWithoutSubtasksNestedInput = {
    create?: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    connectOrCreate?: TaskCreateOrConnectWithoutSubtasksInput
    upsert?: TaskUpsertWithoutSubtasksInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutSubtasksInput, TaskUpdateWithoutSubtasksInput>, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type ActionHistoryCreateNestedOneWithoutChatMessagesInput = {
    create?: XOR<ActionHistoryCreateWithoutChatMessagesInput, ActionHistoryUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutChatMessagesInput
    connect?: ActionHistoryWhereUniqueInput
  }

  export type TaskCreateNestedOneWithoutChatMessagesInput = {
    create?: XOR<TaskCreateWithoutChatMessagesInput, TaskUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutChatMessagesInput
    connect?: TaskWhereUniqueInput
  }

  export type EnumChatRoleFieldUpdateOperationsInput = {
    set?: $Enums.ChatRole
  }

  export type ActionHistoryUpdateOneWithoutChatMessagesNestedInput = {
    create?: XOR<ActionHistoryCreateWithoutChatMessagesInput, ActionHistoryUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: ActionHistoryCreateOrConnectWithoutChatMessagesInput
    upsert?: ActionHistoryUpsertWithoutChatMessagesInput
    disconnect?: ActionHistoryWhereInput | boolean
    delete?: ActionHistoryWhereInput | boolean
    connect?: ActionHistoryWhereUniqueInput
    update?: XOR<XOR<ActionHistoryUpdateToOneWithWhereWithoutChatMessagesInput, ActionHistoryUpdateWithoutChatMessagesInput>, ActionHistoryUncheckedUpdateWithoutChatMessagesInput>
  }

  export type TaskUpdateOneRequiredWithoutChatMessagesNestedInput = {
    create?: XOR<TaskCreateWithoutChatMessagesInput, TaskUncheckedCreateWithoutChatMessagesInput>
    connectOrCreate?: TaskCreateOrConnectWithoutChatMessagesInput
    upsert?: TaskUpsertWithoutChatMessagesInput
    connect?: TaskWhereUniqueInput
    update?: XOR<XOR<TaskUpdateToOneWithWhereWithoutChatMessagesInput, TaskUpdateWithoutChatMessagesInput>, TaskUncheckedUpdateWithoutChatMessagesInput>
  }

  export type UserCreateNestedOneWithoutActionHistoryInput = {
    create?: XOR<UserCreateWithoutActionHistoryInput, UserUncheckedCreateWithoutActionHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionHistoryInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutUndoneActionsInput = {
    create?: XOR<UserCreateWithoutUndoneActionsInput, UserUncheckedCreateWithoutUndoneActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUndoneActionsInput
    connect?: UserWhereUniqueInput
  }

  export type ChatMessageCreateNestedManyWithoutMutationInput = {
    create?: XOR<ChatMessageCreateWithoutMutationInput, ChatMessageUncheckedCreateWithoutMutationInput> | ChatMessageCreateWithoutMutationInput[] | ChatMessageUncheckedCreateWithoutMutationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutMutationInput | ChatMessageCreateOrConnectWithoutMutationInput[]
    createMany?: ChatMessageCreateManyMutationInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type ChatMessageUncheckedCreateNestedManyWithoutMutationInput = {
    create?: XOR<ChatMessageCreateWithoutMutationInput, ChatMessageUncheckedCreateWithoutMutationInput> | ChatMessageCreateWithoutMutationInput[] | ChatMessageUncheckedCreateWithoutMutationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutMutationInput | ChatMessageCreateOrConnectWithoutMutationInput[]
    createMany?: ChatMessageCreateManyMutationInputEnvelope
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
  }

  export type EnumActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.ActionType
  }

  export type EnumEntityTypeFieldUpdateOperationsInput = {
    set?: $Enums.EntityType
  }

  export type UserUpdateOneRequiredWithoutActionHistoryNestedInput = {
    create?: XOR<UserCreateWithoutActionHistoryInput, UserUncheckedCreateWithoutActionHistoryInput>
    connectOrCreate?: UserCreateOrConnectWithoutActionHistoryInput
    upsert?: UserUpsertWithoutActionHistoryInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActionHistoryInput, UserUpdateWithoutActionHistoryInput>, UserUncheckedUpdateWithoutActionHistoryInput>
  }

  export type UserUpdateOneWithoutUndoneActionsNestedInput = {
    create?: XOR<UserCreateWithoutUndoneActionsInput, UserUncheckedCreateWithoutUndoneActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUndoneActionsInput
    upsert?: UserUpsertWithoutUndoneActionsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUndoneActionsInput, UserUpdateWithoutUndoneActionsInput>, UserUncheckedUpdateWithoutUndoneActionsInput>
  }

  export type ChatMessageUpdateManyWithoutMutationNestedInput = {
    create?: XOR<ChatMessageCreateWithoutMutationInput, ChatMessageUncheckedCreateWithoutMutationInput> | ChatMessageCreateWithoutMutationInput[] | ChatMessageUncheckedCreateWithoutMutationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutMutationInput | ChatMessageCreateOrConnectWithoutMutationInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutMutationInput | ChatMessageUpsertWithWhereUniqueWithoutMutationInput[]
    createMany?: ChatMessageCreateManyMutationInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutMutationInput | ChatMessageUpdateWithWhereUniqueWithoutMutationInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutMutationInput | ChatMessageUpdateManyWithWhereWithoutMutationInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type ChatMessageUncheckedUpdateManyWithoutMutationNestedInput = {
    create?: XOR<ChatMessageCreateWithoutMutationInput, ChatMessageUncheckedCreateWithoutMutationInput> | ChatMessageCreateWithoutMutationInput[] | ChatMessageUncheckedCreateWithoutMutationInput[]
    connectOrCreate?: ChatMessageCreateOrConnectWithoutMutationInput | ChatMessageCreateOrConnectWithoutMutationInput[]
    upsert?: ChatMessageUpsertWithWhereUniqueWithoutMutationInput | ChatMessageUpsertWithWhereUniqueWithoutMutationInput[]
    createMany?: ChatMessageCreateManyMutationInputEnvelope
    set?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    disconnect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    delete?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    connect?: ChatMessageWhereUniqueInput | ChatMessageWhereUniqueInput[]
    update?: ChatMessageUpdateWithWhereUniqueWithoutMutationInput | ChatMessageUpdateWithWhereUniqueWithoutMutationInput[]
    updateMany?: ChatMessageUpdateManyWithWhereWithoutMutationInput | ChatMessageUpdateManyWithWhereWithoutMutationInput[]
    deleteMany?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedUuidFilter<$PrismaModel> | string
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
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumSubscriptionTierFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierFilter<$PrismaModel> | $Enums.SubscriptionTier
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
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
    search?: string
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

  export type NestedEnumSubscriptionTierWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionTier | EnumSubscriptionTierFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    notIn?: $Enums.SubscriptionTier[] | ListEnumSubscriptionTierFieldRefInput<$PrismaModel>
    not?: NestedEnumSubscriptionTierWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionTier
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionTierFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionTierFilter<$PrismaModel>
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumInputTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.InputType | EnumInputTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInputTypeNullableFilter<$PrismaModel> | $Enums.InputType | null
  }

  export type NestedEnumTaskStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusFilter<$PrismaModel> | $Enums.TaskStatus
  }

  export type NestedEnumTaskPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskPriorityFilter<$PrismaModel> | $Enums.TaskPriority
  }

  export type NestedEnumInputTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InputType | EnumInputTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.InputType[] | ListEnumInputTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumInputTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.InputType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumInputTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumInputTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskStatus | EnumTaskStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskStatus[] | ListEnumTaskStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskStatusWithAggregatesFilter<$PrismaModel> | $Enums.TaskStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskStatusFilter<$PrismaModel>
    _max?: NestedEnumTaskStatusFilter<$PrismaModel>
  }

  export type NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TaskPriority | EnumTaskPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TaskPriority[] | ListEnumTaskPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumTaskPriorityWithAggregatesFilter<$PrismaModel> | $Enums.TaskPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTaskPriorityFilter<$PrismaModel>
    _max?: NestedEnumTaskPriorityFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumChatRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleFilter<$PrismaModel> | $Enums.ChatRole
  }

  export type NestedEnumChatRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatRole | EnumChatRoleFieldRefInput<$PrismaModel>
    in?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.ChatRole[] | ListEnumChatRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumChatRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatRoleFilter<$PrismaModel>
    _max?: NestedEnumChatRoleFilter<$PrismaModel>
  }

  export type NestedEnumActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeFilter<$PrismaModel> | $Enums.ActionType
  }

  export type NestedEnumEntityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityType | EnumEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityTypeFilter<$PrismaModel> | $Enums.EntityType
  }

  export type NestedEnumActionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ActionType | EnumActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ActionType[] | ListEnumActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumActionTypeWithAggregatesFilter<$PrismaModel> | $Enums.ActionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumActionTypeFilter<$PrismaModel>
    _max?: NestedEnumActionTypeFilter<$PrismaModel>
  }

  export type NestedEnumEntityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EntityType | EnumEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EntityType[] | ListEnumEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEntityTypeWithAggregatesFilter<$PrismaModel> | $Enums.EntityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEntityTypeFilter<$PrismaModel>
    _max?: NestedEnumEntityTypeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    isArchived?: boolean
    deletedAt?: Date | string | null
    parent?: ProjectCreateNestedOneWithoutChildrenInput
    children?: ProjectCreateNestedManyWithoutParentInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    parentId?: string | null
    isArchived?: boolean
    deletedAt?: Date | string | null
    children?: ProjectUncheckedCreateNestedManyWithoutParentInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TaskCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    project?: ProjectCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    chatMessages?: ChatMessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    projectId?: string | null
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutUserInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskCreateManyUserInputEnvelope = {
    data: TaskCreateManyUserInput | TaskCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActionHistoryCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    undoneBy?: UserCreateNestedOneWithoutUndoneActionsInput
    chatMessages?: ChatMessageCreateNestedManyWithoutMutationInput
  }

  export type ActionHistoryUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    undoneById?: string | null
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutMutationInput
  }

  export type ActionHistoryCreateOrConnectWithoutUserInput = {
    where: ActionHistoryWhereUniqueInput
    create: XOR<ActionHistoryCreateWithoutUserInput, ActionHistoryUncheckedCreateWithoutUserInput>
  }

  export type ActionHistoryCreateManyUserInputEnvelope = {
    data: ActionHistoryCreateManyUserInput | ActionHistoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActionHistoryCreateWithoutUndoneByInput = {
    id?: string
    createdAt?: Date | string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    user: UserCreateNestedOneWithoutActionHistoryInput
    chatMessages?: ChatMessageCreateNestedManyWithoutMutationInput
  }

  export type ActionHistoryUncheckedCreateWithoutUndoneByInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutMutationInput
  }

  export type ActionHistoryCreateOrConnectWithoutUndoneByInput = {
    where: ActionHistoryWhereUniqueInput
    create: XOR<ActionHistoryCreateWithoutUndoneByInput, ActionHistoryUncheckedCreateWithoutUndoneByInput>
  }

  export type ActionHistoryCreateManyUndoneByInputEnvelope = {
    data: ActionHistoryCreateManyUndoneByInput | ActionHistoryCreateManyUndoneByInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: UuidFilter<"Project"> | string
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    emoji?: StringNullableFilter<"Project"> | string | null
    color?: StringNullableFilter<"Project"> | string | null
    aiContext?: StringNullableFilter<"Project"> | string | null
    order?: IntFilter<"Project"> | number
    parentId?: UuidNullableFilter<"Project"> | string | null
    isArchived?: BoolFilter<"Project"> | boolean
    deletedAt?: DateTimeNullableFilter<"Project"> | Date | string | null
    userId?: UuidFilter<"Project"> | string
  }

  export type TaskUpsertWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
    create: XOR<TaskCreateWithoutUserInput, TaskUncheckedCreateWithoutUserInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutUserInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutUserInput, TaskUncheckedUpdateWithoutUserInput>
  }

  export type TaskUpdateManyWithWhereWithoutUserInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutUserInput>
  }

  export type TaskScalarWhereInput = {
    AND?: TaskScalarWhereInput | TaskScalarWhereInput[]
    OR?: TaskScalarWhereInput[]
    NOT?: TaskScalarWhereInput | TaskScalarWhereInput[]
    id?: UuidFilter<"Task"> | string
    createdAt?: DateTimeFilter<"Task"> | Date | string
    updatedAt?: DateTimeFilter<"Task"> | Date | string
    title?: StringFilter<"Task"> | string
    summary?: StringNullableFilter<"Task"> | string | null
    originalInput?: StringNullableFilter<"Task"> | string | null
    originalInputType?: EnumInputTypeNullableFilter<"Task"> | $Enums.InputType | null
    status?: EnumTaskStatusFilter<"Task"> | $Enums.TaskStatus
    priority?: EnumTaskPriorityFilter<"Task"> | $Enums.TaskPriority
    deadline?: DateTimeNullableFilter<"Task"> | Date | string | null
    startDate?: DateTimeNullableFilter<"Task"> | Date | string | null
    estimatedMinutes?: IntNullableFilter<"Task"> | number | null
    order?: IntFilter<"Task"> | number
    aiProcessedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    aiModelUsed?: StringNullableFilter<"Task"> | string | null
    aiTokensUsed?: IntNullableFilter<"Task"> | number | null
    deletedAt?: DateTimeNullableFilter<"Task"> | Date | string | null
    userId?: UuidFilter<"Task"> | string
    projectId?: UuidNullableFilter<"Task"> | string | null
  }

  export type ActionHistoryUpsertWithWhereUniqueWithoutUserInput = {
    where: ActionHistoryWhereUniqueInput
    update: XOR<ActionHistoryUpdateWithoutUserInput, ActionHistoryUncheckedUpdateWithoutUserInput>
    create: XOR<ActionHistoryCreateWithoutUserInput, ActionHistoryUncheckedCreateWithoutUserInput>
  }

  export type ActionHistoryUpdateWithWhereUniqueWithoutUserInput = {
    where: ActionHistoryWhereUniqueInput
    data: XOR<ActionHistoryUpdateWithoutUserInput, ActionHistoryUncheckedUpdateWithoutUserInput>
  }

  export type ActionHistoryUpdateManyWithWhereWithoutUserInput = {
    where: ActionHistoryScalarWhereInput
    data: XOR<ActionHistoryUpdateManyMutationInput, ActionHistoryUncheckedUpdateManyWithoutUserInput>
  }

  export type ActionHistoryScalarWhereInput = {
    AND?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
    OR?: ActionHistoryScalarWhereInput[]
    NOT?: ActionHistoryScalarWhereInput | ActionHistoryScalarWhereInput[]
    id?: UuidFilter<"ActionHistory"> | string
    createdAt?: DateTimeFilter<"ActionHistory"> | Date | string
    userId?: UuidFilter<"ActionHistory"> | string
    actionType?: EnumActionTypeFilter<"ActionHistory"> | $Enums.ActionType
    entityType?: EnumEntityTypeFilter<"ActionHistory"> | $Enums.EntityType
    entityId?: UuidFilter<"ActionHistory"> | string
    payload?: JsonFilter<"ActionHistory">
    aiPromptUsed?: StringNullableFilter<"ActionHistory"> | string | null
    aiModelUsed?: StringNullableFilter<"ActionHistory"> | string | null
    aiTokensUsed?: IntNullableFilter<"ActionHistory"> | number | null
    isUndone?: BoolFilter<"ActionHistory"> | boolean
    undoneAt?: DateTimeNullableFilter<"ActionHistory"> | Date | string | null
    undoneById?: UuidNullableFilter<"ActionHistory"> | string | null
  }

  export type ActionHistoryUpsertWithWhereUniqueWithoutUndoneByInput = {
    where: ActionHistoryWhereUniqueInput
    update: XOR<ActionHistoryUpdateWithoutUndoneByInput, ActionHistoryUncheckedUpdateWithoutUndoneByInput>
    create: XOR<ActionHistoryCreateWithoutUndoneByInput, ActionHistoryUncheckedCreateWithoutUndoneByInput>
  }

  export type ActionHistoryUpdateWithWhereUniqueWithoutUndoneByInput = {
    where: ActionHistoryWhereUniqueInput
    data: XOR<ActionHistoryUpdateWithoutUndoneByInput, ActionHistoryUncheckedUpdateWithoutUndoneByInput>
  }

  export type ActionHistoryUpdateManyWithWhereWithoutUndoneByInput = {
    where: ActionHistoryScalarWhereInput
    data: XOR<ActionHistoryUpdateManyMutationInput, ActionHistoryUncheckedUpdateManyWithoutUndoneByInput>
  }

  export type ProjectCreateWithoutChildrenInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    isArchived?: boolean
    deletedAt?: Date | string | null
    parent?: ProjectCreateNestedOneWithoutChildrenInput
    user: UserCreateNestedOneWithoutProjectsInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutChildrenInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    parentId?: string | null
    isArchived?: boolean
    deletedAt?: Date | string | null
    userId: string
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutChildrenInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutChildrenInput, ProjectUncheckedCreateWithoutChildrenInput>
  }

  export type ProjectCreateWithoutParentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    isArchived?: boolean
    deletedAt?: Date | string | null
    children?: ProjectCreateNestedManyWithoutParentInput
    user: UserCreateNestedOneWithoutProjectsInput
    tasks?: TaskCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutParentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    isArchived?: boolean
    deletedAt?: Date | string | null
    userId: string
    children?: ProjectUncheckedCreateNestedManyWithoutParentInput
    tasks?: TaskUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutParentInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutParentInput, ProjectUncheckedCreateWithoutParentInput>
  }

  export type ProjectCreateManyParentInputEnvelope = {
    data: ProjectCreateManyParentInput | ProjectCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    tasks?: TaskCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryCreateNestedManyWithoutUndoneByInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryUncheckedCreateNestedManyWithoutUndoneByInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type TaskCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
    chatMessages?: ChatMessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    userId: string
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutProjectInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskCreateManyProjectInputEnvelope = {
    data: TaskCreateManyProjectInput | TaskCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithoutChildrenInput = {
    update: XOR<ProjectUpdateWithoutChildrenInput, ProjectUncheckedUpdateWithoutChildrenInput>
    create: XOR<ProjectCreateWithoutChildrenInput, ProjectUncheckedCreateWithoutChildrenInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutChildrenInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutChildrenInput, ProjectUncheckedUpdateWithoutChildrenInput>
  }

  export type ProjectUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: ProjectUpdateOneWithoutChildrenNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUpsertWithWhereUniqueWithoutParentInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutParentInput, ProjectUncheckedUpdateWithoutParentInput>
    create: XOR<ProjectCreateWithoutParentInput, ProjectUncheckedCreateWithoutParentInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutParentInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutParentInput, ProjectUncheckedUpdateWithoutParentInput>
  }

  export type ProjectUpdateManyWithWhereWithoutParentInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutParentInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: TaskUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUpdateManyWithoutUndoneByNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUncheckedUpdateManyWithoutUndoneByNestedInput
  }

  export type TaskUpsertWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    update: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
    create: XOR<TaskCreateWithoutProjectInput, TaskUncheckedCreateWithoutProjectInput>
  }

  export type TaskUpdateWithWhereUniqueWithoutProjectInput = {
    where: TaskWhereUniqueInput
    data: XOR<TaskUpdateWithoutProjectInput, TaskUncheckedUpdateWithoutProjectInput>
  }

  export type TaskUpdateManyWithWhereWithoutProjectInput = {
    where: TaskScalarWhereInput
    data: XOR<TaskUpdateManyMutationInput, TaskUncheckedUpdateManyWithoutProjectInput>
  }

  export type UserCreateWithoutTasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryCreateNestedManyWithoutUndoneByInput
  }

  export type UserUncheckedCreateWithoutTasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryUncheckedCreateNestedManyWithoutUndoneByInput
  }

  export type UserCreateOrConnectWithoutTasksInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
  }

  export type ProjectCreateWithoutTasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    isArchived?: boolean
    deletedAt?: Date | string | null
    parent?: ProjectCreateNestedOneWithoutChildrenInput
    children?: ProjectCreateNestedManyWithoutParentInput
    user: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateWithoutTasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    parentId?: string | null
    isArchived?: boolean
    deletedAt?: Date | string | null
    userId: string
    children?: ProjectUncheckedCreateNestedManyWithoutParentInput
  }

  export type ProjectCreateOrConnectWithoutTasksInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
  }

  export type SubtaskCreateWithoutTaskInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    isAiGenerated?: boolean
    deletedAt?: Date | string | null
  }

  export type SubtaskUncheckedCreateWithoutTaskInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    isAiGenerated?: boolean
    deletedAt?: Date | string | null
  }

  export type SubtaskCreateOrConnectWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
  }

  export type SubtaskCreateManyTaskInputEnvelope = {
    data: SubtaskCreateManyTaskInput | SubtaskCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type ChatMessageCreateWithoutTaskInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    deletedAt?: Date | string | null
    mutation?: ActionHistoryCreateNestedOneWithoutChatMessagesInput
  }

  export type ChatMessageUncheckedCreateWithoutTaskInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    mutationId?: string | null
    deletedAt?: Date | string | null
  }

  export type ChatMessageCreateOrConnectWithoutTaskInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutTaskInput, ChatMessageUncheckedCreateWithoutTaskInput>
  }

  export type ChatMessageCreateManyTaskInputEnvelope = {
    data: ChatMessageCreateManyTaskInput | ChatMessageCreateManyTaskInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTasksInput = {
    update: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
    create: XOR<UserCreateWithoutTasksInput, UserUncheckedCreateWithoutTasksInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTasksInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTasksInput, UserUncheckedUpdateWithoutTasksInput>
  }

  export type UserUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUpdateManyWithoutUndoneByNestedInput
  }

  export type UserUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUncheckedUpdateManyWithoutUndoneByNestedInput
  }

  export type ProjectUpsertWithoutTasksInput = {
    update: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
    create: XOR<ProjectCreateWithoutTasksInput, ProjectUncheckedCreateWithoutTasksInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutTasksInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutTasksInput, ProjectUncheckedUpdateWithoutTasksInput>
  }

  export type ProjectUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: ProjectUpdateOneWithoutChildrenNestedInput
    children?: ProjectUpdateManyWithoutParentNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    children?: ProjectUncheckedUpdateManyWithoutParentNestedInput
  }

  export type SubtaskUpsertWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    update: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>
    create: XOR<SubtaskCreateWithoutTaskInput, SubtaskUncheckedCreateWithoutTaskInput>
  }

  export type SubtaskUpdateWithWhereUniqueWithoutTaskInput = {
    where: SubtaskWhereUniqueInput
    data: XOR<SubtaskUpdateWithoutTaskInput, SubtaskUncheckedUpdateWithoutTaskInput>
  }

  export type SubtaskUpdateManyWithWhereWithoutTaskInput = {
    where: SubtaskScalarWhereInput
    data: XOR<SubtaskUpdateManyMutationInput, SubtaskUncheckedUpdateManyWithoutTaskInput>
  }

  export type SubtaskScalarWhereInput = {
    AND?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
    OR?: SubtaskScalarWhereInput[]
    NOT?: SubtaskScalarWhereInput | SubtaskScalarWhereInput[]
    id?: UuidFilter<"Subtask"> | string
    createdAt?: DateTimeFilter<"Subtask"> | Date | string
    updatedAt?: DateTimeFilter<"Subtask"> | Date | string
    title?: StringFilter<"Subtask"> | string
    isCompleted?: BoolFilter<"Subtask"> | boolean
    completedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    order?: IntFilter<"Subtask"> | number
    isAiGenerated?: BoolFilter<"Subtask"> | boolean
    deletedAt?: DateTimeNullableFilter<"Subtask"> | Date | string | null
    taskId?: UuidFilter<"Subtask"> | string
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutTaskInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutTaskInput, ChatMessageUncheckedUpdateWithoutTaskInput>
    create: XOR<ChatMessageCreateWithoutTaskInput, ChatMessageUncheckedCreateWithoutTaskInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutTaskInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutTaskInput, ChatMessageUncheckedUpdateWithoutTaskInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutTaskInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutTaskInput>
  }

  export type ChatMessageScalarWhereInput = {
    AND?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    OR?: ChatMessageScalarWhereInput[]
    NOT?: ChatMessageScalarWhereInput | ChatMessageScalarWhereInput[]
    id?: UuidFilter<"ChatMessage"> | string
    createdAt?: DateTimeFilter<"ChatMessage"> | Date | string
    role?: EnumChatRoleFilter<"ChatMessage"> | $Enums.ChatRole
    content?: StringFilter<"ChatMessage"> | string
    isExcluded?: BoolFilter<"ChatMessage"> | boolean
    aiModelUsed?: StringNullableFilter<"ChatMessage"> | string | null
    aiTokensUsed?: IntNullableFilter<"ChatMessage"> | number | null
    appliedAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
    mutationId?: UuidNullableFilter<"ChatMessage"> | string | null
    deletedAt?: DateTimeNullableFilter<"ChatMessage"> | Date | string | null
    taskId?: UuidFilter<"ChatMessage"> | string
  }

  export type TaskCreateWithoutSubtasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTasksInput
    project?: ProjectCreateNestedOneWithoutTasksInput
    chatMessages?: ChatMessageCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutSubtasksInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    userId: string
    projectId?: string | null
    chatMessages?: ChatMessageUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutSubtasksInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
  }

  export type TaskUpsertWithoutSubtasksInput = {
    update: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
    create: XOR<TaskCreateWithoutSubtasksInput, TaskUncheckedCreateWithoutSubtasksInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutSubtasksInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutSubtasksInput, TaskUncheckedUpdateWithoutSubtasksInput>
  }

  export type TaskUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    project?: ProjectUpdateOneWithoutTasksNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutSubtasksInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type ActionHistoryCreateWithoutChatMessagesInput = {
    id?: string
    createdAt?: Date | string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    user: UserCreateNestedOneWithoutActionHistoryInput
    undoneBy?: UserCreateNestedOneWithoutUndoneActionsInput
  }

  export type ActionHistoryUncheckedCreateWithoutChatMessagesInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    undoneById?: string | null
  }

  export type ActionHistoryCreateOrConnectWithoutChatMessagesInput = {
    where: ActionHistoryWhereUniqueInput
    create: XOR<ActionHistoryCreateWithoutChatMessagesInput, ActionHistoryUncheckedCreateWithoutChatMessagesInput>
  }

  export type TaskCreateWithoutChatMessagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    user: UserCreateNestedOneWithoutTasksInput
    project?: ProjectCreateNestedOneWithoutTasksInput
    subtasks?: SubtaskCreateNestedManyWithoutTaskInput
  }

  export type TaskUncheckedCreateWithoutChatMessagesInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    userId: string
    projectId?: string | null
    subtasks?: SubtaskUncheckedCreateNestedManyWithoutTaskInput
  }

  export type TaskCreateOrConnectWithoutChatMessagesInput = {
    where: TaskWhereUniqueInput
    create: XOR<TaskCreateWithoutChatMessagesInput, TaskUncheckedCreateWithoutChatMessagesInput>
  }

  export type ActionHistoryUpsertWithoutChatMessagesInput = {
    update: XOR<ActionHistoryUpdateWithoutChatMessagesInput, ActionHistoryUncheckedUpdateWithoutChatMessagesInput>
    create: XOR<ActionHistoryCreateWithoutChatMessagesInput, ActionHistoryUncheckedCreateWithoutChatMessagesInput>
    where?: ActionHistoryWhereInput
  }

  export type ActionHistoryUpdateToOneWithWhereWithoutChatMessagesInput = {
    where?: ActionHistoryWhereInput
    data: XOR<ActionHistoryUpdateWithoutChatMessagesInput, ActionHistoryUncheckedUpdateWithoutChatMessagesInput>
  }

  export type ActionHistoryUpdateWithoutChatMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutActionHistoryNestedInput
    undoneBy?: UserUpdateOneWithoutUndoneActionsNestedInput
  }

  export type ActionHistoryUncheckedUpdateWithoutChatMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    undoneById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TaskUpsertWithoutChatMessagesInput = {
    update: XOR<TaskUpdateWithoutChatMessagesInput, TaskUncheckedUpdateWithoutChatMessagesInput>
    create: XOR<TaskCreateWithoutChatMessagesInput, TaskUncheckedCreateWithoutChatMessagesInput>
    where?: TaskWhereInput
  }

  export type TaskUpdateToOneWithWhereWithoutChatMessagesInput = {
    where?: TaskWhereInput
    data: XOR<TaskUpdateWithoutChatMessagesInput, TaskUncheckedUpdateWithoutChatMessagesInput>
  }

  export type TaskUpdateWithoutChatMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    project?: ProjectUpdateOneWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutChatMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type UserCreateWithoutActionHistoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryCreateNestedManyWithoutUndoneByInput
  }

  export type UserUncheckedCreateWithoutActionHistoryInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    undoneActions?: ActionHistoryUncheckedCreateNestedManyWithoutUndoneByInput
  }

  export type UserCreateOrConnectWithoutActionHistoryInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActionHistoryInput, UserUncheckedCreateWithoutActionHistoryInput>
  }

  export type UserCreateWithoutUndoneActionsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectCreateNestedManyWithoutUserInput
    tasks?: TaskCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUndoneActionsInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    telegramId: bigint | number
    telegramName?: string | null
    telegramPhoto?: string | null
    encryptedApiKey?: string | null
    tier?: $Enums.SubscriptionTier
    aiCreditsUsed?: number
    aiCreditsResetAt?: Date | string | null
    timezone?: string
    locale?: string
    isOnboarded?: boolean
    deletedAt?: Date | string | null
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    tasks?: TaskUncheckedCreateNestedManyWithoutUserInput
    actionHistory?: ActionHistoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUndoneActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUndoneActionsInput, UserUncheckedCreateWithoutUndoneActionsInput>
  }

  export type ChatMessageCreateWithoutMutationInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    deletedAt?: Date | string | null
    task: TaskCreateNestedOneWithoutChatMessagesInput
  }

  export type ChatMessageUncheckedCreateWithoutMutationInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    deletedAt?: Date | string | null
    taskId: string
  }

  export type ChatMessageCreateOrConnectWithoutMutationInput = {
    where: ChatMessageWhereUniqueInput
    create: XOR<ChatMessageCreateWithoutMutationInput, ChatMessageUncheckedCreateWithoutMutationInput>
  }

  export type ChatMessageCreateManyMutationInputEnvelope = {
    data: ChatMessageCreateManyMutationInput | ChatMessageCreateManyMutationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutActionHistoryInput = {
    update: XOR<UserUpdateWithoutActionHistoryInput, UserUncheckedUpdateWithoutActionHistoryInput>
    create: XOR<UserCreateWithoutActionHistoryInput, UserUncheckedCreateWithoutActionHistoryInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActionHistoryInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActionHistoryInput, UserUncheckedUpdateWithoutActionHistoryInput>
  }

  export type UserUpdateWithoutActionHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUpdateManyWithoutUndoneByNestedInput
  }

  export type UserUncheckedUpdateWithoutActionHistoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    undoneActions?: ActionHistoryUncheckedUpdateManyWithoutUndoneByNestedInput
  }

  export type UserUpsertWithoutUndoneActionsInput = {
    update: XOR<UserUpdateWithoutUndoneActionsInput, UserUncheckedUpdateWithoutUndoneActionsInput>
    create: XOR<UserCreateWithoutUndoneActionsInput, UserUncheckedCreateWithoutUndoneActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUndoneActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUndoneActionsInput, UserUncheckedUpdateWithoutUndoneActionsInput>
  }

  export type UserUpdateWithoutUndoneActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUpdateManyWithoutUserNestedInput
    tasks?: TaskUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUndoneActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    telegramId?: BigIntFieldUpdateOperationsInput | bigint | number
    telegramName?: NullableStringFieldUpdateOperationsInput | string | null
    telegramPhoto?: NullableStringFieldUpdateOperationsInput | string | null
    encryptedApiKey?: NullableStringFieldUpdateOperationsInput | string | null
    tier?: EnumSubscriptionTierFieldUpdateOperationsInput | $Enums.SubscriptionTier
    aiCreditsUsed?: IntFieldUpdateOperationsInput | number
    aiCreditsResetAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    timezone?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    isOnboarded?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutUserNestedInput
    actionHistory?: ActionHistoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ChatMessageUpsertWithWhereUniqueWithoutMutationInput = {
    where: ChatMessageWhereUniqueInput
    update: XOR<ChatMessageUpdateWithoutMutationInput, ChatMessageUncheckedUpdateWithoutMutationInput>
    create: XOR<ChatMessageCreateWithoutMutationInput, ChatMessageUncheckedCreateWithoutMutationInput>
  }

  export type ChatMessageUpdateWithWhereUniqueWithoutMutationInput = {
    where: ChatMessageWhereUniqueInput
    data: XOR<ChatMessageUpdateWithoutMutationInput, ChatMessageUncheckedUpdateWithoutMutationInput>
  }

  export type ChatMessageUpdateManyWithWhereWithoutMutationInput = {
    where: ChatMessageScalarWhereInput
    data: XOR<ChatMessageUpdateManyMutationInput, ChatMessageUncheckedUpdateManyWithoutMutationInput>
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    parentId?: string | null
    isArchived?: boolean
    deletedAt?: Date | string | null
  }

  export type TaskCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    projectId?: string | null
  }

  export type ActionHistoryCreateManyUserInput = {
    id?: string
    createdAt?: Date | string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
    undoneById?: string | null
  }

  export type ActionHistoryCreateManyUndoneByInput = {
    id?: string
    createdAt?: Date | string
    userId: string
    actionType: $Enums.ActionType
    entityType: $Enums.EntityType
    entityId: string
    payload: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    isUndone?: boolean
    undoneAt?: Date | string | null
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    parent?: ProjectUpdateOneWithoutChildrenNestedInput
    children?: ProjectUpdateManyWithoutParentNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: ProjectUncheckedUpdateManyWithoutParentNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type TaskUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActionHistoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    undoneBy?: UserUpdateOneWithoutUndoneActionsNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutMutationNestedInput
  }

  export type ActionHistoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    undoneById?: NullableStringFieldUpdateOperationsInput | string | null
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutMutationNestedInput
  }

  export type ActionHistoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    undoneById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActionHistoryUpdateWithoutUndoneByInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutActionHistoryNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutMutationNestedInput
  }

  export type ActionHistoryUncheckedUpdateWithoutUndoneByInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutMutationNestedInput
  }

  export type ActionHistoryUncheckedUpdateManyWithoutUndoneByInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    actionType?: EnumActionTypeFieldUpdateOperationsInput | $Enums.ActionType
    entityType?: EnumEntityTypeFieldUpdateOperationsInput | $Enums.EntityType
    entityId?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    aiPromptUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    isUndone?: BoolFieldUpdateOperationsInput | boolean
    undoneAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ProjectCreateManyParentInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    name: string
    description?: string | null
    emoji?: string | null
    color?: string | null
    aiContext?: string | null
    order?: number
    isArchived?: boolean
    deletedAt?: Date | string | null
    userId: string
  }

  export type TaskCreateManyProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    summary?: string | null
    originalInput?: string | null
    originalInputType?: $Enums.InputType | null
    status?: $Enums.TaskStatus
    priority?: $Enums.TaskPriority
    deadline?: Date | string | null
    startDate?: Date | string | null
    estimatedMinutes?: number | null
    order?: number
    aiProcessedAt?: Date | string | null
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    deletedAt?: Date | string | null
    userId: string
  }

  export type ProjectUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    children?: ProjectUpdateManyWithoutParentNestedInput
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    tasks?: TaskUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    children?: ProjectUncheckedUpdateManyWithoutParentNestedInput
    tasks?: TaskUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    emoji?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    aiContext?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    isArchived?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TaskUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutTasksNestedInput
    subtasks?: SubtaskUpdateManyWithoutTaskNestedInput
    chatMessages?: ChatMessageUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
    subtasks?: SubtaskUncheckedUpdateManyWithoutTaskNestedInput
    chatMessages?: ChatMessageUncheckedUpdateManyWithoutTaskNestedInput
  }

  export type TaskUncheckedUpdateManyWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    originalInput?: NullableStringFieldUpdateOperationsInput | string | null
    originalInputType?: NullableEnumInputTypeFieldUpdateOperationsInput | $Enums.InputType | null
    status?: EnumTaskStatusFieldUpdateOperationsInput | $Enums.TaskStatus
    priority?: EnumTaskPriorityFieldUpdateOperationsInput | $Enums.TaskPriority
    deadline?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estimatedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    order?: IntFieldUpdateOperationsInput | number
    aiProcessedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SubtaskCreateManyTaskInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    title: string
    isCompleted?: boolean
    completedAt?: Date | string | null
    order?: number
    isAiGenerated?: boolean
    deletedAt?: Date | string | null
  }

  export type ChatMessageCreateManyTaskInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    mutationId?: string | null
    deletedAt?: Date | string | null
  }

  export type SubtaskUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubtaskUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SubtaskUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    isCompleted?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    order?: IntFieldUpdateOperationsInput | number
    isAiGenerated?: BoolFieldUpdateOperationsInput | boolean
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMessageUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mutation?: ActionHistoryUpdateOneWithoutChatMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mutationId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMessageUncheckedUpdateManyWithoutTaskInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    mutationId?: NullableStringFieldUpdateOperationsInput | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ChatMessageCreateManyMutationInput = {
    id?: string
    createdAt?: Date | string
    role: $Enums.ChatRole
    content: string
    isExcluded?: boolean
    aiModelUsed?: string | null
    aiTokensUsed?: number | null
    appliedAt?: Date | string | null
    deletedAt?: Date | string | null
    taskId: string
  }

  export type ChatMessageUpdateWithoutMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    task?: TaskUpdateOneRequiredWithoutChatMessagesNestedInput
  }

  export type ChatMessageUncheckedUpdateWithoutMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    taskId?: StringFieldUpdateOperationsInput | string
  }

  export type ChatMessageUncheckedUpdateManyWithoutMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: EnumChatRoleFieldUpdateOperationsInput | $Enums.ChatRole
    content?: StringFieldUpdateOperationsInput | string
    isExcluded?: BoolFieldUpdateOperationsInput | boolean
    aiModelUsed?: NullableStringFieldUpdateOperationsInput | string | null
    aiTokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deletedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    taskId?: StringFieldUpdateOperationsInput | string
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
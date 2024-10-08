/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.SettingsInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).settings.createMany(input as any))),

        create: procedure.input($Schema.SettingsInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).settings.create(input as any))),

        deleteMany: procedure.input($Schema.SettingsInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).settings.deleteMany(input as any))),

        delete: procedure.input($Schema.SettingsInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).settings.delete(input as any))),

        findFirst: procedure.input($Schema.SettingsInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).settings.findFirst(input as any))),

        findMany: procedure.input($Schema.SettingsInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).settings.findMany(input as any))),

        findUnique: procedure.input($Schema.SettingsInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).settings.findUnique(input as any))),

        updateMany: procedure.input($Schema.SettingsInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).settings.updateMany(input as any))),

        update: procedure.input($Schema.SettingsInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).settings.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.SettingsCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingsCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingsCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingsCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.SettingsCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingsCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SettingsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SettingsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingsCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingsCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SettingsGetPayload<T>, Context>) => Promise<Prisma.SettingsGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.SettingsDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingsDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingsDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingsDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.SettingsDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingsDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SettingsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SettingsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingsDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingsDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SettingsGetPayload<T>, Context>) => Promise<Prisma.SettingsGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.SettingsFindFirstArgs, TData = Prisma.SettingsGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SettingsFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SettingsGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SettingsFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SettingsFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SettingsGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SettingsGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.SettingsFindManyArgs, TData = Array<Prisma.SettingsGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.SettingsFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.SettingsGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SettingsFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SettingsFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.SettingsGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.SettingsGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.SettingsFindUniqueArgs, TData = Prisma.SettingsGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.SettingsFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.SettingsGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.SettingsFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.SettingsFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.SettingsGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.SettingsGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.SettingsUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingsUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingsUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingsUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.SettingsUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.SettingsUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.SettingsGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.SettingsGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.SettingsUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.SettingsUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.SettingsGetPayload<T>, Context>) => Promise<Prisma.SettingsGetPayload<T>>
            };

    };
}

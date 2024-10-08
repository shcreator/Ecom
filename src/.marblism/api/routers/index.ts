/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createProductRouter from "./Product.router";
import createBlogPostRouter from "./BlogPost.router";
import createOrderRouter from "./Order.router";
import createOrderItemRouter from "./OrderItem.router";
import createCartItemRouter from "./CartItem.router";
import createTransactionRouter from "./Transaction.router";
import createSettingsRouter from "./Settings.router";
import createUserRouter from "./User.router";
import createPushNotificationRouter from "./PushNotification.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as ProductClientType } from "./Product.router";
import { ClientType as BlogPostClientType } from "./BlogPost.router";
import { ClientType as OrderClientType } from "./Order.router";
import { ClientType as OrderItemClientType } from "./OrderItem.router";
import { ClientType as CartItemClientType } from "./CartItem.router";
import { ClientType as TransactionClientType } from "./Transaction.router";
import { ClientType as SettingsClientType } from "./Settings.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as PushNotificationClientType } from "./PushNotification.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        product: createProductRouter(router, procedure),
        blogPost: createBlogPostRouter(router, procedure),
        order: createOrderRouter(router, procedure),
        orderItem: createOrderItemRouter(router, procedure),
        cartItem: createCartItemRouter(router, procedure),
        transaction: createTransactionRouter(router, procedure),
        settings: createSettingsRouter(router, procedure),
        user: createUserRouter(router, procedure),
        pushNotification: createPushNotificationRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    product: ProductClientType<AppRouter>;
    blogPost: BlogPostClientType<AppRouter>;
    order: OrderClientType<AppRouter>;
    orderItem: OrderItemClientType<AppRouter>;
    cartItem: CartItemClientType<AppRouter>;
    transaction: TransactionClientType<AppRouter>;
    settings: SettingsClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    pushNotification: PushNotificationClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}

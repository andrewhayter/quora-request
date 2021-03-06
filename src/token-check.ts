import { Context } from "koa";

export async function tokenCheck(ctx : Context, next: () => Promise<any>) {
    const authHeader = ctx.request.header.authorization
    const token: string = authHeader.replace('Bearer ', '')
    const validToken = Buffer.from(token, 'base64').toString('ascii') === process.env.API_KEY
    if(validToken) {
        await next();
    } else {
        ctx.status = 401
    }
}
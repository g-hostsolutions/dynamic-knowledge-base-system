import { Request } from 'express'
import { matchedData } from 'express-validator'
import { ValidatedData } from './interface/baseRequest.interface'

export abstract class BaseRequestTransformer<
    B = Record<string, unknown>,
    Q = Record<string, unknown>,
    P = Record<string, unknown>,
    H = Record<string, unknown>,
> {
    public getValidData(req: Request): ValidatedData<B, Q, P, H> {
        return {
            body: this.getMatchedBody(req) as B,
            query: this.getMatchedQuery(req) as Q,
            params: this.getMatchedParams(req) as P,
            headers: this.getMatchedHeaders(req) as H,
        }
    }

    protected abstract deleteInvalidBodyKeys(
        body: Record<string, unknown>,
    ): Record<string, unknown>

    private getMatchedQuery(req: Request): Record<string, unknown> {
        return matchedData(req, {
            onlyValidData: true,
            includeOptionals: false,
            locations: ['query'],
        })
    }

    private getMatchedBody(req: Request): Record<string, unknown> {
        const data = matchedData(req, {
            onlyValidData: true,
            includeOptionals: false,
            locations: ['body'],
        })

        return this.deleteInvalidBodyKeys(data)
    }

    private getMatchedHeaders(req: Request): Record<string, unknown> {
        return matchedData(req, {
            onlyValidData: true,
            includeOptionals: false,
            locations: ['headers'],
        })
    }

    private getMatchedParams(req: Request): Record<string, unknown> {
        return matchedData(req, {
            onlyValidData: true,
            includeOptionals: false,
            locations: ['params'],
        })
    }
}

export class RequestTransformer<
    B = Record<string, unknown>,
    Q = Record<string, unknown>,
    P = Record<string, unknown>,
    H = Record<string, unknown>,
> extends BaseRequestTransformer<B, Q, P, H> {
    protected deleteInvalidBodyKeys(
        body: Record<string, unknown>,
    ): Record<string, unknown> {
        const data = { ...body }
        delete data['']
        return data
    }
}

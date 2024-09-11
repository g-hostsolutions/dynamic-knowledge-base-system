export interface ValidatedData<
    B = Record<string, unknown>,
    Q = Record<string, unknown>,
    P = Record<string, unknown>,
    H = Record<string, unknown>,
> {
    body: B
    query: Q
    params: P
    headers: H
}

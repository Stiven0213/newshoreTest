import { To } from "./to.model";

export interface CurrencyResponse {
    terms: string
    privacy: string
    from: string
    amount: number
    timestemp: Date
    to: To[]
}
import {IMetadata} from 'stripe';

export function formatStripeMetadata(
    data: any,
    options?: {
        keyLengthLimit: number;
        numKeysLimit?: number;
        valueLengthLimit?: number;
    }
): IMetadata {
    if (data === null || typeof data === 'undefined') {
        return {};
    }

    if (Array.isArray(data)) {
        return {
            data: JSON.stringify(data)
        };
    }

    return {foo: 'bar'};
}

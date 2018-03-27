import {IMetadata} from 'stripe';

// Default values from https://stripe.com/docs/api#metadata
export const MAX_KEY_LENGTH = 40;
export const MAX_NUM_KEYS = 20;
export const MAX_VALUE_LENGTH = 500;

export function formatStripeMetadata(
    data: any,
    options?: {
        maxKeyLength?: number;
        maxNumKeys?: number;
        maxValueLength?: number;
    }
): IMetadata {
    if (data === null || typeof data === 'undefined') {
        return {
            _fullData: 'true'
        };
    }

    const maxKeyLength =
        options && options.maxKeyLength ? options.maxKeyLength : MAX_KEY_LENGTH;
    const maxNumKeys =
        options && options.maxNumKeys ? options.maxNumKeys : MAX_NUM_KEYS;
    const maxValueLength =
        options && options.maxValueLength
            ? options.maxValueLength
            : MAX_VALUE_LENGTH;

    if (typeof data === 'string' || typeof data === 'number') {
        const dataString = data.toString();
        return {
            _fullData: (dataString.length <= maxValueLength).toString(),
            data: dataString.substr(0, maxValueLength)
        };
    }

    if (Array.isArray(data)) {
        const dataString = JSON.stringify(data);

        return {
            _fullData: (dataString.length <= maxValueLength).toString(),
            data: dataString.substr(0, maxValueLength)
        };
    }

    const keys = Object.keys(data);
    let fullData = keys.length <= maxNumKeys - 1;
    const metadata: IMetadata = {};

    for (const key of keys.slice(0, maxNumKeys - 1)) {
        let newKey = key;
        if (key.length > maxKeyLength) {
            newKey = key.substr(0, maxKeyLength);
            fullData = false;
        }

        let value =
            typeof data[key] === 'string'
                ? data[key]
                : JSON.stringify(data[key]);
        if (value.length > maxValueLength) {
            value = value.substr(0, maxValueLength);
            fullData = false;
        }

        metadata[newKey] = value;
    }

    metadata._fullData = fullData.toString();
    return metadata;
}

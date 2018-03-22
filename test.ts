import {formatStripeMetadata as format} from './index';

test('empty values', () => {
    expect(format(null)).toEqual({});
    expect(format(undefined)).toEqual({});
    expect(format()).toEqual({});
});

test('array', () => {
    expect(format([])).toEqual({data: '[]'});
});

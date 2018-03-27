import {
    formatStripeMetadata as format,
    MAX_KEY_LENGTH,
    MAX_NUM_KEYS,
    MAX_VALUE_LENGTH
} from './index';

test('empty values', () => {
    const emptyResult = {_fullData: 'true'};
    expect(format(null)).toEqual(emptyResult);
    expect(format(undefined)).toEqual(emptyResult);
    expect(format()).toEqual(emptyResult);
});

test('string', () => {
    expect(format('Why Walk a Dog?')).toEqual({
        _fullData: 'true',
        data: 'Why Walk a Dog?'
    });
});

test('number', () => {
    expect(format(3456)).toEqual({
        _fullData: 'true',
        data: '3456'
    });
});

test('array', () => {
    expect(format([])).toEqual({_fullData: 'true', data: '[]'});
});

test('valid object', () => {
    const metadata = {
        foo: 3,
        bar: 'asdf',
        baz: false
    };

    expect(format(metadata)).toEqual({
        _fullData: 'true',
        foo: '3',
        bar: 'asdf',
        baz: 'false'
    });
});

test('key is too long', () => {
    const key = 'a'.repeat(MAX_KEY_LENGTH + 1);
    const metadata = {
        [key]: 'Nowhere Fast'
    };

    expect(format(metadata)).toEqual({
        _fullData: 'false',
        [key.substr(0, MAX_KEY_LENGTH)]: 'Nowhere Fast'
    });
});

test('value is too long', () => {
    const value = 'a'.repeat(MAX_VALUE_LENGTH + 1);
    const metadata = {
        foo: value
    };

    expect(format(metadata)).toEqual({
        _fullData: 'false',
        foo: value.substr(0, MAX_VALUE_LENGTH)
    });
});

test('too many keys', () => {
    const metadata = {};
    for (const letter of 'abcdefghijklmnopqrstuvwxyz') {
        metadata[letter] = 'Once In My Life';
    }

    const formatted = format(metadata);
    expect(formatted._fullData).toBe('false');
    expect(Object.keys(formatted)).toHaveLength(MAX_NUM_KEYS);
});

test('custom max num keys', () => {
    const options = {maxNumKeys: 3};
    const metadata = {a: null, b: null, c: null, d: null, e: null};
    const formatted = format(metadata, options);
    expect(formatted._fullData).toBe('false');
    expect(Object.keys(formatted)).toHaveLength(options.maxNumKeys);
});

test('custom max key length', () => {
    const options = {maxKeyLength: 12};
    const metadata = {abcdefghijklmno: 'Severed'};
    const formatted = format(metadata, options);
    expect(formatted._fullData).toBe('false');
    expect(formatted).toHaveProperty('abcdefghijkl', 'Severed');
});

test('custom max value length', () => {
    const options = {maxValueLength: 8};
    const metadata = {foo: 'The meaning of life is'};
    const formatted = format(metadata, options);
    expect(formatted._fullData).toBe('false');
    expect(formatted).toHaveProperty('foo', 'The mean');
});

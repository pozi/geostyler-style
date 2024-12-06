/**
 * Contains typeguards for geostyler-style
 * https://basarat.gitbook.io/typescript/type-system/typeguard#user-defined-type-guards
 */
function isString(str) {
    if (str != null && typeof str.valueOf() === 'string') {
        return true;
    }
    return false;
}
;
function isNumber(num) {
    if (num != null && typeof num.valueOf() === 'number') {
        return true;
    }
    return false;
}
function isBoolean(bool) {
    if (bool != null && typeof bool.valueOf() === 'boolean') {
        return true;
    }
    return false;
}
;
export const isExpression = (got) => {
    return isGeoStylerFunction(got) || isPropertyType(got);
};
/**
 * @deprecated use isFunction instead
 */
export const isFunctionCall = (got) => {
    return got.type === 'functioncall' &&
        got.hasOwnProperty('name') &&
        isString(got.name) &&
        got.hasOwnProperty('args') &&
        Array.isArray(got.args) &&
        got.args.every((arg) => isExpression(arg));
};
// PropertyValue
export const isPropertyType = (got) => {
    return isString(got) || isNumber(got) || isBoolean(got) || got === null;
};
// ScaleDenominator
export const isScaleDenominator = (got) => {
    return !!((got?.min || got?.max) &&
        ((!!got.min) ? isGeoStylerNumberFunction(got.min) || isNumber(got.min) : true) &&
        ((!!got.max) ? isGeoStylerNumberFunction(got.max) || isNumber(got.min) : true));
};
// Operators
export const isOperator = (got) => {
    return isComparisonOperator(got) ||
        isCombinationOperator(got) ||
        isNegationOperator(got);
};
export const isComparisonOperator = (got) => {
    return ['==', '*=', '!=', '<', '<=', '>', '>=', '<=x<='].includes(got);
};
export const isCombinationOperator = (got) => {
    return ['&&', '||'].includes(got);
};
export const isNegationOperator = (got) => {
    return got === '!';
};
// Filters
export const isFilter = (got) => {
    return isComparisonFilter(got) ||
        isCombinationFilter(got) ||
        isGeoStylerBooleanFunction(got) ||
        isNegationFilter(got) ||
        isGeoStylerBooleanFunction(got) ||
        isBoolean(got);
};
export const isComparisonFilter = (got) => {
    const expectedLength = got && got[0] === '<=x<=' ? 4 : 3;
    return (Array.isArray(got) &&
        got.length === expectedLength &&
        isComparisonOperator(got[0]) &&
        isExpression(got[1]) &&
        isExpression(got[2]) &&
        (got[0] !== '<=x<=' || isNumber(got[3])));
};
export const isCombinationFilter = (got) => {
    return Array.isArray(got) &&
        got.length >= 3 &&
        isCombinationOperator(got[0]) &&
        got.every((arg, index) => index === 0 || isFilter(arg));
};
export const isNegationFilter = (got) => {
    return Array.isArray(got) &&
        got.length === 2 &&
        isNegationOperator(got[0]) &&
        isFilter(got[1]);
};
// Symbolizers
export const isSymbolizer = (got) => {
    return isPointSymbolizer(got) ||
        isLineSymbolizer(got) ||
        isFillSymbolizer(got) ||
        isRasterSymbolizer(got);
};
export const isPointSymbolizer = (got) => {
    return isIconSymbolizer(got) || isMarkSymbolizer(got) || isTextSymbolizer(got);
};
export const isIconSymbolizer = (got) => {
    return got?.kind === 'Icon';
};
export const isTextSymbolizer = (got) => {
    return got?.kind === 'Text';
};
export const isMarkSymbolizer = (got) => {
    return got?.kind === 'Mark' && isString(got?.wellKnownName);
};
export const isLineSymbolizer = (got) => {
    return got?.kind === 'Line';
};
export const isFillSymbolizer = (got) => {
    return got?.kind === 'Fill';
};
export const isRasterSymbolizer = (got) => {
    return got?.kind === 'Raster';
};
// Rule
export const isRule = (got) => {
    return !!(isString(got?.name) &&
        (got?.filter ? isFilter(got.filter) : true) &&
        (got?.scaleDenominator ? isScaleDenominator(got.scaleDenominator) : true) &&
        got?.symbolizers?.every((arg) => isSymbolizer(arg)));
};
/**
 * Checks if ChannelSelection is of type RGBChannel.
 */
export const isRgbChannel = (got) => {
    return !!(got?.redChannel !== undefined
        || got?.greenChannel !== undefined
        || got?.blueChannel !== undefined);
};
/**
 * Checks if ChannelSelection is of type GrayChannel.
 */
export const isGrayChannel = (got) => {
    return !!(got?.grayChannel !== undefined);
};
// Functions
export const isGeoStylerNumberFunction = (got) => {
    const functionNames = [
        'abs',
        'acos',
        'add',
        'asin',
        'atan',
        'atan2',
        'ceil',
        'cos',
        'div',
        'exp',
        'floor',
        'interpolate',
        'log',
        'max',
        'min',
        'modulo',
        'mul',
        'pi',
        'pow',
        'random',
        'rint',
        'round',
        'sin',
        'sqrt',
        'strIndexOf',
        'strLastIndexOf',
        'strLength',
        'sub',
        'tan',
        'toDegrees',
        'toNumber',
        'toRadians'
    ];
    return functionNames.includes(got?.name);
};
export const isGeoStylerStringFunction = (got) => {
    const functionNames = [
        'numberFormat',
        'strAbbreviate',
        'strCapitalize',
        'strConcat',
        'strDefaultIfBlank',
        'strReplace',
        'strStripAccents',
        'strSubstring',
        'strSubstringStart',
        'strToLowerCase',
        'strToString',
        'strToUpperCase',
        'strTrim'
    ];
    return functionNames.includes(got?.name);
};
export const isGeoStylerBooleanFunction = (got) => {
    const functionNames = [
        'all',
        'any',
        'between',
        'double2bool',
        'equalTo',
        'greaterThan',
        'greaterThanOrEqualTo',
        'in',
        'lessThan',
        'lessThanOrEqualTo',
        'not',
        'notEqualTo',
        'parseBoolean',
        'strEndsWith',
        'strEqualsIgnoreCase',
        'strMatches',
        'strStartsWith'
    ];
    return functionNames.includes(got?.name);
};
export const isGeoStylerUnknownFunction = (got) => {
    const functionNames = [
        'case',
        'property',
        'step'
    ];
    return functionNames.includes(got?.name);
};
export const isGeoStylerFunction = (got) => {
    return isGeoStylerBooleanFunction(got) ||
        isGeoStylerNumberFunction(got) ||
        isGeoStylerStringFunction(got) ||
        isGeoStylerUnknownFunction(got);
};
export const isSprite = (got) => {
    return typeof got?.source === 'string' || isGeoStylerFunction(got?.source) &&
        Array.isArray(got.position) &&
        Array.isArray(got.size);
};
//# sourceMappingURL=typeguards.js.map
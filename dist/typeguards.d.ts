/**
 * Contains typeguards for geostyler-style
 * https://basarat.gitbook.io/typescript/type-system/typeguard#user-defined-type-guards
 */
import { CombinationFilter, CombinationOperator, ComparisonFilter, ComparisonOperator, FillSymbolizer, Filter, GrayChannel, IconSymbolizer, LineSymbolizer, MarkSymbolizer, NegationFilter, Operator, RasterSymbolizer, RGBChannel, Rule, ScaleDenominator, TextSymbolizer, GeoStylerBooleanFunction, GeoStylerNumberFunction, GeoStylerStringFunction, GeoStylerUnknownFunction, GeoStylerFunction, PointSymbolizer, Symbolizer, FunctionCall, Sprite } from './index';
export declare const isExpression: (got: any) => got is any;
/**
 * @deprecated use isFunction instead
 */
export declare const isFunctionCall: (got: any) => got is FunctionCall<any>;
export declare const isPropertyType: (got: any) => got is unknown;
export declare const isScaleDenominator: (got: any) => got is ScaleDenominator;
export declare const isOperator: (got: any) => got is Operator;
export declare const isComparisonOperator: (got: any) => got is ComparisonOperator;
export declare const isCombinationOperator: (got: any) => got is CombinationOperator;
export declare const isNegationOperator: (got: any) => got is "!";
export declare const isFilter: (got: any) => got is Filter;
export declare const isComparisonFilter: (got: any) => got is ComparisonFilter;
export declare const isCombinationFilter: (got: any) => got is CombinationFilter;
export declare const isNegationFilter: (got: any) => got is NegationFilter;
export declare const isSymbolizer: (got: any) => got is Symbolizer;
export declare const isPointSymbolizer: (got: any) => got is PointSymbolizer;
export declare const isIconSymbolizer: (got: any) => got is IconSymbolizer;
export declare const isTextSymbolizer: (got: any) => got is TextSymbolizer;
export declare const isMarkSymbolizer: (got: any) => got is MarkSymbolizer;
export declare const isLineSymbolizer: (got: any) => got is LineSymbolizer;
export declare const isFillSymbolizer: (got: any) => got is FillSymbolizer;
export declare const isRasterSymbolizer: (got: any) => got is RasterSymbolizer;
export declare const isRule: (got: any) => got is Rule;
/**
 * Checks if ChannelSelection is of type RGBChannel.
 */
export declare const isRgbChannel: (got: any) => got is RGBChannel;
/**
 * Checks if ChannelSelection is of type GrayChannel.
 */
export declare const isGrayChannel: (got: any) => got is GrayChannel;
export declare const isGeoStylerNumberFunction: (got: any) => got is GeoStylerNumberFunction;
export declare const isGeoStylerStringFunction: (got: any) => got is GeoStylerStringFunction;
export declare const isGeoStylerBooleanFunction: (got: any) => got is GeoStylerBooleanFunction;
export declare const isGeoStylerUnknownFunction: (got: any) => got is GeoStylerUnknownFunction;
export declare const isGeoStylerFunction: (got: any) => got is GeoStylerFunction;
export declare const isSprite: (got: any) => got is Sprite;

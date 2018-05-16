/**
 * Created by tijmen on 25-12-15.
 */
/** @internal */
export declare function getByte(value: number, byteIndex: number): number;
export declare function copyArrayBuffer(src: ArrayBuffer): ArrayBuffer;
/**
 * Interpret byte buffer as unsigned little endian 32 bit integer.
 * Returns converted number.
 * @param {ArrayBuffer} data - Input buffer.
 * @param {number} offset - Start of data.
 * @return Converted number.
 * @public
 */
export declare function getUint24(data: DataView, offset: number): number;
export declare function bufferToString(buf: ArrayBuffer): any;
export declare function valueToNullValue(value: number, nullValue: number): number;
export declare function isDefined(variable: any): boolean;
/**
 * Returns the integer i in hexadecimal string form,
 * with leading zeroes, such that
 * the resulting string is at least byteCount*2 characters long.
 * @param {int} i
 * @param {int} byteCount
 * @public
 */
export declare function toHexString(i: number, byteCount: number): string;
/**
 * Takes a ArrayBuffer or TypedArray and returns its hexadecimal representation.
 * No spaces or linebreaks.
 * @param data
 * @public
 */
export declare function typedArrayToHexString(data: ArrayBuffer | Uint8Array): string;
export declare function hexStringToTypedArray(hexData: string): Uint8Array;
export declare function getTime(): number;

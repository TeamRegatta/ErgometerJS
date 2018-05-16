/**
 * Created by tijmen on 25-12-15.
 */
/** @internal */
export function getByte(value: number, byteIndex: number): number {
  return (value >> (byteIndex * 8)) & 255
}

export function copyArrayBuffer(src: ArrayBuffer): ArrayBuffer {
  const dst = new ArrayBuffer(src.byteLength)
  new Uint8Array(dst).set(new Uint8Array(src))
  return dst
}

/**
 * Interpret byte buffer as unsigned little endian 32 bit integer.
 * Returns converted number.
 * @param {ArrayBuffer} data - Input buffer.
 * @param {number} offset - Start of data.
 * @return Converted number.
 * @public
 */
export function getUint24(data: DataView, offset: number) {
  return (
    (data.getUint8(offset + 2) << 16) +
    (data.getUint8(offset + 1) << 8) +
    data.getUint8(offset)
  )
}

export function bufferToString(buf: ArrayBuffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buf))
}

export function valueToNullValue(value: number, nullValue: number): number {
  if (value === nullValue) return null
  else return value
}

export function isDefined(variable: any): boolean {
  return typeof variable !== 'undefined'
}

/**
 * Returns the integer i in hexadecimal string form,
 * with leading zeroes, such that
 * the resulting string is at least byteCount*2 characters long.
 * @param {int} i
 * @param {int} byteCount
 * @public
 */
export function toHexString(i: number, byteCount: number) {
  let str = new Number(i).toString(16)
  while (str.length < byteCount * 2) {
    str = '0' + str
  }
  return str
}

/**
 * Takes a ArrayBuffer or TypedArray and returns its hexadecimal representation.
 * No spaces or linebreaks.
 * @param data
 * @public
 */
export function typedArrayToHexString(data: ArrayBuffer | Uint8Array): string {
  // view data as a Uint8Array, unless it already is one.

  if ((data as Uint8Array).buffer) {
    if (!(data instanceof Uint8Array)) {
      data = new Uint8Array((data as any).buffer)
    }
  } else if (data instanceof ArrayBuffer) {
    data = new Uint8Array(data)
  } else {
    throw new Error('not an ArrayBuffer or TypedArray.')
  }
  let str = ''
  for (let i = 0; i < (data as Uint8Array).length; i++) {
    str += toHexString(data[i], 1)
  }
  return str
}

export function hexStringToTypedArray(hexData: string): Uint8Array {
  if (hexData.length % 2 !== 0) {
    throw new Error('Wrong hexData string: ' + hexData)
  }
  const length = hexData.length / 2
  let result = new Uint8Array(length)
  for (let i = 0; i < length; i++) {
    result[i] = parseInt(hexData.substring(i * 2, i * 2 + 2), 16)
  }
  return result
}

export function getTime(): number {
  return new Date().getTime()
}

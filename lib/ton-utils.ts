/**
 * TON utility functions that can be imported dynamically
 * This avoids Edge Runtime issues with @ton/core imports
 */

export async function parseTonAddress(address: string) {
   const { Address } = await import("@ton/core");
   return Address.parse(address).toString();
}

export async function fromNano(value: bigint) {
   const { fromNano } = await import("@ton/core");
   return fromNano(value);
}

export async function toNano(value: string | number) {
   const { toNano } = await import("@ton/core");
   return toNano(value);
}

export function formatAddr(addr: string): string {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

/**
 * Every marquee holds two copies of its content so the -50% translate loops
 * seamlessly. The second copy is decorative repetition — `duplicate` marks it
 * so it can be hidden from assistive tech.
 */
export function doubled<T>(items: T[]) {
  return [...items, ...items].map((item, i) => ({
    item,
    key: i,
    index: i % items.length,
    duplicate: i >= items.length,
  }));
}

import { sum } from './client';

test('sum of two numbers', () => {
  expect(sum(1, 2)).toBe(3);
});

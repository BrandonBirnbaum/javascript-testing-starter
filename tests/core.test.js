import { it, expect, describe, beforeEach } from 'vitest';
import {
  getCoupons,
  calculateDiscount,
  validateUserInput,
  isPriceInRange,
  isValidUsername,
  canDrive,
  fetchData,
  Stack,
} from '../src/core';

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('it should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });

  it('it should return an array with valid discounts', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThan(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe('calculateDiscount', () => {
  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
  });

  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle non-numeric price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'INVALID')).toBe(10);
  });
});

describe('validateUserInput', () => {
  it('should return success if given valid input', () => {
    expect(validateUserInput('brandon', 33)).toMatch(/success/i);
  });

  it('should return an error if username is not a string', () => {
    expect(validateUserInput(5, 33)).toMatch(/invalid/i);
  });

  it('should return an error if username is less than 3 characters', () => {
    expect(validateUserInput('bo', 33)).toMatch(/invalid/i);
  });

  it('should return an error if username is more than 255 characters', () => {
    expect(validateUserInput('b'.repeat(256), 33)).toMatch(/invalid/i);
  });

  it('should return an error if age is not a number', () => {
    expect(validateUserInput('brandon', '18')).toMatch(/invalid/i);
  });

  it('should return an error if age is less than 18', () => {
    expect(validateUserInput('brandon', 17)).toMatch(/invalid/i);
  });

  it('should return an error if age is greater than 100', () => {
    expect(validateUserInput('brandon', 101)).toMatch(/invalid/i);
  });

  it('should return an error if both username and age are invalid', () => {
    expect(validateUserInput('', 0)).toMatch(/invalid username/i);
    expect(validateUserInput('', 0)).toMatch(/invalid age/i);
  });
});

describe('isPriceInRange', () => {
  it.each([
    { scenario: 'price < min', price: -10, min: 0, max: 100, result: false },
    { scenario: 'price = min', price: 0, min: 0, max: 100, result: true },
    {
      scenario: 'price is between min and max',
      price: 50,
      min: 0,
      max: 100,
      result: true,
    },
    { scenario: 'price > max', price: 200, min: 0, max: 100, result: false },
    { scenario: 'price = max', price: 100, min: 0, max: 100, result: true },
  ])('should return $result when $scenario', ({ price, min, max, result }) => {
    expect(isPriceInRange(price, min, max)).toBe(result);
  });
});

describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;

  it('should return false when the username is shorter than the minimum length', () => {
    expect(isValidUsername('b'.repeat(minLength - 1))).toBe(false);
  });

  it('should return false when the username is longer than the maximum length', () => {
    expect(isValidUsername('b'.repeat(maxLength + 1))).toBe(false);
  });

  it('should return true when the username is at min or max length', () => {
    expect(isValidUsername('b'.repeat(minLength))).toBe(true);
    expect(isValidUsername('b'.repeat(maxLength))).toBe(true);
  });

  it('should return true when the username is within the length constraint', () => {
    expect(isValidUsername('b'.repeat(minLength + 1))).toBe(true);
    expect(isValidUsername('b'.repeat(maxLength - 1))).toBe(true);
  });

  it('should return false for invalid input types', () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe('canDrive', () => {
  it('should return false when the country code is not found', () => {
    expect(canDrive(16, 'CA')).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, country: 'US', result: false },
    { age: 16, country: 'US', result: true },
    { age: 17, country: 'US', result: true },
    { age: 16, country: 'UK', result: false },
    { age: 17, country: 'UK', result: true },
    { age: 18, country: 'UK', result: true },
  ])('should return $result for $age, $country', ({ age, country, result }) => {
    expect(canDrive(age, country)).toBe(result);
  });
});

describe('fetchData', () => {
  it('should return a promise that will resolve to an array of numbers', async () => {
    const result = await fetchData();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });
});

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('push should add an item to the stack', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
  });

  it('pop should remove and return the top item from the stack ', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it('pop should throw an error if stack is empty', () => {
    expect(() => stack.pop()).toThrow('Stack is empty');
  });

  it('peek should return the top item from the stack without removing it ', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it('peek should throw an error if stack is empty', () => {
    expect(() => stack.peek()).toThrow('Stack is empty');
  });

  it('isEmpty should return true is stack is empty ', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('isEmpty should return false is stack is not empty ', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  it('size should return the number of items in the stack ', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  it('clear should remove all items from the stack ', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.size()).toBe(0);
  });
});

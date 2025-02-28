import { describe, test, it, expect } from 'vitest';
import { factorial, fizzBuzz, max, calculateAverage } from '../src/intro';

describe('max', () => {
  it('should return the first argument if it is greater', () => {
    expect(max(2, 1)).toBe(2);
  });

  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });

  it('should return the first argument if agruments are equal', () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe('fizzBuzz', () => {
  it('should return the FizzBuzz if argument is divisible by 3 and 5  ', () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it('should return the Fizz if argument is divisible by 3 but not 5  ', () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });

  it('should return the Buzz if argument is divisible by 5 but not 3  ', () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });

  it('should return the number as string if argument is not divisible by 5 but not 3  ', () => {
    expect(fizzBuzz(1)).toBe('1');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it('should calculate the average of an array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it('should calculate the average of an array with two elements', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it('should calculate the average of an array with three elements', () => {
    expect(calculateAverage([1, 2, 3])).toBe(2);
  });
});

describe('factorial', () => {
  it('should return the 1 if given 0  ', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should return the 1 if given 1  ', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should return the 2 if given 2  ', () => {
    expect(factorial(2)).toBe(2);
  });

  it('should return the 6 if given 3  ', () => {
    expect(factorial(3)).toBe(6);
  });

  it('should return the 24 if given 4  ', () => {
    expect(factorial(4)).toBe(24);
  });

  it('should return the undefined if given a negative number  ', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});

import { sayHello } from './hello.service';

describe('HelloService', () => {
  test('should return a greeting message', () => {
    const result = sayHello('John Doe');

    expect(result).toBe('Hello, John Doe!');
  });
});

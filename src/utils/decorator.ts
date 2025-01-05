import { Reflector } from '@nestjs/core';

export const Roles = Reflector.createDecorator<string[]>();
export const Public = Reflector.createDecorator<boolean>({
  key: 'isPublic',
  transform(value) {
    return value !== undefined ? value : true;
  },
});

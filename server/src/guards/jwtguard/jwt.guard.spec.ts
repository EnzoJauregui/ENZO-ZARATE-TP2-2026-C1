import { JtwGuard } from './jwt.guard';

describe('JwtdGuard', () => {
  it('should be defined', () => {
    expect(new JtwGuard()).toBeDefined();
  });
});

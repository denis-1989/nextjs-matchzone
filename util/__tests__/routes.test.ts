import { expect, test } from '@jest/globals';
import { appRoutes } from '../routes';

test('routes object contains correct paths', () => {
  expect(appRoutes.home).toBe('/');
  expect(appRoutes.login).toBe('/login');
  expect(appRoutes.register).toBe('/register');
  expect(appRoutes.standings).toBe('/standings');
  expect(appRoutes.teams).toBe('/teams');
  expect(appRoutes.players).toBe('/players');
});

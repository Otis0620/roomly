import 'reflect-metadata';

import { useMatches } from 'react-router-dom';

import { render } from '@testing-library/react';

import TitleHandler from './TitleHandler';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useMatches: vi.fn(), Outlet: () => <div /> };
});

describe('TitleHandler', () => {
  it('should set document title to "Roomly" when no match has a title handle', () => {
    vi.mocked(useMatches).mockReturnValue([
      {
        id: '0',
        pathname: '/',
        params: {},
        data: undefined,
        loaderData: undefined,
        handle: undefined,
      },
    ]);

    render(<TitleHandler />);

    expect(document.title).toBe('Roomly');
  });

  it('should set document title with route title when a match has a title handle', () => {
    vi.mocked(useMatches).mockReturnValue([
      {
        id: '0',
        pathname: '/',
        params: {},
        data: undefined,
        loaderData: undefined,
        handle: { title: 'Dashboard' },
      },
    ]);

    render(<TitleHandler />);

    expect(document.title).toBe('Roomly — Dashboard');
  });

  it('should use the last match with a title handle when multiple matches have titles', () => {
    vi.mocked(useMatches).mockReturnValue([
      {
        id: '0',
        pathname: '/',
        params: {},
        data: undefined,
        loaderData: undefined,
        handle: { title: 'Home' },
      },
      {
        id: '1',
        pathname: '/dashboard',
        params: {},
        data: undefined,
        loaderData: undefined,
        handle: { title: 'Dashboard' },
      },
    ]);

    render(<TitleHandler />);

    expect(document.title).toBe('Roomly — Dashboard');
  });

  it('should set document title to "Roomly" when match handle has no title property', () => {
    vi.mocked(useMatches).mockReturnValue([
      {
        id: '0',
        pathname: '/',
        params: {},
        data: undefined,
        loaderData: undefined,
        handle: { someOtherProp: true },
      },
    ]);

    render(<TitleHandler />);

    expect(document.title).toBe('Roomly');
  });
});

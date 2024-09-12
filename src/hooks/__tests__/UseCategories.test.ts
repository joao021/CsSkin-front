import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useCategories } from '@/hooks/UseCategories';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('useCategories', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should return an error when API request fails', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'http://mock-api-url.com';

    mockAxios.onGet(`${process.env.NEXT_PUBLIC_API_URL}/items`).reply(500);

    const { result } = renderHook(() => useCategories());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe('Failed to load categories');
  });

  it('should return an error when NEXT_PUBLIC_API_URL is not defined', async () => {
    delete process.env.NEXT_PUBLIC_API_URL;

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe('Failed to load categories');
  });

  it('should return an error when API response structure is unexpected', async () => {
    process.env.NEXT_PUBLIC_API_URL = 'http://mock-api-url.com';

    const mockData = [{ unexpectedKey: 'value1' }, { unexpectedKey: 'value2' }];

    mockAxios
      .onGet(`${process.env.NEXT_PUBLIC_API_URL}/items`)
      .reply(200, mockData);

    const { result } = renderHook(() => useCategories());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.categories).toEqual([]);
    expect(result.current.error).toBe('Failed to load categories');
  });
});

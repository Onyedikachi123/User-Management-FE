import { renderHook } from '@testing-library/react-hooks';
import useFetchUsers from '../../src/hooks/useFetchUsers';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useFetchUsers', () => {
  it('should fetch users successfully', async () => {
    const users = [{ id: 1, name: 'John Doe' }];
    mockedAxios.get.mockResolvedValue({ data: users });

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    expect(result.current.status).toBe('loading');
    await waitForNextUpdate();
    expect(result.current.status).toBe('succeeded');
    expect(result.current.users).toEqual(users);
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Network error';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useFetchUsers());

    expect(result.current.status).toBe('loading');
    await waitForNextUpdate();
    expect(result.current.status).toBe('failed');
    expect(result.current.error).toBe(errorMessage);
  });
});
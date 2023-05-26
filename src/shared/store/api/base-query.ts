import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { BASE_URL } from '@shared/constants/api';
import { JwtService } from '@shared/services/jwt.service';
import { userActions } from '../slices/user.slice';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const token = JwtService.getAccessToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
  },
});

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  let result = await baseQuery(args, api, extraOptions);
  const { dispatch } = api;

  if (result.error && result.error.status == 401) {
    const refreshResult = await baseQuery(
      {
        url: '/auth/grantNewTokens',
        method: 'POST',
        credentials: 'include',
        body: {
          refreshToken: JwtService.getRefreshToken(),
        },
      },
      api,
      extraOptions,
    );
    const data: any = refreshResult.data;
    if (data) {
      JwtService.setRefreshToken(data.refreshToken);
      JwtService.setAccessToken(data.accessToken);
      result = await baseQuery(args, api, extraOptions);
    } else {
      JwtService.setRefreshToken('');
      dispatch(userActions.setUser(null));
    }
  }
  return result;
};

export default customBaseQuery;

import { rest } from 'msw';
import { RCRAINFO_PREPROD } from '../../client';
import { API_ID, API_KEY, PACKING_GROUPS, TOKEN } from '../constants';

export const handlers = [
  rest.get(`${RCRAINFO_PREPROD}/v1/auth/${API_ID}/${API_KEY}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: `${TOKEN}`,
        expiration: '2021-01-01T00:00:00.000Z',
      }),
    );
  }),
  rest.get(`${RCRAINFO_PREPROD}/v1/emanifest/lookup/packing-groups`, (req, res, ctx) => {
    if (req.headers.get('Authorization') === `Bearer ${TOKEN}`) {
      return res(ctx.status(200), ctx.json(PACKING_GROUPS));
    }
    return res(ctx.status(401));
  }),
];

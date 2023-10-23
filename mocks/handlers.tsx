import { BASE_URL } from "@const/uri";
import { rest } from "msw";

export const handlers = [
  rest.post(BASE_URL, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({})
    );
  }),
];

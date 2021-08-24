import { IResolvers } from '@graphql-tools/utils';
import Cookies from 'cookies';
import { CookieName } from '../../../cookies';

export const resolvers: IResolvers = {
  Query: {
    async activeEstimate(parent, args, { req, res }) {
      const estimateId = new Cookies(req, res).get(CookieName.ESTIMATE_ID);
      return { _id: estimateId };
    }
  }
};
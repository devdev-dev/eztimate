import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLResponse } from 'apollo-server-types';
import Cookies from 'cookies';
import Pusher from 'pusher';
import { CookieName } from '../../utils/types';
import { EstimateCreateMutationResult, IssueCreateMutationResult } from '../types.grapqhl';

export const pusherPlugin: ApolloServerPlugin = {
  requestDidStart() {
    return {
      async willSendResponse(context) {
        const pusher = new Pusher({
          appId: process.env.PUSHER_APP_ID,
          key: process.env.PUSHER_APP_KEY,
          secret: process.env.PUSHER_APP_SECRET,
          cluster: 'eu'
        });

        switch (context.operationName) {
          case 'IssueCreate':
            handleIssueCreate(pusher, context.context.context, context.response);
            break;
          case 'EstimateCreate':
            handleEstimateCreate(pusher, context.context.context, context.response);
            break;
        }
      }
    };
  }
};

const handleIssueCreate = (pusher: Pusher, { req, res }, response: GraphQLResponse) => {
  pusher.trigger(`presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`, 'issue:create', (response as IssueCreateMutationResult).data.issueCreate);
};

const handleEstimateCreate = (pusher: Pusher, { req, res }, response: GraphQLResponse) => {
  pusher.trigger(`presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`, 'issue:estimate', (response as EstimateCreateMutationResult).data.estimateCreate);
};

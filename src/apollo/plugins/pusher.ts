import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLResponse } from 'apollo-server-types';
import Cookies from 'cookies';
import Pusher from 'pusher';
import { CookieName, PusherEvents } from '../../utils/types';
import { EstimateCreateMutationResult, EstimateDeleteMutationResult, IssueCreateMutationResult, IssueDeleteMutationResult } from '../types.grapqhl';

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
          case 'IssueDelete':
            handleIssueDelete(pusher, context.context.context, context.response);
            break;
          case 'EstimateCreate':
            handleEstimateCreate(pusher, context.context.context, context.response);
            break;
          case 'EstimateDelete':
            handleEstimateDelete(pusher, context.context.context, context.response);
            break;
        }
      }
    };
  }
};

const handleIssueCreate = (pusher: Pusher, { req, res }, response: GraphQLResponse) => {
  pusher.trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueCreate,
    (response as IssueCreateMutationResult).data.issueCreate
  );
};

const handleIssueDelete = (pusher: Pusher, { req, res }, response: GraphQLResponse) => {
  pusher.trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueDelete,
    (response as IssueDeleteMutationResult).data.issueDelete
  );
};

const handleEstimateCreate = (pusher: Pusher, { req, res }, response: GraphQLResponse) => {
  pusher.trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.EstimateCreate,
    (response as EstimateCreateMutationResult).data.estimateCreate
  );
};

const handleEstimateDelete = (pusher: Pusher, { req, res }, response: GraphQLResponse) => {
  pusher.trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.EstimateDelete,
    (response as EstimateDeleteMutationResult).data.estimateDelete
  );
};

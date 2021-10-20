import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import Cookies from 'cookies';
import { CookieName } from '../../../cookies';
import { PusherEvents } from '../../../pusher';
import getPusher from '../../pusher';

export const pusherPlugin: ApolloServerPlugin = {
  async requestDidStart(initialRequestContext) {
    return {
      async willSendResponse({ context: { context }, operationName }) {
        const issueId = new Cookies(context.req, context.res).get(CookieName.ISSUE_ID);
        const userId = new Cookies(context.req, context.res).get(CookieName.USER_ID);
        if (issueId && userId) {
          switch (operationName) {
            case 'UpdateActiveIssue':
            case 'ResetActiveIssue':
            case 'CreateEstimateActiveIssue':
            case 'DeleteEstimateActiveIssue':
            case 'UpdateUserEstimate':
              await handleIssueUpdate(issueId);
              break;
            case 'UpdateActiveUser':
              await handleUserUpdate(issueId, userId);
              break;
          }
        }
      }
    };
  }
};

const handleIssueUpdate = (issueId: string) => {
  return getPusher().trigger(`presence-${issueId}`, PusherEvents.IssueUpdate, issueId);
};

const handleUserUpdate = (issueId: string, userId: string) => {
  return getPusher().trigger(`presence-${issueId}`, PusherEvents.UserUpdate, userId);
};
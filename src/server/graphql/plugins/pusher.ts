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
        if (issueId) {
          switch (operationName) {
            case 'UpdateActiveIssue':
            case 'ResetActiveIssue':
            case 'CreateEstimateActiveIssue':
            case 'DeleteEstimateActiveIssue':
              await handleIssueUpdate(issueId);
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
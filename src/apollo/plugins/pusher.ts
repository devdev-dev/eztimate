import * as Sentry from '@sentry/node';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLResponse } from 'apollo-server-types';
import Cookies from 'cookies';
import getPusher from '../../utils/pusher';
import { CookieName, PusherEvents } from '../../utils/types';
import {
  EstimateCreateMutationResult,
  EstimateDeleteMutationResult,
  IssueCreateMutationResult,
  IssueDeleteMutationResult,
  IssueUpdateMutationResult,
  TeamSetActiveIssueMutationResult
} from '../types.grapqhl';

export const pusherPlugin: ApolloServerPlugin = {
  requestDidStart() {
    return {
      async willSendResponse(context) {
        if (context.response === null || context.response === undefined) {
          handleIllegalState(context.operationName, context.context.context);
        }

        switch (context.operationName) {
          case 'TeamSetActiveIssue':
            handleTeamEstimate(context.context.context, context.response);
            break;
          case 'IssueCreate':
            handleIssueCreate(context.context.context, context.response);
            break;
          case 'IssueUpdate':
            handleIssueUpdate(context.context.context, context.response);
            break;
          case 'IssueDelete':
            handleIssueDelete(context.context.context, context.response);
            break;
          case 'EstimateCreate':
            handleEstimateCreate(context.context.context, context.response);
            break;
          case 'EstimateDelete':
            handleEstimateDelete(context.context.context, context.response);
            break;
        }
      }
    };
  }
};

const handleIllegalState = (operationName: string, { req, res }) => {
  Sentry.captureException(`Received a [null|undefined] value while processing the operation: ${operationName}`);
  getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IllegalState,
    `Received a [null|undefined] value while processing the operation: ${operationName}`
  );
};

const handleTeamEstimate = ({ req, res }, response: GraphQLResponse) => {
  getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.TeamEstimate,
    (response as TeamSetActiveIssueMutationResult).data.teamSetActiveIssue
  );
};

const handleIssueCreate = ({ req, res }, response: GraphQLResponse) => {
  getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueCreate,
    (response as IssueCreateMutationResult).data.issueCreate
  );
};

const handleIssueUpdate = ({ req, res }, response: GraphQLResponse) => {
  getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueUpdate,
    (response as IssueUpdateMutationResult).data.issueUpdate
  );
};

const handleIssueDelete = ({ req, res }, response: GraphQLResponse) => {
  getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueDelete,
    (response as IssueDeleteMutationResult).data.issueDelete
  );
};

const handleEstimateCreate = ({ req, res }, response: GraphQLResponse) => {
  getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.EstimateCreate,
    (response as EstimateCreateMutationResult).data.estimateCreate
  );
};

const handleEstimateDelete = ({ req, res }, response: GraphQLResponse) => {
  getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.EstimateDelete,
    (response as EstimateDeleteMutationResult).data.estimateDelete
  );
};

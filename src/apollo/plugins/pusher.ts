import * as Sentry from '@sentry/node';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLResponse } from 'apollo-server-types';
import Cookies from 'cookies';
import getPusher from '../../utils/pusher';
import { CookieName, PusherEvents } from '../../utils';
import {
  EstimateCreateMutationResult,
  EstimateDeleteMutationResult,
  IssueCreateMutationResult,
  IssueDeleteMutationResult,
  IssueResetMutationResult,
  IssueUpdateMutationResult,
  TeamSetActiveIssueMutationResult,
  UserJoinTeamMutationResult,
  UserUpdateMutationResult
} from '../types.grapqhl';

export const pusherPlugin: ApolloServerPlugin = {
  requestDidStart() {
    return {
      async willSendResponse(context) {
        if (context.response === null || context.response === undefined) {
          await handleIllegalState(context.operationName, context.context.context);
          return;
        }
        switch (context.operationName) {
          case 'UserUpdate':
            await handleUserUpdate(context.context.context, context.response);
            break;
          case 'TeamSetActiveIssue':
            await handleTeamEstimate(context.context.context, context.response);
            break;
          case 'UserJoinTeam':
            await handleUserJoinTeam(context.context.context, context.response);
            break;
          case 'IssueCreate':
            await handleIssueCreate(context.context.context, context.response);
            break;
          case 'IssueUpdate':
            await handleIssueUpdate(context.context.context, context.response);
            break;
          case 'IssueReset':
            await handleIssueReset(context.context.context, context.response);
            break;
          case 'IssueDelete':
            await handleIssueDelete(context.context.context, context.response);
            break;
          case 'EstimateCreate':
            await handleEstimateCreate(context.context.context, context.response);
            break;
          case 'EstimateDelete':
            await handleEstimateDelete(context.context.context, context.response);
            break;
        }
      }
    };
  }
};

const handleIllegalState = (operationName: string, { req, res }) => {
  Sentry.captureException(`Received a [null|undefined] value while processing the operation: ${operationName}`);
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IllegalState,
    `Received a [null|undefined] value while processing the operation: ${operationName}`
  );
};

const handleUserUpdate = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.UserUpdate,
    (response as UserUpdateMutationResult).data.userUpdate
  );
};

const handleUserJoinTeam = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.UserJoinTeam,
    (response as UserJoinTeamMutationResult).data.userJoinTeam
  );
};

const handleTeamEstimate = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.TeamEstimate,
    (response as TeamSetActiveIssueMutationResult).data.teamSetActiveIssue
  );
};

const handleIssueCreate = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueCreate,
    (response as IssueCreateMutationResult).data.issueCreate
  );
};

const handleIssueUpdate = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueUpdate,
    (response as IssueUpdateMutationResult).data.issueUpdate
  );
};

const handleIssueReset = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueUpdate,
    (response as IssueResetMutationResult).data.issueReset
  );
};

const handleIssueDelete = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.IssueDelete,
    (response as IssueDeleteMutationResult).data.issueDelete
  );
};

const handleEstimateCreate = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.EstimateCreate,
    (response as EstimateCreateMutationResult).data.estimateCreate
  );
};

const handleEstimateDelete = ({ req, res }, response: GraphQLResponse) => {
  return getPusher().trigger(
    `presence-${new Cookies(req, res).get(CookieName.TEAM_ID)}`,
    PusherEvents.EstimateDelete,
    (response as EstimateDeleteMutationResult).data.estimateDelete
  );
};

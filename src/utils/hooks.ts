import { useApolloClient } from '@apollo/client';
import { useEvent, usePresenceChannel } from '@harelpls/use-pusher';
import { FragmentDefinitionNode } from 'graphql';
import { useContext } from 'react';
import {
  Estimate,
  EstimateFieldsFragment,
  EstimateFieldsFragmentDoc,
  Issue,
  IssueFieldsFragment,
  IssueFieldsFragmentDoc,
  Maybe,
  Team,
  TeamFieldsFragment,
  TeamFieldsFragmentDoc
} from '../apollo/types.grapqhl';
import { AppContext } from '../pages/app';
import { PusherEvents } from '.';

export function useUserUpdate(refetch) {
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);

  useEvent(channel, PusherEvents.UserUpdate, () => {
    refetch();
  });
}

export function useUserJoinTeam(refetch) {
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);

  useEvent(channel, PusherEvents.UserJoinTeam, () => {
    refetch();
  });
}

export function useTeamEstimateEvent() {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);

  useEvent(channel, PusherEvents.TeamEstimate, (team: TeamFieldsFragment) => {
    apolloClient.cache.writeFragment({
      data: team,
      fragmentName: (TeamFieldsFragmentDoc.definitions[0] as FragmentDefinitionNode).name.value,
      fragment: TeamFieldsFragmentDoc
    });
  });
}

export function useIssueCreateEvent(team: Pick<Team, '_id' | '__typename'> & { issues: Array<Pick<Issue, '_id'>> }) {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);

  useEvent(channel, PusherEvents.IssueCreate, (issue: IssueFieldsFragment) => {
    apolloClient.cache.modify({
      id: apolloClient.cache.identify(team),
      fields: {
        issues(cachedIssues) {
          const newIssueRef = apolloClient.cache.writeFragment({
            data: issue,
            fragmentName: (IssueFieldsFragmentDoc.definitions[0] as FragmentDefinitionNode).name.value,
            fragment: IssueFieldsFragmentDoc
          });

          if (team.issues.find(i => i._id === issue._id)) {
            return cachedIssues;
          } else {
            return [newIssueRef, ...cachedIssues];
          }
        }
      }
    });
  });
}

export function useIssueUpdateEvent() {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);

  useEvent(channel, PusherEvents.IssueUpdate, (issue: IssueFieldsFragment) => {
    apolloClient.cache.writeFragment({
      data: issue,
      fragmentName: (IssueFieldsFragmentDoc.definitions[0] as FragmentDefinitionNode).name.value,
      fragment: IssueFieldsFragmentDoc
    });
  });
}

export function useIssueDeleteEvent() {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);

  useEvent(channel, PusherEvents.IssueDelete, (issue: Pick<Issue, '_id'>) => {
    apolloClient.cache.evict({ id: apolloClient.cache.identify({ id: issue._id, __typename: 'Issue' }) });
    apolloClient.cache.gc();
  });
}

export function useEstimateCreateEvent(
  issue: Pick<Issue, '_id' | '__typename' | 'name' | 'state' | 'estimate'> & {
    estimates: Array<Maybe<Pick<Estimate, '_id'>>>;
  }
) {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);

  useEvent(channel, PusherEvents.EstimateCreate, (estimate: EstimateFieldsFragment) => {
    apolloClient.cache.modify({
      id: apolloClient.cache.identify(issue),
      fields: {
        estimates(cachedEstimates) {
          const newEstimateRef = apolloClient.cache.writeFragment({
            data: estimate,
            fragmentName: (EstimateFieldsFragmentDoc.definitions[0] as FragmentDefinitionNode).name.value,
            fragment: EstimateFieldsFragmentDoc
          });

          if (issue.estimates.find(e => e._id === estimate._id)) {
            return cachedEstimates;
          } else {
            return [...cachedEstimates, newEstimateRef];
          }
        }
      }
    });
  });
}

export function useEstimateDeleteEvent() {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);
  useEvent(channel, PusherEvents.EstimateDelete, (estimate: Pick<Estimate, '_id'>) => {
    apolloClient.cache.evict({ id: apolloClient.cache.identify({ id: estimate._id, __typename: 'Estimate' }) });
    apolloClient.cache.gc();
  });
}

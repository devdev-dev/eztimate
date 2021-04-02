import { gql, useApolloClient } from '@apollo/client';
import { useEvent, usePresenceChannel } from '@harelpls/use-pusher';
import { FragmentDefinitionNode } from 'graphql';
import { useContext } from 'react';
import { Estimate, EstimateFieldsFragment, Issue, IssueFieldsFragment, IssueFieldsFragmentDoc, Team } from '../apollo/types.grapqhl';
import { AppContext } from '../pages/app';
import { PusherEvents } from '../utils/types';

export function useIssueCreateEvent(team: Team) {
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
            fragment: gql`
              fragment NewIssue on Issue {
                _id
                name
                state
                estimate
                estimates {
                  _id
                  value
                  user {
                    ...UserFields
                  }
                }
              }
            `
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

export function useIssueUpdateEvent(team: Team) {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);
  useEvent(channel, PusherEvents.IssueUpdate, (issue: IssueFieldsFragment) => {
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

export function useIssueDeleteEvent() {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);
  useEvent(channel, PusherEvents.IssueDelete, (issue: Pick<Issue, '_id'>) => {
    apolloClient.cache.evict({ id: apolloClient.cache.identify({ id: issue._id, __typename: 'Issue' }) });
    apolloClient.cache.gc();
  });
}

export function useEstimateCreateEvent(issue: Issue) {
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
            fragment: gql`
              fragment NewEstimate on Estimate {
                _id
                user {
                  _id
                  email
                }
                value
              }
            `
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

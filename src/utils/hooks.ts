import { gql, useApolloClient } from '@apollo/client';
import { useEvent, usePresenceChannel } from '@harelpls/use-pusher';
import { useContext } from 'react';
import { EstimateFieldsFragment, Issue, IssueFieldsFragment, Team } from '../apollo/types.grapqhl';
import { AppContext } from '../pages/app';

export function useIssueEstimateEvent(issue: Issue) {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);
  useEvent(channel, 'issue:estimate', (estimate: EstimateFieldsFragment) => {
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

export function useIssueCreateEvent(team: Team) {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);
  useEvent(channel, 'issue:create', (issue: IssueFieldsFragment) => {
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

export function useIssueDeleteEvent() {
  const apolloClient = useApolloClient();
  const { teamId } = useContext(AppContext);
  const { channel } = usePresenceChannel(`presence-${teamId}`);
  useEvent(channel, 'issue:delete', ({ issue }) => {
    apolloClient.cache.evict({ id: apolloClient.cache.identify({ id: issue._id, __typename: 'Issue' }) });
    apolloClient.cache.gc();
  });
}

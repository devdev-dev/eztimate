import { gql, useApolloClient } from '@apollo/client';
import { useEvent, usePresenceChannel } from '@harelpls/use-pusher';
import Cookies from 'js-cookie';
import { Issue } from '../apollo/types.grapqhl';
import { CookieName } from './types';

export function useIssueEstimateEvent(issue: Issue) {
  const apolloClient = useApolloClient();
  const { channel } = usePresenceChannel(`presence-${Cookies.get(CookieName.TEAM_ID)}`);
  useEvent(channel, 'issue:estimate', ({ estimate }) => {
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

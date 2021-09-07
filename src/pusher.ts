import { useApolloClient } from '@apollo/client';
import { useEvent } from '@harelpls/use-pusher';
import { PresenceChannel } from 'pusher-js';

export enum PusherEvents {
  IssueUpdate = 'app:issueupdate'
}

export function useIssueUpdateEvent(channel: PresenceChannel | undefined) {
  const apolloClient = useApolloClient();

  useEvent(channel, PusherEvents.IssueUpdate, issueId => {
    apolloClient.cache.evict({ id: `Issue:${issueId}` });
  });
}
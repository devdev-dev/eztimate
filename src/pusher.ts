import { useApolloClient } from '@apollo/client';
import { useEvent, useTrigger } from '@harelpls/use-pusher';
import { PresenceChannel } from 'pusher-js';
import { usePusherChannel } from './components/EstimateContext';

export enum PusherEvents {
  IssueUpdate = 'app:issueupdate',
  UserUpdate = 'app:userupdate',
  NotifyClient = 'app:notifyclient'
}

export function useIssueUpdateEvent(channel: PresenceChannel | undefined) {
  const apolloClient = useApolloClient();

  useEvent(channel, PusherEvents.IssueUpdate, issueId => {
    apolloClient.cache.evict({ id: `Issue:${issueId}` });
  });
}

export function useUserUpdateEvent(channel: PresenceChannel | undefined) {
  const apolloClient = useApolloClient();

  useEvent(channel, PusherEvents.UserUpdate, userId => {
    apolloClient.cache.evict({ id: `User:${userId}` });
  });
}

type NotifyClientPayload = {
  message: string;
  systemNotification?: boolean;
};

export function useNotificationTrigger() {
  const channel = usePusherChannel();
  const trigger = useTrigger(channel?.name!);

  return (payload: NotifyClientPayload) => trigger(PusherEvents.NotifyClient, payload);
}

export function useNotificationEvent(callback: (data?: NotifyClientPayload) => void) {
  const channel = usePusherChannel();

  useEvent<NotifyClientPayload>(channel, PusherEvents.NotifyClient, callback);
}

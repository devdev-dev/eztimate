import { useApolloClient } from '@apollo/client';
import { useEvent, useTrigger } from '@harelpls/use-pusher';
import { PresenceChannel } from 'pusher-js';
import { usePusherChannel } from './components/AppContext';

export enum PusherEvents {
  IssueUpdate = 'app:issueupdate',
  NotifyClient = 'app:notifyclient'
}

export function useIssueUpdateEvent(channel: PresenceChannel | undefined) {
  const apolloClient = useApolloClient();

  useEvent(channel, PusherEvents.IssueUpdate, issueId => {
    apolloClient.cache.evict({ id: `Issue:${issueId}` });
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
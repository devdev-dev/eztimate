import { usePresenceChannel } from '@harelpls/use-pusher';
import { PresenceChannel } from 'pusher-js';
import * as React from 'react';
import { ReactElement, useContext, useState } from 'react';
import { useIssueUpdateEvent, useUserUpdateEvent } from '../pusher';

interface IContextProps {
  issueId: string;
  channel: PresenceChannel | undefined;
}

const EstimateContext = React.createContext({} as IContextProps);

function EstimateContextProvider({ issueId, children }: { issueId: string; children: ReactElement }) {
  const { channel } = usePresenceChannel(`presence-${issueId}`);

  const [globalLoadingState, setGlobalLoadingState] = useState(false);

  const value: IContextProps = {
    issueId,
    channel
  };

  useIssueUpdateEvent(channel);
  useUserUpdateEvent(channel);

  return <EstimateContext.Provider value={value}> {children}</EstimateContext.Provider>;
}

export function usePusherChannel() {
  return useContext(EstimateContext).channel;
}

export function useIssueId() {
  return useContext(EstimateContext).issueId;
}

export { EstimateContextProvider };

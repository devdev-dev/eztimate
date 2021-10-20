import { usePresenceChannel } from '@harelpls/use-pusher';
import { PresenceChannel } from 'pusher-js';
import * as React from 'react';
import { ReactElement, useContext } from 'react';
import { useIssueUpdateEvent, useUserUpdateEvent } from '../pusher';

interface IContextProps {
  issueId: string;
  channel: PresenceChannel | undefined;
}

export const AppContext = React.createContext({} as IContextProps);

export function usePusherChannel() {
  return useContext(AppContext).channel;
}

export function useIssueId() {
  return useContext(AppContext).issueId;
}

export interface AppContextProviderProps {
  issueId: string;
  children: ReactElement;
}

function AppContextProvider({ issueId, children }: AppContextProviderProps) {
  const { channel } = usePresenceChannel(`presence-${issueId}`);
  useIssueUpdateEvent(channel);
  useUserUpdateEvent(channel);

  return <AppContext.Provider value={{ issueId, channel }}> {children}</AppContext.Provider>;
}

export { AppContextProvider };

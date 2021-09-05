import { usePresenceChannel } from '@harelpls/use-pusher';
import { PresenceChannel } from 'pusher-js';
import * as React from 'react';
import { ReactElement, useContext } from 'react';

interface IContextProps {
  channel: PresenceChannel | undefined;
}

export const AppContext = React.createContext({} as IContextProps);

export interface AppContextProviderProps {
  issueId: string;
  children: ReactElement;
}

export function usePusherChannel() {
  const { channel } = useContext(AppContext);
  return channel;
}

function AppContextProvider({ issueId, children }: AppContextProviderProps) {
  const { channel } = usePresenceChannel(`presence-${issueId}`);

  return <AppContext.Provider value={{ channel }}> {children}</AppContext.Provider>;
}

export { AppContextProvider };

import * as React from 'react';
import { ReactElement, useContext, useState } from 'react';

interface IContextProps {
  appLoading: {
    value: boolean;
    set: (loading: boolean) => void;
  };
}

const AppContext = React.createContext({} as IContextProps);

function AppContextProvider({ children }: { children: ReactElement }) {
  const [globalLoadingState, setGlobalLoadingState] = useState(false);

  const value: IContextProps = {
    appLoading: {
      value: globalLoadingState,
      set: newLoading => {
        setGlobalLoadingState(newLoading);
      }
    }
  };

  return <AppContext.Provider value={value}> {children}</AppContext.Provider>;
}

export function useAppLoading() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppLoading must be used within a AppProvider');
  }
  return context.appLoading;
}

export { AppContextProvider };

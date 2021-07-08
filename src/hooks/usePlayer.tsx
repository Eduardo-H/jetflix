import { createContext, ReactNode, useContext, useState } from 'react';

type PlayerContextType = {
  showPlayer: boolean;
  openPlayer: () => void;
  hidePlayer: () => void;
}

type PlayerProviderProps = {
  children: ReactNode;
}

const PlayerContext = createContext({} as PlayerContextType);

export function PlayerProvider({ children }: PlayerProviderProps): JSX.Element {
  const [showPlayer, setShowPlayer] = useState(false);

  function openPlayer() {
    setShowPlayer(true);
  }

  function hidePlayer() {
    setShowPlayer(false);
  }  

  return (
    <PlayerContext.Provider
      value={{
        showPlayer,
        openPlayer,
        hidePlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  return context;
}
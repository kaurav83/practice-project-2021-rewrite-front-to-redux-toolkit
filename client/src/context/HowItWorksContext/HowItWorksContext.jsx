import React, { createContext, useState, useMemo } from 'react';

export const HowItWorksContext = createContext({
  isOpenMenu: true,
  setOpenMenu: (flag) => { }
});

export const HowItWorksProvider = ({ children }) => {
  const [isOpenMenu, setOpenMenu] = useState(true);

  const memoizedState = useMemo(() => ({ isOpenMenu, setOpenMenu }), [isOpenMenu]);

  return (
    <HowItWorksContext.Provider value={memoizedState}>
      {children}
    </HowItWorksContext.Provider>
  )
};

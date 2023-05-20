import React, { useState } from "react";

const AppContext = React.createContext(null);

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={user}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
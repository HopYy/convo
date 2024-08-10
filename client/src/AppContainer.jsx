import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { PulseLoader } from "react-spinners";

import App from "App";
import createAppStore from "redux store/store";
import Convo from "assets/convo.png";

function AppContainer() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        const appStore = await createAppStore();
        setStore(appStore);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initializeStore();
  }, []);

  if (loading || !store) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-dark-gray">
        <img className="w-52 h-52" loading="lazy" src={Convo} alt="Logo" />
        <PulseLoader size={10} color="white" />
      </div>
    );
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppContainer;

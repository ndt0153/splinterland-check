import MongoContext from "./MongoContext";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";
import Home from "./Home";
function App() {
  const [client, setClient] = useState(null);
  const [user, setUser] = useState(null);
  const [app, setApp] = useState(new Realm.App({ id: "application-0-tvtkt" }));

  useEffect(() => {
    async function init() {
      if (!user) {
        setUser(
          app.currentUser
            ? app.currentUser
            : await app.logIn(Realm.Credentials.anonymous())
        );
      }

      if (!client) {
        setClient(app.currentUser.mongoClient("mongodb-atlas"));
      }
    }

    init();
  }, [app, client, user]);

  return (
    <MongoContext.Provider
      value={{ app, client, user, setClient, setUser, setApp }}
    >
      <MongoContext.Consumer>
        {(mongoContext) => <Home mongoContext={mongoContext} />}
      </MongoContext.Consumer>
    </MongoContext.Provider>
  );
}

export default App;

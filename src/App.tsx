import { useAuth } from "./components/auth_provider";
import CoconutController from "./components/coconut_controller";
import DefaultLayout from "./layouts/default";

import Landing from "@/components/landing";

function App() {
  const auth = useAuth();

  return (
    <DefaultLayout>
      {!auth.token && <Landing />}
      {auth.token && <CoconutController />}
    </DefaultLayout>
  );
}

export default App;

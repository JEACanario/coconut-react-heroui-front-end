import DefaultLayout from "./layouts/default";

import Landing from "@/components/landing";
/* import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
 */
function App() {
  return (
    <DefaultLayout>
      <Landing />
    </DefaultLayout>
  );
}

export default App;

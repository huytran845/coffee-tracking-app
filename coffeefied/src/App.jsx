// Components
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import CoffeeForm from "./components/CoffeeForm";
import History from "./components/History";
import Stats from "./components/Stats";
import { useAuth } from "./context/AuthContext";

function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuthenticated = globalUser;
  const hasData = globalData && !!Object.keys(globalData || {}).length;

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {isAuthenticated && isLoading && <p>Loading Data...</p>}
      {isAuthenticated && hasData && authenticatedContent}
    </Layout>
  );
}

export default App;

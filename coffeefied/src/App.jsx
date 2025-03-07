// Components
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import CoffeeForm from "./components/CoffeeForm";
import History from "./components/History";
import Stats from "./components/Stats";

function App() {
  const isAuthenticated = false;

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
      {isAuthenticated && authenticatedContent}
    </Layout>
  );
}

export default App;

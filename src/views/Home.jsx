import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchCard from '../components/SearchCard';
import PopularRoutes from '../components/PopularRoutes';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <SearchCard />
      <PopularRoutes />
      <Footer />
    </>
  );
};

export default Home;
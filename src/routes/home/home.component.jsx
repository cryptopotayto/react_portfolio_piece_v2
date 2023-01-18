import Directory from '../../components/directory/directory.component';

const Home = () => { 

  const categories = [
    {
      id: 1,
      title: 'Hats',
    }
  ]
  return (
    <Directory categories={categories} />
  )
};

export default Home;
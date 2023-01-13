import Directory from "./components/directory/directory.component";


const App = () => { 

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

export default App;

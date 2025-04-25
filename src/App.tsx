import Header from './layout/Header';


function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />

      <main className='container mx-auto px-6 py-12'>
          <h1 className='text-4xl font-bold'> Hello World</h1>
      </main>
    </div>
  );
}

export default App;

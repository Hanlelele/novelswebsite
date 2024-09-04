import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { TypeProvider } from './typeContext';
import Header from './layouts/components/Header';
import Footer from './layouts/components/Footer';
function App() {
  return (
    <Router>
      <TypeProvider>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.Component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <>
                      <Header /> <Page /> <Footer />
                    </>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </TypeProvider>
    </Router>
  );
}

export default App;

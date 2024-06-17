import { Provider } from 'react-redux';
import './App.css';
import { Layout } from './components/Layout';
import { MainPage } from './pages/MainPage';
import { store } from './store/store';
import { StatisticsPage } from './pages/StatisticsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PATH_STATISTICS } from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Layout>
            <Routes>
              <Route path={PATH_STATISTICS} element={<StatisticsPage />} />
              <Route path="/" element={<MainPage />} />
            </Routes>
          </Layout>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;

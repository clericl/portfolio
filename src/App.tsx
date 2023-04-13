import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Scroller from './components/Scroller';

function App() {
  return (
    <div className="main">
      <Scroller />
      <Layout />
      <Outlet />
    </div>
  );
}

export default App;

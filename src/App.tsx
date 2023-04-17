import { Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import useScroll from './utils/useScroll';

function App() {
  useScroll()

  return (
    <div className="main">
      <Layout />
      <Outlet />
    </div>
  );
}

export default App;

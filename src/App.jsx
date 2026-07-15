import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import ConvertDashboard from './pages/ConvertDashboard.jsx';
import { MODE_ROUTES } from './config/tools.js';

const modeSlugs = Object.keys(MODE_ROUTES);

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ConvertDashboard initialMode="sentence" />} />
        {modeSlugs.map((slug) => (
          <Route
            key={slug}
            path={`/${slug}`}
            element={<ConvertDashboard initialMode={MODE_ROUTES[slug]} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

import { createRoot } from 'react-dom/client';
import App from './App';
import { loadInitialData } from './lib/loadConfig';

const bootstrap = async () => {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('root element not found');
  }

  try {
    const initialData = await loadInitialData();
    const root = createRoot(container);
    root.render(<App initialData={initialData} />);
  } catch (error) {
    container.innerHTML =
      '<div class="error-banner">初期データの読み込みに失敗しました。</div>';
    console.error(error);
  }
};

bootstrap();

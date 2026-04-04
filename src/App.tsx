import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { DiProvider } from './core/di/DiProvider';
import router from './core/router';
import { store } from './core/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <DiProvider>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </DiProvider>
    </Provider>
  );
}

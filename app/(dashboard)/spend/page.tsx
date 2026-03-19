import { Suspense } from 'react';
import SpendPage from './featureUI/SpendPage';
export default function Page() {
  return (
    <Suspense>
      <SpendPage />
    </Suspense>
  );
}

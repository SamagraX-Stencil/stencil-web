import React, { Suspense } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { LazyComponentPropsWithComponent } from './interface';

export const SuspenseWrap = (props: LazyComponentPropsWithComponent) => {
  const { component: Comp, onError, fallback, ...rest } = props;

  return Comp ? (
    // @ts-ignore
    <ErrorBoundary onError={onError}>
      <Suspense fallback={fallback || null}>
        {/* @ts-ignore */}
        <Comp {...rest} />
      </Suspense>
    </ErrorBoundary>
  ) : null;
};

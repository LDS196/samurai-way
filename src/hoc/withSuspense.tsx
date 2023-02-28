import React, {Component, ComponentType} from 'react';


export function withSuspense(Component: ComponentType) {
    return () => {
        return <React.Suspense
            fallback={<div>Loading...</div>}>
            <Component/>
        </React.Suspense>
    }
};


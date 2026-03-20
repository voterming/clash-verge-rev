<<<<<<< HEAD
import { ReactNode } from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

function ErrorFallback({ error }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : String(error)
  const errorStack = error instanceof Error ? error.stack : undefined

=======
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

function ErrorFallback({ error }: FallbackProps) {
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224
  return (
    <div role="alert" style={{ padding: 16 }}>
      <h4>Something went wrong:(</h4>

<<<<<<< HEAD
      <pre>{errorMessage}</pre>

      <details title="Error Stack">
        <summary>Error Stack</summary>
        <pre>{errorStack}</pre>
      </details>
    </div>
  )
}

interface Props {
  children?: ReactNode
}

export const BaseErrorBoundary = ({ children }: Props) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  )
}
=======
      <pre>{error.message}</pre>

      <details title="Error Stack">
        <summary>Error Stack</summary>
        <pre>{error.stack}</pre>
      </details>
    </div>
  );
}

interface Props {
  children?: ReactNode;
}

export const BaseErrorBoundary = (props: Props) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {props.children}
    </ErrorBoundary>
  );
};
>>>>>>> 3ea0d20e2cf7cf08c7e8e8c098ff725c4ea92224

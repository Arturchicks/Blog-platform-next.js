import React, { ReactNode } from "react";
interface Props {
  children?: ReactNode;
}
interface State {
  hasError: boolean;
}
class ErrorBoundary extends React.Component<Props, State> {
  public state: State = { hasError: false };
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log(error, errorInfo);
  }
  public render(): React.ReactNode {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так</h1>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;

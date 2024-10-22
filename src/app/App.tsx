import React from "react";
import Articles from "../pages/Articles/Articles";
import ErrorBoundary from "../shared/redux/errorBoundary";
const App: React.FC = () => {
  return (
    <div>
      <ErrorBoundary>
        <Articles />
      </ErrorBoundary>
    </div>
  );
};
export default App;

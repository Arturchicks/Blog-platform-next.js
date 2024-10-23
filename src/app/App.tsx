import React from "react";
import Articles from "../pages/Articles/Articles";
import ErrorBoundary from "../shared/redux/errorBoundary";
import Header from "../widgets/header/header";
const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-5">
      <ErrorBoundary>
        <Header />
        <Articles />
      </ErrorBoundary>
    </div>
  );
};
export default App;

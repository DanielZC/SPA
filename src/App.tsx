import { appRouter } from "./router/app.route";
import { RouterProvider } from "react-router";

function App() {
  return (
    <div className="min-h-screen bg-neutral-900 dark:bg-black">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Planner from "./pages/Planner";
import Analytics from "./pages/Analytics";
import Focus from "./pages/Focus";
import Subjects from "./pages/Subjects";
import Lectures from "./pages/Lectures";
import PYQs from "./pages/PYQs";
import Revision from "./pages/Revision";
import Mistakes from "./pages/Mistakes";
import Formulas from "./pages/Formulas";
import Mocks from "./pages/Mocks";
import Settings from "./pages/Settings";

function App() {
  return (
    <Layout>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
  path="/mocks"
  element={<Mocks />}
/>
        <Route
  path="/formulas"
  element={<Formulas />}
/>
        <Route
  path="/revision"
  element={<Revision />}
/>
        <Route
  path="/pyqs"
  element={<PYQs />}
/>


        <Route
          path="/planner"
          element={<Planner />}
        />
        <Route
  path="/mistakes"
  element={<Mistakes />}
/>

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/focus"
          element={<Focus />}
        />
        <Route
  path="/lectures"
  element={<Lectures />}
/>

        <Route
  path="/subjects"
  element={<Subjects />}
/>
        <Route path="/settings" element={<Settings />} />

      </Routes>

    </Layout>
  );
}

export default App;
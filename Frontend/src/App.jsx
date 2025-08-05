import { useState } from "react";
import "./App.css";
import UrlShortener from "./components/UrlShortener";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <UrlShortener />
      </main>
      <Footer />
    </div>
  );
}

export default App;

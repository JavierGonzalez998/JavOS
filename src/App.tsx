import "./App.css";
import Navbar from "@/components/navbar";
import Menu from "@/components/menu";
function App() {
  return (
    <main className="min-w-dvw min-h-dvh bg-sky-50">
      <Navbar />
      <section className="w-full pt-10 flex flex-col justify-center items-center">
        <Menu/>
      </section>
    </main>
  );
}

export default App;

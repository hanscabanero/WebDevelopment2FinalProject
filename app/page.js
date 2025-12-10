import Link from "next/link";
import Sidebar from "./components/sidebar";
import Header from "./components/header";

export default function Page() {
  return (
    <main className="min-h-screen flex text-[#ededed]">

    <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <section className="p-6">
          <h1 className="text-3xl text-gray-800">Welcome</h1>
        </section>
      </div>
    </main>
  );
}

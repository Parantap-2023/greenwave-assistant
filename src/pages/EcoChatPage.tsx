
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EcoChat from "@/components/EcoChat";

const EcoChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <EcoChat />
      </main>
      <Footer />
    </div>
  );
};

export default EcoChatPage;

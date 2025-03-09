
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmissionCalculator from "@/components/EmissionCalculator";

const Calculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <EmissionCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default Calculator;

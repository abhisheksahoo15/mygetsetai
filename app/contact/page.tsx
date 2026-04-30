import { PremiumPlaceholder } from "@/components/PremiumPlaceholder";

export default function Contact() {
  return (
    <PremiumPlaceholder 
      title="Contact Us" 
      description="Reach out to our core team for AI integrations, software development, and robotics partnerships."
    >
      <div className="flex flex-col gap-6 w-full mt-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
           <h3 className="text-fuchsia-400 font-semibold mb-2 uppercase tracking-wider text-sm flex items-center gap-2">📍 Facility 01 (HQ)</h3>
           <p className="text-gray-300">Kodigehalli Ayappa Nagar, Bengaluru K.A. 560067</p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
           <h3 className="text-fuchsia-400 font-semibold mb-2 uppercase tracking-wider text-sm flex items-center gap-2">📍 Facility 02</h3>
           <p className="text-gray-300">Kohka, Bhilai Nagar, Chhattisgarh, 490023</p>
        </div>
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-between">
           <div>
             <h3 className="text-fuchsia-400 font-semibold mb-2 uppercase tracking-wider text-sm flex items-center gap-2">✉️ Communications</h3>
             <a href="mailto:innovationsgetsetai@gmail.com" className="text-white hover:text-fuchsia-300 transition-colors font-medium">innovationsgetsetai@gmail.com</a>
           </div>
        </div>
      </div>
    </PremiumPlaceholder>
  );
}

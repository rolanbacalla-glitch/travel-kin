"use client";

import React, { useState } from "react";
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin,
  InfoWindow,
  useAdvancedMarkerRef
} from "@vis.gl/react-google-maps";
import { Shield, Users, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Data for SafeZones & Solo Kins
const pinData = [
  { id: "1", type: "safezone", lat: 18.7883, lng: 98.9853, name: "Old City Square", desc: "Monitored 24/7, popular solo kin entry point.", safetyScore: 9.8 },
  { id: "2", type: "kin", lat: 18.7950, lng: 98.9950, name: "Suki R.", vibe: "Foodie", status: "online" },
  { id: "3", type: "kin", lat: 18.7820, lng: 98.9750, name: "Liam B.", vibe: "Action", status: "away" },
  { id: "4", type: "safezone", lat: 18.8000, lng: 98.9666, name: "Wellness Hub", desc: "Verified yoga retreats & co-working spaces.", safetyScore: 9.5 },
];

export default function InteractiveMap() {
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);
  
  const selectedPin = pinData.find(p => p.id === selectedPinId);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="w-full h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl relative border border-slate/5 bg-slate/90">
        <Map
          defaultCenter={{ lat: 18.7883, lng: 98.9853 }}
          defaultZoom={13}
          mapId="98b3f2ec8c8c5c7d" // Custom Style ID for a cleaner look
          disableDefaultUI={true}
          gestureHandling={'greedy'}
          className="w-full h-full"
        >
          {pinData.map(pin => (
            <CustomMarker 
              key={pin.id} 
              pin={pin} 
              onClick={() => setSelectedPinId(pin.id)} 
            />
          ))}

          {selectedPin && (
            <InfoWindow
              position={{ lat: selectedPin.lat, lng: selectedPin.lng }}
              onCloseClick={() => setSelectedPinId(null)}
              pixelOffset={[0, -10]}
              headerDisabled={true}
            >
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-56 p-4 bg-white rounded-2xl flex flex-col gap-3 relative -m-2 border-0"
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "p-2 rounded-lg text-white",
                    selectedPin.type === "safezone" ? "bg-ocean" : "bg-sunset"
                  )}>
                    {selectedPin.type === "safezone" ? <Shield className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate text-sm leading-none">{selectedPin.name}</h5>
                    <p className="text-[9px] text-slate/40 uppercase font-black tracking-widest mt-1">
                      {selectedPin.type === "safezone" ? "Official SafeZone" : "Solo Kin Nearby"}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-slate/60 leading-relaxed italic">
                  {selectedPin.desc || `Vibe: ${selectedPin.vibe}`}
                </p>

                {selectedPin.type === "safezone" && (
                   <div className="flex items-center justify-between pt-2 border-t border-slate/5">
                     <span className="text-[9px] uppercase font-bold text-slate/30">Safety Score</span>
                     <span className="text-xs font-black text-ocean">{(selectedPin as any).safetyScore}/10</span>
                   </div>
                )}

                <button className={cn(
                  "w-full py-2.5 rounded-lg text-[9px] uppercase font-black tracking-[0.1em] transition-all",
                  selectedPin.type === "safezone" ? "bg-ocean/5 text-ocean hover:bg-ocean hover:text-white" : "bg-sunset text-white"
                )}>
                  {selectedPin.type === "safezone" ? "View Details" : "Chat with Kin"}
                </button>
              </motion.div>
            </InfoWindow>
          )}
        </Map>

        {/* Floating UI Elements */}
        <div className="absolute top-6 left-6 flex flex-col gap-3 pointer-events-none">
          <div className="p-4 bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl pointer-events-auto flex items-center gap-4">
             <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate shadow-sm overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Active Kin" />
                 </div>
               ))}
             </div>
             <div className="text-xs">
               <p className="font-black text-slate leading-none">12 Solo Kins</p>
               <p className="text-slate/40 mt-0.5">Active in this area</p>
             </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-12 flex flex-col gap-2 pointer-events-auto">
           <LegendItem label="SafeZone" color="bg-ocean" />
           <LegendItem label="Solo Kin" color="bg-sunset" />
        </div>
      </div>
    </APIProvider>
  );
}

function CustomMarker({ pin, onClick }: { pin: any, onClick: () => void }) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      position={{ lat: pin.lat, lng: pin.lng }}
      onClick={onClick}
    >
      <motion.div 
        whileHover={{ scale: 1.1 }}
        className={cn(
          "p-2 rounded-xl shadow-xl border-2 border-white cursor-pointer transition-all",
          pin.type === "safezone" ? "bg-ocean text-white" : "bg-sunset text-white"
        )}
      >
        {pin.type === "safezone" ? <Shield className="w-5 h-5" /> : <Users className="w-5 h-5" />}
      </motion.div>
    </AdvancedMarker>
  );
}

function LegendItem({ label, color }: { label: string, color: string }) {
  return (
     <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/20">
        <div className={cn("w-2 h-2 rounded-full shadow-sm", color)} />
        <span className="text-[10px] font-black uppercase text-slate/60 tracking-wider">{label}</span>
     </div>
  );
}

import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Visited countries data with coordinates
const visitedCountries = [
  { name: 'United States', lat: 40, lng: -100, photos: ['usa1.jpg', 'usa2.jpg', 'usa3.jpg'] },
  { name: 'United Kingdom', lat: 54, lng: -2, photos: ['uk1.jpg', 'uk2.jpg'] },
  { name: 'France', lat: 46, lng: 2, photos: ['france1.jpg', 'france2.jpg'] },
  { name: 'Japan', lat: 36, lng: 138, photos: ['japan1.jpg', 'japan2.jpg'] },
  { name: 'Australia', lat: -25, lng: 133, photos: ['aus1.jpg', 'aus2.jpg'] },
  { name: 'India', lat: 20, lng: 77, photos: ['india1.jpg', 'india2.jpg'] },
  { name: 'Thailand', lat: 15, lng: 100, photos: ['thai1.jpg', 'thai2.jpg'] },
  { name: 'Italy', lat: 42, lng: 12, photos: ['italy1.jpg', 'italy2.jpg'] },
  { name: 'Spain', lat: 40, lng: -4, photos: ['spain1.jpg', 'spain2.jpg'] },
  { name: 'Germany', lat: 51, lng: 9, photos: ['germany1.jpg', 'germany2.jpg'] }
];

// Convert lat/lng to 3D coordinates
const latLngTo3D = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return [x, y, z] as [number, number, number];
};

// Simple Earth component
const Earth = ({ onCountryClick }: { onCountryClick: (country: any) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial color="#4A90E2" transparent opacity={0.8} />
      </mesh>

      {/* Country markers */}
      {visitedCountries.map((country, index) => {
        const position = latLngTo3D(country.lat, country.lng, 2.05);
        return (
          <CountryMarker
            key={country.name}
            position={position}
            country={country}
            onClick={() => onCountryClick(country)}
            delay={index * 0.2}
          />
        );
      })}
    </group>
  );
};

// Country marker component
const CountryMarker = ({ 
  position, 
  country, 
  onClick, 
  delay 
}: { 
  position: [number, number, number]; 
  country: any; 
  onClick: () => void;
  delay: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.5 : 1 + Math.sin(state.clock.elapsedTime * 2 + delay) * 0.2;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
    </mesh>
  );
};

// Photo gallery modal
const PhotoGallery = ({ 
  country, 
  isOpen, 
  onClose 
}: { 
  country: any; 
  isOpen: boolean; 
  onClose: () => void; 
}) => {
  if (!isOpen || !country) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-card rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-space font-bold text-gradient">
            {country.name}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {country.photos.map((photo: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square bg-muted rounded-lg overflow-hidden"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-muted-foreground">
                Photo {index + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-muted-foreground">
            Amazing memories from {country.name}! Click on other countries to explore more of my travel journey.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Travel Globe component
const TravelGlobe = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleCountryClick = (country: any) => {
    setSelectedCountry(country);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setSelectedCountry(null);
  };

  // Fallback component if 3D globe fails
  const FallbackGlobe = () => (
    <div className="relative w-full h-[600px] md:h-[700px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-32 h-32 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
          <span className="text-4xl">🌍</span>
        </div>
        <h3 className="text-xl font-semibold">Interactive Travel Map</h3>
        <p className="text-muted-foreground max-w-md">
          Click on the countries below to explore my travel journey and see photos from each destination.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 max-w-2xl mx-auto mt-6">
          {visitedCountries.map((country) => (
            <button
              key={country.name}
              onClick={() => handleCountryClick(country)}
              className="px-3 py-2 bg-card rounded-lg hover:bg-primary/10 transition-colors text-sm"
            >
              {country.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full h-[600px] md:h-[700px]">
      <Suspense fallback={<FallbackGlobe />}>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ gl }) => {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />
          
          <Earth onCountryClick={handleCountryClick} />
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-lg p-4 backdrop-blur-sm"
        >
          <p className="text-sm text-muted-foreground">
            🌍 Rotate the globe • 🔍 Zoom in/out • ✨ Click on glowing markers to see photos
          </p>
        </motion.div>
      </div>

      {/* Photo Gallery Modal */}
      <PhotoGallery
        country={selectedCountry}
        isOpen={isGalleryOpen}
        onClose={closeGallery}
      />
    </div>
  );
};

export default TravelGlobe;
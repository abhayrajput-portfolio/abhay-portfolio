import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// All countries with coordinates
const allCountries = [
  // Major countries - displayed as larger markers
  { name: 'United States', lat: 39.8283, lng: -98.5795, visited: true, photos: ['usa1.jpg', 'usa2.jpg', 'usa3.jpg'] },
  { name: 'Germany', lat: 51.1657, lng: 10.4515, visited: true, photos: ['germany1.jpg', 'germany2.jpg'] },
  { name: 'United Arab Emirates', lat: 23.4241, lng: 53.8478, visited: true, photos: ['uae1.jpg', 'uae2.jpg'] }, // Dubai
  { name: 'India', lat: 20.5937, lng: 78.9629, visited: true, photos: ['india1.jpg', 'india2.jpg', 'india3.jpg'] },
  
  // Other major countries - not visited but shown
  { name: 'China', lat: 35.8617, lng: 104.1954, visited: false },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253, visited: false },
  { name: 'Russia', lat: 61.5240, lng: 105.3188, visited: false },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, visited: false },
  { name: 'Canada', lat: 56.1304, lng: -106.3468, visited: false },
  { name: 'United Kingdom', lat: 55.3781, lng: -3.4360, visited: false },
  { name: 'France', lat: 46.2276, lng: 2.2137, visited: false },
  { name: 'Japan', lat: 36.2048, lng: 138.2529, visited: false },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375, visited: false },
  { name: 'Egypt', lat: 26.0975, lng: 31.2753, visited: false },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528, visited: false },
  { name: 'Argentina', lat: -38.4161, lng: -63.6167, visited: false },
  { name: 'Italy', lat: 41.8719, lng: 12.5674, visited: false },
  { name: 'Spain', lat: 40.4637, lng: -3.7492, visited: false },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433, visited: false },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925, visited: false },
  { name: 'Indonesia', lat: -0.7893, lng: 113.9213, visited: false },
  { name: 'Norway', lat: 60.4720, lng: 8.4689, visited: false },
  { name: 'Sweden', lat: 60.1282, lng: 18.6435, visited: false },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860, visited: false }
];

const visitedCountries = allCountries.filter(country => country.visited);

// Convert lat/lng to 3D coordinates
const latLngTo3D = (lat: number, lng: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  
  return [x, y, z] as [number, number, number];
};

// Enhanced Earth component with proper world mapping
const Earth = ({ onCountryClick }: { onCountryClick: (country: any) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Earth sphere with enhanced material */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial 
          color="#2563eb"
          transparent 
          opacity={0.9}
          shininess={100}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh scale={2.1}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color="#4fc3f7" 
          transparent 
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* All country markers */}
      {allCountries.map((country, index) => {
        const position = latLngTo3D(country.lat, country.lng, 2.05);
        return (
          <CountryMarker
            key={country.name}
            position={position}
            country={country}
            onClick={() => country.visited && onCountryClick(country)}
            delay={index * 0.1}
            visited={country.visited}
          />
        );
      })}
      
      {/* Add continent outlines - simplified landmasses */}
      <ContinentOutlines />
    </group>
  );
};

// Simple continent outlines component
const ContinentOutlines = () => {
  const continentData = [
    // North America outline (simplified)
    { lat: 45, lng: -100, scale: 0.3 },
    { lat: 40, lng: -95, scale: 0.2 },
    { lat: 50, lng: -105, scale: 0.25 },
    
    // Europe
    { lat: 50, lng: 10, scale: 0.15 },
    { lat: 55, lng: 15, scale: 0.1 },
    
    // Asia
    { lat: 30, lng: 100, scale: 0.4 },
    { lat: 40, lng: 80, scale: 0.3 },
    { lat: 50, lng: 120, scale: 0.25 },
    
    // Africa
    { lat: 0, lng: 20, scale: 0.25 },
    { lat: -20, lng: 25, scale: 0.3 },
    
    // South America
    { lat: -10, lng: -60, scale: 0.2 },
    { lat: -30, lng: -65, scale: 0.15 },
    
    // Australia
    { lat: -25, lng: 135, scale: 0.1 }
  ];

  return (
    <group>
      {continentData.map((continent, index) => {
        const position = latLngTo3D(continent.lat, continent.lng, 2.01);
        return (
          <mesh key={index} position={position}>
            <sphereGeometry args={[continent.scale, 8, 8]} />
            <meshBasicMaterial 
              color="#22c55e" 
              transparent 
              opacity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Enhanced Country marker component
const CountryMarker = ({ 
  position, 
  country, 
  onClick, 
  delay,
  visited 
}: { 
  position: [number, number, number]; 
  country: any; 
  onClick: () => void;
  delay: number;
  visited: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      if (visited) {
        // Visited countries glow and pulse
        const scale = hovered ? 2.5 : 1.5 + Math.sin(state.clock.elapsedTime * 3 + delay) * 0.3;
        meshRef.current.scale.setScalar(scale);
      } else {
        // Non-visited countries are smaller and static
        const scale = hovered ? 1.2 : 0.8;
        meshRef.current.scale.setScalar(scale);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      visible={true}
    >
      <sphereGeometry args={visited ? [0.03, 16, 16] : [0.015, 8, 8]} />
      <meshBasicMaterial 
        color={visited ? "#00ff88" : "#ffffff"} 
        transparent 
        opacity={visited ? 0.9 : 0.4}
      />
      
      {/* Glow effect for visited countries */}
      {visited && (
        <mesh scale={2}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial 
            color="#00ff88" 
            transparent 
            opacity={0.2}
          />
        </mesh>
      )}
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
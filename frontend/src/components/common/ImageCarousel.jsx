import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import img1 from '../../assets/carousel_1.jpg';
import img2 from '../../assets/carousel_2.jpg';
import img3 from '../../assets/carousel_3.jpg';
import img4 from '../../assets/carousel_4.jpg';

const images = [
    {
        id: 1,
        src: img1,
        alt: "Vaccination campaign"
    },
    {
        id: 2,
        src: img2,
        alt: "Child immunization"
    },
    {
        id: 3,
        src: img3,
        alt: "Healthcare worker"
    },
    {
        id: 4,
        src: img4,
        alt: "Community health"
    }
];

const ImageCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl my-12">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                            }`}
                    />
                ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={`text-${currentIndex}`}
                className="absolute bottom-10 left-10 z-10 text-white max-w-lg"
            >
                <h3 className="text-2xl font-bold mb-2">Protecting Our Future</h3>
                <p className="text-lg text-blue-100">Every vaccination counts towards a healthier community.</p>
            </motion.div>
        </div>
    );
};

export default ImageCarousel;

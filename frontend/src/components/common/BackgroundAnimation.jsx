import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Gradient Layer */}
            <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                    background: [
                        "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
                        "linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)",
                        "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
                    ]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Blob 1 */}
            <motion.div
                className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Floating Blob 2 */}
            <motion.div
                className="absolute top-0 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    x: [0, -50, 0],
                    y: [0, 100, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                }}
            />

            {/* Floating Blob 3 */}
            <motion.div
                className="absolute -bottom-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.3, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 4
                }}
            />

            {/* Floating Blob 4 */}
            <motion.div
                className="absolute -bottom-10 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
                animate={{
                    x: [0, -30, 0],
                    y: [0, -60, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            {/* Grid Overlay for Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
    );
};

export default BackgroundAnimation;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResourceWelcome = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const user = useSelector((state) => state.userState.user);
    const navigate = useNavigate();

    const images = [
        "https://cnm.fr/wp-content/uploads/2023/01/transition-ecologique-cnm-1.jpg",
        "https://www.wayden.fr/wp-content/uploads/2023/02/Comment-bien-manager-la-transition-ecologique-en-entreprise-.jpg"    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, []);

    const goToResources = () => {
        
        if (user) navigate('/resource/dashboard');
        
        else {
            toast.error("You must be logged to view your resources", {autoClose: 2000});
            return navigate('/login');
        }
    }

    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center bg-gray-100 text-gray-800">
            {/* Background Image */}
            <div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-700"
                style={{ backgroundImage: `url(${images[currentImage]})` }}
            />

            {/* Overlay */}
            <div className="relative bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-2xl text-center z-10">
               <h1 className="text-3xl font-bold mb-4">Welcome to Your Hardware Ecosystem</h1>
                <p className="text-lg mb-6">
                   Explore your hardware ecosystem like never before! This revolutionary application allows you to dive into the heart of machines, discovering the hardware resources of their components. Visualize, analyze, and track their consumption or collection at a glance for simplified and optimized management.
               </p>                   
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            onClick={goToResources}>
                        Discover
                    </button>
            </div>
        </div>
    );
}

export default ResourceWelcome;

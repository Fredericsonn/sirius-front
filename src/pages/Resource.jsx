<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import PopupButtons from "../components/PopUp";

const Resource = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const images = [
        "https://cnm.fr/wp-content/uploads/2023/01/transition-ecologique-cnm-1.jpg",
        "https://www.wayden.fr/wp-content/uploads/2023/02/Comment-bien-manager-la-transition-ecologique-en-entreprise-.jpg",
        "https://www.algocrea.com/wp-content/uploads/2021/02/publicite-ecologique.jpg"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000); 
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <>
            <NavBar />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", padding: "20px" }}>
                <section style={{ flex: 1, padding: "20px" }}>
                    <p>
                    Explorez votre écosystème matériel comme jamais auparavant ! Cette application révolutionnaire vous permet de plonger au cœur des machines, en découvrant les ressources matérielles de leurs composantes. Visualisez, analysez et suivez en un clin d'œil leur consommation ou leur collecte pour une gestion simplifiée et optimisée.
                    </p>
                    <PopupButtons />

                </section>
                <section>
                </section>
                <section style={{ flex: 1, textAlign: "center" }}>
                    <img 
                        src={images[currentImage]} 
                        alt="Publicité écologique"
                        style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
                    />
                </section>
            </div>
        </>
    );
}

export default Resource;
=======
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Example from '../components/BarChart';
import MaterialGroupChart from '../components/PieChart';
import TableComponent from '../components/Table';
import ImpactScoreCalculator from '../components/Jauge';
import 'react-toastify/dist/ReactToastify.css';

const Resources = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Dashboard des Ressources</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-2xl shadow-md">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Répartition des Matériaux par Catégorie</h2>
                            <MaterialGroupChart />
                        </div>
                        
                        <div className="bg-white p-4 rounded-2xl shadow-md">
                            <ImpactScoreCalculator />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-2xl shadow-md h-fit">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Fréquence des Composants</h2>
                    <div className="max-h-[300px] overflow-y-auto">
                        <TableComponent />
                    </div>
                </div>

                <div className="lg:col-span-3 bg-white p-4 rounded-2xl shadow-md">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Volume des Matières par Type</h2>
                    <Example />
                </div>
            </div>
        </div>
    );
};

export default Resources;
>>>>>>> 3aa184544ff5a491259109f97ea9275cb9ddae5a

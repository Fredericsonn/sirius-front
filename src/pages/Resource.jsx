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

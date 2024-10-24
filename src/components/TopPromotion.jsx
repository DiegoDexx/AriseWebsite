import React, { useState, useEffect } from 'react';


const TopPromotion = () => {
    const [isResponsive, setIsResponsive] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsResponsive(true);
            } else {
                setIsResponsive(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial state on component mount

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = () => {
        setIsClicked(true);
    };

    return (
        <>
            {!isClicked && (
                <div className={`promotion-bar ${isResponsive ? 'promotion-bar-responsive' : ''}`}>
                    <p> ENVÍOS <strong> GRATIS </strong> A ESPAÑA A PARTIR DE 60€ OTROS PAISES A PARTIR DE 100€      </p>
                    {/* <button className="close-btn" onClick={handleClick}>✖</button> */}
                </div>
            )}
        </>
    );
};

export default TopPromotion;

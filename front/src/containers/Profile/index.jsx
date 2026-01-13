import React from 'react';

import { scroll } from "../../components/scroll";

import HeroComponent from "../../components/Hero";
import FooterComponent from "../../components/Footer";
import BackgroundComponent from "../../components/Background";

function Profile ({ toggleTheme }) {
    const showBars = scroll();
    return(
        <BackgroundComponent>
            <HeroComponent
                visible={showBars}
                toggleTheme={toggleTheme}
                showSearch={false}
            />
            <FooterComponent
                visible={showBars}
            />
        </BackgroundComponent>
    );
}

export default Profile;
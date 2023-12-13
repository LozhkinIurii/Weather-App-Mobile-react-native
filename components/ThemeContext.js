import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState({
        backgroundColor: '#454545',
        textColor: 'whitesmoke',
        tabIconColor: 'whitesmoke',
        tabBarBg: '#606060',
        inputContainerBg: '#606060'
    });

    const updateTheme = (newTheme) => {
        setTheme({ ...theme, ...newTheme });
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

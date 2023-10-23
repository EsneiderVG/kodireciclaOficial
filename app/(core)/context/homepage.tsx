'use client'

import { createContext, useState } from 'react'

export const ThemeContext = createContext({})

export default function ThemeProvider({ children, }: { children: React.ReactNode }) {
    const [isOpenHeaderLeft, setIsOpenHeaderLeft] = useState(false);

    return <ThemeContext.Provider value={{ isOpenHeaderLeft, setIsOpenHeaderLeft }}>{children}</ThemeContext.Provider>
}
import { Children, createContext, useState } from 'react'
import { Appearance } from 'react-native'
import { Colors } from '../constant/theme'
export const ThemeContext = createContext({})
export const ThemeProvider = ({ children }) => {
  const [colorSheme, setColorScheme] = useState(Appearance.getColorScheme)
  const theme = colorSheme === 'dark' ? Colors.dark : Colors.light

  return (
    <ThemeContext.Provider
      value={{
        colorSheme,
        setColorScheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

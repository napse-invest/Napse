interface Color1 {
  main: string
}
interface Color3 extends Color1 {
  light: string
  dark: string
}

interface Color5 extends Color3 {
  lighter: string
  darker: string
}

type Palette = {
  mode: string
  primary: Color3
  secondary: Color3
  grey: Color5
  white: Color1
  black: Color1
  success: Color3
  error: Color3
  background: { default: string }
}

export const palette = (mode: string): Palette => {
  return {
    mode: mode,

    primary: {
      ...{
        light: '#4AAD9F',
        main: '#007D71',
        dark: '#005046'
      },
      ...(mode === 'light' && {
        light: '#4AAD9F',
        main: '#007D71',
        dark: '#005046'
      }),
      ...(mode === 'dark' && {
        light: '#4AAD9F',
        main: '#4AAD9F',
        dark: '#005046'
      })
    },
    secondary: {
      light: '#FFFFAA',
      main: '#DECD7A',
      dark: '#AB9C4C'
    },
    grey: {
      lighter: '#F7FAF7',
      light: '#DAD7DA',
      main: '#666F66',
      dark: '#292A29',
      darker: '#1C1D1C'
    },
    white: {
      main: '#F7FAF7'
    },
    black: {
      main: '#404840'
    },
    success: {
      ...{
        light: '#8EEB8F',
        main: '#4BB543',
        dark: '#1D7F0E'
      },
      ...(mode === 'light' && {
        light: '#8EEB8F',
        main: '#4BB543',
        dark: '#1D7F0E'
      }),
      ...(mode === 'dark' && {
        light: '#8EEB8F',
        main: '#4BB543',
        dark: '#1D7F0E'
      })
    },
    error: {
      ...{
        light: '#FF6666',
        main: '#FF0033',
        dark: '#CC0022'
      },
      ...(mode === 'light' && {
        light: '#FF6666',
        main: '#FF0033',
        dark: '#CC0022'
      }),
      ...(mode === 'dark' && {
        light: '#FF6666',
        main: '#FF3333',
        dark: '#CC0022'
      })
    },
    background: {
      ...{ default: '#F7FAF7' },
      ...(mode === 'light' && {
        default: '#F7FAF7'
      }),
      ...(mode === 'dark' && {
        default: '#1C1D1C'
      })
    }
  }
}

export const palette = (mode: string) => {
  return {
    mode: mode,

    primary: {
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
      ...(mode === 'light' && {
        default: '#F7FAF7'
      }),
      ...(mode === 'dark' && {
        default: '#1C1D1C'
      })
    }
    // inherit: {
    //   ...(mode === 'light' && {
    //     main: '#1C1D1C'
    //   }),
    //   ...(mode === 'dark' && {
    //     main: '#F7FAF7'
    //   })
    // }
  }
}

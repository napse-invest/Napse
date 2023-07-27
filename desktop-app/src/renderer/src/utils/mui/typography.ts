interface TextVariant {
  fontSize: string
  fontWeight: number
}

export type Typography = {
  fontFamily: string
  h1: TextVariant
  h2: TextVariant
  h3: TextVariant
  h4: TextVariant
  h5: TextVariant
  h6: TextVariant
  body1: TextVariant
  body2: TextVariant
  button: TextVariant
  caption: TextVariant
  overline: TextVariant
}

export const typography: Typography = {
  fontFamily: 'Inter',
  h1: {
    fontSize: '3.5rem',
    fontWeight: 700
  },
  h2: {
    fontSize: '2.75rem',
    fontWeight: 700
  },
  h3: {
    fontSize: '2rem',
    fontWeight: 700
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 700
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 700
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 700
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400
  },
  body2: {
    fontSize: '0.75rem',
    fontWeight: 400
  },
  button: {
    fontSize: '0.85rem',
    fontWeight: 700
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400
  }
}

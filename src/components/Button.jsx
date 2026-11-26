import { Button as MuiButton } from '@mui/material'

function Button({ children, sx, ...props }) {
  return (
    <MuiButton
      variant="contained"
      sx={{
        borderRadius: 0,
        bgcolor: '#a5e82c',
        color: '#172000',
        fontWeight: 800,
        '&:hover': { bgcolor: '#96d321' },
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  )
}

export default Button

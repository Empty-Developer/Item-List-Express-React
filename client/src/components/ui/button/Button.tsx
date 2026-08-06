import './Button.css'

interface ButtonProps {
  title: string,
  onClick?: () => void
}

export const Button = ({title, onClick}: ButtonProps) =>{
  return (
    <button
    className='button-ui-component'
      onClick={onClick}
    >
      {title}
    </button>
  )
}

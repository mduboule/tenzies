export default function Die(props) {
  return (
    <div 
      className={`die ${props.isHeld ? 'isHeld' : ''}`}
      onClick={props.handleClick}
    >
      {props.value}
    </div>
  )
}

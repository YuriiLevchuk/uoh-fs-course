import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(store => store.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    visibility: notification ? 'visible' : 'hidden'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
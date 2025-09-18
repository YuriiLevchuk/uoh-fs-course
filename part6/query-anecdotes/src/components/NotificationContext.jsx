import { createContext, useReducer, useContext } from "react";
import PropTypes from 'prop-types';

const NotificationReducer = (state, action) => {
  switch(action.type){
    case "SET": 
      return action.payload
    case "RESET": 
      return null
    default: 
      return state
  }
}
const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(NotificationReducer, null)

  return (
    <NotificationContext.Provider value={[ notification, dispatch ]}>
      {props.children} 
    </NotificationContext.Provider>
  )
}
NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired
}

const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}
const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const setNotificationForS = (notification, time, dispatch) => {
  dispatch({ type: "SET", payload: notification })
  setTimeout(() => dispatch({ type: "RESET" }), time * 1000)
}

// eslint-disable-next-line react-refresh/only-export-components
export { NotificationContextProvider, useNotificationValue, useNotificationDispatch, setNotificationForS }
export default NotificationContext
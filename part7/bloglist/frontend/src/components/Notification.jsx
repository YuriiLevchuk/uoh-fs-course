import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Notification = () => {
  const { notification, isError } = useSelector((state) => state.notification);
  if (!notification) return null;
  return (
    <>
      {!isError ? (
        <div className="notification message">{notification}</div>
      ) : (
        <div className="notification error">{notification}</div>
      )}
    </>
  );
};

Notification.propTypes = {};

export default Notification;

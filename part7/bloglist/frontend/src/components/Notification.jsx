import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const { notification, isError } = useSelector((state) => state.notification);
  if (!notification) return null;

  const style = {
    position: "fixed",
    marginTop: "50px",
    zIndex: 1000,
  };

  return (
    <div className="container" style={style}>
      <Alert variant={isError ? "danger" : "success"}  dismissible>{notification}</Alert>
    </div>
  );
};

Notification.propTypes = {};

export default Notification;

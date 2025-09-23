import PropTypes from "prop-types";
import { Component, useState } from "react";
import { Button } from "react-bootstrap";

const Togglable = (props) => {
  const { children, label } = props;
  const [visible, setVisible] = useState(false);

  // button handlers //
  const toggleVisibility = () => setVisible((x) => !x);

  // set visibility for elements //
  const childrenStyle = visible
    ? [{ display: "none" }, { display: "" }]
    : [{ display: "" }, { display: "none" }];

  return (
    <>
      <div style={childrenStyle[0]}>
        <Button variant="light" name="toggle" onClick={toggleVisibility}>
          {label} &#707;
        </Button>
        {" "}
        {/* before unrolling */}
      </div>

      <div style={childrenStyle[1]}>
        <Button variant="light" onClick={toggleVisibility}>{label} &#709;</Button>
        {" "}
        {/* after unrolling */}
        {children}
      </div>
    </>
  );
};

Togglable.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Togglable;

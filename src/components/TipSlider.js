import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "rc-tooltip/assets/bootstrap.css";
import Slider from "rc-slider";
import raf from "rc-util/lib/raf";
import Tooltip from "rc-tooltip";

// Got the Bug
// Slider ki value change hogi, toh hi useEffect call hoga.
// Slider ki position change hone pr, nhi call hoga. Isliye bug aa rha.
// I got solution on StackOverflow and Implemented here.

const HandleTooltip = (props) => {

  // Check if Window Page Resizes
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const {
    value,
    children,
    visible,
    tipFormatter = (val) => `${val} %`,
    ...restProps
  } = props;

  const tooltipRef = useRef();
  const rafRef = useRef(null);

  function cancelKeepAlign() {
    raf.cancel(rafRef.current);
  }

  function keepAlign() {
    rafRef.current = raf(() => {
      tooltipRef.current?.forcePopupAlign();
    });
  }

  useEffect(() => {
    if (visible) {
      keepAlign();
    } else {
      cancelKeepAlign();
    }

    return cancelKeepAlign;
  }, [value, visible, size]);

  return (
    <Tooltip
      placement="top"
      overlay={tipFormatter(value)}
      overlayInnerStyle={{ minHeight: "auto" }}
      ref={tooltipRef}
      visible={visible}
      {...restProps}
    >
      {children}
    </Tooltip>
  );
};

export const handleRender = (node, props) => {
  return (
    <HandleTooltip value={props.value} visible={props.dragging}>
      {node}
    </HandleTooltip>
  );
};

const TooltipSlider = ({ tipFormatter, tipProps, ...props }) => {
  const tipHandleRender = (node, handleProps) => {
    return (
      <HandleTooltip
        value={handleProps.value}
        visible={handleProps.dragging}
        tipFormatter={tipFormatter}
        {...tipProps}
      >
        {node}
      </HandleTooltip>
    );
  };

  return <Slider {...props} handleRender={tipHandleRender} />;
};

export default TooltipSlider;

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = (props) => {
  const { id, children } = props;
  const [container, setContainer] = useState();

  useEffect(() => {
    if (id) {
      const portalContainer = document.getElementById(id);

      if (!portalContainer) {
        throw new Error('Portal is not defined');
      }

      setContainer(portalContainer);
    }
  }, [id]);

  return container ? createPortal(children, container) : null;
};

export default Portal;
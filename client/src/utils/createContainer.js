export const createContainer = (options) => {
  if (document.getElementById(options.id)) {
    return;
  }

  const { id, mountNode = document.body } = options;

  const portalContainer = document.createElement("div");
  portalContainer.setAttribute("id", id);
  portalContainer.setAttribute("data-testid", `portalContainer-${id}`);
  mountNode.appendChild(portalContainer);
};

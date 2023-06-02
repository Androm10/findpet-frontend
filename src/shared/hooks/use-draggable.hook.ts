import { MouseEvent, Ref, RefObject, useEffect, useRef } from 'react';

export const useDraggable = <T extends HTMLElement, K extends HTMLElement>(
  ref: RefObject<T>,
  dragZoneRef: RefObject<K>,
) => {
  const pos1 = useRef(0);
  const pos2 = useRef(0);
  const pos3 = useRef(0);
  const pos4 = useRef(0);

  useEffect(() => {
    if (!dragZoneRef.current) return;
    dragElement();
  }, [dragZoneRef, dragZoneRef.current]);

  useEffect(() => {
    if (!ref.current) return;
  }, [ref, ref.current]);

  const dragElement = () => {
    if (dragZoneRef.current) {
      // if present, the header is where you move the DIV from:
      dragZoneRef.current.onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      if (ref.current) {
        ref.current.onmousedown = dragMouseDown;
      }
    }
  };

  const dragMouseDown = (event: _MouseEvent) => {
    event = event || window.event;
    event.preventDefault();
    // get the mouse cursor position at startup:
    pos3.current = event.clientX;
    pos4.current = event.clientY;
    // call a function whenever the cursor moves:
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  };

  const elementDrag = (event: _MouseEvent) => {
    if (!ref.current) return;

    event = event || window.event;
    event.preventDefault();
    // calculate the new cursor position:
    pos1.current = pos3.current - event.clientX;
    pos2.current = pos4.current - event.clientY;
    pos3.current = event.clientX;
    pos4.current = event.clientY;
    // set the element's new position:
    ref.current.style.top = ref.current.offsetTop - pos2.current + 'px';
    ref.current.style.left = ref.current.offsetLeft - pos1.current + 'px';
  };

  const closeDragElement = () => {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  };
};

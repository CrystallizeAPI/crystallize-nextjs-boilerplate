import { useEffect } from 'react';

export function useOnOutsideClick({ onOutsideClick, element }) {
  useEffect(() => {
    function onBodyClick(evt) {
      function clickedElementIsInside(el) {
        if (!el) {
          return false;
        }
        if (el === element) {
          return true;
        }
        if (el === document.body) {
          return false;
        }
        return clickedElementIsInside(el.parentElement);
      }

      if (element && !clickedElementIsInside(evt.target)) {
        onOutsideClick();
      }
    }

    document.body.addEventListener('click', onBodyClick, false);

    return () => document.body.removeEventListener('click', onBodyClick);
  }, [onOutsideClick, element]);
}

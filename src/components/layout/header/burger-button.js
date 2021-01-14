import styled from 'styled-components';

import { responsive } from 'ui';

const Outer = styled.button.attrs(() => ({
  type: 'button'
}))`
  appearance: none;
  display: none;
  cursor: pointer;
  background: transparent;
  width: 40px;
  height: 40px;
  position: absolute;
  margin-right: 15px;
  margin-top: 5px;
  right: 15px;
  z-index: 100;
  padding: 0;

  ${responsive.smAndLess} {
    display: block;
  }
`;

const Lines = styled.div`
  width: 100%;
  position: absolute;
  background: var(--color-text-main);
  height: 4px;
  top: 50%;
  margin-top: -2px;
  border-radius: 2px;
  transition: all 0.2s ease-out;

  &:before,
  &:after {
    width: 100%;
    top: -14px;
    background: var(--color-text-main);
    height: 4px;
    content: '';
    position: absolute;
    left: 0;
    transition: all 0.2s ease-out;
  }

  &:after {
    transform: rotate(0deg);
    left: 8px;
    width: calc(100% - 8px);
    top: 14px;
  }
  &:before {
    transform: rotate(0deg);
    top: -14px;
  }

  &.open {
    background: transparent;

    &:after {
      transform: rotate(-45deg);
      left: 0px;
      width: 100%;
      top: 0;
    }
    &:before {
      transform: rotate(45deg);
      top: 0;
    }
  }
`;

export default function BurgerButton() {
  return (
    <>
      <Outer id="main-menu-button">
        <Lines />
      </Outer>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function init() {
            let isOpen = false;

            const btn = document.querySelector("#main-menu-button");
            const menu = document.querySelector("#main-menu");
            const menuActions = document.querySelector("#main-menu-actions");
            console.log(btn, menu, menuActions);

            // Toggle menu on button click
            btn.addEventListener("click", function () {
              isOpen = !isOpen;
              render();
            });

            // Close the menu on click on links inside the menu
            function hideMenu() {
              isOpen = false;
              render();
            }
            menu.querySelectorAll("a").forEach(function(link) {
              link.addEventListener("click", hideMenu);
            });

            function render() {
              btn.children[0].classList.toggle('open', isOpen);
              menu.classList.toggle('open', isOpen);
              menuActions.classList.toggle('open', isOpen);
            }
          }());
        `
        }}
      />
    </>
  );
}

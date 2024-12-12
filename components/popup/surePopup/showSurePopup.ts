import { createApp, h } from 'vue';
import SurePopup from './SurePopup.vue';

export function showSurePopup(message: string) {
  if (!import.meta.client) {
    return Promise.reject(new Error("showSurePopup can only be used on the client side."));
  }

  return new Promise<boolean>((resolve) => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    document.body.appendChild(container);

    const appInstance = createApp({
      render() {
        return h(SurePopup, {
          message,
          onAgree: (choice: boolean) => {
            resolve(choice);
            setTimeout(() => {
              appInstance.unmount();
              container.remove();
            }, 100);
          },
        });
      },
    });

    appInstance.mount(container);
  });
}
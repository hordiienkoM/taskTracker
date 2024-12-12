import { createApp, h, type App } from 'vue';
import EditTaskPopup from './EditTaskPopup.vue';
import { TaskStatus } from '~/enum/TaskStatus';
import type { Task } from '~/types/Task';

export function showEditTaskPopup(task: Task) {
  if (!import.meta.client) {
    return Promise.reject(new Error("showCreateTaskPopup can only be used on the client side."));
  }

  return new Promise((resolve) => {
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
        return h(EditTaskPopup, {
          task,
          onCancel: () => {
            resolve(null);
            setTimeout(() => {
              appInstance.unmount();
              container.remove();
            }, 100);
          },
        });
      },
    });

    copySourceAppSettings(appInstance);

    appInstance.mount(container);
  });
}

function copySourceAppSettings(targetApp: App) {
  const sourceApp = useNuxtApp().vueApp;
  Object.entries(sourceApp._context.components).forEach(([name, component]) => {
    targetApp.component(name, component);
  });

  Object.entries(sourceApp._context.provides).forEach(([key, plugin]) => {
    targetApp.provide(key, plugin);
  });

  targetApp.config.globalProperties = sourceApp.config.globalProperties;
}
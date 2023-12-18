# VAutocomplete

Autocomplete c виртуализацией списка

## Что внутри

-   В основе [MUI Autocomplete](https://mui.com/material-ui/react-autocomplete/)
-   Список подгружается один раз при клике на компонент.
-   Для хранения списка комментариев и работы с запросами используется [@reduxjs/toolkit](https://redux-toolkit.js.org/rtk-query/overview)
-   Для виртуализации списка используется [список фиксированного размера](https://react-window.vercel.app/#/examples/list/fixed-size) от `react-window`
-   В качестве API использовен [JSON placeholder](https://jsonplaceholder.typicode.com/comments)
-   Прокт создан при помощи [Vite](https://vitejs.dev/)
-   Сервеный поиск с задержкой через кастомный хук [useDebounse](https://github.com/boorav4ik/v-autocomplete-app/blob/master/src/hooks/useDebounse.ts)

## Запуск

-   Клонироуем репозиторий
-   Устанавливаем зависимости (используем ноду `v20.10.0`)
-   Запускаем сервер разарботки:

```sh
yarn run dev
```

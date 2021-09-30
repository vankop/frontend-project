import { Store } from 'redux';

import { appendById, setForm, setUsers } from './actions';
import { selectChatBlocks, selectUsers } from './selectors';
import { State } from './slices/chat';

const usersKey = 'APP_USERS';
const formKey = 'APP_FORM';
const blockKey = (user: string) => `APP_BLOCK_${user}`;

export default function applyPersistence(store: Store<State>) {
  const usersRaw = localStorage.getItem(usersKey);
  const formRaw = localStorage.getItem(formKey);

  if (usersRaw) {
    const users = JSON.parse(usersRaw);
    store.dispatch(setUsers(users));

    users.forEach((user: string) => {
      const blocksRaw = localStorage.getItem(blockKey(user));

      if (blocksRaw) {
        const blocks = JSON.parse(blocksRaw);
        store.dispatch(appendById(user)(blocks));
      }
    });
  }

  if (formRaw) {
    const form = JSON.parse(formRaw);
    store.dispatch(setForm(form));
  }

  let cleared = false;
  if ('requestIdleCallback' in window) {
    // lazily clear storage
    // @ts-expect-error does not presented in safari
    window.requestIdleCallback(() => {
      if (cleared) return;
      localStorage.clear();
      cleared = true;
    });
  }

  window.addEventListener('beforeunload', () => {
    if (!cleared) {
      localStorage.clear();
      cleared = true;
    }

    const state = store.getState();
    const users = selectUsers(state);
    const { form } = state;

    localStorage.setItem(usersKey, JSON.stringify(users));
    localStorage.setItem(formKey, JSON.stringify(form));

    users.forEach((user) => {
      localStorage.setItem(blockKey(user), JSON.stringify(selectChatBlocks(user)(state)));
    });
  });
}

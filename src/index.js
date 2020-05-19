import data from './default.json';

const convertUsers = (data) => data
    .filter((user) => user.parentId === 0)
    .map((user) => {
      const children = data.filter((child) => child.parentId === user.id);
      return { children, showChildren: true, ...user };
    });

const app = () => {
  let state = {
    users: convertUsers(data),
    isActive: false,
  };

  const handle = (user) => {
      state.users[state.users.indexOf(user)].showChildren = !user.showChildren;
      render(state);
  };

  const input = document.querySelector('input');
  input.addEventListener('click', () => {
    state = {
      ...state,
      isActive: !state.isActive,
    };
    render(state);
  });

  const renderList = (user, isChildren, tableElement, isActive) => {
    if (isActive && !user.isActive) {
      return;
    }

    const trElement = document.createElement('tr');

    if (user.children) {
      trElement.innerHTML = isChildren ? '&or;' : '>';
    }

    trElement.addEventListener('click', (e) => {
            e.preventDefault();
            handle(user);
          });

    Object.keys(user).forEach((key) => {
      if (key === 'children' || key === 'showChildren') {
        return;
      }
      const tdElement = document.createElement('td');
      tdElement.innerText = user[key];
      trElement.appendChild(tdElement);
    });
    tableElement.appendChild(trElement);
  }

  const render = ({ users, isActive }) => {
    const tableElement = document.querySelector('table');
    tableElement.innerHTML = '';

    users
      .forEach((user) => {
        if (isActive && !user.isActive) {
          return;
        }

        if (user.showChildren) {
          const dfs = (tree) => {
            const { children } = tree;

            renderList(tree, true, tableElement, isActive);

            if (!children) {
              return;
            }
            children.map(dfs);
          };
          dfs(user);
        } else {
          renderList(user, false, tableElement, isActive);
        }
      });
  };

  render(state);
};

app();

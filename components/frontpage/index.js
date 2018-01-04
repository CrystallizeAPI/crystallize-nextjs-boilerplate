import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from '../header';

const H1 = styled.h1`
  text-align: center;
  padding: 10vh 20px;
  background-color: #bbb;
  color: #fff;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Todos = styled.ol`
  display: block;
  max-width: 400px;
  margin: 0 auto;
`;

const Todo = styled.li`
  display: block;
  margin-top: 5px;
`;

export default class FrontPage extends React.PureComponent {
  static propTypes = {
    shopName: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        completed: PropTypes.bool
      })
    ).isRequired
  };

  render() {
    const { todos, shopName } = this.props;

    return (
      <Fragment>
        <Header shopName={shopName} />
        <main>
          <H1>Welcome to your Crystallize shop!</H1>

          <Todos>
            Todos:
            {todos.splice(0, 10).map(todo => (
              <Todo key={todo.id}>
                <input type="checkbox" checked={todo.completed} readOnly />
                {todo.title}
              </Todo>
            ))}
          </Todos>
        </main>
      </Fragment>
    );
  }
}

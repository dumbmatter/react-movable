import * as React from 'react';
import { List, arrayMove, arrayRemove } from '../src/index';

const initialState = {
  items: [
    'You can remove items by moving them far left or right. Also, onChange always gives you the getBoundingClientRect of the dropped item.',
    'Note, that newIndex = -1 means that item is out of bounds and should be removed.',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]
};

class RemovableByMove extends React.Component<{}, { items: string[] }> {
  state = initialState;
  render() {
    return (
      <div
        style={{
          maxWidth: '300px',
          margin: '0px auto',
          backgroundColor: '#F7F7F7',
          padding: '3em',
          textAlign: 'center'
        }}
      >
        <List
          removableByMove
          values={this.state.items}
          onChange={({ oldIndex, newIndex, targetRect }) => {
            console.log(oldIndex, newIndex, targetRect);
            this.setState((prevState: { items: string[] }) => ({
              items:
                newIndex === -1
                  ? arrayRemove(prevState.items, oldIndex)
                  : arrayMove(prevState.items, oldIndex, newIndex)
            }));
          }}
          renderList={({ children, props, isDragged }) => (
            <ul
              {...props}
              style={{
                padding: '0em 0em 1em 0em',
                cursor: isDragged ? 'grabbing' : undefined
              }}
            >
              {children}
            </ul>
          )}
          renderItem={({
            value,
            props,
            isDragged,
            isSelected,
            isOutOfBounds
          }) => (
            <li
              {...props}
              style={{
                ...props.style,
                padding: '1.5em',
                textAlign: 'left',
                margin: '0.5em 0em',
                listStyleType: 'none',
                cursor: isDragged ? 'grabbing' : 'grab',
                border: '2px solid #CCC',
                boxShadow: '3px 3px #AAA',
                color: '#333',
                borderRadius: '5px',
                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                backgroundColor:
                  isDragged || isSelected
                    ? isOutOfBounds
                      ? '#F08080'
                      : '#EEE'
                    : '#FFF'
              }}
            >
              {value}
            </li>
          )}
        />
        <button onClick={() => this.setState(initialState)}>Reset</button>
      </div>
    );
  }
}

export default RemovableByMove;

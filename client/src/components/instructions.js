import React, { Component } from 'react';

// https://reactjs.co/tutorials/react-convention/reorder-an-item-on-the-dashboard-list-(pure-react-drag-and-drop-example)/

class Instructions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      draggedItemIndex: null,
    };
  }

  handleOnDragStart = (event) => {
    this.setState({ draggedItemIndex: event.target.value });
  }

  handleOnDragOver = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move'; // Datatransfer object
  }

  handleOnDrop = (event) => {
    const droppedItemId = event.currentTarget.value;
    this.props.reorderItem(
      this.props.stateKey,
      this.state.draggedItemIndex,
      droppedItemId,
    );
    this.setState({ draggedItemIndex: null });
  }

  render() {
    const render = [];
    this.props.Instructions.forEach((i, idx) => {
      render.push(
        <button
          className="inputtedInstruction"
          draggable="true"
          key={i}
          onClick={() => this.props.onButtonInsDelete(this.props.stateKey, idx)}
          onDragOver={this.handleOnDragOver}
          onDragStart={this.handleOnDragStart}
          onDrop={this.handleOnDrop}
          type="button"
          value={idx}
        >{`${idx + 1}: ${i}`}
        </button>,
      );
    });
    return render;
  }
}

export default Instructions;

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import wrapInTestContext from '../test/wrapInTestContext';
import Tile from './tile';

describe('Tile', () => {
  it('can be tested independently', () => {
    // Obtain the reference to the component before React DnD wrapping
    const OriginalTile = Tile.DecoratedComponent;

    // Stub the React DnD connector functions with an identity function
    const identity = x => x;

    // Render with one set of props and test
    let root = TestUtils.renderIntoDocument(
      <OriginalTile
        name="test"
        connectDragSource={identity}
        isDragging={false}
        letter={'A'}
      />
    );
    let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('1');
    expect(div.style.display).toEqual('flex');

    // Render with another set of props and test
    root = TestUtils.renderIntoDocument(
      <OriginalTile
      name="test"
      connectDragSource={identity}
      letter={'A'}
      isDragging />
    );
    div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('0.4');
    expect(div.style.display).toEqual('flex');
  });

  it('can be tested with the testing backend', () => {
    // Render with the testing backend
    const TileContext = wrapInTestContext(Tile);
    const root = TestUtils.renderIntoDocument(<TileContext name="test" letter={'A'} />);

    // Obtain a reference to the backend
    const backend = root.getManager().getBackend();

    // Check that the opacity is 1
    let div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('1');
    expect(div.style.display).toEqual('flex');

    // Find the drag source ID and use it to simulate the dragging state
    const tile = TestUtils.findRenderedComponentWithType(root, Tile);
    backend.simulateBeginDrag([tile.getHandlerId()]);

    // Verify that the div changed its opacity
    div = TestUtils.findRenderedDOMComponentWithTag(root, 'div');
    expect(div.style.opacity).toEqual('0.4');
    expect(div.style.display).toEqual('flex');
  });
});

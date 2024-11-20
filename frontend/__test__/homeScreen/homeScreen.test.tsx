import React from 'react';
import renderer from 'react-test-renderer';
import { describe, expect, test } from '@jest/globals';
import { HomeScreen } from '../../src/screens/home/home';

describe('Home screen', () => {
  test('Test that image is on home screen', () => {
    // ARRANGE
    // Using any since its irrelevant and this avoids type checks
    // (this avoids needing to instantiate a real navigation object)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockNavigation: any = null;

    // ACT
    let root;
    renderer.act(() => {
      root = renderer.create(<HomeScreen navigation={mockNavigation} />);
    });

    // ASSERT
    root.root.findByType('Image'); // This will throw an error if there is not exactly one image, so we know the image was rendered if the test succeeds
    expect(root.root.findByType('Text').props.children).toBe('Dummy page');
  });
});

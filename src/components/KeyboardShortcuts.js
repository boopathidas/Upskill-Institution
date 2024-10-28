import React, { useEffect } from 'react';
import Mousetrap from 'mousetrap';

const KeyboardShortcuts = () => {
  useEffect(() => {
    Mousetrap.bind('ctrl+f', () => {
      alert('Search triggered');
    });

    return () => {
      Mousetrap.unbind('ctrl+f');
    };
  }, []);

  return (
    <div>
      Press "Ctrl+F" to trigger search.
    </div>
  );
};

export default KeyboardShortcuts;

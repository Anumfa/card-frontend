import React, { useState } from 'react';
import Envelope from './Envelope';
import ScrollableInvite from './ScrollableInvite';

const WeddingCard = () => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="w-full min-h-screen bg-black">
      {!isOpened ? (
        <Envelope onOpen={() => setIsOpened(true)} />
      ) : (
        <ScrollableInvite />
      )}
    </div>
  );
};

export default WeddingCard;

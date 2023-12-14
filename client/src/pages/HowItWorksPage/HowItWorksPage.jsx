import React from 'react';

import { HowItWorksProvider } from '../../context/HowItWorksContext/HowItWorksContext';
import HowItWorks from '../../components/HowItWorks/HowItWorks';

const HowItWorksPage = () => {
  return (
    <HowItWorksProvider>
      <HowItWorks />
    </HowItWorksProvider>
  )
};

export default HowItWorksPage;

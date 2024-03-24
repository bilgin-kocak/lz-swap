import { useEffect } from 'react';
import { Layout } from 'src/Layout';
import {
  FeatureCards,
  PoweredBy,
  WelcomeScreen,
  Widgets,
  AccordionFAQ,
} from 'src/components';
import { useCookie3, useInitUserTracking } from 'src/hooks';

import { Snackbar, SupportModal } from 'src/components';
import { AppProvider } from 'src/providers';
import type { FaqMeta } from 'src/types';
const faqmeta: FaqMeta[] = [
  {
    id: 2,
    attributes: {
      Question: 'What is a credit score?',
      Answer: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'A credit score is a three-digit number that represents your creditworthiness.'
            },
          ]
        }
      ],
      createdAt: '2021-09-13T10:51:36.000Z',
      updatedAt: '2021-09-13T10:51:36.000Z',
      publishedAt: null,
      displayOnBlogPage: true,
    },
  } 
  
];  // This is a mock data for the FAQ section

const content = {
  content: faqmeta,
}

export const Homepage = () => {
  const { initTracking } = useInitUserTracking();
  const cookie3 = useCookie3();

  useEffect(() => {
    initTracking({});
    cookie3?.trackPageView();
  }, [cookie3, initTracking]);

  return (
    <AppProvider>
      <Layout hideNavbarTabs={false} redirectToLearn={false}>
        <WelcomeScreen />
        <Widgets />
        {/* <FeatureCards /> */}
        <Snackbar />
        <SupportModal />
        {/* <PoweredBy fixedPosition={true} /> */}
        <AccordionFAQ content={faqmeta}  />

      </Layout>
    </AppProvider>
  );
};

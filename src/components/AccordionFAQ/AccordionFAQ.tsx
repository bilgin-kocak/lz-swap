import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Divider, IconButton, useTheme } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContainer as Container,
  QAJsonSchema,
} from 'src/components';
import Fade from '@mui/material/Fade';
import { AccordionSlots } from '@mui/material/Accordion';

import type { FaqMeta } from 'src/types';
// import Faq from "react-faq-component";

interface AccordionFAQProps {
  content: FaqMeta[];
}

const data = {
  title: "FAQ (How it works)",
  rows: [
      {
          title: "Lorem ipsum dolor sit amet,",
          content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
            ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
            In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
            Fusce sed commodo purus, at tempus turpis.`,
      },
      {
          title: "Nunc maximus, magna at ultricies elementum",
          content:
              "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
      },
      {
          title: "Curabitur laoreet, mauris vel blandit fringilla",
          content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
          Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
          Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
          Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
          title: "What is the package version",
          content: <p>current version is 1.2.1</p>,
      },
  ],
};

const styles = {
  // bgColor: 'white',
  titleTextColor: "blue",
  rowTitleColor: "blue",
  // rowContentColor: 'grey',
  // arrowColor: "red",
};

const config = {
  // animate: true,
  // arrowIcon: "V",
  // tabFocus: true
};

export const AccordionFAQ = ({ content }: AccordionFAQProps) => {
  console.log('content', content)
  const theme = useTheme();
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const handleShowMore = () => {
    setShow(!show);
  };
  const [expanded, setExpanded] = useState(false);
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return !!content?.length ? (
    <Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onClick={() => setShow(!show)}
      >
        <Typography variant="lifiHeaderMedium" m={theme.spacing(2, 0)}>
          {t('blog.faq')}
        </Typography>
        <IconButton
          sx={{
            width: 42,
            height: 42,
            color:
              theme.palette.mode === 'dark'
                ? theme.palette.white.main
                : 'currentColor',
          }}
          onClick={handleShowMore}
        >
          <ExpandMoreIcon sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Box>
    
      {content?.map((el: FaqMeta, index: number) => (
        <Accordion key={`faq-item-${index}`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography variant="lifiBodyMediumStrong">
              {el.attributes.Question}
            </Typography>
          </AccordionSummary>
          <Divider
            sx={{
              ...(theme.palette.mode === 'dark' && {
                borderColor: theme.palette.grey[200],
              }),
            }}
          />
          <AccordionDetails sx={{ '& > img': { width: '100%' } }}>
            <BlocksRenderer content={el.attributes.Answer} />
          </AccordionDetails>
        </Accordion>
      ))}
      <QAJsonSchema data={content} />
      
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography >What is LZswap?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          LZswap enables cross-chain swaps. LZswap provides you with the chain where the best price is available from your current chain.
          </Typography>
        </AccordionDetails>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography >How to use LZswap?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Simply choose the token you want to swap on the other Section. No need to choose a chain. LZswap will find the best price across networks for you. Swap between networks as if you were on a single network.
          </Typography>
        </AccordionDetails>

        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography >Why are we building on LayerZero?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          LayerZero is an omnichain interoperability protocol that allows for seamless communication and interaction between different blockchain networks. It eliminates the need for intermediary mechanisms and wrapping assets, thus saving users time and fees. With LayerZero, apps on different chains can communicate without any hassle, and it has the potential to revolutionize the DeFi space.
          </Typography>
        </AccordionDetails>


      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Default transition using Collapse</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion key={`faq-item-1`}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel1a-content`}
            id={`panel1a-header`}
          >
            <Typography variant="lifiBodyMediumStrong">
              dasdasdasd
            </Typography>
          </AccordionSummary>
      </Accordion>
          
    </Container>
  ) : null;
};

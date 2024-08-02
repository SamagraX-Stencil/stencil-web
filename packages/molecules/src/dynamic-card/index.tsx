import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import React from 'react';
import { ResultCard } from '../result-card/index';
type OuterAccordion = {
  title: string;
  date: string;
  index: number;
};
interface CardProps {
  key?: string | number;
  bgcolor?: string;
  textColor?: string;
  name?: string;
  secondaryText?: string;
  onButtonClick?: () => void;
  buttonText?: string;
  buttonVariant?: 'text' | 'outlined' | 'contained';
  buttonStyle?: SxProps<Theme> | undefined;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  icon?: string;
  InfoCard?: React.ReactNode;
  isAccordion?: boolean;
}
type Props = {
  outerAccordion: OuterAccordion;
  results: CardProps[];
  InfoCard: (props: CardProps) => React.ReactNode;
};

const DynamicCard = ({ outerAccordion, results, InfoCard }: Props) => {
  return (
    <Accordion key={outerAccordion.title}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          cursor: 'pointer',
          width: '100%',
          marginTop: '14px',
          borderRadius: '8px',
          boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
          backgroundColor: 'var(--successSecondary)',
          border: 'none',
          maxHeight: '64px',
        }}
      >
        <Box display={'flex'} flexDirection={'column'}>
          <Typography fontSize={'16px'} color={'#06753C'} fontWeight={600}>
            {outerAccordion.title}
          </Typography>
          <Typography fontSize={'10px'} color={'#06753C'}>
            आकलन : {outerAccordion.date}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: 'var(--successSecondary)',
        }}
      >
        {results?.length &&
          results?.map((el: any) => {
            return (
              <ResultCard
                key={el?.competency_id}
                bgcolor={
                  el?.grade == 'Passed' ? 'var(--successSecondary)' : 'var(--failureSecondary)'
                }
                icon={el?.track === 'Hindi' ? '/hindiIcon.svg' : '/mathIcon.svg'}
                textColor={el?.grade == 'Passed' ? 'var(--success)' : 'var(--failure)'}
                name={el?.track === 'Hindi' ? 'कहानी आधारित प्रश्न' : 'गणित के प्रश्न'}
                buttonText={`${el?.results?.scored}/${el?.results?.max_score} सही`}
                buttonStyle={{
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: el?.grade == 'Passed' ? 'var(--success)' : 'var(--failure)',
                  '&:hover': {
                    backgroundColor: el?.grade == 'Passed' ? 'var(--success)' : 'var(--failure)',
                  },
                }}
                InfoCard={<InfoCard />}
                isAccordion
              />
            );
          })}
      </AccordionDetails>
    </Accordion>
  );
};

export default DynamicCard;

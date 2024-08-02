import { Backdrop, Box, Typography, LinearProgress } from '@mui/material';
import React, { ReactElement } from 'react';
// import ResultCard from "../Card/ResultCard";

type ButtonProps = {
  text: string;
  onClick: () => void;
};

type ResultCardProps = {
  rightAnswer: number;
  total: number;
  wrongAnswer: number;
};

type Props = {
  isBackdrop?: boolean;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  title?: string;
  description?: string;
  primaryButton?: ReactElement<ButtonProps>;
  secondaryButton?: ReactElement<ButtonProps>;
  showStudyBird?: boolean;
  showResultSection?: boolean;
  progressValue?: number;
  resultValue?: string;
  resultCardData?: ResultCardProps;
  resultDescription?: string;
};

const ExamSection = ({
  isBackdrop = false,
  image,
  imageWidth = 98,
  imageHeight = 98,
  title,
  description,
  primaryButton,
  secondaryButton,
  showStudyBird = false,
  showResultSection = false,
  progressValue,
  resultValue,
  //   resultCardData,
  resultDescription,
}: Props) => {
  const content = (
    <Box textAlign="center" mt="26px">
      {image && <img src={image} width={imageWidth} height={imageHeight} alt="study" />}

      {showResultSection ? (
        <>
          <Box width="227px" margin="auto" mt="20px">
            <LinearProgress value={progressValue} />
            <Typography
              fontWeight={600}
              fontSize="36px"
              lineHeight="47px"
              mt="16px"
              color="#30347F"
            >
              {resultValue}
            </Typography>
          </Box>
          {/* {resultCardData && <ResultCard {...resultCardData} />} */}
          <Typography
            fontSize="20px"
            color="#5E5D5C"
            mt="24px"
            maxHeight="337px"
            lineHeight="26px"
            px={1}
          >
            {resultDescription}
          </Typography>
        </>
      ) : (
        <Box textAlign="center" maxWidth="276px" margin="16px auto">
          <Typography
            fontSize="28px"
            fontWeight={600}
            lineHeight="32px"
            color={isBackdrop ? 'inherit' : '#2F3293'}
          >
            {title}
          </Typography>
          <Typography
            fontSize="20px"
            lineHeight="24px"
            color={isBackdrop ? 'inherit' : '#7D7B7B'}
            mt="12px"
          >
            {description}
          </Typography>
        </Box>
      )}

      {showStudyBird && (
        <Box display="flex" justifyContent="right" mt="187px">
          <img src="/study-bird.png" width={127} height={120} alt="study" />
        </Box>
      )}

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={1}
        sx={{
          position: 'fixed',
          right: '0',
          bottom: '2rem',
          width: '100%',
        }}
      >
        {primaryButton}
        {secondaryButton}
      </Box>
    </Box>
  );

  return isBackdrop ? <Backdrop open={true}>{content}</Backdrop> : content;
};

export default ExamSection;

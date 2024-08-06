import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

type Props = {
  total: number;
  rightAnswer: number;
  wrongAnswer: number;
};

const ResultCard = ({ rightAnswer, total, wrongAnswer }: Props) => {
  return (
    <Box
      border={'2px solid #2F3293'}
      borderRadius={'6px'}
      mt={'24px'}
      mx={'12px'}
      boxShadow={'0px 1px 6px 0px #30347F'}
    >
      <Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          margin={'16px 25px'}
        >
          <Typography fontWeight={600} fontSize={'20px'}>
            कुल शब्द
          </Typography>
          <Divider
            sx={{
              borderColor: '#8499F5',
              borderWidth: 1,
              margin: '20px auto', // adjust the margin to center the divider
              width: '37px', // adjust the width to your liking
            }}
          />
          <Typography fontWeight={600} fontSize={'20px'}>
            {total}
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: '#E1EAFE',
            borderWidth: 1,
            margin: '16px 25px',
            width: '90%', // adjust the width to your liking
          }}
        />
      </Box>
      <Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          margin={'16px 25px'}
        >
          <Typography fontWeight={600} fontSize={'20px'} color={'#009045'}>
            सही शब्द
          </Typography>
          <Divider
            sx={{
              borderColor: '#8499F5',
              borderWidth: 1,
              margin: '20px auto', // adjust the margin to center the divider
              width: '37px', // adjust the width to your liking
            }}
          />
          <Typography fontWeight={600} fontSize={'20px'} color={'#009045'}>
            {rightAnswer}
          </Typography>
        </Box>
        <Divider
          sx={{
            borderColor: '#E1EAFE',
            borderWidth: 1,
            margin: '16px 25px',
            width: '90%',
          }}
        />
      </Box>
      <Box>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          margin={'16px 25px'}
        >
          <Typography fontWeight={600} fontSize={'20px'} color={'#C53D3D'}>
            ग़लत शब्द
          </Typography>
          <Divider
            sx={{
              borderColor: '#8499F5',
              borderWidth: 1,
              margin: '20px auto',
              width: '37px',
            }}
          />
          <Typography fontWeight={600} fontSize={'20px'} color={'#C53D3D'}>
            {wrongAnswer}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultCard;

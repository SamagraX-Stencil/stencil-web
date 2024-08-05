import React, { useCallback } from 'react';
import { Box, Button, Container, Grid, IconButton, Link, Paper, styled } from '@mui/material';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { includes } from 'lodash';
import { useConfig } from '../../hooks/useConfig';
import { useColorPalates } from '../../providers/theme-provider/hooks';
import { useLocalization } from '../../hooks';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#363A44',
  borderRadius: '12px',
  position: 'relative',
}));
const OptionSelector = (props: any) => {
  const t = useLocalization();
  const config = useConfig('component', 'optionSelectorPage');
  const theme = useColorPalates();
  const [activeElements, setActiveElements] = React.useState<Array<any>>([]);

  const onItemClick = useCallback(
    (item: any) => () => {
      if (
        activeElements.length == (config?.optionSelectLength ?? 4) &&
        !activeElements?.includes(item?.id)
      ) {
        alert(`You can select only ${config?.optionSelectLength ?? 4} items`);
        return;
      }
      setActiveElements((prev) =>
        prev?.includes(item?.id) ? prev?.filter((i) => i !== item?.id) : [...prev, item?.id]
      );
    },
    [activeElements, config?.optionSelectLength]
  );

  const selectedLabels = activeElements
    .map((id) => {
      const commodity = props?.commodityList?.find((v: any) => v.id === id);
      return commodity ? commodity.name : null;
    })
    .filter((name) => name !== null);

  return (
    <Container className="p-2">
      <div className="d-flex pt-2 align-items-center justify-content-center">
        <IconButton
          data-testid="option-selector-back-button"
          aria-label="fingerprint"
          style={{
            height: '40px',
            width: '40px',
            borderRadius: '12px',
            border: '1px solid #E8ECF4',
          }}
          onClick={props?.handleBack}
        >
          <ArrowBackIosNewRoundedIcon />
        </IconButton>
        <div className="text-center w-100 pr-4">
          <p
            data-testid="option-selector-title"
            style={{
              fontWeight: '500',
              fontSize: '28px',
              color: theme?.primary?.main,
              margin: 0,
            }}
          >
            {t(`label.choose_${props?.commodityType}`)}
          </p>
        </div>
      </div>

      <div className="text-center mt-4">
        <p
          style={{ color: '#51586B', fontSize: '20px', margin: 0 }}
          data-testid="option-selector-description"
        >
          {t(`label.select_${props?.commodityType}_from_below`)}
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '60dvh',
            overflow: 'auto',
          }}
        >
          <Grid
            container
            spacing={{ xs: 1, sm: 6, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
            style={{ marginTop: '10px' }}
            data-testid="option-selector-list"
          >
            {props?.commodityList?.map((commodity: any) => (
              <Grid item xs={1} sm={2} md={3} key="">
                <Item
                  onClick={onItemClick(commodity)}
                  style={{
                    border: includes(activeElements, commodity?.id)
                      ? `1px solid ${theme?.primary?.main}`
                      : '1px solid #B0B0B0',
                    height: '130px',
                    boxShadow: 'none',
                    padding: '5px',
                  }}
                >
                  {includes(activeElements, commodity?.id) && (
                    <div
                      className="rounded-circle position-absolute "
                      style={{
                        width: '20px',
                        height: '20px',
                        top: '0px',
                        left: '75%',
                      }}
                    >
                      <CheckCircleRoundedIcon color="success" />
                    </div>
                  )}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      overflow: 'hidden',
                      borderRadius: '50%',
                      margin: 'auto',
                    }}
                  >
                    <img src={commodity?.image} height="100%" width="100%" alt="" />
                  </div>
                  <p
                    style={{
                      fontSize: '16px',
                      wordWrap: 'break-word',
                    }}
                    className="mt-2 mb-0"
                  >
                    {localStorage.getItem('locale') === 'en'
                      ? commodity?.name
                      : commodity.translation}
                  </p>
                </Item>
              </Grid>
            ))}
          </Grid>
        </div>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            data-testid="option-selector-continue-button"
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              !(
                activeElements.length <= (config?.optionSelectLength ?? 4) &&
                activeElements.length > 0
              )
            }
            sx={{
              textTransform: 'none',
              mt: 2,
              width: '80%',
              height: '60px',
              fontSize: '16px',
              p: 1,
              background: theme?.primary?.main,
              borderRadius: '10px',
            }}
            onClick={() => {
              props?.setOnboardingData((prev: any) => ({
                ...prev,
                preferences: [
                  ...(prev?.preferences ?? []),
                  {
                    commodityType: props?.commodityType,
                    commodityValues: [...selectedLabels],
                  },
                ],
              }));
              props?.handleNext();
            }}
            endIcon={<ArrowForwardIcon />}
          >
            {t('label.continue')}
          </Button>
          <Link
            data-testid="option-selector-skip"
            component="button"
            variant="body2"
            onClick={props?.handleNext}
            className="mt-2"
            sx={{ fontSize: '16px', color: '#6D6D6D', textDecoration: 'none' }}
          >
            {t('label.skip_for_now')}
          </Link>
        </Box>
      </div>
    </Container>
  );
};

export default OptionSelector;

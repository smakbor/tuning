import React, { useEffect, useState } from 'react';

import ReactApexCharts from 'react-apexcharts';

import moment from 'moment';
import useAuth from 'hooks/useAuth';
import { useGetCreditsQuery, useGetSubscriptionQuery } from 'api/service/subscription.service';
import {
  useCurrentMonthDownloadCountQuery,
  useCurrentYearDownloadCountQuery,
  useMonthlyFileDownloadQuery,
  useTodayDownloadCountQuery,
  useWeeklyFileDownloadQuery
} from 'api/service/dashboard.service';
import { useGetProfileQuery } from 'api/service/profile.service copy';
import { useGetEvcBalanceQuery } from 'api/service/evc.service';
import { Box, Grid, Stack, Typography } from '@mui/material';
import MainCard from 'components/MainCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

function Dashboard() {
  const { dbUserId } = useAuth();

  //rtk queries
  const { data: credits = [] } = useGetCreditsQuery(dbUserId, {
    skip: !dbUserId
  });
  const { data: subscriptions = [] } = useGetSubscriptionQuery(dbUserId, {
    skip: !dbUserId
  });

  const { data: monthlyDownloadStatistics } = useMonthlyFileDownloadQuery(
    { dbUserId, year: moment().year() },
    {
      skip: !dbUserId
    }
  );

  const { data: weeklyDownloadStatistics } = useWeeklyFileDownloadQuery(dbUserId, {
    skip: !dbUserId
  });
  const { data: currentMonthDownloadCount } = useCurrentMonthDownloadCountQuery(dbUserId, {
    skip: !dbUserId
  });
  const { data: currentYearDownloadCount } = useCurrentYearDownloadCountQuery(dbUserId, {
    skip: !dbUserId
  });
  const { data: todayDownloadCount } = useTodayDownloadCountQuery(dbUserId, {
    skip: !dbUserId
  });

  const { data: profile } = useGetProfileQuery(dbUserId, {
    skip: !dbUserId
  });

  const { data: evcBalance, isSuccess } = useGetEvcBalanceQuery(profile?.evcNumber, {
    skip: !profile?.evcNumber
  });

  const [seriesData, setSeriesData] = useState({
    series: [
      {
        name: 'New File',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  });

  const chartOptions = {
    chart: {
      id: 'apexchart',
      height: 350,

      zoom: {
        enabled: false
      }
    },

    title: {
      text: 'New File Count'
    },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  };

  useEffect(() => {
    {
      if (monthlyDownloadStatistics) {
        setSeriesData({
          series: [
            {
              name: 'Download File',
              data: monthlyDownloadStatistics.map((item) => item.scriptCount)
            }
          ]
        });
      }
    }
  }, [monthlyDownloadStatistics]);

  const cardData = [
    {
      title: 'Today',
      fileCount: todayDownloadCount?.todayCount || 0,
      title2: 'Yesterday',
      fileCount2: todayDownloadCount?.yesterdayCount || 0,
      title3: 'Last Year',
      fileCount3: currentYearDownloadCount?.previousYearCount || 0
    },
    {
      title: 'This Week',
      fileCount: weeklyDownloadStatistics?.currentWeek || 0,
      title2: 'Previous Week',
      fileCount2: weeklyDownloadStatistics?.previousWeek || 0,
      title3: 'Previous Year',
      fileCount3: currentYearDownloadCount?.previousYearCount || 0
    },
    {
      title: 'This Month',
      fileCount: currentMonthDownloadCount?.currentMonthCount || 0,
      title2: 'Previous Month',
      fileCount2: currentMonthDownloadCount?.previousMonthCount || 0,
      title3: 'Previous Year',
      fileCount3: 0,
      creditSpendTitle: 'Credit Spend',
      creditSpend: currentYearDownloadCount?.previousYearCount || 0
    },
    {
      title: 'This Year',
      fileCount: currentYearDownloadCount?.currentYearCount || 0,
      title2: 'Previous Year',
      fileCount2: currentYearDownloadCount?.previousYearCount || 0,
      title3: 'Last Two Years',
      fileCount3: currentYearDownloadCount?.previousTwoYearCount || 0,
      creditSpendTitle: 'Credit Spend',
      creditSpend: 0
    }
  ];

  return (
    <Grid container sx={{ padding: '1rem' }}>
      <Grid item md={12}>
        <Box sx={{ marginBottom: '1rem' }}>
          <Typography variant="h4">Dashboard</Typography>
        </Box>

        <div className="main-content">
          {subscriptions.length === 0 && credits[0]?.credits < 5 && (
            <div className="bg-white p-3 rounded font-bold" style={{ color: 'red', fontWeight: 'bold' }}>
              <span className="uppercase">Warning</span> You have only {credits[0]?.credits} credit left
            </div>
          )}
          {isSuccess && evcBalance?.status !== 'ok' && (
            <div className="bg-white p-3 mt-1 rounded font-bold" style={{ color: 'red', fontWeight: 'bold' }}>
              <span className="uppercase">Warning</span> Something is wrong with your evc number
            </div>
          )}
          {/* <Grid container sx={{ marginTop: '1rem', marginBottom: '1rem' }} spacing={2}>
            {cardData.map((item) => {
              return (
                <Grid item key={item.title} md={3} lg={4}>
                  <MainCard title={item.title}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h4">{item.fileCount} Files</Typography>
                      {item.creditSpend && (
                        <Typography variant="h4" style={{ color: '#26a0fc' }}>
                          {item.creditSpend} Credits
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4">{item.title2}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', marginTop: '.3rem' }}>
                        <Typography variant="h4">{item.fileCount2} Files &nbsp;</Typography>
                        <Box sx={{ marginTop: '.2rem' }}>
                          <ArrowForwardIcon />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="h4">{item.title3}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', marginTop: '.3rem' }}>
                        <Typography variant="h4">{item.fileCount3} Files &nbsp;</Typography>
                        <Box sx={{ marginTop: '.2rem' }}>
                          <ArrowForwardIcon />
                        </Box>
                      </Box>
                    </Box>
                  </MainCard>
                </Grid>
              );
            })}
          </Grid> */}
          <Grid container rowSpacing={2} columnSpacing={2} sx={{ marginBottom: '1.5rem' }}>
            {cardData.map((item) => {
              return (
                <>
                  <Grid item lg={3}>
                    <MainCard contentSX={{ p: 2 }}>
                      <Grid container spacing={4} sx={{ marginBottom: '.4rem' }}>
                        <Grid item lg={8}>
                          <Typography variant="h5" color="textSecondary">
                            {item.title}
                          </Typography>
                        </Grid>

                        <Grid item lg={4} alignSelf="flex-end">
                          <Typography variant="h5" color="textSecondary">
                            {item.fileCount} Files
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={4} sx={{ marginBottom: '.4rem' }}>
                        <Grid item lg={8}>
                          <Typography variant="h5" color="textSecondary">
                            {item.title2}
                          </Typography>
                        </Grid>
                        <Grid item lg={4} alignSelf="flex-end">
                          <Typography variant="h5" color="textSecondary">
                            {item.fileCount2} Files
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={4} sx={{ marginBottom: '.4rem' }}>
                        <Grid item lg={8}>
                          <Typography variant="h5" color="textSecondary">
                            {item.title3}
                          </Typography>
                        </Grid>
                        <Grid item lg={4} alignSelf="flex-end">
                          <Typography variant="h5" color="textSecondary">
                            {item.fileCount3} Files
                          </Typography>
                        </Grid>
                      </Grid>
                    </MainCard>
                  </Grid>
                </>
              );
            })}
          </Grid>
          <MainCard>
            <ReactApexCharts options={chartOptions} series={seriesData.series} type="bar" height={350} />
          </MainCard>
        </div>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

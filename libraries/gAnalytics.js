// Config
const clientEmail = process.env.CLIENT_EMAIL;
const privateKey = process.env.PRIVATE_KEY.replace(new RegExp('\\\\n'), '\n');
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

// API's
const { google } = require('googleapis');

const analytics = google.analytics('v3');
const viewId = process.env.VIEW_ID;
const jwt = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes,
});

async function getMetric(metric, startDate, endDate, filter) {
  await setTimeout[Object.getOwnPropertySymbols(setTimeout)[0]](
    Math.trunc(1000 * Math.random())
  );

  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: `ga:${viewId}`,
    'start-date': startDate,
    'end-date': endDate,
    metrics: metric,
    filters: filter,
  });

  const res = {};
  res[metric] = {
    value: parseInt(result.data.totalsForAllResults[metric], 10),
    start: startDate,
    end: endDate,
  };
  return res;
}

function parseMetric(metric) {
  let cleanMetric = metric;
  if (!cleanMetric.startsWith('ga:')) {
    cleanMetric = `ga:${cleanMetric}`;
  }
  return cleanMetric;
}

function getData(
  metrics = ['ga:users'],
  startDate = '2020-07-01',
  endDate = 'today',
  filters
) {
  console.log('filters', filters);

  //const gaFilters = [`ga:eventCategory==Post;ga:eventAction==${filters}`;
  console.log('filters', filters);
  const gaFilters = [`ga:eventCategory==Post;ga:eventAction==${filters}`];

  const results = [];
  for (let i = 0; i < metrics.length; i += 1) {
    const metric = parseMetric(metrics[i]);
    const filter = parseMetric(gaFilters[i]);
    results.push(getMetric(metric, startDate, endDate, filter));
  }

  return results;
}

module.exports = {
  getData,
};

//https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A223091788&start-date=30daysAgo&end-date=yesterday&metrics=ga%3AtotalEvents&filters=ga%3AeventCategory%3D%3DPost%3Bga%3AeventAction%3D%3DClapped%20%2FPosts%2Frapid-Prototyping-With-Code&access_token=ya29.a0AfH6SMCQ4AxGd-yP-UHE9wvyXHeUn5WnCdVp9ZaGiNKyXDyTFmt4aYPAJaDp2mgVd57tu1_A6PSYZNi-LAPtqk_WT1dgECXh8vJSZ-I1ZDTeTgRTcO9Z3PBdsw_DO2tDK0gs2DeOuMeyJdV7YX291x4J5Sk6pj_Y9PZe

const { clientEmail, privateKey, viewId } = require('../config/index.js');
const { google } = require('googleapis');
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

const analytics = google.analytics('v3');

const jwt = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes,
});

async function getMetric(metric, startDate, endDate, filter) {
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

function getData(
  postId,
  startDate = '2020-07-01',
  endDate = 'today',
  metric = 'ga:TotalEvents'
) {
  const gaFilters = `ga:eventCategory==Post;ga:eventAction==${postId}`;

  return getMetric(metric, startDate, endDate, gaFilters);
}

module.exports = getData;

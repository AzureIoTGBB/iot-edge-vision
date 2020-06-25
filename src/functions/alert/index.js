module.exports = function (context, req, Alerts) {
  context.log('Preload function called');
  if (!Alerts)
  {
      context.log("Not found");
  }
  else
  {
      context.res = { 
          body: Alerts,
          headers: {
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Origin': req.headers.origin,
              'Access-Control-Allow-Headers': req.headers['access-control-request-headers']
            }
      };
  }
  context.done();
};
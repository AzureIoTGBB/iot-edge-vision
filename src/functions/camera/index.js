module.exports = function (context, req, Cameras) {
  context.log('Preload function called');
  if (!Cameras)
  {
      context.log("Not found");
  }
  else
  {
      context.res = { 
          body: Cameras,
          headers: {
              'Access-Control-Allow-Credentials': 'true',
              'Access-Control-Allow-Origin': req.headers.origin,
              'Access-Control-Allow-Headers': req.headers['access-control-request-headers']
            }
      };
  }

  context.done();
};
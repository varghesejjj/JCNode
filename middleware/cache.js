var memcache = require("memory-cache");

var cache = (duration, condition) => {
  return (req, res, next) => {
    let key = "_Towers_" + req.OriginalUrl || req.url; // ALso check condition over here
    let cachedInfo = memcache.get(key);
    if (cachedInfo) {
      res.send(cachedInfo);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

module.exports = cache;
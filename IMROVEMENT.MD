1. First, we can save result of heavy computation in database.
2. On the backend, use a key-value store in mem database (Reddis for example).
The first computation of a score or best price will be heavy but the result can be cached and retrieve by the next callers. It will reduce latency on this API calls.
3. For static content like hotel name, hotel description etc... we can use SSR if the content is not updated too many times (if more than 1 time per day, it's not worth).
4. We can also use a postgre view for the room booked case
5. Use the cache of the browser or a library like tanstack query to cache data on client side. For hotels, we can put a one hour cache since the data is not being updated a lot.

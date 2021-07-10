# To Do

## general
- [ ] eManifest save/corret/update/delete
- [ ] new manifest object constructor
    - constructor with methods to create new manifest
- [ ] Local session token storage
    - store session tokens insteaed of requesting a new token for each request
- [ ] check if envionment variable exist

## haztrak v2.0
- [ ] manifest UI link arguments to object
- [ ] eManifest Lookup arguments to object
    - convert the multiargument functions to single argument
- [ ] eMansServices argument to object
    - Refactor and create an object wrapper(right word?) for manifest objects
    - object includes
        - MTN
        - action (get, delete, save, update)
        - manifest JSON stringified
        - path to zip attachment
- [ ] Clean up Lookup return objects/arrays
    - convert responses to object type
- [ ] Refactor eManApi.js
    - Need to cut down (hard!) on redundant source code, it's bad

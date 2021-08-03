# To Do

## general
- [ ] eManifest 
	- [x] save
	- [x] corret
	- [x] update
	- [x] delete
	- [ ] Get attachments
	- [ ] Get version attachments
- [ ] new manifest object constructor
    - constructor with methods to create new manifest
	- should check mandatory fields != undefiend before initating
- [ ] Local session token storage
    - store session tokens insteaed of requesting a new token for each request
- [ ] check if envionment variable exist
	- error handling if not

## haztrak v2.0
It looks like haztrak v2.0 will come out without support for 
saving zip attachments for the time being. This was we can focus on 
getting this project somewhere stable and internally consistent. 

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
    - Need to cut down (hard!) on redundant source code

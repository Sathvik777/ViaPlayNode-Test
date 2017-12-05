# Some general notes

### Execution
------------------------
Web form does not work when you try to sumbit something in the text field. 
It makes a GET request to a non existing route and return 404. Nothing happens because there is no error handling

### Modularity and logical structure
------------------------
In general terms it looks ok in terms of structure of the files but code could be better modularised to avoid side-effects and have better readability

### Configuration
------------------------
What is your reasoning behind providing it separately?

### Request clients
------------------------
What is the reasoning behind creating request clients for theMovieDb and Viaplay??

### Promises
------------------------
Native promises make the trick in this code. No needs to use external node libraries with promises that make requests and return promises, etc... Simple is good.
No needs to reinvent the wheel

### Cache
------------------------
No cache has been used or mentioned anywhere.

### Tests
------------------------
Good.

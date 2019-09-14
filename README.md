# google-map-bookmark

Welcome, this React project is dependent on Ruby server services - https://github.com/gkannan1989/google-maps-bookmark-server

Google map for react with search and bookmark CRUD operation using Ruby Rails

<h2>Installation</h2>
<p>
    <b>Step 1: <small>clone the repository</small></b>
    <pre>$ git clone https://github.com/gkannan1989/google-maps-bookmark.git</pre>
</p>
<br />
<p>
    <b>Step 2: <small>install dependencies</small></b>
    <pre>$ cd path/to/google-maps-bookmark
$ npm install</pre>
    <b>Note: after installing packages you need to build dll files</b>
    <pre>$ npm run build:dll</pre>
</p>
<br />
<p>
    <b>Step 3: <small>Add google map api key env</small></b>
    put your google api key in .env
    <pre>GOOGLE_MAP_API_KEY='PUT YOUR GOOGLE API KEY HERE'</pre>
</p>
<br />
<p>
    <b>Step 4: <small>run the project</small></b>
    <br />use bellow command to start the project.
    <pre>$ npm start</pre>
    
   Note: default port is configured as "3001"
       
   Please note: as we are using CRUD operation with cors domains recommending to launch the site using the below commend
       
   Run -> (Window+R) key - 
       
   <pre>chrome.exe --user-data-dir=D:/ChromeDevSession" --disable-web-security --ignore-certificate-errors</pre> 
       
   you can now paste the URL http://localhost:3001 in the launched chrome.
</p>

<br />
<h2>Build</h2>
<p>
    use bellow command to export the project.
    <pre>$ npm run build</pre>
</p>
<br />
<h2>Test</h2>
<p>
    use bellow command to run test cases.
    <pre>$ npm run generate</pre>
</p>
<h2>Docs</h2>
<p>
    to see the components documentation run bellow command
    <pre>$ npm run generate-docs -r app/</pre>
    after generating docs, you can see them in docs directory in projects root
</p>


Guideline Questions
- How do you handle configuration values? What if those values change?
   - In this project, we will have the below environment variables, which drives the entire site third party integration core.
   
     GOOGLE_MAP_API_KEY="<key used for rendering map on client side>" 
	   SERVICE_ENDPOINT="<server endpoint>"
	   SERVICE_PORT="<server port>"
	   SUGGESTION_PATH="<suggestion api>"
	   BOOKMARK_PATH="<bookmark api>"
	   
	 - ultimate goal is to change one place and keep reference everywhere(required). only change on this .env file and restart the application can do the magic :)
   
- What happens if we encounter an error with the third-party API integration?
     - front-end will show the third party server response message(any) or fallback request(any), in some case no response then we can show default error message which configured on front-end.
	 
- Will it also break our application, or are they handled accordingly?
     - Front end is dependent on the back-end in most of the cases, but how ever it should have its own shape and quality to behave independently, in case of server unavailable scenario also we still can show the application with proper user understandable error messages. 

- Now we will need to change the third-party geocoder API to another one. How can we
change our current solution so that we can make this change as seamless as possible? Or
how will we change (or refactor) our solution so that any future changes with the third-party
integration is only done in isolation?
     - We need to change only endpoint configured on the .env file in our case, there are two case, 
	 1. server returns the data(response structure) exactly as returned by third party service, then changes only .env file to point new api do the magic :)
	 2. In case if server returns differnent response structure then we need to write a adaptor which will convert new server response format of data into exiting third party modal data. no code change required only .env to point new enpoint and one adaptor on front-end which can do the magic :)

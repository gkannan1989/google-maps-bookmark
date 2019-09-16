# google-map-bookmark

Welcome, this React project is dependent on Ruby server services - https://github.com/gkannan1989/google-maps-bookmark-server

Google map for react with search and bookmark CRUD operation using Ruby Rails

<img src="https://serving.photos.photobox.com/928950671763f2c6f0bfc94e00b6d7721b91502b59aa77e65e149510b7ac5793bbfe8d6c.jpg" />

<h4>Front End Architecture components</h4>
<p>
React - Front end 
  
Redux + Saga + axios - State management and interacting with Ruby Rails server.

Jest + plop + Enzyme - Test Case, functional, component and snapshot based 

Eslint - Tool for identifying and reporting on patterns found in ECMAScript/JavaScript code,

Styled Components - Styling components 

PropTypes - properties handling 

Webpack - Bundling assets.
</p>


<h4>Backend Architecture components</h4>
<p>
Rails - 6.0.0
  
Bundler - 2.0.2

rack-cors - 1.0.3 - Handling Cors

sqlite3 ~> 1.4 - SQL Lite for DB integration

postgresql - DB for production
</p>

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
       
   <pre>chrome.exe --user-data-dir="D:/ChromeDevSession" --disable-web-security --ignore-certificate-errors</pre> 
       
   make sure your <a href="https://github.com/gkannan1989/google-maps-bookmark-server">google-maps-bookmark-server</a> is running, then you can now paste the URL http://localhost:3001 in the launched chrome.
</p>

<br />
<h2>Build</h2>
<p>
    use bellow command to export the project.
    <pre>$ npm run build</pre>
</p> 
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

<p>
  <p>
<h2> Live demo </h2>
<p> 
  Recommended to launch in web browser chrome by running the below command(because heroku has certification issue with cors CRUD action)
  Open Window+R keys or Open Run task
  <pre>chrome.exe --user-data-dir="D:/ChromeDevSession" --disable-web-security --ignore-certificate-errors </pre>
  <a href="https://google-map-bookmark.herokuapp.com/">Demo</a>
</p> 
</p>


<p>
<b>Features included - v1.0</b>
  
1. google address suggestion - /api/search/suggestion?query=germany
  
2. google address locator - /api/search/suggestion?query=germany

3. address bookmark - /api/v1/bookmark

4. add bookmark history - /api/v1/bookmark

5. edit/update bookmark hitory - /api/v1/bookmark

6. delete bookmark hitory - /api/v1/bookmark

7. error handling on updating bookmark 

8. not allowing user to bookmark more then once

9. user can be present with current location (if they allow location)

10. can move the user to their current location

11. by tapping bookmark user can be moved to their selected bookmarked location

12. unexpected server error handling on front-end

</p>

<b>Guideline Questions</b>

<b>- How do you handle configuration values? What if those values change?</b>

   - In this project, we will have the below environment variables, which drives the entire site third party integration core.
   
         GOOGLE_MAP_API_KEY="<key used for rendering map on client side>" 
         SERVICE_ENDPOINT="<server endpoint>"
         SERVICE_PORT="<server port>"
         SUGGESTION_PATH="<suggestion api>"
         BOOKMARK_PATH="<bookmark api>"
	   
	 - ultimate goal is to change one place and keep reference everywhere(required). only change on this .env file and restart the application can do the magic :)
   
<b>- What happens if we encounter an error with the third-party API integration?</b>

   - front-end will show the third party server response message(any) or fallback request(any), in some case no response then we can show default error message which configured on front-end.
	 
<b>- Will it also break our application, or are they handled accordingly?</b>

   - Front end is dependent on the back-end in most of the cases, but how ever it should have its own shape and quality to behave independently, in case of server unavailable scenario also we still can show the application with proper user understandable error messages. 

<b>- Now we will need to change the third-party geocoder API to another one. How can we
change our current solution so that we can make this change as seamless as possible? Or
how will we change (or refactor) our solution so that any future changes with the third-party
integration is only done in isolation?</b>

   - There are two case, 
         1. server returns the data(response structure) exactly as returned by third party service, then changes only .env file to point new api do the magic :)
         2. In case if server returns differnent response structure then we need to write a adaptor which will convert new server response format of data into exiting third party modal data. no code change required only .env to point new enpoint and one adaptor on front-end which can do the magic :)

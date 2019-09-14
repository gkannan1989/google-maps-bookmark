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

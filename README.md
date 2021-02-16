# CRUD-spfx-react-hooks

CRUD operation Demo using React hooks, context and sp-pnp-js to add edit and delete a custom sharepoint list

1. Build file using npm run build
2. React files are bundled into one single js file called "react-pnp.js"
3. Upload react-pnp.js file to sharepoint Site Assets folder
4. Create a new page on Site Pages ( you can name it anything )
5. edit the page and add this html tag <div id="root"></div>
6. Insert Script Editor to the page
   - Insert > WebPart > Media and Content > Script Editor
7. on Script Editor, Edit Web Part > Edit Snippet
   - add this script tag to refer to your site assets
   <script type="text/javascript" src="your_sharepoint_url/SiteAssets/react-pnp.js"></script>
8. done!   

![image](https://user-images.githubusercontent.com/14894667/108130821-1f0ebf00-7065-11eb-857d-a6273f6c1103.png)

This documentation is divded into two parts: Website structure, then maps. 

The first section covers managing the site by setting up github and forking the project, then understanding the site structure and where to make changes in the files to update maps and text. 

The second section covers using data in TileMill, styling maps, and uploading to your MapBox account. 

# 1. Website Management

### Setting up Github

Setting up a github account will allow LRI to take ownership of the maps and site quickly and efficiently. We are using two branches to separate the maps from the site itself: the **master branch** has all data and TileMill projectsm, while **gh-pages branch** has all site structure. 

To get started:

 - [Create an account](https://github.com/signup/free)
 - [Set up Git](http://help.github.com/mac-set-up-git/)
 - [Generating SSH keys](https://help.github.com/articles/generating-ssh-keys)
 - [Fork a repository](http://help.github.com/fork-a-repo/)

Other: 

 - [Create an organization on github](Create an organization: https://github.com/organizations/new
)


### Forking the project
To use this project as a starting point, [fork the repository](http://help.github.com/fork-a-repo). This will create a new copy of the LRI project on github. Make changes by setting up a local repo by cloning it to the file or directory that you desire, and then from there you can make changes and commit/push them to github. For example, I have a local github folder that I navigate to with `cd Documents/github/` to clone all github projects. Then i navigate into the spcecific project to commit and push changes. 


### gh-pages branch files
-----

    _includes/     Navigation
    _layouts/      Page templates.
    _posts/        Map browser posts, templates for data narrative
    _site/         The static site generated by Jekyll.
    ext            Javascript libraries (non site specific)
    img/           Sprites/images
    README.md      This file.
    _config.yml    Jekyll configuration file.
    index.html     Home page.
    site.css       Site css
    site.js        Site specific JS

## Adding Swipe or Navigation Map

Go into the [map.html](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/_layouts/map.html) document, and find, or create, and if statement to match the section you wish to change. 

For example, if you want to add swipe to the LRI Progress section, find the `{% if page.url == "/progress" %}` section. 

###Swipe 

 1. To add **swipe**, below the "if statement" for the section you want to change, include the following:

 `{% include swipe.html %}` 

 2. Then go into the [_posts](https://github.com/LRI-Mapping/lri-mapping/tree/gh-pages/_posts) file that matches the section you're changing, and include the first swipe layer. For example, in the `_posts/0001-01-01-prevention.md` file, the swipe layer is defined to indicate which layer will show up first on swipe. 


          ---
          layout: map
          firstlayer: 'mayarichman.fire_risk_red'
          swipe: 'lri.forest_cover'
          lat: 33.8
          lon: 35.99
          zoom: 9
          read: "no"
          permalink: /prevention
          ---

 3. Then go back to [map.html](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/_layouts/map.html), and in the same section, add the layer-switcher element that will control the base and swipe layers. 

         <div class='layer-switcher'>
        <h4>Change Base Layer</h4>
          <ul class='basemaps'>
             <li><a id='mayarichman.priority_areas' class='layer-name active'>Reforest Areas</a></li>
            <li><a id='lri.Veg_map88' class='layer-name'>Vegetation Map</a></li>
           
          </ul>
        <h4>Change Swipe layer</h4>
          <ul class='swipemaps'>
            <li><a id='lri.nurseries' class='layer-name active'>Nurseries</a></li>
           
          </ul>
          </div>

Each `<li>` represents one layer in the layer switcher. And the **id** of the `<li>` determines the map layer, taken from the [embed button](http://mapbox.com/help/#embedding_a_map_on_a_webpage) on the MapBox website. 

**The first `<li>` for the baselayer maps and swipe maps MUST match the `firstlayer` and `swipe` maps indicated in the corresponding [_posts](https://github.com/LRI-Mapping/lri-mapping/tree/gh-pages/_posts).**

###Navigation Map

 1. Below the "if statement" for the section you want to change, include the following:

         <div class='navigation-map'>
         <h3>Current site <span class='site-name'>klayaa</span></h3>
         <div class='small-map'>
          <a href='#' class='forest-site' id='klayaa'><span>klayaa</span></a>
          <a href='#' class='forest-site' id='rachaya'><span>rachaya</span></a>
          <a href='#' class='forest-site' id='marwanieh'><span>marwanieh</span></a>
          <a href='#' class='forest-site' id='alzrariyr'><span>alzrariyr</span></a>
          <a href='#' class='forest-site active' id='aanjar'><span>aanjar</span></a>
          <a href='#' class='forest-site' id='kfarzabad'><span>kfarzabad</span></a>
          <a href='#' class='forest-site' id='bcharre'><span>bcharre</span></a>
         </div>
         </div>

####Adding new locations to the navigation map

1. Add a new `<a href='#' class='forest-site' id='bcharre'><span>bcharre</span></a>`. This must be done in [map.html](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/_layouts/map.html) in every section where you're including the navigation map. 

2. Go to small map easing in [site.js](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/site.js#L147), and copy and paste the following: 

          document.getElementById('bcharre').onclick = function() {
            map.ease.location({ lat: 34.233, lon: 36.007 }).zoom(13).optimal();
            return false
        }, 

The ID in quotes, must match the `<a href='#' class='forest-site' id='bcharre'><span>bcharre</span></a>` that you created in map.html, with a new lat and long for that location. 

3. Finally, go into [style.css](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/style.css#L227) and create a new line that matches the ID of your new map location. 

This will look like the following: `#bcharre {bottom:80px;right:23px;}` The px for bottom, and right, determine where the point will appear on navigation map. Refere the previous points to get an idea for where your new location should go, in terms of pixels to the right, and pixels from the bottom. 


### Adding or removing buttons in the navigation

 1. Go to the [_includes/navigation.html](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/_includes/navigation.html). 

 2. Each `<li>` represents one button, adding another button just requires copying and pasting another `<li>`, and changing the `{% if page.url == "/prevention" %} active{% endif %}` statement to match the new section title that you want to include.

 Then change the text that appears on the button by changing what is in the `<span class='activities'>Wildfire Prevention</span>` 

 3. Lastly, you must go into [_posts](https://github.com/LRI-Mapping/lri-mapping/tree/gh-pages/_posts), and create a new file that matches the end of the `{% if page.url == "/prevention" %} active{% endif %}` statement from the [navigation.html](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/_includes/navigation.html). 


## Adding or removing layers to the [data browser](http://lri-mapping.github.com/lri-mapping/browser/)

Go to [posts-for-map-browser](https://github.com/LRI-Mapping/lri-mapping/tree/gh-pages/_posts/posts-for-map-browser), and add or remove new files with the format matching the already existing posts. The necessary pieces to change are, **title, datalayer, year, source, description, api, embed.** And you can change the **zoom, lat, and lon** to tell the map where to go when you click on the new layer. 

         ---
         title: "Wild Fire Risk, 2009"
         categories: 
              - data
         datalayer: jue.fire-risk-red
         year: 2007
         source: AFDC
         license: Public Domain
         description: This layer depicts the wild fire risk. Here is a blurb of our    methodology. 
         thumbnail: http://api.tiles.mapbox.com/v3/nigeriaoil.map-5ustxk97,nigeriaoil.nigeria_fuel_consumption/7/66/61.png
         api: http://api.tiles.mapbox.com/v3/nigeriaoil.nigeria_fuel_consumption.jsonp
         embed: http://api.tiles.mapbox.com/v3/nigeriaoil.map-5ustxk97,nigeriaoil.nigeria_fuel_consumption.html
         downloads:
            - type: shapefile
         link: /data/context/csv/nigeria-consumption-2009-2010-st.csv
         lat: 34.3
         lon: 36.3
         zoom: 10
         ---

## Changing the YouTube video. 

If you want to change which video appears on page load. First find the video on youtube.com, and copy the code that appears after the `=` in the URL. This is the video ID. 

![](http://i.imgur.com/2EMwr.png)

Once you have this code copied, go into the [site.js file](https://github.com/LRI-Mapping/lri-mapping/blob/gh-pages/site.js#L20), and edit the vidID. Make sure the new ID remains between single quotes. 

![](http://i.imgur.com/UBhbO.png)

You can also edit the vidTime, which determines how many seconds into the YouTube video it will load. This is very helpful if you want the user to just see a certain part of the video. 


# 2. Maps  

## TileMill 

#### Data Processing 

 - [Importing data](http://mapbox.com/tilemill/docs/crashcourse/point-data/) 
 - [Working with shapefiles](http://mapbox.com/tilemill/docs/guides/add-shapefile/)


#### Map Design 

 - [Styling data](http://mapbox.com/tilemill/docs/crashcourse/styling/)
 - [Tooltips + Legends](http://mapbox.com/tilemill/docs/crashcourse/tooltips/)
 - [Advanced legends](http://mapbox.com/tilemill/docs/guides/advanced-legends/)
 - [Image charts in tooltips](http://mapbox.com/tilemill/docs/guides/google-charts/)
 - [Adding labels in TileMill](http://s3.amazonaws.com/entp-tender-production/assets/ef14dd9ac2072108984b5d2a55bcc85825a739c3/tilemille_PointLabeling.png?AWSAccessKeyId=AKIAISVUXXOK32ATONEQ&Expires=1350406789&Signature=jIfMFOM13YfcUyKHzSd%2FEUoLY3E%3D)

## MapBox
 
 - [Uploading a map to your MapBox account](http://mapbox.com/tilemill/docs/crashcourse/exporting/)
 - [Creating a new world basemap](http://mapbox.com/help/#creating_a_new_map)

After you've uploaded maps to your MapBox account, you can find their <b>map id</b> by clicking on the [embed button](http://mapbox.com/help/#embedding_a_map_on_a_webpage). This is the map id that you will enter into the `_posts`, and `map.html` documents on github.


#### Creating direct links to maps

 - [Direct links to map](http://d.tiles.mapbox.com/v3/examples.map-4l7djmvo.html#3.00/0.00/0.00) -- Change out the map layers in the URL to get a direct link to your maps. 

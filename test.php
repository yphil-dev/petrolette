<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Bootstrap Example</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="robots" content="noindex,nofollow">
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico" />
        <link id="jquery-ui-css" href="https://code.jquery.com/ui/1.12.1/themes/dot-luv/jquery-ui.css" rel="stylesheet" type="text/css" />
        
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />

        <style type="text/css" media="screen">@import "libs/nws-style.css";</style>
    </head>
    <body>

        
        <script
            src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"></script>
        
        <script
            src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
            integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
            crossorigin="anonymous"></script>

        <!-- <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.js"></script>
           -->
        <script src="https://unpkg.com/packery@2/dist/packery.pkgd.js"></script>
        <script src="https://unpkg.com/draggabilly@2/dist/draggabilly.pkgd.min.js"></script>
        
        <script>

         $(document).ready(function() {

             $.getScript("libs/test-tabs.js");

             $('.elements').children().draggable({
                 appendTo: 'body',
                 opacity: 0.9,
                 helper: "clone",
                 zIndex: 1000,
                 cursorAt: {
                     left: 50,
                     top: 20
                 },
             });

             // drop into needle element
             $('.elements').droppable({
                 accept: '.element',
                 tolerance: 'pointer',
                 activeClass: "can-drop",
                 hoverClass: "drop-here",
                 drop: function(event, ui) {
                     $(this).append(ui.draggable[0]);
                 }
             });

             // drop
             $('.ui-tabs-nav').children().droppable({
                 accept: '.element',
                 tolerance: 'pointer',
                 over: function(event, ui) {
                     $("#tabs").tabs("option", "active", $(event.target).index());

                     $.ui.ddmanager.prepareOffsets(ui.draggable.draggable('instance'));
                 }
             })

             
         });
         
        </script>

        <div id="dialog" title="Tab data">
            <form>
                <fieldset class="ui-helper-reset">
                    <label for="tab_title">Title</label>
                    <input type="text" name="tab_title" id="tab_title" value="Tab Title" class="ui-widget-content ui-corner-all">
                    <label for="tab_content">Content</label>
                    <textarea name="tab_content" id="tab_content" class="ui-widget-content ui-corner-all">Tab content</textarea>
                </fieldset>
            </form>
        </div>

        <button id="add_tab">Add Tab</button>
        
        <div id="tabs">
            <ul>
                <li><a href="#tabs-1">plip</a></li>
                <li><a href="#tabs-2">plop</a></li>
            </ul>
            <div id="tabs-1">
                <div class="elements grid nws-tab-feeds nws-tab-feeds-col ui-tabs-panel ui-corner-bottom ui-widget-content">
                    <div class="element grid-item outerContainer-col outerContainer">Element 1:plip</div>
                    <div class="element grid-item outerContainer-col outerContainer">Element 2:plop</div>
                    <div class="element grid-item outerContainer-col outerContainer">Element 3:zob</div>
                </div>
            </div>
            <div id="tabs-2">
                <div class="elements grid nws-tab-feeds nws-tab-feeds-col ui-tabs-panel ui-corner-bottom ui-widget-content">
                    <div class="element grid-item outerContainer-col outerContainer">Element 11:foo</div>
                    <div class="element grid-item outerContainer-col outerContainer">Element 12:bar</div>
                </div>
            </div>
        </div>
        
    </body>
</html>

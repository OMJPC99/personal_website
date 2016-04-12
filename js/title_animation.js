
function break_title() {
    var title_element = $('#title');
    var title_chars = $.trim(title_element.html()).split('');
    title_element.empty();
    for (var i = 0; i < title_chars.length; i++)
        title_element.append("<span class='letter preload' id='letter" + i + "' style='display: inline-block;'>" + title_chars[i] + "</span>");
}

function generate_bezier(x_max, y_max) {
    var bezier = [Math.random(), Math.random(), Math.random(), Math.random()];
    bezier[1] = bezier[1] * x_max;
    bezier[3] = bezier[3] * y_max;
    return bezier;
}

function format_bezier(bezier) {
    return "cubic-bezier(" + bezier.join(', ') + ")";
}

function format_bezier_keyframe(bezier, translation) {
    return "50% {\n" +
        "   -webkit-animation-timing-function: " + bezier + ";\n" +
        "   animation-timing-function: " + bezier + ";\n" +
        "   -webkit-transform: " + translation + ";\n" +
        "   transform: " + translation + ";\n" +
        "}";
}

function generate_new_stylesheet () {
    var style_node = document.createElement('style');
    document.head.appendChild(style_node);
    return style_node;
}

function generate_keyframe_rule (element, index, x_offset, y_offset, duration) {
    var original_content = element.html();
    original_content = (original_content == " ")? "\\00a0" : original_content;
    element.empty();

    var stylesheet = document.styleSheets[document.styleSheets.length - 1];
    var y_axis_bezier = generate_bezier(2, 2);
    var x_axis_bezier = generate_bezier(2, 2);

    var formatted_y_axis_bezier = format_bezier(y_axis_bezier);
    var formatted_x_axis_bezier = format_bezier(x_axis_bezier);
    var formatted_y_translation = "translateY(" + y_offset + ")";
    var formatted_x_translation = "translateX(" + x_offset + ")";

    var y_axis_keyframes_contents = format_bezier_keyframe(formatted_y_axis_bezier, formatted_y_translation);
    var x_axis_keyframes_contents = format_bezier_keyframe(formatted_x_axis_bezier, formatted_x_translation);

    var y_axis_webkit_keyframes_rule = "@-webkit-keyframes yAxis"+index+"{"+y_axis_keyframes_contents+"}";
    var y_axis_keyframes_rule = "@keyframes yAxis"+index+"{"+y_axis_keyframes_contents+"}";
    var x_axis_webkit_keyframes_rule = "@-webkit-keyframes xAxis"+index+"{"+x_axis_keyframes_contents+"}";
    var x_axis_keyframes_rule ="@keyframes xAxis"+index+"{"+x_axis_keyframes_contents+"}";

    stylesheet.insertRule(y_axis_webkit_keyframes_rule, 0);
    stylesheet.insertRule(y_axis_keyframes_rule, 0);
    stylesheet.insertRule(x_axis_webkit_keyframes_rule, 0);
    stylesheet.insertRule(x_axis_keyframes_rule, 0);

    var x_animation_description = "xAxis"+index+" "+duration+"s 1 "+formatted_x_axis_bezier;
    element.css('-webkit-animation', x_animation_description);
    element.css('animation', "'"+ x_animation_description+"'");

    var y_animation_description = "yAxis"+index+" "+duration+"s 1 "+formatted_y_axis_bezier;
    var y_after_pseudo_element = "#"+element.attr('id')+"::after { " +
        "   content: '" + original_content + "';" +
        "   -webkit-animation: "+y_animation_description+"; "+
        "   animation: " + y_animation_description + "; " +
        "   display: inline-block; " +
        "   background-color: rgba(0, 0, 0, 0);" +
        "}";
    stylesheet.insertRule(y_after_pseudo_element, 0);

    console.log(stylesheet.cssRules);
}

function Letter (element) {
    this.original_contents = element.html();
    this.position = { x: 0, y: 0 };
    this.original_position = { x: 0, y: 0};
    this.dom_element = element;
    return this;
}

var title = $('#title');
var title_position = title.position();
var parent_node = title.parent();
var parent_width = parent_node.width();
var parent_height = parent_node.height();
console.log("parent width/height:", parent_width, parent_height);
break_title();
var letters = $('.letter');
generate_new_stylesheet();

var time = 500;
letters.each(
    function (index) {
        var cur_rel_position_to_title = $(this).position();
        var pos_rel_to_total_parent = {
            'x': cur_rel_position_to_title['left'] + title_position['left'],
            'y': cur_rel_position_to_title['top'] + title_position['top']
        };
        var pos_offset = {
            'x': Math.round(Math.random() * parent_width),
            'y': Math.round(Math.random() * parent_height)
        };
        var rel_pos_offset = {
            'x': (pos_offset['x'] - pos_rel_to_total_parent['x']) * 0.7,
            'y': (pos_offset['y'] - pos_rel_to_total_parent['y']) * 0.7
        };
        console.log(pos_offset);
        console.log(pos_rel_to_total_parent);
        console.log(rel_pos_offset);
        //setTimeout(function () {
        generate_keyframe_rule($(this), index, rel_pos_offset['x'] + "px", rel_pos_offset['y'] + "px", 3);
        //}, time);
        time+=500;
    }
);

//break_title();
//$('#title').css({display: 'block'});
//var letters = $('.letter');
//letters.css({transition: 'all 0.5s ease'});
//letters = letters.toArray();
//for (var i = 0; i < letters.length; i++) letters[i] = new Letter(letters[i]);
//console.log(letters);
//
//generate_new_stylesheet();
//for (var i = )

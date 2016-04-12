
$('#sidebar-toggle-button').click(function (e) {
    e.preventDefault();
    var sidebar = $('#sidebar');
    sidebar.toggleClass('sidebar-collapsed');
    $('#sidebar-toggle-button').toggleClass('down');
    $('#sidebar-content').toggleClass('sidebar-content-collapsed');
    /*var main = $('#main');
    main.toggleClass('sidebar-pushed');
    if(main.attr('class') == 'sidebar-pushed') {
        main.css({
            'position': 'relative',
            'left': '+='+sidebar.width()
        });
    }*/
});
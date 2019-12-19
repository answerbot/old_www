$( "asset" ).each(function() {
    $(this).load($( this ).attr( "src" ))
})
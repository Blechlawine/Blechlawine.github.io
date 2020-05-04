$("#colortool").click(function() {
    console.log("test");
    var currentLoc = location.href.replace("#more", "");
    location.replace(currentLoc + "colortool.html");
});

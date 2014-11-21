$(document).ready(function() {
    var experiences = $('._3dface._3dface--experiences');
    var projects = $('._3dface._3dface--projects');
    var education = $('._3dface._3dface--education');
    var hobbies = $('._3dface._3dface--hobbies');
    var contact = $('._3dface._3dface--contact');
    var comments = $('._3dface._3dface--comments');
    var front = experiences;

    var turnToExperiences = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(-12deg) rotateY(18deg)'});
        front = experiences;
    };
    var turnToContact = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(-15deg) rotateY(105deg)'});
        front = contact;
    };
    var turnToComments = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(-15deg) rotateY(-75deg)'});
        front = comments;
    };
    var turnToHobbies = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(-12deg) rotateY(198deg)' });
        front = hobbies;
    };
    var turnToProjects = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(-102deg) rotateZ(18deg)' });
        front = projects;
    }
    var turnToEducation = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(78deg) rotateZ(-18deg)' });
        front = education;        
    }
    $('#experiences').on('click', function() {
        turnToExperiences();
    });
    $('#contact').on('click', function() {
        turnToContact();
    });
    $('#comments').on('click', function() {
        turnToComments();    
    });
    $('#hobbies').on('click', function() {
        turnToHobbies();
    }); 
    $('#projects').on('click', function() {
        turnToProjects();
    });
    $('#education').on('click', function() {
        turnToEducation();
    });       

    var turnLeft = function () {
        if (front==experiences || front==projects || front==education)
            turnToComments();
        else if (front==hobbies)
            turnToContact();
        else if (front==contact)
            turnToExperiences();
        else if (front==comments)
            turnToHobbies();
    };

    var turnRight = function() {
        if (front==experiences || front==projects || front==education)
            turnToContact();
        else if (front==hobbies)
            turnToComments();
        else if (front==contact)
            turnToHobbies();
        else if (front==comments)
            turnToExperiences();
    };

    var turnUp = function () {
        if (front==experiences || front==hobbies || front==contact || front==comments)
            turnToEducation();
        else if (front==projects)
            turnToExperiences();
        else if (front==education)
            turnToHobbies();
    };

    var turnDown = function() {
        if (front==experiences || front==hobbies || front==contact || front==comments)
            turnToProjects();
        else if (front==projects)
            turnToHobbies();
        else if (front==education)
            turnToExperiences();
    };

    var turnByDragdrop = function(dd) {
        if (Math.abs(dd.deltaY) > Math.abs(dd.deltaX)) {
            if (dd.originalY > dd.offsetY) 
                turnUp();
            else
                turnDown();
        } else {
            if (dd.originalX > dd.offsetX)
                turnLeft();
            else
                turnRight();
        }
    };

    $('._3dface._3dface--experiences').on({
        dragend: function(event, dd) {
            turnByDragdrop(dd);
        }
    });
    $('._3dface._3dface--projects').on({
        dragend: function(event, dd) {
            turnByDragdrop(dd);
        }
    });
    $('._3dface._3dface--education').on({
        dragend: function(event, dd) {
            turnByDragdrop(dd);
        }
    });
    $('._3dface._3dface--hobbies').on({
        dragend: function(event, dd) {
            turnByDragdrop(dd);
        }
    });
    $('._3dface._3dface--contact').on({
        dragend: function(event, dd) {
            turnByDragdrop(dd);
        }
    });
    $('._3dface._3dface--comments').on({
        dragend: function(event, dd) {
            turnByDragdrop(dd);
        }
    });

    var writeExperiences = function() {
        experiences.attr("background-color", "#E2F9F4");
        experiences.append("<h1>hello</h1>");
    };
    //writeExperiences();
});
/* instead of calling .on for each face, the following can be used instead
        var faceArray = [experience, education,]
    var xx = function(array) {}
    for (i=0; i<array.length; i++) {
        array[i].on({
            dragend: function(event, dd) {
            turnByDragdrop(dd);
        }
        })
    }
}
xx();
*/

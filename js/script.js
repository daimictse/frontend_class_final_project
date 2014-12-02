$(document).ready(function() {
    var experiences = $('._3dface._3dface--experiences');
    var projects = $('._3dface._3dface--projects');
    var education = $('._3dface._3dface--education');
    var hobbies = $('._3dface._3dface--hobbies');
    var contact = $('._3dface._3dface--contact');
    var comments = $('._3dface._3dface--comments');
    var front = experiences;

    var readEdu = function() {
        $.ajax({
            url: "education.json",
            type: "GET",
            dataType: "json",
            success: function(response) {
                for (var i=0; i<response.education.length; i++) 
                    writeEdu(response.education[i]);
            },
            error: function(response) {
                alert("invalid data");
            }
        });
    };

    readEdu();

    var turnToExperiences = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(-15deg) rotateY(20deg)'});
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
        $('._3dbox').css({ WebkitTransform: 'rotateX(-15deg) rotateY(200deg)' });
        $('#jobTitle0').focus();
        front = hobbies;
    };
    var turnToProjects = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(-105deg) rotateZ(20deg)' });
        front = projects;
    }
    var turnToEducation = function() {
        $('._3dbox').css({ WebkitTransform: 'rotateX(75deg) rotateZ(-20deg)' });
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

    var writeEdu = function(edu) {
        var $thisEdu = $('<tr>');
        $thisEdu.append('<td>'+edu.year+'</td>');
        $thisEdu.append('<td>'+edu.subject+'</td>');
        $thisEdu.append('<td>'+edu.school+' ('+edu.city+','+edu.state+')</td>');
        $('.eduTable').append($thisEdu);
    };
    // show different job related contents according to job title //
    var writeJob = function(jobNum) {
        $.ajax({
            url: "jobs.json",
            type: "GET",
            dataType: "json",
            success: function(response) {
                $('#jobTitle').text(response.jobs[jobNum].jobTitle);
                $('#jobPeriod').text(response.jobs[jobNum].jobPeriod);
                $('#jobLocation').text(response.jobs[jobNum].jobLocation);
                // tasks might have different length; remove existing first //
                $('#jobTasks ul').empty();
                for (var i=0; i<response.jobs[jobNum].jobTasks.length; i++)
                    $('#jobTasks ul').append('<li>'+response.jobs[jobNum].jobTasks[i]+'</li>');
            },
            error: function(response) {
                alert("invalid data");
            }
        });
    };
    // for each job, call writeJob with its job # //
    $('#jobTitle0').on('click', function() {
        writeJob(0);
    });
    $('#jobTitle1').on('click', function() {
        writeJob(1);
    });
    $('#jobTitle2').on('click', function() {
        writeJob(2);
    });
    $('#jobTitle3').on('click', function() {
        writeJob(3);
    });
    $('#jobTitle4').on('click', function() {
        writeJob(4);
    });
    $('.slideShow').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    });
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

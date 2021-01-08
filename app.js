$(document).ready(function() {
    
    //initial settings/variables upon page load
    let upperCase = $('#keyboard-upper-container');
    let lowerCase = $('#keyboard-lower-container');
    upperCase.hide();
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let currentSent = sentences[0];
    $('#sentence').append(sentences[0]);
    $('#target-letter').append(currentSent[0]);

    //functions to toggle upper/lower on shift press
    $(document).keydown(function(e) {
        if(e.which === 16) {
            upperCase.show();
            lowerCase.hide();
        };
    });
    $(document).keyup(function(e) {
        if(e.which === 16) {
            upperCase.hide();
            lowerCase.show();
        } else { //makes sure highlight color doesn't stay after key is released
            $('.highlight').removeClass('highlight');
        };
    });
    
    let checkmark = '&#10004;'
    let j = 0;
    let i = 0;
    let wrong = 0;
    $(document).keypress(function(e) {
        $('#' + e.which).addClass('highlight');
        if(i === 0 && j === 0) {
            start = Date.now();
        }
        if(i === sentences.length - 1 && j === currentSent.length) { //end of game code
            let end = Date.now();
            $('#target-letter').empty();
            $('#sentence').empty();
            $('#feedback').empty();
            $('#yellow-block').css('margin-left', '0');
            let time = (end - start)/60000;
            let score = Math.floor(54 / time - 2 * wrong);
            $('#target-letter').append(score + ' words per minute');
            $(document).unbind();
            setTimeout(function() {
                $('#target-letter').after('<input type="submit" class="btn btn-success btn-lg center-block" value="Play again?"></input>');
                $('.btn-success').click(function() {
                    location.reload(true);
                });
            }, 5000);
        } else if(i < sentences.length) {
            let currentSent = sentences[i];
            if(j < currentSent.length) { //before current sentence ends
                if(($('#target-letter').text() === $('#' + e.which).text()) || ($('#target-letter').text() === ' ' && e.which === 32)) {
                    $('#feedback').append('<span class="checkmark">' + checkmark + '</span>');
                } else if(($('#target-letter').text() !== $('#' + e.which).text()) || ($('#target-letter').text() === ' ' && e.which !== 32)) {
                    $('#feedback').append('<span class="x">X</span>');
                    wrong++;
                }
                j++;
                $('#yellow-block').css('margin-left', '+=17.25px');
                $('#target-letter').empty();
                $('#target-letter').append(currentSent[j]);
            } else { //reset things when 1 sentence ends
                j = 0;
                $('#sentence').empty();
                $('#feedback').empty();
                $('#yellow-block').css('margin-left', '0');
                ++i;
                if(i < sentences.length) { //only runs if not the last sentence
                    let currentSent = sentences[i];
                    $('#sentence').append(currentSent);
                    $('#target-letter').append(currentSent[j]);
                }
            };
        };
    });

    

});
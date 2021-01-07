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

    let j = 0;
    let i = 0;
    $(document).keypress(function(e) {
        $('#' + e.which).addClass('highlight');
        if(i < sentences.length) {
            let currentSent = sentences[i];
            if(j < currentSent.length) {
                j++;
                $('#yellow-block').css('margin-left', '+=17.25px');
                $('#target-letter').empty();
                $('#target-letter').append(currentSent[j]);
            } else {
                j = 0;
                ++i;
                $('#yellow-block').css('margin-left', '0');
                $('#sentence').empty();
                let currentSent = sentences[i];
                $('#sentence').append(currentSent);
                $('#target-letter').append(currentSent[j]);
            };
        } else {
            //this will be end of game code
        }
    });

    

});

function compareColors(color1, color2) {
    // Create a dummy element to assign colors to.
    const dummy = $('<div/>');

    // Set the color to color1, and read it back.
    $(dummy).css('color', color1);
    const adjustedColor1 = $(dummy).css('color');

    // Set the color to color2, and read it back.
    $(dummy).css('color', color2);
    const adjustedColor2 = $(dummy).css('color');

    return adjustedColor1 == adjustedColor2;
}

function makeGrid() {
   
    $('#submit').click(function(event) {
        //Prevent default click action
        event.preventDefault();

        //Get the values of the grid height and width from the input box
        const gridHeight = $('#input-height').val();
        const gridWidth = $('#input-width').val();
        const table = $('#pixel-canvas');
        const buttons = $('#buttons');
        
        //Remove existing table if any
        if ((table.is(':empty')) === false) {
            table.empty();
        }
        
        //Create reset and clear buttons 
        if ($('.button').length == 0) {
            const clear = $('<span title="Clear grid"><button type="button" '+
            'id = "clear" class = "button">Clear</button></span');
            const reset = $('<span title="Reset canvas space"><button type="button" '+
            'id = "reset" class = "button">Reset</button></span>');
            clear.appendTo(buttons);
            reset.appendTo(buttons);
            console.log("appended buttons");
        }
      
        //Create grid
        for (let i = 0; i < gridHeight; i++) {
            //Append row to table tag
            const row = $('<tr></tr>');
            row.appendTo(table);
            console.log("appended row "+ i);

            //Append cells to form row
            for (let j = 0; j < gridWidth; j++) {
                const cell = $('<td></td>');
                cell.appendTo(row);
            }
        }
        
        //Change background color of cell when cell is clicked
        $('td').click(function() { 
            const color = $('#color-picker').val();
            const colorCompare = compareColors($(this).css('background-color'),color);

            //Check if cell is styled and if cell color is same as color picker color
            if ($(this).attr('style') && colorCompare == true) {
                $(this).removeAttr('style');
            } else {
                $(this).attr('style', 'background-color:'+color);
            }
        });

        //Remove style from grid when 'clear' is clicked
        $('#clear').click(function() {
            $('td').each(function() {
                if ($(this).attr('style')) {
                    $(this).removeAttr('style');
                }
            })
        });
        
        //Remove grid when 'reset' is clicked
        $('#reset').click(function() {
            $('tr').remove();
            $('.button').remove();
            $('#size-picker')[0].reset();
            $('#color-picker').val('#000000');
        });
    });
}
$(makeGrid);

    
    

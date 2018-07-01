function createTable(table,gridHeight,gridWidth,oldHeight){
    //Remove a row if new height is less than old height 
    for (let i = 0; i < Math.abs(gridHeight - oldHeight); i++){
        if (gridHeight - oldHeight < 0){
            $(table).find('tr').last().remove();
        }
        //Add row(s)
        else {
            const newRow = $('<tr></tr>');
            newRow.appendTo(table);
            console.log("appended row "+ i);

            //Append cells to form row
            for (let j = 0; j < gridWidth; j++) {
                $('<td></td>').appendTo(newRow);
            } 
        }
    }
}

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
    let oldHeight = 0;
    let oldWidth = 0;

    $('#submit').click(function(event) {
        //Prevent default click action
        
        event.preventDefault();
        
        //Get the values of the grid height and width from the input box

        const gridHeight = $('#input-height').val();
        const gridWidth = $('#input-width').val();

        if (isNaN(gridHeight) || isNaN(gridWidth)){
            return;
        }
        const table = $('#pixel-canvas');
        const buttons = $('#buttons');
 
        //Create reset and clear buttons 
        if ($('.button').length == 0) {
            const clear = $('<span title="Clear grid"><button type="button" id = "clear" class = "button">Clear</button></span');
            const reset = $('<span title="Reset canvas space"><button type="button" id = "reset" class = "button">Reset</button></span>');
            clear.appendTo(buttons);
            reset.appendTo(buttons);
            console.log("appended buttons");
        }

        //Check if a table exists  
        if (($('tr').is(':empty')) === false) {
            
            //Alter the width
            $('tr').each(function() {
                oldWidth = $(this).find('td').length;
                for (let i = 0; i < Math.abs(gridWidth - oldWidth); i++){
                    if (gridWidth - oldWidth > 0) $('<td></td>').appendTo($(this));
                    else $(this).find('td').last().remove();
                }
            });

            //Alter the height
            oldHeight = $('tr').length;
            createTable(table,gridHeight,gridWidth,oldHeight);      
        }  
        //Create new table
        else createTable(table,gridHeight,gridWidth,oldHeight);
    
        //Remove style from grid when 'clear' is clicked
        $('#clear').on('click',function() {
            $('td').each(function() {
                if ($(this).attr('style')) {
                    $(this).removeAttr('style');
                }
            })
        });
        
        //Remove grid when 'reset' is clicked
        $('#reset').on('click',function() {
            $('tr').remove();
            $('.button').remove();
            $('#size-picker')[0].reset();  
            console.log(table.is(':empty'));
        });
  });  
}

//Change background color of cell when cell is clicked
$('#pixel-canvas').on('click','td',function() { 
    const color = $('#color-picker').val();
    const colorCompare = compareColors($(this).css('background-color'),color);

    //Check if cell is styled and if cell color is same as color picker color
    if ($(this).attr('style') && colorCompare == true) {
        $(this).removeAttr('style');
    } else {
        $(this).attr('style', 'background-color:'+color);
    }
});

$(makeGrid());

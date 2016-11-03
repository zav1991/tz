function main() {
    var mas = loadServises(),
    inputFocus;
    inputCount = 0;
    servise = [];
    paintMenu(mas);
    $('.button').on('click', function(){
        var m =this.id;
        if (m === '1' || m === '2' || m === '3')//загрузка данных из service.xml
        {
            $.ajax({
                url: 'config/service.xml',
                type: 'get',
                async: false
            }).done(function (responce) {
                var $fields = $(responce).find('service[id="' + m + '"]');
                for (var i = 0; i < $fields.children().length; i++) {
                    var child = $($fields.children()[i]);
                    servise[i] = [];
                    servise[i][0] = child.get(0).tagName;
                    servise[i][1] = child.attr('left_comment');
                    servise[i][2] = child.attr('up_comment');
                    servise[i][3] = child.attr('type');
                    servise[i][4] = child.attr('value');
                }
            })
        }


        paintFields(servise);
        if (inputCount>0){//установка фокуса на первом элементе
            $('#input1').focus();
            inputFocus = $('#input1');
        }
    $('.inputStr').on('focus', function(){
        inputFocus = $(this);
    });
    $('.btn').on('click', function () {
        var Paste = $(this).data('paste');
        if (Paste === 'c')
        {
            inputFocus.val('');
        }
        else if (Paste === '<')
        {
            inputFocus.val(inputFocus.val().slice(0,-1));
        }
        else {
            inputFocus.val(inputFocus.val() + Paste);
        }
        inputFocus.focus();
    });
    $('#next').on('click', function(){
        alert('1');
    })
    });//конец buttonClick

}
/*загрузка данных из menu.xml*/
function loadServises(){
    var  result = [];
    $.ajax({
        url: 'config/menu.xml',
        type: 'get',
        async: false
    }).done(function (response) {
        $services = $(response).find('service');
        for ( var i = 0; i < $services.length; i++)
        {
            var service = $($services[i]);
            result[i] = [];
            result[i][0] = service.attr('id');
            result[i][1] = service.attr('name');
            result[i][2] = service.attr('fee');
        }
    })
    return result;
}
/*формирование кнопок меню*/
function paintMenu(arr) {
    var buttons = '';
    for (var i = 0; i < arr.length; i++) {
        buttons = buttons + '<div class="button" id="' + arr[i][0] + '">' + arr[i][1] + '</div>';

    }
    buttons = '<div style=" justify-content: center">' + buttons + '</div>';
    $('.workspace').append(buttons);
}
/*обработчики нажатий кнопок*/
function buttonClick(){
    var m =this.id;
    if (m === '1' || m === '2' || m === '3')//загрузка данных из service.xml
    {
        $.ajax({
            url: 'config/service.xml',
            type: 'get',
            async: false
        }).done(function (responce) {
            var $fields = $(responce).find('service[id="' + m + '"]');
            for (var i = 0; i < $fields.children().length; i++) {
                var child = $($fields.children()[i]);
                servise[i] = [];
                servise[i][0] = child.get(0).tagName;
                servise[i][1] = child.attr('left_comment');
                servise[i][2] = child.attr('up_comment');
                servise[i][3] = child.attr('type');
                servise[i][4] = child.attr('value');
            }
        })
    }
        paintFields(servise);
}
/*отрисовка полей ввода*/
function paintFields(arr) {
    $('.workspace').html('');
    for (var i =0; i < arr.length; i++)
    {
        if (arr[i][2] !== undefined) {
            $('.workspace').append('<div>' + arr[i][2] + '</div>');
        }
        if (arr[i][3] === 'hidden')
        {
            $('.workspace').append('<div style="display: none" data-id="'+arr[i][4]+'"><input></input></div>');
        }
        else{
            if (arr[i][1] !== undefined){
                inputCount++;
                $('.workspace').append('<div data-id ="'+arr[i][1]+'">'+arr[i][1]+'<input class="inputStr" style="margin: auto" name='+arr[i][0]+' id ="input'+inputCount+'"></input></div>');
            }
            else{
                inputCount++;
                $('.workspace').append('<div><input class="inputStr" style="margin: auto" name='+arr[i][0]+' id="input'+inputCount+'"></input></div>');
            }
        }
    }
    $('.workspace').append('<div><button class="btn" data-paste="1">1</button>'+
                    '<button class="btn" data-paste="2">2</button>'+
                    '<button class="btn" data-paste="3">3</button></div>'+
                    '<div><button class="btn" data-paste="4">4</button>'+
                    '<button class="btn" data-paste="5">5</button>'+
                    '<button class="btn" data-paste="6">6</button></div>'+
                    '<div><button class="btn" data-paste="7">7</button>'+
                    '<button class="btn" data-paste="8">8</button>'+
                    '<button class="btn" data-paste="9">9</button></div>'+
                    '<div><button class="btn" data-paste="c">c</button>'+
                    '<button class="btn" data-paste="0">0</button>'+
                    '<button class="btn" data-paste="<"><</button></div>'+
                    '<div><button class="button" id="next">Next</button></div>'
    );
    //$('.inputStr').on('focus', onFocus);
}
/*отбработчик клавиатуры ввода*/
function pressKeyboard(){
    $('.btn').on('click', function () {
        var Paste = $(this).data('paste');
        if (Paste === 'c')
        {
            inputFocus.val('');
        }
        else if (Paste === '<')
        {
            inputFocus.val(inputFocus.val().slice(0,-1));
        }
        else {
            debugger
            inputFocus.val(inputFocus.val() + Paste);
        }
        $('.btn').off(console.log(1));
        inputFocus.focus();
    });


}

function onFocus(){
    inputFocus = $(this);
    pressKeyboard();
}
$(document).ready(main);
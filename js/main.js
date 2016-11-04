function main() {
    $('#mainMenu').hide();
    var mas = loadServises(),
    inputFocus;
    inputCount = 0;
    var m, selectedServise = [];
    $('.workspace').html('');
    var servise = [];
    paintMenu(mas);
    $('.button').on('click', function(){
        m =this.id;
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
        for (var i = 0; i < mas.length; i ++)
        {
            if (mas[i][0] === m) {
                selectedServise[0] = mas[i][0];
                selectedServise[1] = mas[i][1];
                selectedServise[2] = mas[i][2];
            }
        }



        paintFields(servise);
        $('#mainMenu').show();
        $('#mainMenu').on('click', function(){
            $('#mainMenu').off();
            main();
        });
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
    var f = 0, inp =[];
        for (var i = 1; i <= inputCount; i++)
        {
            if($('#input'+i).val() === "")
            {
                inp.push(i);
                if(f === 0)
                {
                    inputFocus = ('#input'+i);
                    $(inputFocus).focus();
                }
                f++;
            }

        }
        if (f>0){//ветка незаполненных полей
            var t1="Необходимо заполнить следующие поля:";
            for (var i=0; i < servise.length;i++)
            {
                for (var j=0; j < inp.length; j++)
                if(servise[i][3]==='text'&& servise[i][0]===$('#input'+inp[j]).attr('name'))
                    t1=t1+'<br>'+servise[i][0]+',';

            }
            $('#dialog').html(t1.slice(0,-1));
            //закрытие проверки на заполненность

            //вызов диалогового окна
            $( "#dialog" ).dialog({
                modal: true,
                buttons: {
                    Ok: function() {
                        $( this ).dialog( "close" );

                    }
                },
                title: 'Внимание'
            });//конец диалога
        }
        else{//когда все заполнено верно
            for(var i = 1; i <= inputCount; i++)
            {//заполнение значений value в service
                for(var j =0 ;j < servise.length; j++)
                    if(servise[j][0] === $('#input'+i).attr('name'))
                        servise[j][4]=$('#input'+i).val();
            }

            $('.workspace').html('');//очищаем рабочую область
            for(var i = 0;i < servise.length; i++)
            {
                $('.workspace').append('<div>' + servise[i][0] + ':\t' + servise[i][4] + '</div>');
            }
            $('.workspace').append('<div><button class="button" id="Pay">Pay</button></div>');
        }
        $('#Pay').on('click',function () {
            pay(servise, selectedServise);
        });
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
/*отрисовка полей ввода*/
function paintFields(arr) {
    $('.workspace').html('');
    for (var i =0; i < arr.length; i++)
    {
        if (arr[i][2] !== undefined) {
            $('.workspace').append('<div align="center" style="margin-right:auto">' + arr[i][2] + '</div>');
        }
        if (arr[i][3] === 'hidden')
        {
            $('.workspace').append('<div style="display: none" data-id="'+arr[i][4]+'"><input></input></div>');
        }
        else{
            if (arr[i][1] !== undefined){
                inputCount++;
                $('.workspace').append('<div align="center" style="display: flex; align-items: center;j ustify-content: center;" data-id ="'+arr[i][1]+'">'+arr[i][1]+'<input class="inputStr" style="margin: auto" name='+arr[i][0]+' id ="input'+inputCount+'"></input></div>');
            }
            else{
                inputCount++;
                $('.workspace').append('<div align="center" style="display: flex; align-items: center; justify-content: center;"><input class="inputStr" style="display: block" name='+arr[i][0]+' id="input'+inputCount+'"></input></div>');
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
/*оплата*/
function pay(mas, selSer){
    var k = -1;
    for (var i = 0; i < mas.length; i++)
    {
        if (mas[i][0] === 'amount')
            k=i;
    }
    if (k>-1)
    {
        var total = parseInt(selSer[2])+parseInt(mas[k][4]);
    }
    else
    {
        var total = parseInt(selSer[2]);
    }
    var postObject = '';//создал объект для отправки
    for (var i = 0; i < mas.length; i++)
    {
        postObject = postObject + mas[i][0] + ': '+ mas[i][4] +', ';

    }
    postObject = postObject +'total: '+ total;
    $.ajax({
        url: '127.0.0.1/send',
        type: 'POST',
        data: postObject
    }).fail(function() {alert('Ошибка отправки'); main();})
        .done(function() { alert("Успешное выполнение"); main(); });
}
$(document).ready(main);
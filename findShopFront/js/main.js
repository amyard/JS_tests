
$(document).ready(function () {

    //////////////////////////////////////////////////////////////////////////////////////
    //            resize window
    //////////////////////////////////////////////////////////////////////////////////////
    // var width = $(window).width();
    // $(window).on('resize', function() {
    //     if ($(this).width() != width && $(this).width() < 648) {
    //         width = $(this).width();
    //         console.log(width)
    //         $('.body').css({'min-width': `${width}px`})
    //     }
    // });


    //////////////////////////////////////////////////////////////////////////////////////
    //            tabulation
    //////////////////////////////////////////////////////////////////////////////////////
    $(document).on('click', '.nav-tabs li', function (){
        $('.nav-tabs li').removeClass('active');
        $(this).addClass('active');
    });

    //////////////////////////////////////////////////////////////////////////////////////
    //                       accordion
    //////////////////////////////////////////////////////////////////////////////////////
    var acc = document.getElementsByClassName("filter__item-title");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////
    //                   display description
    //////////////////////////////////////////////////////////////////////////////////////


    // remove all active btn and opacity and remove desc block
    function deleteExtraData() {


        var allDataAfter = $(".testtest").nextAll(),
            windowWidth = $(window).width(),
            getPosition = getCurrentPosition(windowWidth);

        $.each(allDataAfter, function(index, value) {
            if((index+1) % getPosition == 0) {
                jQuery(value).css({'margin-left':'0'})
            }
        }); 



        $('.full-desc').removeClass('active');
        $('.product-item').css({'opacity': '1'});
        $('.testtest').remove();
        $('.delete-empty').remove();
    }

    function getCurrentPosition(windowWidth) {
        if (windowWidth > 1472) {
            return 5
        } else if ( windowWidth > 1281 && windowWidth < 1472) {
            return 4
        } else {
            return 3
        }
    }

    $(document).on('click', '.full-desc', function(event){
        event.preventDefault();

        deleteExtraData();        


        var classBtn = $(this).attr('class'),
            allItems = $('.product-item'),
            btnItemBlock = $(this).parent().parent(),
            windowWidth = $(window).width(),
            getPosition = getCurrentPosition(windowWidth),
            correctItem = '',
            amountOfItems = $('.product-item').length;


        if(windowWidth > 986) {
            // первый раз нажали на кнопку
            if(!classBtn.includes('active')) {
                $(this).addClass('active');

                var positionOfItem = getPositionOfItemBlock();

                function getPositionOfItemBlock() {
                    $.each(allItems, function(dt, value) {
                        var innerBtnClass = jQuery(value).find('.full-desc').attr('class');
                        innerBtnClass.includes('active')
                            ? correctItem = dt+1
                            : jQuery(value).css({'opacity':'0.5'})
                    })
                    return correctItem
                }

                var getDivAfterInsert = Math.ceil(correctItem / getPosition) * getPosition;

                position = parseInt(getDivAfterInsert) > parseInt(amountOfItems) ? amountOfItems : getDivAfterInsert

                var currDiv = allItems[position],
                    title = jQuery(allItems[positionOfItem-1]).find('.product-item--title').html();

                if(typeof currDiv === 'undefined') {
                    currDiv = allItems.last()
                    arr = [...Array(getDivAfterInsert - amountOfItems).keys()]

                    arr.forEach(function(value){
                        jQuery(currDiv).after(addSecondDataForBorrom())
                    })

                    last = jQuery($('.delete-empty').last())
                    last.after(addDataDiv(title))
                } else {
                    jQuery(currDiv).before(addDataDiv(title))

                    // когда добаляет блок, то сносится маргин у последнего блока каждо строки 
                    // ({'margin-right':'0', 'margin-left':'2rem'})
                    var allDataAfter = $(".testtest").nextAll();
                    $.each(allDataAfter, function(index, value) {
                        if((index+1) % getPosition == 0) {
                            jQuery(value).css({'margin-right':'0', 'margin-left':'2rem'})
                        }
                    });    
                }

                // create block
                function addDataDiv(title) {
                    return `\
                            <div class='testtest'>\
                                <span class='opacity-zero'>dd</span>\
                                <div class="full-description">\
                                    <div class="full-description__close">\
                                        <span class='full-description__close--btn'>&times;</span>\
                                    </div>\
                            
                                    <div class="full-description__content">\
                                        
                                        <div class="full-description__content--img">\
                                            <img alt='' src='img/asd.jpg'>\
                                        </div>\
                            
                                        <div class="full-description__content--info">\
                                            <div>\
                                                
                                                <ul class="nav nav-tabs" role="tablist">\
                                                    <li class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Продукт</a></li>\
                                                    <li><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Магазин</a></li>\
                                                    <li><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">купон на скидку</a></li>\
                                                </ul>\
                                                
                                                <div class="tab-content">\
                                                    <div role="tabpanel" class="tab-pane active" id="home">\
                                                        <h3>${title}</h3>\
                                                        <p>Динамические закрытого типа - Частотные характеристики 5 Гц - 22000 Гц - Чувствительность 102 дБ / мВт - сопротивление 24 Ом (1 кГц) - микрофон есть...</p>\
                                                        <h2>1199 грв</h2>\
                                                    </div>\
                                                    <div role="tabpanel" class="tab-pane" id="profile">\
                                                        Second tab 2\
                                                    </div>\
                                                    <div role="tabpanel" class="tab-pane" id="messages">\
                                                        Second tab 3\
                                                    </div>\
                                                </div>\
                                            </div>\
                                        </div>\
                            
                                    </div>\
                            
                                    <div class="full-description__footer">\
                                        <img src="img/like.png" alt="" class="svg-icon">\
                                        <img src="img/mdi-scale-balance.png" alt="" class="svg-icon">\
                                        <button class='orange-btn orange-btn-padding'>В магазин</button>\
                                    </div>\
                                </div>\
                            </div>\
                            `
                }

                function addSecondDataForBorrom() {
                    return `<div class='col-1-of-4 product-item delete-empty' style='opacity: 0;'></div>`
                }
            }
        } else {
            displayModal('descModal')
        } 
    });

    $(document).on('click', '.active', function(event){
        event.preventDefault();
        deleteExtraData();
    });

    $(document).on('click', '.full-description__close--btn', function() {
        deleteExtraData()
    });



    /////////////////////////////////////////////////////////////////////////////////
    ////           MODAL
    /////////////////////////////////////////////////////////////////////////////////

    function displayModal(id) {

        $('body').css({'overflow':'hidden'})
        $('body').on('click', '.close', function(){
            $('body').css({'overflow':'auto'})
            $('.filter__item').css({'display':'none'})
            $('#descModal').css({'display':'none'})
        });


        $('.filter__item').css({'display':'block'})
        var modal = document.getElementById(id);

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
        setTimeout(function() {
            $(`#${id} .modal-content`).css({'height': '100%'})
            var windowHeight = $(window).height(),
                modalHeight = $(`#${id} .modal-content`).height(),
                newSize = windowHeight + 1;

            if(windowHeight < modalHeight) {
                $(`#${id} .modal-content`).css({'height':'100%', 'overflow-y':'scroll'})
            } else {
                $(`#${id} .modal-content`).css({'height':`${newSize}px`, 'overflow-y':'scroll'})
            }
        }, 310);
    }

    $(document).on('click', '.filter__title', function() {      
        displayModal('successModal')
    });

    
});
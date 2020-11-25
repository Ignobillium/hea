M.AutoInit();

$(document).ready(function(){

  jQuery(window).bind('load scroll', function(){var scroll = jQuery(window).scrollTop();var height = jQuery(window).height();if (scroll > height) {jQuery('.up-arrow').css({'opacity':'1','z-index':'2'});} else {jQuery('.up-arrow').css({'opacity':'0','z-index':'-1'});}});
  jQuery('.up-arrow').click(function () {jQuery('body,html').animate( { scrollTop: 0 }, 1000 );});
  
  $('.slider').slider({
    //indicators: false
    });
    
	$("materialboxed").materialbox();

	$('#mobile-menu').sidenav({
	    menuWidth: 300, // Default is 300
	    edge: 'right', // Choose the horizontal origin
	  });
	  
	$('#filter-menu').sidenav({
	    menuWidth: 300, // Default is 300
	    edge: 'left', // Choose the horizontal origin
	  });
	
  // $(document).on('click', '#slide-out .close, #slide-out .close-action', function() {$('.button-collapse').sideNav('hide');});
  
   
  $('.modal').modal({
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.        
        //console.log(modal, trigger);
        $('.close_modal, .close_modal_btn').show();
      },
    complete: function() {$('.close_modal, .close_modal_btn').hide();}
  });
  
  $('#modal_zapdetsad_success').modal('open');
  
  
  $('.grid').masonry({
    itemSelector: '.grid-item'
  });
  
  /*$('#tagsContainer').masonry({
    itemSelector: '.chip'
  });
  */
  
  $(document).on('click', '.close_modal, .close_modal_btn', function(){
     $('.modal').modal('close');
     $('.close_modal, .close_modal_btn').hide();
  });
  
  $(document).on('click', '.zoom_materialboxed', function(){
    $(this).parent().children('.materialboxed').click();
  });
  $(document).on('click', '.material-placeholder .close', function(){
    $(this).parent().children('.materialboxed').click();
  });
  
  $(document).on('click','.modal-trigger', function(){
    if($(this).attr('href')=='#modal2') {
      $('#modal2').attr('src',$(this).children(0).attr('src'));
      $('.close_modal, .modal2_text').show();
      $('.modal2_text').html($(this).attr('rel'));
      $('#modal2').load(function(){
        $('.close_modal').css('left',($(this).width()/2)+'px').css('opacity',1);
        $('.modal2_text').css('left','-'+($(this).width()/2)+'px').css('margin-top',$(this).height()+'px').css('opacity',1);
      });
    }
  });
  
  $(document).on('click','.close_modal, .modal-overlay', function(){
    $('.close_modal, .modal2_text').hide().css('opacity',0);
  });
  
  /*
  setTimeout(function(){
    $.ajax({
      url:"http://siteed.m24.ru/assist/bannersIndex.php/banners/ShowWidget/id/184/count/4",
      success:function (result) {$('#mosru').html(result);},
      error:function (result) {
          //$('#mosru').addClass('white-bg').addClass('empty_banner').html("Меня убил адблок :`(");
          $('#mosru').parent().hide();
          $('.ifBannerBlocked').show();
      }
    });
    }, 5*1000);
  */

  $(document).on('click','#refreshTags', function(){
    $.ajax({
      url:"/ajax.html?action=getNewsTags",
      success:function (result) {$('#tagsContainer').html(result);},
      error:function (result) {console.log(result);}
    });
  });
  
  
  
  
	var locationHash = window.location.hash.replace("#","");
	var mixFilter = locationHash?('.deputyDistrict-'+locationHash):'all';

  var filterList = {init: function () {
		$('.mix_container').mixItUp({
			selectors: {
				target: '.mix-item',
				filter: '.mix-filter'},
				load: {filter: mixFilter}
			})
		;}
	};
	filterList.init()
  
  
  $('.collapsible').collapsible({
	onOpen: function(el) {
		el.find('.collaps-text .text').html('Свернуть описание');
	},
	onClose: function(el) {
		el.find('.collaps-text .text').html('Развернуть описание');
	}
  });
  
  $(document).on('click','.search-button', function(){
    if( $('#search').val()) {
      $('#search_form').submit();
    } else {
      $('#search').val('').focus();
    }
    return false;
  });
  
  $(document).on('click','.search-button1', function(){
    if( $('#search1').val()) {
      $('#search_form1').submit();
    } else {
      $('#search1').val('').focus();
    }
    return false;
  });
  
  $(document).on('click', '#showMapBtn', function(){
      if(!mapFilled) return;
      showSovetniki('map');
      $('.btn-large').toggleClass('active');
  });
  $(document).on('click', '#showListBtn', function(){
      if(!mapFilled) return;
      showSovetniki('list');
      $('.btn-large').toggleClass('active');        
  });
    
  $(document).on('change', '.reception input[name="fizjur"]', function(){
    if($(this).attr('id') == 'fizjur_jur') {$('.jurfield').show()}
    else {$('.jurfield').hide()}
  });
  
  $(document).on('change', '.reception input[name="sendto"]', function(){
		if($(this).attr('id') == 'sendto_email') {
			$('.email_title .colorred').show();
			$('.zipcode_title .colorred, .address_title .colorred').hide();
			
			$('#email').parent().parent().show();
			
			$('#zipcode').val('');
			$('#zipcode').parent().parent().hide();
			$('#address').val('');
			$('#address').parent().parent().hide();
		}
		else {
			$('.email_title .colorred').hide();
			$('.zipcode_title .colorred, .address_title .colorred').show();
			
			$('#zipcode').parent().parent().show();			
			$('#address').parent().parent().show();
			
			$('#email').val('');
			$('#email').parent().parent().hide();
		}
	});
  
	$(document).on('click', '.show_reception', function(){
		$('html').scrollTop(0);
		$('.reception_text').hide();
		$('.reception').show();        
	});

	$(document).on('click', '.menuRow, #menu_blinder', function(){
		$ul = $(this).find('.collapsible');
		$li = $ul.children(0);
		if($li.length) {
			/*if($(this).hasClass('scrollable')) {
				console.log('collaps')
				console.log($ul);
				$ul.collapsible('close', 0);
			}
			console.log($li);*/
			if($li.hasClass('active')) {
				$('#menu_blinder').show();
				$('body').addClass('freeze');
				$(this).addClass('scrollable');
			}
			else {
				$('#menu_blinder').hide();
				$('body').removeClass('freeze');
				$(this).removeClass('scrollable');
			}
		}
	});
  
  $('#child_reg_1, #child_reg_2').click(function(){
  	$('#child_reg_1, #child_reg_2').prop('checked',false);
  	$(this).prop('checked',true);
  });
  
  
  $('#discounts').on('change', function(){
  	if($(this).val() == 1) {
  		$('#discounts_modal').modal('open');
	}
  });
  
  $('input[name="exemption"]').on('change',function(){
  	$('#exemption').html($(this).val());
  	$('#discounts_modal').modal('close');
  });
  
  
  
  //$('select').material_select();
  
	$('#addFileBtn').on('click', function(){
		let filesCnt = document.getElementsByName('files[]').length;
		if(filesCnt<5) {
			$('#filesContainer').append($('<div class="row"><div class="input-field col s12"><div class="file-field input-field"><input type="file" name="files[]"><input class="file-path browser-default" type="text"><a class="del-btn"><i class="fas fa-trash-alt"></i> Удалить</a></div></div></div>'));
			$('#filesContainer .row:last-child').find('[name="files[]"]').click();
		}
		if(filesCnt>=4) $(this).addClass('disabled');
	});
	
	$(document).on('click', '.file-field .del-btn', function(e){
		$(this).closest('.row').remove();
		$('#addFileBtn').removeClass('disabled');
	});
	
	let fileTypes = ['text/plain','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/rtf','application/mspowerpoint','application/mspowerpoint','image/x-pcx','audio/mpeg3','application/vnd.openxmlformats-officedocument.presentationml.presentation','application/pdf','image/bmp','image/png','image/tiff','image/gif','video/x-ms-wmv','video/quicktime','image/jpeg','image/jpeg','application/excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','audio/x-ms-wma','application/x-troff-msvideo','video/mp4','audio/mp4','audio/mpeg','video/x-matroska','video/x-flv','application/vnd.ms-excel'];
	
	$(document).on('change', '[type="file"]', function(e){
		let error = '';
		if(e.target.files[0].size>6000000) error = 'Максимальный размер файла - 5 МБ';
		else if(!~fileTypes.indexOf(e.target.files[0].type)) error = 'Недопустимый формат файла '+e.target.files[0].type;
		
		$row = $(this).closest('.row');
		if(error) {
			$row.addClass('fileError');
			console.log($row.find('.file-path'));
			setTimeout(function(){$row.find('.file-path').val(error);}, 10);
			$(this).files = null;
		}
		else {
			$row.removeClass('fileError');
		}
	});
	
	
});




$(function(){
  $(".card .activator").mouseover(function(){
    $(this).click();
  });
  $(".card").mouseout(function(e){
    //console.log(e.toElement);
    ps = $(e.toElement).parents('.card');
    if(ps.length == 0) {
      $(this).find(".card-title").click(); 
    } else {
    //console.log(ps);
    }
  });
  
  $(".slider-control-left").click(function() {
  	$('.slider').slider('prev');
  });
  
  $(".slider-control-right").click(function() {
  	$('.slider').slider('next');
  });
  
  
  
  $('.owl-carousel-banners').owlCarousel({
    autoplay: true,
    autoPlaySpeed: 1000,
    autoPlayTimeout: 1000,
    slideSpeed: 300,
    smartSpeed:700,        
    loop:true,
    margin:10,
    nav:true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  	autoWidth:true,
  	items:8
  });
  
  $('.owl-carousel-photos').owlCarousel({
    autoPlaySpeed: 1000,
    autoPlayTimeout: 1000,
    slideSpeed: 300,
    smartSpeed:700,        
    loop:true,
    margin:10,
    nav:true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
  	autoWidth:true,
  	items:4
  });
  
  /*$('.owl-carousel-photos').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive:{
        0:{items:1},
        600:{items:3},
        1000:{items:3}
    }
  });*/
  
  	$(window).on('scroll load', function(){
  		if($(this).scrollTop()>1100) {
  			$('.diamonds-container').css('top','0px');
		}
	});
	
  var dateFormat = "dd.mm.yy",
      from = $( ".doc_from" )
        .datepicker({
          dateFormat: dateFormat
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( ".doc_to" ).datepicker({
        dateFormat: dateFormat
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
    
    
	$('#checkForm').on('click', function(){
		let error = 0;
		if(!$('#lname').val()) {
			error = 1;
			$('#lname')[0].setCustomValidity('Заполните поле');
			$('#lname')[0].reportValidity('Заполните поле');
		}
		if(!$('#fname').val()) {
			error = 1;
			$('#fname')[0].setCustomValidity('Заполните поле');
			$('#fname')[0].reportValidity('Заполните поле');
		}
		
		if(!$('#text').val()) {
			error = 1;
			$('#text')[0].setCustomValidity('Заполните поле');
			$('#text')[0].reportValidity('Заполните поле');
		}
		
		if($('.reception input[name="sendto"]:checked').val() == 'sendto_email') {
			if(!(/[^@]+@[^\.]+\.[\w\d]+/.test($('#email').val()))) {
				error = 1;
				$('#email')[0].setCustomValidity('Заполните поле');
				$('#email')[0].reportValidity('Заполните поле');
			}
		}
		else {
			if(!$('#zipcode').val()) {
				error = 1;
				$('#zipcode')[0].setCustomValidity('Заполните поле');
				$('#zipcode')[0].reportValidity('Заполните поле');
			}
			if(!$('#address').val()) {
				error = 1;
				$('#address')[0].setCustomValidity('Заполните поле');
				$('#address')[0].reportValidity('Заполните поле');
			}
		}
		
		if(!error) {
			$(this).addClass('disabled');
			$('#recaptchaSubmit').trigger('click');
		}
	});
	
	$('#checkForm_zapnapr').on('click', function(){
		let error = 0;
		
		if(!$('#deputat').val()) {
			error = 1;
			$('#deputat')[0].setCustomValidity('Выберите депутата');
			$('#deputat')[0].reportValidity('Выберите депутата');
		}
		else if(!$('#lname').val()) {
			error = 1;
			$('#lname')[0].setCustomValidity('Заполните поле');
			$('#lname')[0].reportValidity('Заполните поле');
		}
		else if(!$('#fname').val()) {
			error = 1;
			$('#fname')[0].setCustomValidity('Заполните поле');
			$('#fname')[0].reportValidity('Заполните поле');
		}
		
		
		if(!error) $('#recaptchaSubmit').trigger('click');
	});
	
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var recaptchaOnloadCallback = function() {
  if(document.getElementById('recaptchaSubmit')) {
    grecaptcha.render('recaptchaSubmit', {
      'sitekey' : '6LcWms0UAAAAAJFA-ppZiGkZpu_j_EOp4bz-4wOt',
      'callback' : function(token) {document.getElementById("recaptchaForm").submit();}
    });
  }
};
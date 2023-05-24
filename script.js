$(document).ready(function () {
	// вешаем маску на телефон
	$('.phone-field').inputmask("+7(999)999-9999");
		
	// добавляем правило для валидации телефона
	jQuery.validator.addMethod("checkMaskPhone", function(value, element) {
		return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value); 
	});
	
	// получаем нашу форму по class
	let form = $('.form-request');
	
	// включаем валидацию в форме
	form.validate();
	
	// вешаем валидацию на поле с телефоном по классу
	$.validator.addClassRules({
		'phone-field': {
			checkMaskPhone: true,
		}
	});

	$('.form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
			message: {
				required: true
			},
			
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			
			message: {
				required: 'Поле не должно быть пустым'
			},
			
		},
		
		submitHandler: function (form) {
			ajaxFormSubmit();
		}


	});

	//*************************************************** */
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {


		let string = $(".form").serialize(); // Соханяем данные введенные в форму в строку.


		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			 // Функция, если все прошло успешно
			 success: function(response) {
				$(".form").slideUp(800);
				$('#answer').html(response);
				 // Преобразуем данные формы в объект JavaScript
				 var formData = $(".form").serializeArray();

				 // Преобразуем объект JavaScript в формат JSON
				 var jsonData = JSON.stringify(formData);
		
				// Создаем ссылку для скачивания файла anyName.json
				var downloadLink = $('<a>')
                .attr('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonData))
                .attr('download', 'anyName.json')
                .text('Скачать файл');

            	$('#answer').append(downloadLink);
        	},

			  error: function() {
				// Ошибка отправки формы
				$('#answer').text('Ошибка отправки формы.');
			  }
			
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	}


});

	// код для открытия и закрытия модального окна

function closeModal() {
	const openModalBtn = $('#openModalBtn');
	const modal = $('#modal');
  
	openModalBtn.on('click', function() {
	  modal.css('display', 'block');
	});
  
	modal.on('click', function(event) {
	  if (event.target === modal.get(0)) {
		modal.css('display', 'none');
	  }
	});


}

closeModal ();


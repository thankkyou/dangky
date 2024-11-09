
function Validator (options) {

    //Hàm thự hiện validate
    function validate(inputElement, rule) {
        
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
                  
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
            inputElement.parentElement.classList.remove('success');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
            inputElement.parentElement.classList.add('success');
        }
    }

    //lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    if (formElement) {

        options.rules.forEach(function(rule){
            
            var inputElement = formElement.querySelector(rule.selector);
         
            if (inputElement) {
                // xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                }

                //xử lý mỗi khi người dùng nhập
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }

        }) ;
    }

}

Validator.isRequired = function(selector) {
     return {
        selector: selector, 
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này'
        }
     };
}

Validator.isEmail = function(selector) {
    return {
        selector: selector, 
        test: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập đúng định dạng email';
        }
     };
}

Validator.minLength = function(selector, min) {
    return {
        selector: selector, 
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
     };
} 

Validator.isConfirmed = function (selector, getConfirmValue) {
    return{
        selector: selector,
        test: function (value) {
            return value === getConfirmValue () ? undefined : 'Giá trị nhập vào không chính xác';
        }
    }
}


const formRows = document.querySelectorAll('.form-group');
const container = document.querySelector('.main');
const submitbox = document.querySelector('.box-submit');

let arrFormRows = Array.from(formRows);


let form1 = document.getElementById('form-1');

form1.addEventListener('submit', (e)=>{
    e.preventDefault();
    let isValid = true;
    arrFormRows.forEach(item => {
        if (!item.classList.contains('success')) isValid = false;
    })

    if (isValid) {
        container.classList.add('complete');
        submitbox.classList.remove('boxinvalid');
        submitbox.classList.add('show', 'boxvalid');
        submitbox.innerText = ("Bạn đã tạo tài khoản thành công.");
        
    } else {
        container.classList.remove('complete');
        submitbox.classList.remove('boxinvalid');
        submitbox.classList.add('show', 'boxinvalid', 'blink-red');
        setTimeout(function() {
            submitbox.classList.remove('blink-red');
        }, 200);
        submitbox.innerText = 'Bạn nhập sai hoặc còn trường trống chưa nhập.';
    }
}); 
function Validator (options) {

    //Hàm thự hiện validate
    function validate(inputElement, rule) {
        
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);
                  
        if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
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
function Validator (options) {
    var formElement = document.querySelector(options.form);

    if (formElement) {

        options.rules.forEach(function(rule){
            
            var inputElement = formElement.querySelector(rule.selector);

            if (inputElement) {
                inputElement.onblur = function
            }

        }) ;
    }

}

Validator.isRequired = function() {
     return {
        selector: selector, 
        test: function() {

        }
     };
}

Validator.isEmail = function() {
    return {
        selector: selector, 
        test: function() {

        }
     };
}
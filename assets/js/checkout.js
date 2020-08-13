jQuery(document).ready(function () {
    jQuery('.wc-isbank-checkout').submit(function (e) {
        e.preventDefault();
        e.stopPropagation();

        let _form = jQuery(this);

        if (_form.is('.processing')) {
            return false;
        }

        _form.addClass('processing');

        _form.block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });

        jQuery.ajax({
            type: 'POST',
            url: wc_checkout_params.ajax_url,
            data: {
                action: 'validate_isbank_form',
                pan: _form.find('input[name="pan"]').val(),
                card_cvc: _form.find('input[name="cv2"]').val(),
                card_expriy: _form.find('input[name="isbank-card-expiry"]').val()
            },
            dataType: 'json',
            success: function (result) {
                if ('success' === result.result) {

                    let card_expriy_field = _form.find('input[name="isbank-card-expiry"]');
                    let card_expriy = card_expriy_field.val().split(' / ');
                    card_expriy_field.remove();

                    _form.find('#wc-isbank-cc-form').append('<input type="hidden" value="' + card_expriy[0] + '" name="Ecom_Payment_Card_ExpDate_Month">');
                    _form.find('#wc-isbank-cc-form').append('<input type="hidden" value="' + card_expriy[1] + '" name="Ecom_Payment_Card_ExpDate_Year">');

                    e.currentTarget.submit();
                } else if ('failure' === result.result) {
                    submit_error(result.msg);
                }
            },
            error: function (result) {
            }
        });
    });

    function submit_error(error_message) {
        let _form = jQuery('.wc-isbank-checkout');
        jQuery('.woocommerce-NoticeGroup-checkout, .woocommerce-error, .woocommerce-message').remove();
        _form.prepend('<div class="woocommerce-NoticeGroup woocommerce-NoticeGroup-checkout"><ul class="woocommerce-error"><li>' + error_message + '</li></ul></div>');
        _form.removeClass('processing').unblock();
        _form.find('.input-text, select, input:checkbox').trigger('validate').blur();
        jQuery('html, body').animate({
            scrollTop: (jQuery('form.wc-isbank-checkout').offset().top - 100)
        }, 1000);
        jQuery(document.body).trigger('checkout_error');
    }
});

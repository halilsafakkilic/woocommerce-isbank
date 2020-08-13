<?php

if (!defined('ABSPATH')) {
    exit;
}

class WC_Isbank_Gateway_Fields
{

    public static function init_fields()
    {
        return [
            'enabled'           => [
                'title' => __('Aktif/Deaktif', 'wc-isbank'),
                'type'  => 'checkbox',
                'label' => __('İş Bankası Sanal Pos etkinleştir', 'wc-isbank')
            ],
            'test'              => [
                'title' => __('Test ortamını kullan', 'wc-isbank'),
                'type'  => 'checkbox'
            ],
            'client_id'         => [
                'title' => __('Üye İş Yeri No', 'wc-isbank'),
                'type'  => 'text'
            ],
            'store_key'         => [
                'title' => __('3D Anahtarı', 'wc-isbank'),
                'type'  => 'text'
            ],
            'api_user'          => [
                'title' => __('API Kullanıcı Adı', 'wc-isbank'),
                'type'  => 'text'
            ],
            'api_user_password' => [
                'title' => __('API Kullanıcı Parolası', 'wc-isbank'),
                'type'  => 'password'
            ]
        ];
    }

}

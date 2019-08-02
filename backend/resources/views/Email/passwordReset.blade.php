@component('mail::message')
# Reset Password

To reset password, please click below button

@component('mail::button', [
'url' => 'http://localhost:4200/password-reset/?token=' . $token 
])
Reset Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent

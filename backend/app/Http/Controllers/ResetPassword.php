<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Http\Response;
use Mail;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\Hash;

class ResetPassword extends Controller
{
    public function sendPasswordResetLink(Request $request){
    	//return $request->email; 
        if(!$this->validatedAuthEmail($request->email)){
            return response()->json(['error' => 'This email isn\'t registered!'], Response::HTTP_NOT_FOUND);
        }
        $token = $this->createToken($request->email);
        //dd($token);
        Mail::to($request->email)->send(new ResetPasswordMail($token));
        return response()->json(['data' => 'Reset password link is mailed to your email. Please check your inox.'], 202);
    }

    public function validatedAuthEmail($email){
        return !!User::where('email', $email)->first();
    }


    public function createToken($email){
    	$oldToken = DB::table('password_resets')->where('email', $email)->first();
    	if($oldToken){
    		return $oldToken->token;
    	}
    	$newToken = str_random(60);
    	DB::table('password_resets')->insert([
    		'email' => $email,
    		'token' => $newToken,
    		'created_at' => Carbon::now()
    	]);
    	return $newToken;
    }

    public function changeUserPassword(ChangePasswordRequest $request) {
        //dd($request->all());
        return $this->getPasswordResetTableRow($request)->count() > 0 ? $this->changePassword($request) : $this->tokenNotFoundResponse();
    }

    private function getPasswordResetTableRow($request) {
        return DB::table('password_resets')->where(['email' => $request->email, 'token' => $request->resetToken ]);
    }

    private function changePassword($request) {
        $user = User::whereEmail($request->email)->first();
        $user->update([
            'password' => Hash::make($request->password)
        ]);
        $this->getPasswordResetTableRow($request)->delete();
        return response()->json(['data' => 'Password changed successfully!'], Response::HTTP_CREATED);
    }

    private function tokenNotFoundResponse() {
        return response()->json(['error' => 'Error occured due to invalid email or token!'], Response::HTTP_UNPROCESSABLE_ENTITY);
    }
}

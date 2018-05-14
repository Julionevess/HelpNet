package com.jns.questoesgp.util;

import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.jns.questoesgp.model.Answer;
import com.jns.questoesgp.model.Question;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class SharedPreferenceUtil {

    public static final String MyPREFERENCES = "MyPrefs";
    public static final String CPF = "cpf";

    public static void setCPF(Context context, String cpf){
        SharedPreferences.Editor editor = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE).edit();
        editor.putString(CPF, cpf);
        editor.commit();
    }

    public static String getCPF(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        String cpf = prefs.getString(CPF, "");
        return cpf;
    }

}

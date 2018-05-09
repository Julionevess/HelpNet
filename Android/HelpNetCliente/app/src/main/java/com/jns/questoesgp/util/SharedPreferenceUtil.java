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
    public static final String LIST_QUESTIONS = "listQuestion";
    public static final String LIST_ANSWERS = "listAnswers";
    public static final String TOTAL_QUESTIONS = "totalQuestions";

    public static List<Question> getListQuestion(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        Gson gson = new Gson();
        String json = prefs.getString(LIST_QUESTIONS, null);
        Type listType = new TypeToken<ArrayList<Question>>(){}.getType();
        return gson.fromJson(json, listType);
    }

    public static void setListQuestion(Context context, List<Question> listQuestion) {
        SharedPreferences.Editor editor = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE).edit();
        Gson gson = new Gson();
        gson.toString();
        String json = new Gson().toJson(listQuestion);
        editor.putString(LIST_QUESTIONS, json);
        editor.commit();
    }

    public static void setListAnswer(Context context, List<Answer> listAnswers){
        SharedPreferences.Editor editor = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE).edit();
        Gson gson = new Gson();
        gson.toString();
        String json = new Gson().toJson(listAnswers);
        editor.putString(LIST_ANSWERS, json);
        editor.commit();
    }

    public static List<Answer> getListAnswers(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        Gson gson = new Gson();
        String json = prefs.getString(LIST_ANSWERS, null);
        Type listType = new TypeToken<ArrayList<Answer>>(){}.getType();
        return gson.fromJson(json, listType);
    }

    public static void setTotalQuestions(Context context, int totalQuestion){
        SharedPreferences.Editor editor = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE).edit();
        editor.putInt(TOTAL_QUESTIONS, totalQuestion);
        editor.commit();
    }

    public static Integer getTotalQuestions(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(MyPREFERENCES, Context.MODE_PRIVATE);
        Integer totalQuestions = prefs.getInt(TOTAL_QUESTIONS, 0);
        return totalQuestions;
    }

}

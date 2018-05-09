package com.jns.questoesgp.questoesgp;

import android.content.Context;
import android.support.test.InstrumentationRegistry;
import android.support.test.runner.AndroidJUnit4;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.jns.questoesgp.model.Question;
import com.jns.questoesgp.util.SharedPreferenceUtil;
import com.jns.questoesgp.util.Util;

import org.junit.Test;
import org.junit.runner.RunWith;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

/**
 * Instrumentation test, which will execute on an Android device.
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
@RunWith(AndroidJUnit4.class)
public class ExampleInstrumentedTest {

    public static List<Question> questionsAll;
    public static List<String> options;

    @Test
    public void useAppContext() throws Exception {

        Context appContext = InstrumentationRegistry.getTargetContext();
        catchAllQuestions(appContext);

        SharedPreferenceUtil.setListQuestion(appContext, questionsAll);

        List<Question> listQuestion = SharedPreferenceUtil.getListQuestion(appContext);

        options = Util.unsortedList(listQuestion.get(0));


        assertEquals("com.jns.questoesgp.questoesgp", appContext.getPackageName());
    }

    public static void catchAllQuestions(Context context) {
        questionsAll = new ArrayList<Question>();
        JsonReader reader;
        try {
            InputStream inputStream = context.getResources().openRawResource(R.raw.questions);
            reader = new JsonReader(new InputStreamReader(inputStream, "UTF-8"));
            Gson gson = new Gson();
            Type usuariosListType = new TypeToken<ArrayList<Question>>(){}.getType();
            questionsAll = gson.fromJson(reader, usuariosListType);


        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }


}

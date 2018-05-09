package com.jns.questoesgp.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;
import com.jns.questoesgp.model.Answer;
import com.jns.questoesgp.model.Question;
import com.jns.questoesgp.questoesgp.R;
import com.jns.questoesgp.util.BaseActivity;
import com.jns.questoesgp.util.SharedPreferenceUtil;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class MainActivity extends BaseActivity implements View.OnClickListener {

    private static final String CATEGORY_INTEGRATION = "Integração";
    private static final String CATEGORY_SCOPE = "Escopo";
    private static final String CATEGORY_COSTE = "Custo";
    private static final String CATEGORY_QUALITY = "Qualidade";
    private static final String CATEGORY_ACQUISITION = "Aquisição";
    private static final String CATEGORY_RESOURCE = "Recurso";
    private static final String CATEGORY_COMMUNICATION = "Comunicação";
    private static final String CATEGORY_RISK = "Risco";
    private static final String CATEGORY_SCHEDULE = "Cronograma";
    private static final String CATEGORY_STAKEHOLDER = "Partes interessadas";
    private static final String CATEGORY_ALL_SUBJECT = "Todos os assuntos";

    public static Context context;

    public static int totalQuestionSelected = 7;
    public static List<Question> questionsSelected;
    public static List<Question> questionsAll;
    public static List<Question> questionsByCategory;
    public static String Category;


    private void init() {
        context = this;
        SharedPreferenceUtil.setTotalQuestions(context, totalQuestionSelected);
    }

    /*
     * Catch all json questions
     */

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
    /*
     * Select questions to play
     */
    public static void catchSelectedQuestions(){
        catchAllQuestions(context);
        questionsSelected = new ArrayList<Question>();
        Random r = new Random();
        for (int i = 0 ; i < totalQuestionSelected ; i++){
            questionsSelected.add(questionsAll.get(r.nextInt(totalQuestionSelected)));
        }
    }

    /*
     * Select question by category to play
     */
    public static void catchSelectedQuestionsByCategory(String category){
        catchAllQuestions(context);
        questionsSelected = new ArrayList<Question>();
        Random r = new Random();
        for (int i = 0 ; i < totalQuestionSelected ; i++){

            Question categorizedQuestion = questionsAll.get(r.nextInt(totalQuestionSelected));
            if (categorizedQuestion.getCategory().equals(category)){
                questionsSelected.add(categorizedQuestion);
            }
        }
        SharedPreferenceUtil.setListQuestion(context, questionsSelected);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        init();
        CardView cardIntegration = (CardView) findViewById(R.id.cardIntegration);
        CardView cardScope = (CardView) findViewById(R.id.cardScope);
        CardView cardAllSubject = (CardView) findViewById(R.id.cardAllSubject);
        CardView cardAquisition = (CardView) findViewById(R.id.cardAquisition);
        CardView cardCode = (CardView) findViewById(R.id.cardCode);
        CardView cardComunication = (CardView) findViewById(R.id.cardComunication);
        CardView cardCost = (CardView) findViewById(R.id.cardCost);
        CardView cardResources = (CardView) findViewById(R.id.cardResources);
        CardView cardRisk = (CardView) findViewById(R.id.cardRisk);
        CardView cardSchedule = (CardView) findViewById(R.id.cardSchedule);
        CardView cardQuality = (CardView) findViewById(R.id.cardQuality);
        CardView cardStackholders = (CardView) findViewById(R.id.cardStackholders);

        cardIntegration.setOnClickListener(this);
        cardScope.setOnClickListener(this);
        cardAllSubject.setOnClickListener(this);
        cardAquisition.setOnClickListener(this);
        cardCode.setOnClickListener(this);
        cardComunication.setOnClickListener(this);
        cardCost.setOnClickListener(this);
        cardResources.setOnClickListener(this);
        cardRisk.setOnClickListener(this);
        cardSchedule.setOnClickListener(this);
        cardQuality.setOnClickListener(this);
        cardStackholders.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.cardIntegration) {
            catchSelectedQuestionsByCategory(CATEGORY_INTEGRATION);
            SharedPreferenceUtil.getListQuestion(context);
            final Intent intent = new Intent(context, QuestionsActivity.class);
            intent.putExtra("totalQuestions", totalQuestionSelected);//TODO passar aqui a quantidade desejada de questoes
            startActivity(intent);
        } else if (v.getId() == R.id.cardScope) {
//            catchSelectedQuestionsByCategory(CATEGORY_SCOPE);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardAquisition) {
//            catchSelectedQuestionsByCategory(CATEGORY_ACQUISITION);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardCode) {
//            catchSelectedQuestionsByCategory(CATEGORY_);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardComunication) {
//            catchSelectedQuestionsByCategory(CATEGORY_COMMUNICATION);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardCost) {
//            catchSelectedQuestionsByCategory(CATEGORY_COSTE);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardResources) {
//            catchSelectedQuestionsByCategory(CATEGORY_RESOURCE);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardRisk) {
//            catchSelectedQuestionsByCategory(CATEGORY_RISK);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardSchedule) {
//            catchSelectedQuestionsByCategory(CATEGORY_SCHEDULE);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardQuality) {
//            catchSelectedQuestionsByCategory(CATEGORY_QUALITY);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardStackholders) {
//            catchSelectedQuestionsByCategory(CATEGORY_STAKEHOLDER);
            showSnackMessage(R.string.msg_category_is_empty);
        } else if (v.getId() == R.id.cardAllSubject) {
//            catchSelectedQuestionsByCategory(CATEGORY_ALL_SUBJECT);
            showSnackMessage(R.string.msg_category_is_empty);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}

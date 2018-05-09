package com.jns.questoesgp.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.jns.questoesgp.adapter.AnswerAdapter;
import com.jns.questoesgp.model.Answer;
import com.jns.questoesgp.model.Question;
import com.jns.questoesgp.questoesgp.R;
import com.jns.questoesgp.util.SharedPreferenceUtil;

import java.util.Arrays;
import java.util.List;

public class AnswerActivity extends AppCompatActivity implements SwipeRefreshLayout.OnRefreshListener{

    public static final String CURRENT_PAGE = "currentPage";
    private static final String CORRECT = "Certo";
    private static final String WRONG = "Errado";

    private AnswerAdapter adapter;
    private RecyclerView recyclerView;
    private SwipeRefreshLayout swipeRefreshLayout;
    private TextView tvAnswerTitle;
    private TextView tvAnswerCorrect;
    private TextView tvAnswerWrong;
    private Button btnSendEmail;
    public Answer[] answers;
    public List<Question> questions;
    public Context context;
    public int currentPage;
    private Integer totalQuestions;
    private TextView tvStart;
    int countCorrect;
    int countWrong;

    /*
     * Correct Questions
    */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_answer);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        init();

        adapter = new AnswerAdapter(this);
        adapter.setItems(Arrays.asList(answers));

        recyclerView = (RecyclerView) findViewById(R.id.recycler_view);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(context));
        recyclerView.swapAdapter(adapter, true);

        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipeRefreshLayout);
        swipeRefreshLayout.setColorSchemeColors(ContextCompat.getColor(this, R.color.colorAccent),
                ContextCompat.getColor(this, R.color.colorPrimaryDark));
        swipeRefreshLayout.setOnRefreshListener(this);
        swipeRefreshLayout.setRefreshing(false);

        btnSendEmail = (Button) findViewById(R.id.btnSendEmail);
        btnSendEmail.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email[] = new String[1];
                email[0] = "julionevess@gmail.com";
                composeEmail(email, "Resposta do Questionário");
            }
        });

        tvStart = (TextView) findViewById(R.id.tvStart);
        tvStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(intent);
            }
        });

        tvAnswerTitle = (TextView) findViewById(R.id.tvAnswerTitle);
        tvAnswerCorrect = (TextView) findViewById(R.id.tvAnswerCorrect);
        tvAnswerWrong = (TextView) findViewById(R.id.tvAnswerWrong);

        checkAnswer();
    }

    private void checkAnswer(){
        countCorrect = 0 ;
        countWrong = 0 ;

        for (Answer answer:answers) {
            if (answer.getAnswer().equals(answer.getCorrectAnswer())){
                countCorrect++;
            }else{
                countWrong++;
            }
        }

        if (countCorrect == 0 ){
            tvAnswerCorrect.setText("Você não acertou nenhuma questão");
        }else if (countCorrect == 1 ){
            tvAnswerCorrect.setText("Você acertou " + countCorrect + " questão");
        }else{
            tvAnswerCorrect.setText("Você acertou " + countCorrect + " questões");
        }
        if (countWrong == 0){
            tvAnswerWrong.setText("Você não errou nenhuma questão");
        }else if(countWrong == 1){
            tvAnswerWrong.setText("Você errou " + countWrong  + " questão");
        }else{
            tvAnswerWrong.setText("Você errou " + countWrong  + " questões");
        }
    }

    private void init() {

        context = this;
        Bundle b = getIntent().getExtras();
        currentPage = -1;
        if(b != null) {
            currentPage = b.getInt(CURRENT_PAGE);
            currentPage++;
        }
        totalQuestions = SharedPreferenceUtil.getTotalQuestions(context);
        answers = new Answer[totalQuestions];
        answers = (SharedPreferenceUtil.getListAnswers(context)).toArray(answers);

    }

    public void composeEmail(String[] addresses, String subject){//, Uri attachment) {
        Intent intent = new Intent(Intent.ACTION_SEND);
        intent.setType("*/*");
        intent.putExtra(Intent.EXTRA_EMAIL, addresses);
        intent.putExtra(Intent.EXTRA_SUBJECT, subject);
//        intent.putExtra(Intent.EXTRA_STREAM, attachment);
        if (intent.resolveActivity(getPackageManager()) != null) {
            startActivity(intent);
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
//        getMenuInflater().inflate(R.menu.menu_main, menu);
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

    @Override
    public void onRefresh() {
        //TODO implementar
        swipeRefreshLayout.setRefreshing(false);
    }
}

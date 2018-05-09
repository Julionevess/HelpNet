package com.jns.questoesgp.activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import com.jns.questoesgp.model.Answer;
import com.jns.questoesgp.model.Question;
import com.jns.questoesgp.questoesgp.R;
import com.jns.questoesgp.util.AndroidUtil;
import com.jns.questoesgp.util.SharedPreferenceUtil;
import com.jns.questoesgp.util.Util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class QuestionsActivity extends AppCompatActivity implements View.OnClickListener {

	private TextView tvQuestion;
	private TextView tvGiveUp;

	public Answer answers[];
	public List<Question> questions;
	public int currentPage = 0;

	public Question selectedQuestion;
	public List<String> options;
	private Answer answer;
	private Answer selectedAnswer;
	private HashMap<Integer, String> optionsViews;
	private boolean isLastQuestion = false;
	private boolean isFirstQuestion = false;
	private int totalQuestions;
	private Button btnBack;
	private Button btnNext;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_questions);
		Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
		setSupportActionBar(toolbar);

		tvQuestion = (TextView) findViewById(R.id.tvQuestion);
		tvGiveUp = (TextView) findViewById(R.id.tvGiveUp);
		tvGiveUp.setOnClickListener(this);

		btnNext = (Button) findViewById(R.id.btnNext);
		btnBack = (Button) findViewById(R.id.btnBack);

		btnBack.setOnClickListener(this);
		btnNext.setOnClickListener(this);
	}

	@Override
	protected void onStart() {
		super.onStart();

		totalQuestions = getIntent().getExtras().getInt("totalQuestions");
		answers = new Answer[totalQuestions];
		renderQuestion();
	}

	private void renderQuestion() {

		isLastQuestion = totalQuestions == (currentPage + 1);
		isFirstQuestion = currentPage == 0;

		if (isLastQuestion)
			btnNext.setText("Entregar o questionário");
		else
			btnNext.setText("Next");
		if (isFirstQuestion)
			btnBack.setVisibility(View.INVISIBLE);
		else
			btnBack.setVisibility(View.VISIBLE);

		questions = SharedPreferenceUtil.getListQuestion(getApplicationContext());
		if (questions.size() > 0) {
			selectedQuestion = questions.get(currentPage);
		}
		answer = new Answer();
		answer.setQuestion(questions.get(currentPage).getQuestion());
		answer.setCorrectAnswer(questions.get(currentPage).getAnswer());

		optionsViews = new HashMap<>();

		TextView tvQuestionNumber = (TextView) findViewById(R.id.tvQuestionNumber);
		tvQuestionNumber.setText(getString(R.string.question_number, String.valueOf(currentPage + 1)));

		populateAnswerOptions();
	}

	private void populateAnswerOptions() {
		RadioGroup rgOptions = (RadioGroup) findViewById(R.id.rgOptions);
		rgOptions.clearCheck();
		rgOptions.removeAllViews();


		rgOptions.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
			@Override
			public void onCheckedChanged(RadioGroup group, int checkedId) {
				final String answer = optionsViews.get(checkedId);
				QuestionsActivity.this.answer.setAnswer(answer);
			}
		});
		options = Util.unsortedList(selectedQuestion);
		tvQuestion.setText(selectedQuestion.getQuestion());

		int id = 0;
		for (String option : options) {
			final RadioButton rb = createRadioButton(rgOptions);
			rb.setText(option);
			rb.setId(id);
			rgOptions.addView(rb);
			optionsViews.put(id, option);
			id++;
			if (selectedAnswer != null && selectedAnswer.getAnswer() != null && selectedAnswer.getAnswer().equals(option)) {
				rb.setChecked(true);
			} else {
				rb.setChecked(false);
			}
		}

	}

	private RadioButton createRadioButton(RadioGroup viewGroup) {
		final LayoutInflater layoutInflater = getLayoutInflater();
		return (RadioButton) layoutInflater.inflate(R.layout.radio_button_item, viewGroup, false);
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
	public void onClick(View v) {

		if (v.getId() == R.id.btnNext) {

		    if (answer != null){
                answers[currentPage] = answer;
            }

			if (handleLastQuestion())
				return;

			SharedPreferenceUtil.setListAnswer(getApplicationContext(), Arrays.asList(answers));
			currentPage++;
			selectedAnswer = answers[currentPage];

			renderQuestion();

		} else if (v.getId() == tvGiveUp.getId()) {
			Intent intent = new Intent(getApplicationContext(), MainActivity.class);
			intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
			startActivity(intent);
		} else if (v.getId() == R.id.btnBack) {
            if (answer != null){
                answers[currentPage] = answer;
            }
			if (currentPage > 0) {
				currentPage--;
				selectedAnswer = answers[currentPage];
				renderQuestion();
			}
		}
	}

	private boolean handleLastQuestion() {
		if (isLastQuestion) {

			if (!hasAllAnswerFilled()) {
				AndroidUtil.showMessageOK(QuestionsActivity.this, getString(R.string.msg_fill_all_questions));
			} else {
				SharedPreferenceUtil.setListAnswer(getApplicationContext(), Arrays.asList(answers));
				startActivity(new Intent(getApplicationContext(), AnswerActivity.class));
				finish();
			}
			return true;
		}
		return false;
	}

	private boolean hasAllAnswerFilled() {
		for (Answer answer : answers) {
			if (answer.getAnswer() == null || answer.getAnswer().trim().equals("")) {
				return false;
			}
		}
		return true;
	}
}

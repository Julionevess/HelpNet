package com.jns.questoesgp.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.CardView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.jns.questoesgp.questoesgp.R;
import com.jns.questoesgp.util.BaseActivity;
import com.jns.questoesgp.util.SharedPreferenceUtil;
import com.weiwangcn.betterspinner.library.BetterSpinner;

import java.util.ArrayList;
import java.util.List;

public class RecordOccurrence extends BaseActivity implements View.OnClickListener {

	private BetterSpinner spProblem;
	private List<String> problems;
	private Button btnSend;
	private Button btnSearchCPF;
	private Button btnAbort;
	private TextView tvToobar;
	private EditText etCpf;
	private LinearLayout llAction;

	private CardView cvProblem;
	private CardView cvIdentify;
	Context context;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_record_occurrence);
		Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
		setSupportActionBar(toolbar);

		spProblem = (BetterSpinner) findViewById(R.id.spProblem);
        btnSend = (Button) findViewById(R.id.btnSend);
        btnAbort = (Button) findViewById(R.id.btnAbort);
        btnSearchCPF = (Button) findViewById(R.id.btnSearchCPF);
        cvProblem = (CardView) findViewById(R.id.cvProblem);
        cvIdentify = (CardView) findViewById(R.id.cvIdentify);
        llAction = (LinearLayout) findViewById(R.id.llAction);
        tvToobar = (TextView) findViewById(R.id.tvToobar);
        etCpf = (EditText) findViewById(R.id.etCpf);

        btnSend.setOnClickListener(this);
        btnAbort.setOnClickListener(this);
        btnSearchCPF.setOnClickListener(this);

		init();

	}

	@Override
	protected void onStart() {
		super.onStart();
	}

	private void init(){
		context = this;
		getProblems();
        //getProviders();

        if (userIsLoged()){
            tvToobar.setVisibility(View.VISIBLE);
            cvIdentify.setVisibility(View.GONE);
            cvProblem.setVisibility(View.VISIBLE);
            llAction.setVisibility(View.VISIBLE);
        }else{
            tvToobar.setVisibility(View.INVISIBLE);
            cvIdentify.setVisibility(View.VISIBLE);
            cvProblem.setVisibility(View.INVISIBLE);
            llAction.setVisibility(View.INVISIBLE);
        }
	}

	private boolean userIsLoged(){
        if (SharedPreferenceUtil.getCPF(context) != null && !SharedPreferenceUtil.getCPF(context).equals("")){
            return true;
        }else{
            return false;
        }
    }

	private void getProblems(){

        problems = new ArrayList<String>();
		problems.add("Patiu o fio");
		problems.add("Sem internet");
		problems.add("Internet lenta");

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, R.layout.spinner_layout, problems);
        spProblem = (BetterSpinner) findViewById(R.id.spProblem);;
        spProblem.setAdapter(adapter);
	}

//    private void getProviders(){
//
//        providers = new ArrayList<String>();
//        providers.add("HOF - Homar Net");
//        providers.add("OI");
//        providers.add("Minha NET");
//
//        ArrayAdapter<String> adapter = new ArrayAdapter<String>(context, android.R.layout.activity_list_item, providers);
//        adapter.setDropDownViewResource(android.R.layout.activity_list_item);
//        spProvider.setAdapter(adapter);
//    }

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

    private boolean formValided(){

	    if (!spProblem.getText().toString().equals("")){
	       return true;
        }
	    return false;
    }

	@Override
	public void onClick(View v) {

        if (v.getId() == btnSend.getId()) {
            if (formValided()) {
                final Intent intent = new Intent(context, ConfirmOSActivity.class);
                startActivity(intent);
            }else{
                showSnackMessage(R.string.withoutProblem);
            }
        }else if (v.getId() == btnAbort.getId()) {
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK|Intent.FLAG_ACTIVITY_NEW_TASK);
            finish();
        }else if (v.getId() == btnSearchCPF.getId()) {
            cvProblem.setVisibility(View.VISIBLE);
            cvIdentify.setVisibility(View.GONE);
            llAction.setVisibility(View.VISIBLE);
            SharedPreferenceUtil.setCPF(context, etCpf.getText().toString());
            tvToobar.setVisibility(View.VISIBLE);
        }
	}


}

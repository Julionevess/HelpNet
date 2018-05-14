package com.jns.questoesgp.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.jns.questoesgp.questoesgp.R;
import com.jns.questoesgp.util.Constants;
import com.jns.questoesgp.util.SharedPreferenceUtil;

public class ConfirmOSActivity extends AppCompatActivity implements View.OnClickListener{


    private Button btnClose;
    public Context context;
    private TextView tvToobar;

    /*
     * Correct Questions
    */

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_confirm_os);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        btnClose = (Button) findViewById(R.id.btnClose);
        btnClose.setOnClickListener(this);
        tvToobar = (TextView) findViewById(R.id.tvToobar);

        init();

    }

    private void init() {
        context = this;

        if (userIsLoged()){
            tvToobar.setVisibility(View.VISIBLE);
        }else{
            tvToobar.setVisibility(View.INVISIBLE);
        }
    }
    private boolean userIsLoged(){
        if (SharedPreferenceUtil.getCPF(context) != null && !SharedPreferenceUtil.getCPF(context).equals("")){
            return true;
        }else{
            return false;
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
    public void onClick(View v) {
        if (v.getId() == R.id.btnClose) {
            Intent intent = new Intent(getApplicationContext(), MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK|Intent.FLAG_ACTIVITY_NEW_TASK);
            intent.putExtra(Constants.ORIGIN_ACTIVITY, Constants.CONFIRMED);
            finishAffinity();
        }
    }
}

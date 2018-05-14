package com.jns.questoesgp.activities;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import com.jns.questoesgp.questoesgp.R;
import com.jns.questoesgp.util.BaseActivity;
import com.jns.questoesgp.util.Constants;

public class MainActivity extends BaseActivity implements View.OnClickListener {

    public static Context context;
    private CardView cvOpenOS;

    private void init() {
        context = this;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        init();

        cvOpenOS = (CardView) findViewById(R.id.cvOpenOS);
        cvOpenOS.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == cvOpenOS.getId()) {
            final Intent intent = new Intent(context, RecordOccurrence.class);
            startActivity(intent);
        }
    }

    @Override
    protected void onStart() {
        super.onStart();
        handleBundle();
    }


    private void handleBundle() {
        Intent intent = getIntent();
        String origin = intent.getStringExtra(Constants.ORIGIN_ACTIVITY);
        if (origin != null && origin.equals(Constants.CONFIRMED)){
               finish();
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

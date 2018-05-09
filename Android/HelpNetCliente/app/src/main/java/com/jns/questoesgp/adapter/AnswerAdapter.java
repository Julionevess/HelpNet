package com.jns.questoesgp.adapter;

import android.app.Activity;
import android.support.v4.graphics.drawable.RoundedBitmapDrawable;
import android.support.v4.graphics.drawable.RoundedBitmapDrawableFactory;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.jns.questoesgp.adapter.holders.AnswerViewHolders;
import com.jns.questoesgp.model.Answer;
import com.jns.questoesgp.questoesgp.R;

import java.util.List;

public class AnswerAdapter extends RecyclerView.Adapter<AnswerViewHolders> {

    private Activity activity;
    private List<Answer> items;
    private RoundedBitmapDrawable circularBitmapDrawable;

    public AnswerAdapter(Activity activity) {
        this.activity = activity;
    }

    @Override
    public AnswerViewHolders onCreateViewHolder(ViewGroup parent, int viewType) {

        View layoutView = LayoutInflater.from(parent.getContext()).inflate(R.layout.
                answer_item, null);
        return new AnswerViewHolders(activity, layoutView, this);
    }

    @Override
    public void onBindViewHolder(final AnswerViewHolders holder, final int position) {

        final Answer holderItem = items.get(position);

        if (holderItem.getAnswer() != null && !holderItem.getAnswer().trim().equals("")) {
            holder.answer.setVisibility(View.VISIBLE);
            holder.answer.setText(holderItem.getAnswer());
        } else {
            holder.answer.setVisibility(View.GONE);
        }
        if (holderItem.getCorrectAnswer() != null && !holderItem.getCorrectAnswer().trim().equals("")) {
            holder.correctAnswer.setVisibility(View.VISIBLE);
            holder.correctAnswer.setText(holderItem.getCorrectAnswer());
        } else {
            holder.answer.setVisibility(View.GONE);
        }
        if (holderItem.getQuestion() != null && !holderItem.getQuestion().trim().equals("")) {
            holder.question.setVisibility(View.VISIBLE);
            holder.question.setText(holderItem.getQuestion());
        } else {
            holder.question.setVisibility(View.GONE);
        }

        if (holderItem.correctAnswer()) {
            holder.ivAnswer.setImageResource(R.mipmap.check);
            holder.ivAnswer.setVisibility(View.VISIBLE);
            holder.llCorrectAnswer.setVisibility(View.GONE);
        } else {
            holder.ivAnswer.setImageResource(R.mipmap.error);
            holder.ivAnswer.setVisibility(View.VISIBLE);
            holder.ivCorrect_Answer.setImageResource(R.mipmap.check);
            holder.ivCorrect_Answer.setVisibility(View.VISIBLE);
        }

        if (holderItem.getQuestion() != null && !holderItem.getQuestion().trim().equals("")) {
            holder.tv_numberQuestion.setVisibility(View.VISIBLE);
            holder.tv_numberQuestion.setText("Questão " + (position + 1));
        } else {
            holder.tv_numberQuestion.setVisibility(View.GONE);
        }


    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    public List<Answer> getItems() {
        return items;
    }

    public void setItems(List<Answer> items) {
        this.items = items;
    }
}

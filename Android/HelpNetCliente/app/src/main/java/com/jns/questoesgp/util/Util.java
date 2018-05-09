package com.jns.questoesgp.util;

import com.jns.questoesgp.model.Question;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by julio on 20/04/2018.
 */

public class Util {

    public static List<String> unsortedList(Question question) {
        List<String> options = new ArrayList<>();

        options.add(question.getAnswer());
        options.add(question.getOptionOne());
        options.add(question.getOptionTwo());
        options.add(question.getOptionThree());
        options.add(question.getOptionFour());

        Random r = new Random();

        int position;
        List<String> optionsUnsorted = new ArrayList<String>();
        for (int i = options.size(); i > 0; i--) {
            position = r.nextInt(options.size());
            optionsUnsorted.add(options.get(position));
            options.remove(position);
        }
        return optionsUnsorted;
    }
}

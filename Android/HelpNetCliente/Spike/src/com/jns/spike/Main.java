package com.jns.spike;

import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonReader;

public class Main {
	
	private static final String CORRECT = "Certo";
	private static final String WRONG = "Errado";
	
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
	
	
	public static int totalQuestionSelected = 10;
	public static List<Answer> answer;
	public static List<Question> questionsSelected;
	public static List<Question> questionsAll;
	public static List<Question> questionsByCategory;
	public static String Category;

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		        
		catchAllQuestions();
		catchSelectedQuestions();		
        

	}
	/*
	 * Catch all json questions
	 */
	public static void catchAllQuestions() {
        questionsAll = new ArrayList<Question>();
        JsonReader reader;
        try {
        	reader = new JsonReader(new FileReader("C:\\temp\\questions.json"));
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
		questionsSelected = new ArrayList<Question>();
        Random r = new Random();        
		for (int i = 0 ; i < totalQuestionSelected ; i++){
			
			Question categorizedQuestion = questionsAll.get(r.nextInt(totalQuestionSelected));
			if (categorizedQuestion.getCategory().equals(category)){
				questionsSelected.add(categorizedQuestion);
			}
        }		
	}

	/*
	 * Correct Questions
	 */
	public static void correctQuestions(){
		
		for (int i = 0; i < questionsSelected.size() ; i++) {			
			if (questionsSelected.get(i).getAnswer().equals(answer.get(i).getAnswer())){
				answer.get(i).setSituation(CORRECT);
			}else{
				answer.get(i).setSituation(WRONG);
			}			
        }
		
	}
}

package com.jns.questoesgp.model;

public class Answer {
	
	private String question;
	private String answer;
	private String correctAnswer;
	private String situation;

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getSituation() {
		return situation;
	}

	public void setSituation(String situation) {
		this.situation = situation;
	}

	public void setCorrectAnswer(String correctAnswer) {
		this.correctAnswer = correctAnswer;
	}

	public String getCorrectAnswer() {
		return correctAnswer;
	}

	public Boolean correctAnswer(){

		if (this.answer.equals(correctAnswer)){
			return true;
		}
		return false;
	}
}

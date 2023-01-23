import React from 'react';
import DashBoardDataFetch from './DashBoardDataFetch';
import StudentsDataFetch from './StudentsDataFetch';
import Analytics from './Analytics';
import QuizesDataFetch from './QuizesDataFetch';
import CreateQuizOrExam from './CreateQuizOrExam';
import ExamsDataFetch from './ExamsDataFetch';

export default function Navigator(props) {
    if (props.selectedButton == "Dashboard") {
        return(
            <>
            <DashBoardDataFetch />
            </>
        )
    }
    if (props.selectedButton == "Students") {
        return(
            <>
            <StudentsDataFetch />
            </>
        )
    }
    if (props.selectedButton == "Analytics") {
        return(
            <>
            <Analytics />
            </>
        )
    }
    if (props.selectedButton == "Quizes") {
        return(
            <>
            <QuizesDataFetch />
            </>
        )
    }
    if (props.selectedButton == "Exams") {
        return(
            <>
            <ExamsDataFetch />
            </>
        )
    }
    if (props.selectedButton == "Create") {
        return(
            <>
            <CreateQuizOrExam  quizButton={props.buttonType} changeStyle={props.changeStyle}/>
            </>
        )
    }
    return(
        <>
        <DashBoardDataFetch />
        </>
    )
}
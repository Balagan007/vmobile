import {data , curriculumDetails}from './dummyData';


export default class ApiCalls {
    static getDashboardData(prof) {
        return data;
    }
    static getStudentsData(prof) {
        return data;
    }
    static getCurriculumDetails(prof, className, chapter) {
        console.log(prof, className, chapter);
        console.log(curriculumDetails[className][chapter]);
        return curriculumDetails[className][chapter];
    }

}

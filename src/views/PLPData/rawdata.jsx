const rawData = [
    // CCS
    { department: "College of Computer Studies", name: "Aye", gender: "Male", studentId: "21-01022", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 4, mentalAlertness: 3, selfConfidence: 4, abilityToPresent: 3, communicationSkills: 3, performanceRating: 4 },
    { department: "College of Computer Studies", name: "Khla", gender: "Female", studentId: "21-00447", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 5, communicationSkills: 5, performanceRating: 4 },
    { department: "College of Computer Studies", name: "Pol", gender: "Male", studentId: "21-00174", year: "4th Year", employability: "Employable", generalAppearance: 3, mannerOfSpeaking: 4, physicalCondition: 5, mentalAlertness: 3, selfConfidence: 4, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Computer Studies", name: "Maine", gender: "Male", studentId: "21-00406", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 5, selfConfidence: 4, abilityToPresent: 5, communicationSkills: 4, performanceRating: 5 },
    { department: "College of Computer Studies", name: "Bernalyn Gayo", gender: "Female", studentId: "21-01015", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 5, mentalAlertness: 5, selfConfidence: 5, abilityToPresent: 5, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Computer Studies", name: "", gender: "Male", studentId: "21-00356", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Computer Studies", name: "", gender: "Male", studentId: "21-00355", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 5, mentalAlertness: 5, selfConfidence: 5, abilityToPresent: 5, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Computer Studies", name: "", gender: "Female", studentId: "20-00090", year: "4th Year", employability: "Less Employable", generalAppearance: 3, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 2, selfConfidence: 2, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Computer Studies", name: "Russel Custodio", gender: "Male", studentId: "21-01026", year: "4th Year", employability: "Less Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 4, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Computer Studies", name: "Vincent Maiwat", gender: "Male", studentId: "21-00864", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 5, mentalAlertness: 5, selfConfidence: 4, abilityToPresent: 5, communicationSkills: 5, performanceRating: 4 },
  
    // CBA
    { department: "College of Business and Accountancy", name: "Diana", gender: "Female", studentId: "21-00668", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 5, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Business and Accountancy", name: "", gender: "Female", studentId: "21-00438", year: "4th Year", employability: "Less Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 3, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Business and Accountancy", name: "", gender: "Female", studentId: "21-00410", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 5, communicationSkills: 5, performanceRating: 4 },
    { department: "College of Business and Accountancy", name: "", gender: "Female", studentId: "21-00106", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 3, mentalAlertness: 4, selfConfidence: 5, abilityToPresent: 5, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Business and Accountancy", name: "Eljae Lacanilao", gender: "Male", studentId: "21-00113", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 5, mentalAlertness: 5, selfConfidence: 5, abilityToPresent: 5, communicationSkills: 5, performanceRating: 5 },
    { department: "College of Business and Accountancy", name: "", gender: "Female", studentId: "21-00233", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 5, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Business and Accountancy", name: "", gender: "Female", studentId: "21-00774", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 5, performanceRating: 4 },
    { department: "College of Business and Accountancy", name: "", gender: "Female", studentId: "21-00757", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Business and Accountancy", name: "Carl", gender: "Male", studentId: "21-00039", year: "4th Year", employability: "Employable", generalAppearance: 2, mannerOfSpeaking: 3, physicalCondition: 2, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 2, communicationSkills: 2, performanceRating: 2 },
    { department: "College of Business and Accountancy", name: "", gender: "Female", studentId: "22-00216", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
  
    // COED
    { department: "College of Education", name: "Gonzales, Ashley", gender: "Female", studentId: "21-00905", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 3, performanceRating: 4 },
    { department: "College of Education", name: "thr", gender: "Female", studentId: "21-00187", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 5, selfConfidence: 5, abilityToPresent: 5, communicationSkills: 5, performanceRating: 5 },
    { department: "College of Education", name: "", gender: "Female", studentId: "21-00229", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 5, mentalAlertness: 5, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 5 },
    { department: "College of Education", name: "", gender: "Female", studentId: "21-00388", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Education", name: "", gender: "Female", studentId: "21-00473", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Education", name: "", gender: "Female", studentId: "21-00311", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Education", name: "", gender: "Female", studentId: "21-00772", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Education", name: "", gender: "Female", studentId: "21-00580", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Education", name: "", gender: "Female", studentId: "21-00347", year: "4th Year", employability: "Employable", generalAppearance: 3, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 2, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Education", name: "Jom", gender: "Male", studentId: "20-00297", year: "4th Year", employability: "Less Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 4 },

    // CON

    { department: "College of Nursing", name: "Heart", gender: "Female", studentId: "21-00175", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 5, mentalAlertness: 5, selfConfidence: 5, abilityToPresent: 5, communicationSkills: 5, performanceRating: 5 },
    { department: "College of Nursing", name: "r", gender: "Female", studentId: "21-00132", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 3, performanceRating: 4 },
    { department: "College of Nursing", name: "", gender: "Female", studentId: "21-00635", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Nursing", name: "", gender: "Male", studentId: "19-00867", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 4, communicationSkills: 3, performanceRating: 4 },
    { department: "College of Nursing", name: "", gender: "Female", studentId: "21-00804", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Nursing", name: "Nico", gender: "Male", studentId: "21-00970", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 5, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 5, communicationSkills: 5, performanceRating: 5 },
    { department: "College of Nursing", name: "JJ", gender: "Other", studentId: "21-00092", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 3, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Nursing", name: "", gender: "Male", studentId: "21-00800", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 2, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
    { department: "College of Nursing", name: "", gender: "Female", studentId: "20-00004", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 3, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
    { department: "College of Nursing", name: "bevv", gender: "Female", studentId: "21-01006", year: "4th Year", employability: "Less Employable", generalAppearance: 3, mannerOfSpeaking: 2, physicalCondition: 3, mentalAlertness: 3, selfConfidence: 2, abilityToPresent: 3, communicationSkills: 3, performanceRating: 2 },

  // COE

  { department: "College of Engineering", name: "", gender: "Female", studentId: "21-00622", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
  { department: "College of Engineering", name: "JJ", gender: "Male", studentId: "21-00979", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 3, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 3, performanceRating: 4 },
  { department: "College of Engineering", name: "", gender: "Male", studentId: "21-00379", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 3, mentalAlertness: 3, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
  { department: "College of Engineering", name: "", gender: "Male", studentId: "21-00648", year: "4th Year", employability: "Employable", generalAppearance: 3, mannerOfSpeaking: 2, physicalCondition: 2, mentalAlertness: 2, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
  { department: "College of Engineering", name: "", gender: "Female", studentId: "21-00225", year: "4th Year", employability: "Less Employable", generalAppearance: 3, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 2, selfConfidence: 2, abilityToPresent: 2, communicationSkills: 2, performanceRating: 3 },
  { department: "College of Engineering", name: "", gender: "Female", studentId: "21-00665", year: "4th Year", employability: "Less Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 4, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
  { department: "College of Engineering", name: "", gender: "Female", studentId: "21-00073", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 3, physicalCondition: 3, mentalAlertness: 4, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 3 },
  { department: "College of Engineering", name: "", gender: "Male", studentId: "21-00129", year: "4th Year", employability: "Less Employable", generalAppearance: 2, mannerOfSpeaking: 2, physicalCondition: 2, mentalAlertness: 2, selfConfidence: 2, abilityToPresent: 2, communicationSkills: 2, performanceRating: 2 },
  { department: "College of Engineering", name: "", gender: "Male", studentId: "21-01109", year: "4th Year", employability: "Less Employable", generalAppearance: 2, mannerOfSpeaking: 2, physicalCondition: 2, mentalAlertness: 2, selfConfidence: 2, abilityToPresent: 2, communicationSkills: 2, performanceRating: 2 },
  { department: "College of Engineering", name: "", gender: "Male", studentId: "21-00097", year: "4th Year", employability: "Less Employable", generalAppearance: 2, mannerOfSpeaking: 2, physicalCondition: 2, mentalAlertness: 2, selfConfidence: 2, abilityToPresent: 2, communicationSkills: 2, performanceRating: 2 },

  // CHM

  { department: "College of Hospitality Management", name: "Dezz", gender: "Female", studentId: "21-00764", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 5, mentalAlertness: 4, selfConfidence: 3, abilityToPresent: 3, communicationSkills: 3, performanceRating: 4 },
  { department: "College of Hospitality Management", name: "Jov", gender: "Female", studentId: "21-00607", year: "4th Year", employability: "Less Employable", generalAppearance: 3, mannerOfSpeaking: 2, physicalCondition: 2, mentalAlertness: 2, selfConfidence: 2, abilityToPresent: 2, communicationSkills: 2, performanceRating: 3 },
  { department: "College of Hospitality Management", name: "Sheena", gender: "Female", studentId: "23-00391", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 5 },
  { department: "College of Hospitality Management", name: "", gender: "Female", studentId: "22-00052", year: "4th Year", employability: "Employable", generalAppearance: 4, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
  { department: "College of Hospitality Management", name: "Annah", gender: "Female", studentId: "21-00589", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 5, communicationSkills: 4, performanceRating: 4 },
  { department: "College of Hospitality Management", name: "", gender: "Female", studentId: "22-00095", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 4, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
  { department: "College of Hospitality Management", name: "fJ", gender: "Female", studentId: "23-00549", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 5, performanceRating: 5 },
  { department: "College of Hospitality Management", name: "", gender: "Female", studentId: "22-00427", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 5, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
  { department: "College of Hospitality Management", name: "", gender: "Female", studentId: "23-00907", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 },
  { department: "College of Hospitality Management", name: "AngE", gender: "Female", studentId: "22-00635", year: "4th Year", employability: "Employable", generalAppearance: 5, mannerOfSpeaking: 5, physicalCondition: 4, mentalAlertness: 4, selfConfidence: 4, abilityToPresent: 4, communicationSkills: 4, performanceRating: 4 }



















  // CHM
  ];
  

  export default rawData;
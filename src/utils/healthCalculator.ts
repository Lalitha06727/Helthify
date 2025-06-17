
export const calculateHealthScore = (healthMetrics: any): number => {
  if (!healthMetrics) return 50;

  let score = 0;
  let totalChecks = 0;

  // Heart Rate (60-100 bpm is normal)
  if (healthMetrics.heartRate) {
    totalChecks++;
    if (healthMetrics.heartRate >= 60 && healthMetrics.heartRate <= 100) {
      score += 20;
    } else if (healthMetrics.heartRate >= 50 && healthMetrics.heartRate <= 110) {
      score += 15;
    } else if (healthMetrics.heartRate >= 40 && healthMetrics.heartRate <= 120) {
      score += 10;
    } else {
      score += 5;
    }
  }

  // Blood Pressure (120/80 is ideal, <140/90 is normal)
  if (healthMetrics.bloodPressureSys && healthMetrics.bloodPressureDia) {
    totalChecks++;
    const sys = healthMetrics.bloodPressureSys;
    const dia = healthMetrics.bloodPressureDia;
    
    if (sys <= 120 && dia <= 80) {
      score += 20;
    } else if (sys <= 140 && dia <= 90) {
      score += 15;
    } else if (sys <= 160 && dia <= 100) {
      score += 10;
    } else {
      score += 5;
    }
  }

  // Temperature (97-99°F is normal)
  if (healthMetrics.temperature) {
    totalChecks++;
    if (healthMetrics.temperature >= 97 && healthMetrics.temperature <= 99) {
      score += 15;
    } else if (healthMetrics.temperature >= 96 && healthMetrics.temperature <= 100) {
      score += 10;
    } else {
      score += 5;
    }
  }

  // Daily Steps (10000 is target)
  if (healthMetrics.dailySteps) {
    totalChecks++;
    const stepPercentage = (healthMetrics.dailySteps / 10000) * 100;
    if (stepPercentage >= 100) {
      score += 10;
    } else if (stepPercentage >= 80) {
      score += 8;
    } else if (stepPercentage >= 60) {
      score += 6;
    } else if (stepPercentage >= 40) {
      score += 4;
    } else {
      score += 2;
    }
  }

  // Water Intake (8 glasses is target)
  if (healthMetrics.waterIntake) {
    totalChecks++;
    const waterPercentage = (healthMetrics.waterIntake / 8) * 100;
    if (waterPercentage >= 100) {
      score += 10;
    } else if (waterPercentage >= 80) {
      score += 8;
    } else if (waterPercentage >= 60) {
      score += 6;
    } else if (waterPercentage >= 40) {
      score += 4;
    } else {
      score += 2;
    }
  }

  // Sleep Duration (8 hours is target)
  if (healthMetrics.sleepDuration) {
    totalChecks++;
    if (healthMetrics.sleepDuration >= 7 && healthMetrics.sleepDuration <= 9) {
      score += 10;
    } else if (healthMetrics.sleepDuration >= 6 && healthMetrics.sleepDuration <= 10) {
      score += 8;
    } else if (healthMetrics.sleepDuration >= 5 && healthMetrics.sleepDuration <= 11) {
      score += 6;
    } else {
      score += 3;
    }
  }

  // Exercise Days (5 days is target)
  if (healthMetrics.exerciseDays) {
    totalChecks++;
    const exercisePercentage = (healthMetrics.exerciseDays / 5) * 100;
    if (exercisePercentage >= 100) {
      score += 10;
    } else if (exercisePercentage >= 80) {
      score += 8;
    } else if (exercisePercentage >= 60) {
      score += 6;
    } else if (exercisePercentage >= 40) {
      score += 4;
    } else {
      score += 2;
    }
  }

  // Energy Level
  if (healthMetrics.energyLevel) {
    totalChecks++;
    if (healthMetrics.energyLevel === "High") {
      score += 5;
    } else if (healthMetrics.energyLevel === "Medium") {
      score += 3;
    } else {
      score += 1;
    }
  }

  // Calculate final percentage
  const maxPossibleScore = 100;
  const finalScore = Math.round((score / maxPossibleScore) * 100);
  
  // Ensure score is between 1 and 100
  return Math.max(1, Math.min(100, finalScore));
};

export const getHealthStatus = (score: number): { status: string; color: string; advice: string } => {
  if (score >= 80) {
    return {
      status: "Excellent",
      color: "text-green-600",
      advice: "Keep up the great work! Your health metrics are excellent."
    };
  } else if (score >= 60) {
    return {
      status: "Good",
      color: "text-blue-600",
      advice: "Your health is on track. Consider improving a few areas."
    };
  } else if (score >= 40) {
    return {
      status: "Fair",
      color: "text-yellow-600",
      advice: "There's room for improvement. Focus on key health metrics."
    };
  } else {
    return {
      status: "Needs Attention",
      color: "text-red-600",
      advice: "Please consult with a healthcare professional and focus on improving your health metrics."
    };
  }
};

class CalorieTracker {
  constructor() {
    this._calorieLimit = 2100;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  // Public methods/API //

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private Methods //
  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById('calories-total');
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById('calories-limit');
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById('calories-consumed');

    const caloriesConsumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    caloriesConsumedEl.innerHTML = caloriesConsumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById('calories-burned');

    const caloriesBurned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    caloriesBurnedEl.innerHTML = caloriesBurned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById('calories-remaining');

    const caloriesRemaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = caloriesRemaining;

    if (caloriesRemaining <= 0) {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        'bg-danger'
      );
    } else {
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
    }
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById('calorie-progress');
    const percentage = (this._totalCalories / this._calorieLimit) * 100;

    const width = Math.min(percentage, 100);

    progressEl.style.width = `${width}%`;
    if (width === 100) {
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.calories = calories;
    this.name = name;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.calories = calories;
    this.name = name;
  }
}

const tracker = new CalorieTracker();

// Meals
const breakfast = new Meal('Breakfast', 400);
const lunch = new Meal('Lunch', 200);
const dinner = new Meal('Dinner', 400);
tracker.addMeal(breakfast);
tracker.addMeal(lunch);
tracker.addMeal(dinner);

// Workouts
const run = new Workout('Morning Run', 300);
const pushups = new Workout('Evening push ups', 200);
const crossfit = new Workout('Crossfit training', 500);
tracker.addWorkout(run);
tracker.addWorkout(crossfit);
tracker.addWorkout(pushups);

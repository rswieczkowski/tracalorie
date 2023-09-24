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
    this._displayNewMeal(meal);
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._displayNewWorkout(workout);
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

  _displayNewMeal(meal) {
    const mealsEl = document.getElementById('meal-items');
    const mealEl = document.createElement('div');
    mealEl.classList.add('card', 'my-2');
    mealEl.setAttribute('data-id', meal.id);
    mealEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${meal.name}</h4>
        <div
          class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
        >
          ${meal.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  `;
    mealsEl.appendChild(mealEl);
  }

  _displayNewWorkout(workout) {
    const workoutsEl = document.getElementById('workout-items');
    const workoutEl = document.createElement('div');
    workoutEl.classList.add('card', 'my-2');
    workoutEl.setAttribute('data-id', workout.id);
    workoutEl.innerHTML = `
    <div class="card-body">
      <div class="d-flex align-items-center justify-content-between">
        <h4 class="mx-1">${workout.name}</h4>
        <div
          class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
        >
          ${workout.calories}
        </div>
        <button class="delete btn btn-danger btn-sm mx-2">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  `;
    workoutsEl.appendChild(workoutEl);
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

class App {
  constructor() {
    this._calorieTracker = new CalorieTracker();
    document
      .getElementById('meal-form')
      .addEventListener('submit', this._newItem.bind(this, 'meal'));
    document
      .getElementById('workout-form')
      .addEventListener('submit', this._newItem.bind(this, 'workout'));
  }

  _newItem(type, e) {
    e.preventDefault();
    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    this._validateInputs(name.value, calories.value);

    if (type === 'meal') {
      const meal = new Meal(name.value, parseInt(calories.value));
      this._calorieTracker.addMeal(meal);
    } else if (type === 'workout') {
      const workout = new Workout(name.value, parseInt(calories.value));
      this._calorieTracker.addWorkout(workout);
    }

    name.value = '';
    calories.value = '';

    const collapseItem = document.getElementById(`collapse-${type}`);
    new bootstrap.Collapse(collapseItem, {
      toggle: true,
    });
  }

  _validateInputs(name, calories) {
    if (name === '') {
      alert('Please fill the name');
      return;
    } else if (isNaN(calories)) {
      alert('Please fill the number of calories');
      return;
    }
  }
}

const app = new App();

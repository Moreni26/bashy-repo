class Course {
    name
    score
    unit
    semester
   
    constructor(name, score, unit, semester) {
        this.name = name;
        this.setScore(score);
        this.setUnit(unit);
        this.semester = semester;
    }

    setScore(score) {
        if (score >= 0 && score <= 100) {
            this._score = score;
        }
    }

    getScore() {
        return this._score;
    }

    setUnit(unit) {
        if (unit >= 1 && unit <= 5) {
            this._unit = unit;
        }
    }

    getUnit() {
        return this._unit;
    }

    registerCourse(name, score, unit, semester) {
        this.name = name;
        this.setScore(score);
        this.setUnit(unit);
        this.semester = semester;
    }

    getResult() {
        if (this._score >= 70) return 5.0;
        if (this._score >= 60) return 4.0;
        if (this._score >= 50) return 3.0;
        if (this._score >= 45) return 2.0;
        if (this._score >= 40) return 1.0;
        return 0.0;
    }
}

class CGPACalculator {
    constructor(courses = []) {
        this._courses = courses;
        this._firstGPA = 0.0;
        this._secondGPA = 0.0;
        this._cumulativeGPA = 0.0;
    }

    addCourse(course) {
        this._courses.push(course);
    }
   
    registerCourse(name, score, unit, semester) {
        const newCourse = new Course (name, score, semester);
        this.addCourse(newCourse);
    }
   
    calculateSemesterGPA(semester) {
        let totalUnits = 0;
        let totalPoints = 0;
        for (const course of this._courses) {
            if (course.semester === semester) {
                totalUnits += course.getUnit();
                totalPoints += course.getUnit() * course.getResult();
            }
        }
        if (totalUnits === 0) {
            return 0.0;
        }
        const gpa = totalPoints / totalUnits;
        if (semester === "first") {
            this._firstGPA = gpa;
        } else if (semester === "second") {
            this._secondGPA = gpa;
        }
        return gpa;
    }

    calculateCGPA() {
        let totalUnits = 0;
        let totalPoints = 0;
        for (const course of this._courses) {
            totalUnits += course.getUnit();
            totalPoints += course.getUnit() * course.getResult();
        }
        if (totalUnits === 0) {
            return 0.0
        }
        this._cumulativeGPA = totalPoints / totalUnits;
        return this._cumulativeGPA;
    }

    get courses() {
        return this._courses;
    }

    get firstGPA() {
        return this._firstGPA;
    }

    get secondGPA() {
        return this._secondGPA;
    }

    get cumulativeGPA() {
        return this._cumulativeGPA;
    }
}

const biology = new Course("Biology", 80, 1, "second");
const chemistry = new Course("Chemistry", 60, 3, "first");
const math = new Course("Math", 70, 2, "first");



const cgpaCalculator = new CGPACalculator();
cgpaCalculator.addCourse(biology, 80, 1, "second");
cgpaCalculator.addCourse(chemistry, 60, 3, "first");
cgpaCalculator.addCourse(math, 70, 2, "first");



console.log("First Semester GPA:", cgpaCalculator.calculateSemesterGPA("first"));
console.log("Second Semester GPA:", cgpaCalculator.calculateSemesterGPA("second"));
console.log("Cumulative GPA:", cgpaCalculator.calculateCGPA());

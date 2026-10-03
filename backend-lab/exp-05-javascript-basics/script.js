const students = [
  { name: 'Aarav', marks: [82, 76, 91] },
  { name: 'Meera', marks: [90, 88, 95] },
  { name: 'Riya', marks: [70, 79, 84] }
];
const average = marks => marks.reduce((total, mark) => total + mark, 0) / marks.length;
function runExperiment() {
  const results = students.map(student => ({ ...student, average: average(student.marks).toFixed(2) }));
  const topper = results.reduce((best, student) => Number(student.average) > Number(best.average) ? student : best);
  document.querySelector('#output').textContent = JSON.stringify({ students: results, topper }, null, 2);
}
